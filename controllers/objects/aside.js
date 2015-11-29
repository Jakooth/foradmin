function Aside(o) {
	
	/** 
	 * PRIVATE
	 */
	 
	this._o = o;
	this._url = 'http://localhost/forapi/save_article.php';
	this._isValid = true;
	this._bestPreviewLength = 300;
	
	this._$this = $('#' + this._o);
	this._$shotInput = $('#' + this._o + 'ShotInput');
	
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

	this.shot;
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
	this.layouts = [];
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

Aside.prototype._getImageValue = function(_$input) {
	return _$input.length ?
		   utils.parseImg(_$input.val()) || null : null;
}

Aside.prototype._escapeLayoutData = function(data) {
	return data.replace(/\n/g, '');
}

Aside.prototype._getSiteValue = function() {
	if (this.type == 'games') {
		return 'forplay';
	} else {
		return 'forlife';
	}
}

Aside.prototype._getLayouts = function() {
	var layout = 'textLayout_' + this._o;
	
	this.layouts = [];
	
	/**
	 * TODO: Escape htmls using he.js.
	 */
	 
	this.layouts.push({center: this._escapeLayoutData(CKEDITOR
						  		   .instances[layout].getData()),
					   imgs: [],
					   left: null,
					   right: null,
					   type: 'text',
					   subtype: 't',
					   ratio: '16-9'});
	
	return this.layouts;
}

Aside.prototype._getPreviewText = function() {
	var layout = 'textLayout_' + this._o,
		preview = null;
	
	preview = $(this._escapeLayoutData(CKEDITOR
					.instances[layout].getData()))
			  .filter('p')
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
		
	if (this.subtype == 'review' || this.subtype == 'video') {
		this.url = this.prime.tag;
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
	 * Note DB will throw error anyway.
	 */
	if (!this.title) {
		this._isValid = false;
		
		admin.showAlert({message: 'Напишете заглавие.', 
						 status: 'error'});
		
		return false;
	}
	
	if (!this.author) {
		this._isValid = false;
		
		admin.showAlert({message: 'Изберете автор. Използвайте Forplay за анонимно.', 
						 status: 'error'});
		
		return false;
	}
	
	if (!this.shot) {
		this._isValid = false;
		
		admin.showAlert({message: 'Изберете основна картинка.', 
						 status: 'error'});
		
		return false;
	}
}

Aside.prototype.validatePublishSettings = function() {
	this._isValid = true;
	
	if (!this.tags) {
		this._isValid = false;
		
		admin.showAlert({message: 'Изберете поне един таг.', 
						 status: 'error'});
		
		return false;
	}
}

Aside.prototype.validateBestPractices = function() {
	var l = (this.preview ? this.preview.length : 0) + 
			(this.title ? this.title.length : 0) + 
			(this.subtitle ? this.subtitle.length : 0);
	
	this._isValid = true;
	
	if (l <= this._bestPreviewLength) {
		
		admin.showAlert({message: 'Препоръчително e текста плюс заглавието и подзаглавието, ' + 
								  'дa са общо минимум ' + this._bestPreviewLength + ' символа, ' + 
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
	
	this.shot = this._getImageValue(this._$shotInput);
	
	/**
	 * This function will push layouts to the @this.layouts array.
	 * For this reason there is no need to set it second time.
	 */
	 
	this._getLayouts();
	
	this.preview = this._getPreviewText();
	
	this.json = {
		type: this.type,
		subtype: this.subtype,
		title: this.title,
		subtitle: this.subtitle,
		author: this.author,
		shot: this.shot,
		preview: this.preview,
		layouts: this.layouts
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
	
	this.date = new Date(this._getInputValue(this._$dateInput) + ' ' + 
						 this._getInputValue(this._$timeInput));
	
	this.issue = this._getTypeaheadValue(this._$issueInput);
	this.priority = this._getInputValue(this._$prioritySelect);
	
	this.json.tags = this.tags;
	this.json.site = this.site;
	this.json.date = this.date;
	this.json.issue = this.issue;
	this.json.priority = this.priority;
	
	this.validatePublishSettings();
	
	if (!this._isValid) {
		return false;
	}
	
	this._setPrimeAndUrl();
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
			admin.showAlert({message: self._o
										  .charAt(0).toUpperCase() + 
									  self._o
									  	  .slice(1) + ' saved', status: 'success'});
		}
	}).fail(function (data, textStatus, jqXHR) {
		console.log(data);
	});
	
	return true;
}