function Aside() {
	
	/** 
	 * PRIVATE
	 */
	 
	this._o = 'aside';
	this._url = 'http://localhost/forapi/save_aside.php';
	this._isValid = true;
	this._bestLength = 300;
	this._layoutSelector = 'textLayout_' + this._o;
	
	this._$shotInput = $('#' + this._o + 'MainInput');
	
	this._$typeInput = $('#' + this._o + 'TypeSelect');
	this._$subtypeInput = $('#' + this._o + 'SubtypeSelect');
	this._$titleInput = $('#' + this._o + 'TitleInput');
	this._$subtitleInput = $('#' + this._o + 'SubtitleInput');
	this._$authorInput = $('#' + this._o + 'AuthorsInput');
	
	this._$tagsInput = $('#publishTagsInput');
	this._$urlInput = $('#publishUrlInput');
	this._$siteInput = $('#publishSiteInput');
	this._$dateInput = $('#publishDateInput');
	this._$timeInput = $('#publishTimeInput');
	this._$issueInput = $('#publishIssueInput');
	this._$prioritySelect = $('#publishPrioritySelect');
	
	/** 
	 * PUBLIC
	 */

	this.shot_img;
	this.center;
	
	this.type;
	this.subtype;
	this.title;
	this.subtitle;
	this.author;
	
	this.prime;
	this.tags;
	this.site;
	this.url;
	this.date;
	this.issue;
	this.preview;
	this.priority;
	
	this.json = {};
}

/** 
 * PRIVATE
 */

Aside.prototype._getTypeaheadValue = function(_$input) {
	return Fortag.prototype._getTypeaheadValue.call(this, _$input);
}

Aside.prototype._getInputValue = function(_$input) {
	return Fortag.prototype._getInputValue.call(this, _$input);
}

Aside.prototype._getLayoutData = function(id) {
	/**
	 * TODO: Escape htmls using he.js.
	 */
	 
	return CKEDITOR.instances[id].getData().replace(/\n/g, '');
}

Aside.prototype._getImageValue = function(_$input) {
	return _$input.length ?
		   utils.parseImgIndex(_$input.val()) || null : null;
}

Aside.prototype._getSiteValue = function() {
	if (this.type == 'games') {
		return 'forplay';
	} else {
		return 'forlife';
	}
}

Aside.prototype._getPreviewText = function(id) {
	var preview = null;
	
	/**
	 * Try doing it with filter instead DIV wrapper and find.
	 */
	preview = $('<div>' + this._getLayoutData(id) + '</div>')
			  .find('> p')
			  .map(function(i, element) { 
							return $(element).text(); 
			  }).get().join(' ');
	
	return preview;
}

Aside.prototype._setPrimeAndUrl = function() {
	
	/**
	 * The problem is tags input data will not five tags in order.
	 * We need the firrst one to set the url.
	 */
	var $tags = this._$tagsInput.parents('label').find('.tag');
		
	if ($tags.length > 0) {
		this.prime = $tags.eq(0).data().item;
		this.json.prime = this.prime;
	}
		
	if (this.subtype.tag == 'review' || this.subtype.tag == 'video') {
		this.url = this.prime.value;
	} else {
		this.url = utils.formatTag(this.title);
	}
	
	this._$urlInput.val(this.url);
	this.json.url = this.url;
}

/** 
 * PUBLIC
 */

Aside.prototype.validateContent = function() {
	this._isValid = true;
	
	/**
	 * TODO: Validate length match the the varchar field im the DB.
	 */
	if (!this.title) {
		this._isValid = false;
		
		admin.showAlert({message: 'Напишете заглавие.', 
						 status: 'error'});
		
		return false;
	}
	
	if (this.author.length <= 0) {
		this._isValid = false;
		
		admin.showAlert({message: 'Изберете автор. Използвайте Forplay за анонимно.', 
						 status: 'error'});
		
		return false;
	}
	
	if (!this.shot_img) {
		this._isValid = false;
		
		admin.showAlert({message: 'Изберете основна картинка.', 
						 status: 'error'});
		
		return false;
	}
}

