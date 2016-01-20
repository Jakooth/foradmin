function Aside(o) {
	
	/** 
	 * PRIVATE
	 */
	 
	this._o = o;
	this._url = 'http://localhost/forapi/save_article.php';
	this._get = 'http://localhost/forapi/forplay.php';
	this._isValid = true;
	this._saveId;
	this._saveShot;
	this._saveAuthors;
	this._saveTags;
	this._saveLayouts;
	this._saveLayoutsArray = new Array();
	this._bestPreviewLength = 300;
	
	this._$this = $('#' + this._o);
	this._$shotInput = $('#' + this._o + 'ShotInput');
	
	this._$typeInput = $('#' + this._o + 'TypeSelect');
	this._$subtypeInput = $('#' + this._o + 'SubtypeSelect');
	this._$titleInput = $('#' + this._o + 'TitleInput');
	this._$subtitleInput = $('#' + this._o + 'SubtitleInput');
	this._$authorInput = $('#' + this._o + 'AuthorsInput');
	this._$tagsInput = $('#' + this._o + 'TagsInput');
	
	this._$urlInput = $('#publishUrlInput');
	this._$siteInput = $('#publishSiteInput');
	this._$dateInput = $('#publishDateInput');
	this._$timeInput = $('#publishTimeInput');
	this._$issueInput = $('#publishIssueInput');
	this._$prioritySelect = $('#publishPrioritySelect');
	
	this._$saveIdInput = $('#' + this._o + 'SaveIdInput');
	this._$saveShotInput = $('#' + this._o + 'SaveShotInput');
	this._$saveAuthorsInput = $('#' + this._o + 'SaveAuthorsInput');
	this._$saveTagsInput = $('#' + this._o + 'SaveTagsInput');
	this._$saveLayoutsInput = $('#' + this._o + 'SaveLayoutsInput');
	
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
	this.object = o;
	
	this.json = {};
	this.layouts = [];
}

/** 
 * PRIVATE
 */
 
Aside.prototype._updateAfterSave = function(data) {
	if (data.saveId) this._$saveIdInput.val(data.saveId).change();
	if (data.saveAuthors) this._$saveAuthorsInput.val(data.saveAuthors.join(',')).change();
	if (data.saveTags) this._$saveTagsInput.val(data.saveTags.join(',')).change();
	if (data.saveLayouts) this._$saveLayoutsInput.val(data.saveLayouts.join(',')).change();
} 

Aside.prototype._getTypeaheadValue = function(_$input, includeHidden) {
	return Fortag.prototype._getTypeaheadValue.call(this, _$input, includeHidden);
}

Aside.prototype._getTypeaheadValueByKey = function(data, key) {
	var keys = new Array();

	if (data) {
		data.forEach(function(data, index, arr) {
			keys.push(data[key]);
		});
	}
	
	return keys;
}

Aside.prototype._setTagsinputValue = function(_$input, data) {
	var self = this;
	
	if (data) {
		data.forEach(function(tag, index, arr) {
			if (!_$input.length) return false;
					
			_$input.tagsinput('add', tag);
		});
	}
}

Aside.prototype._getInputValue = function(_$input, includeHidden) {
	return Fortag.prototype._getInputValue.call(this, _$input, includeHidden);
}

Aside.prototype._setInputValue = function(_$input, data) {
	return Fortag.prototype._setInputValue.call(this, _$input, data);
}

Aside.prototype._getInputValueAsArray = function(_$input) {
	return Fortag.prototype._getInputValueAsArray.call(this, _$input);
}

Aside.prototype._setInputValueAsString = function(_$input, data) {
	return Fortag.prototype._setInputValueAsString.call(this, _$input, data);
}

Aside.prototype._getImageValue = function(_$input) {
	return _$input.length ?
		   utils.parseImg(_$input.val()) || null : null;
}

Aside.prototype._setImgValue = function(_$input, data) {
	if (data) {
		if (!_$input.length) return false;
		
		_$input.parents('.file')
			   .css('background-image', 
					'url(../assets/articles/' + 
					utils.parseImgTag(data) + '/' + 
					data);
	} else {
		_$input.parents('.file')
			   .css('background-image', 
					'none');
	}
} 

Aside.prototype._escapeValue = function(data) {
	
	/**
	 * There is an error if you simple return quoted string.
	 * For this reason we return string object to string.
	 */
	
	return new String(Fortag.prototype._escapeValue
									  .call(this, data)).toString();
}

Aside.prototype._unescapeValue = function(data) {
	
	/**
	 * There is an error if you simple return quoted string.
	 * For this reason we return string object to string.
	 */
	
	return new String(Fortag.prototype._unescapeValue
									  .call(this, data)).toString();
}