Aside.prototype.validatePublishSettings = function() {
	this._isValid = true;
	
	/**
	 * TODO: Validate tag, prime and url.
	 */
	 
	if (this.tags.length <= 0) {
		this._isValid = false;
		
		admin.showAlert({message: 'Изберете поне един таг.', 
						 status: 'error'});
		
		return false;
	}
	
	if (this.issue.length <= 0) {
		this._isValid = false;
		
		admin.showAlert({message: 'Изберете брой.', 
						 status: 'error'});
		
		return false;
	}
}

Aside.prototype.validateBestPractices = function() {
	var l = (this.preview ? this.preview.length : 0) + 
			(this.title ? this.title.length : 0) + 
			(this.subtitle ? this.subtitle.length : 0);
	
	this._isValid = true;
	
	if (l <= this._bestLength) {
		
		admin.showAlert({message: 'Препоръчително e текста плюс заглавието и подзаглавието, ' + 
								  'дa са общо минимум ' + this._bestLength + ' символа, ' + 
								  'за да излгежда добре статията на началната страница.  ' + 
								  'В момента те са ' + l, 
						 status: 'warning'});
		
		this._isValid = true;
		
		return false;
	}
}


Aside.prototype.save = function() {
	this.type = this._getInputValue(this._$typeInput);
	this.subtype = this._getInputValue(this._$subtypeInput);
	this.title = this._getInputValue(this._$titleInput);
	this.subtitle = this._getInputValue(this._$subtitleInput);
	this.author = this._getTypeaheadValue(this._$authorInput);
	
	this.shot_img = this._getImageValue(this._$shotInput);
	this.center = this._getLayoutData(this._layoutSelector);
	this.preview = this._getPreviewText(this._layoutSelector);
	
	this.json = {
		type: this.type,
		subtype: this.subtype,
		title: this.title,
		subtitle: this.subtitle,
		author: this.author,
		shot: this.shot_img,
		preview: this.preview
	};
	
	this.validateContent();
	
	if (!this._isValid) {
		return false;
	}
	
	this.validateBestPractices();
	
	if (!this._isValid) {
		return false;
	}
}

Aside.prototype.publish = function() {
	this.tags = this._getTypeaheadValue(this._$tagsInput);
	this.site = this._getSiteValue();
	
	/**
	 * TODO: This is date and time and not just date.
	 */
	this.date = new Date(this._getInputValue(this._$dateInput) + ' ' + 
						 this._getInputValue(this._$timeInput));
	this.issue = this._getTypeaheadValue(this._$issueInput);
	this.priority = this._getInputValue(this._$prioritySelect);
	
	this._setPrimeAndUrl();
	
	this.json.tags = this.tags;
	this.json.site = this.site;
	this.json.date = this.date;
	this.json.issue = this.issue;
	this.json.priority = this.priority;
	
	this.validatePublishSettings();
	
	if (!this._isValid) {
		return false;
	}
}

Aside.prototype.post = function() {
	var self = this;
		
	this.publish();
	
	admin.showAlert({message: 'Записвам...', status: 'loading'});
	
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8",
		url: this._url,
		data: JSON.stringify(this.json),
		dataType: 'json'
	}).done(function (data, textStatus, jqXHR) {
		if (!data.events.mysql.connection) {
			admin.showAlert({message: data.events.mysql.error, status: 'error'});
		} else if (!data.events.mysql.result) {
			admin.showAlert({message: data.events.mysql.error, status: 'error'});
		} else {
			admin.showAlert({message: self.json.object
										  .charAt(0).toUpperCase() + 
									  self.json.object
									  	  .slice(1) + ' saved', status: 'success'});
		}
	}).fail(function (data, textStatus, jqXHR) {
		console.log(data);
	});
	
	return true;
}