Aside.prototype._getSiteValue = function() {
	var s;

	if (this.type == 'games') {
		s = 'forplay';
	} else {
		s = 'forlife';
	}
	
	this._$siteInput.val(s).change();
	
	return s;
}

Aside.prototype._getLayouts = function() {
	var layout = 'textLayout_' + this._o;
	
	this.layouts = [];
	 
	this.layouts.push({center: this._escapeValue(CKEDITOR
						  		   .instances[layout].getData()),
					   imgs: null,
					   left: null,
					   right: null,
					   type: 'text',
					   subtype: 't',
					   ratio: '16-9'});
	
	return this.layouts;
}

/**
 * TODO: Set some preview text variable to reset to.
 */
 
Aside.prototype._resetLayouts = function() {
	var layout = 'textLayout_' + this._o;
	
	CKEDITOR.instances[layout].setData('');
}

Aside.prototype._setLayouts = function(data) {
	var layout = 'textLayout_' + this._o;
	
	if (data) {
		CKEDITOR.instances[layout]
				.setData(this._unescapeValue(data[0].center));
	
		this._saveLayoutsArray.push(data[0].layout_id);
	}
}

Aside.prototype._getPreviewText = function() {
	var layout = 'textLayout_' + this._o,
		preview = null;
	
	preview = $(CKEDITOR.instances[layout].getData())
					    .filter('p')
					    .map(function(i, element) { 
							return $(element).text(); 
						}).get().join(' ');
			  
	preview = this._escapeValue(preview);		  
	
	return preview;
}

Aside.prototype._setPrimeAndUrl = function() {
	
	/**
	 * The problem is tags input data will not give tags in order.
	 * We need the first one to set the url.
	 */
	 
	var $tags = this._$tagsInput.parents('label').find('.tag');
	
	/**
	 * These are required and validation will fail anyway.
	 */
	
	if (!this.title) return false;
	if ($tags.length <= 0) return false;
		
	if ($tags.length > 0) {
		this.prime = $tags.eq(0).data().item;
	}
		
	if (this.subtype == 'review' || this.subtype == 'video') {
		this.url = this.prime.tag;
	} else {
		this.url = utils.formatTag(this.title);
	}
	
	this._$urlInput.val(this.url).change();
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
	
	if (!this.type) {
		this._isValid = false;
		
		admin.showAlert({message: 'Невалиден тип. Питай бат Ваньо.', 
						 status: 'error'});
		
		return false;
	}
	
	if (!this.subtype) {
		this._isValid = false;
		
		admin.showAlert({message: 'Невалиден подтип. Питай бат Ваньо.', 
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
	
	if (!this.tags) {
		this._isValid = false;
		
		admin.showAlert({message: 'Изберете поне един таг.', 
						 status: 'error'});
		
		return false;
	}
	
	if (!this.url) {
		this._isValid = false;
		
		admin.showAlert({message: 'Невалиден адрес на статията. Питай бат Ваньо.', 
						 status: 'error'});
		
		return false;
	}
	
	if (!this.prime) {
		this._isValid = false;
		
		admin.showAlert({message: 'Невалиден основен таг. Питай бат Ваньо.', 
						 status: 'error'});
		
		return false;
	}
}

Aside.prototype.validatePublishSettings = function() {
	this._isValid = true;
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
	this.tags = this._getTypeaheadValue(this._$tagsInput);
	
	this.shot = this._getImageValue(this._$shotInput);
	this.site = this._getSiteValue();
	
	/**
	 * This function will push layouts to the @this.layouts array.
	 * For this reason there is no need to set it second time.
	 */
	 
	this._getLayouts();
	this._setPrimeAndUrl();
	
	this.preview = this._getPreviewText();
	
	this._saveId = this._getInputValue(this._$saveIdInput);
	this._saveShot = this._getInputValue(this._$saveShotInput);
	this._saveAuthors = this._getInputValueAsArray(this._$saveAuthorsInput);
	this._saveTags = this._getInputValueAsArray(this._$saveTagsInput);
	this._saveLayouts = this._getInputValueAsArray(this._$saveLayoutsInput);				 
						
	/**
	 * If there is image selection always use it.
	 * Otherwise take the last saved image.
	 */
	
	this.shot = this.shot || this._saveShot;
	
	this.json = {
		url: this.url,
		prime: this.prime,
		tags: this.tags,
		site: this.site,
		type: this.type,
		subtype: this.subtype,
		title: this.title,
		subtitle: this.subtitle,
		author: this.author,
		shot: this.shot,
		preview: this.preview,
		layouts: this.layouts,
		object: this.object,
		_saveId: this._saveId,
		_saveAuthors: this._saveAuthors,
		_saveTags: this._saveTags,
		_saveLayouts: this._saveLayouts
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
	this.date = new Date(this._getInputValue(this._$dateInput) + ' ' + 
						 this._getInputValue(this._$timeInput));
	
	this.issue = this._getTypeaheadValue(this._$issueInput);
	this.priority = this._getInputValue(this._$prioritySelect);
	
	this.json.date = this.date;
	this.json.issue = this.issue;
	this.json.priority = this.priority;
	
	this.validatePublishSettings();
	
	if (!this._isValid) {
		return false;
	}
}

/**
 * @isUpdate indicates if this is an update or new object.
 * For example for articles there a new layout is added
 * automatically for new items, but not for updates.
 */

Aside.prototype.resetData = function(isUpdate) {
	if (this._$typeInput.length) this._$typeInput.val(this._$typeInput.find('option:first').val());
	if (this._$subtypeInput.length) this._$subtypeInput.val(this._o);
	if (this._$titleInput.length) this._$titleInput.val(null);
	if (this._$subtitleInput.length) this._$subtitleInput.val(null);
	if (this._$shotInput.length) this._$shotInput.val(null);	
	if (this._$dateInput.length) this._$dateInput.val(null);
	if (this._$timeInput.length) this._$timeInput.val(null);
	if (this._$urlInput.length) this._$urlInput.val(null);
	if (this._$prioritySelect.length) this._$prioritySelect.val(null);
	
	if (this._$authorInput.length) this._$authorInput.tagsinput('removeAll');
	if (this._$tagsInput.length) this._$tagsInput.tagsinput('removeAll');
	if (this._$issueInput.length) this._$issueInput.tagsinput('removeAll');
	
	this._resetLayouts(isUpdate);
	
	if (this._$saveIdInput.length) this._$saveIdInput.val(null).change();
	if (this._$saveShotInput.length) this._$saveShotInput.val(null).change();
	if (this._$saveAuthorsInput.length) this._$saveAuthorsInput.val(null).change();
	if (this._$saveTagsInput.length) this._$saveTagsInput.val(null).change();
	if (this._$saveLayoutsInput.length) this._$saveLayoutsInput.val(null).change();
										this._$saveLayoutsArray = new Array();
	
	/**
	 * Remove image backgrounds.
	 */
	
	this._setImgValue(this._$shotInput, null);
}

Aside.prototype.updateData = function(data) {
	this.resetData(true);
	
	this._setInputValue(this._$typeInput, data.type || null);
	this._setInputValue(this._$subtypeInput, data.subtype || this._o);
	this._setInputValue(this._$titleInput, data.title || null);
	this._setInputValue(this._$subtitleInput, data.subtitle || null);
	this._setImgValue(this._$shotInput, data.shot_img || null);
	this._setInputValue(this._$dateInput, data.date ? data.date.split(' ')[0] : null);
	this._setInputValue(this._$timeInput, data.date ? data.date.split(' ')[1] : null);
	this._setInputValue(this._$prioritySelect, data.priority || null);
	this._setInputValue(this._$urlInput, data.url || null);
	
	this._setTagsinputValue(this._$authorInput, data.authors || null);
	this._setTagsinputValue(this._$tagsInput, data.tags || null);
	this._setTagsinputValue(this._$issueInput, data.issue || null);
	
	this._setLayouts(data.layouts || null);
	
	this._setInputValue(this._$saveIdInput, data.article_id || null);
	this._setInputValue(this._$saveShotInput, data.shot_img || null);
	this._setInputValueAsString(this._$saveAuthorsInput, 
								this._getTypeaheadValueByKey(data.authors, 'author_id'));
	this._setInputValueAsString(this._$saveTagsInput, 
								this._getTypeaheadValueByKey(data.tags, 'tag_id'));
	this._setInputValueAsString(this._$saveLayoutsInput, this._saveLayoutsArray);							
}

Aside.prototype.setData = function(result) {
	var self = this;
	
	admin.showAlert({message: 'Отварям...', status: 'loading'});
	
	var get = $.get(this._get + '?tag=' + result.tag);
						   
	$.when(get).done(function(data) {
		var data = data.length ? JSON.parse(data) : data;
		
		if (!data.events.mysql.connection) {
			admin.showAlert({message: data.events.mysql.error, status: 'error'});
		} else if (!data.events.mysql.result) {
			admin.showAlert({message: data.events.mysql.error, status: 'error'});
		} else {
			self.updateData(data.articles[0]);
			
			admin.hideAlert();
		}	
	}).fail(function(data) {
		console.log(data);
	});					   
}

Aside.prototype.post = function() {
	var self = this;
	
	/**
	 * TODO: This approach is no OK for automated save.
	 * Validation must happen here as well like in Fortag.
	 * Publishing must called separately like save in foradmin.js 
	 */
	 
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
		
			self._updateAfterSave(data.operation);
		}
	}).fail(function (data, textStatus, jqXHR) {
		console.log(data);
	});
	
	return true;
}