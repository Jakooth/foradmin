function Fortag(o) {
	
	/** 
	 * PRIVATE
	 */
	
	this._url = 'http://localhost/forapi/save.php';
	this._get = 'http://localhost/forapi/get.php';
	this._isValid = true;
	this._saveId;
	this._saveRelated;
	this._saveRelatedArray = new Array();
	
	this._$mainInput = $('#' + o + 'MainInput');
	
	this._$enNameInput = $('#' + o + 'EnNameInput');
	this._$bgNameInput = $('#' + o + 'BgNameInput');
	this._$tagInput = $('#' + o + 'TagInput');
	this._$dateInput = $('#' + o + 'DateInput');
	this._$typeSelect = $('#' + o + 'TypeSelect');
	this._$subtypeSelect = $('#' + o + 'SubtypeSelect');
	this._$relatedInput = $('#' + o + 'RelatedInput');
	
	this._$saveIdInput = $('#' + o + 'SaveIdInput');
	this._$saveRelatedInput = $('#' + o + 'SaveRelatedInput');
	
	/** 
	 * PUBLIC
	 */ 

	this.main;
	
	this.enName;
	this.bgName;
	this.tag;
	this.date;
	this.type;
	this.subtype;
	this.related;
	this.object = o;
	
	this.json = {};
}

/** 
 * PRIVATE
 */

Fortag.prototype._updateAfterSave = function(data, target) {
	if (data.saveId) this._$saveIdInput.val(data.saveId).change();
	if (data.saveRelated) this._$saveRelatedInput.val(data.saveRelated.join(',')).change();
	
	/**
	 * If this is create section in window,
	 * add tag and close the dialog.
	 */
	 
	if (target) {
		if (target.dialog.length > 0 && target.target) {
			this.json.en_name = this.json.enName;
			this.json.tag_id = data.saveId;
		
			target.target.tagsinput('add', this.json);
			
			admin.hideSectionInWindow(target.dialog.find('section'));
		}
	}
	
	/**
	 * Always update the dialog.
	 */
	
	admin.updateAllTypeahead();
}

Fortag.prototype._escapeValue = function(data) {
	
	/**
	 * First remove any new lines. 
	 * The spacing between paragraphs is done with styles.
	 */
	 
	var s = data.replace(/\n/g, '');
	
	/**
	 * Next decode to ensure there are no extra coded characters.
	 */
	
	s = he.decode(s);
	
	/**
	 * Finally escape HTML and special characters.
	 * Note encode will also convert Cyrillic characters to HTML entities
	 * and escape will just escape special characters.
	 */
	
	s = he.escape(s);
	
	/**
	 * There is an error if you simple return quoted string.
	 * For this reason we return string object to string.
	 */
	
	return new String(s).toString();
}

Fortag.prototype._unescapeValue = function(data) {
	if (!data) return null;
	if (Number.isInteger(data)) return data;

	return he.unescape(data);
}

/**
 * Associate tag with a form field.
 */
 
Fortag.prototype._setRelatedType = function(itemsArray, subtype) {
	if (!itemsArray) return null;

	var tags = new Array(); 
	
	itemsArray.forEach(function(tag, index, arr) {
		
		/**
		 * These objects in itemsArray are references in memory.
		 * So we need to clone it first and send back the new array.
		 * Otherwise it is a problem, if you have on tag in two fields.
		 * For example the same writer and director.
		 */
		var tempTag = jQuery.extend(true, {}, tag);
	
		tags.push(tempTag);
		tags[tags.length - 1].subtype = subtype;
	});
	
	return tags;
}

Fortag.prototype._setRelatedValueType = function(item, subtype) {
	if (!item) return null;
	
	return new Array({tag_id: item, subtype: subtype});
}

Fortag.prototype._getTypeaheadValue = function(_$input, includeHidden) {
	var includeHidden = includeHidden === false ? false : true,
		hidden = includeHidden ? ':hidden, ' : '';
	
	/**
	 * The input is always hidden, but the label is not.
	 */
	 
	return _$input.length && _$input.parents('label').is(hidden + ':visible') ? 
		   _$input.tagsinput()[0].itemsArray.length <= 0 ? null : 
		   _$input.tagsinput()[0].itemsArray : null;
}

/**
 * @return only values for visible inputs.
 * Note that inputs of type hidden are considered visible, 
 * but read only.
 */

Fortag.prototype._getInputValue = function(_$input, includeHidden) {
	var includeHidden = includeHidden = includeHidden === false ? false : true,
		hidden = includeHidden ? ':hidden, ' : '';

	return _$input.length && _$input.is(hidden + ':visible, [type=hidden]') ?
		   this._escapeValue(_$input.val()) || null : null;
}

Fortag.prototype._setInputValue = function(_$input, data) {
	_$input.length && data ? _$input.val(this._unescapeValue(data)) : null;
	
	_$input.change();
}

Fortag.prototype._setMainImgValue = function(_$input, tag) {
	if (tag) {
		if (!_$input.length) return false;
		
		_$input.parents('.file')
			   .css('background-image', 
					'url(../assets/tags/' + tag + '.jpg');
	} else {
		_$input.parents('.file')
			   .css('background-image', 
					'none');
	}
} 

/**
 * Because all related tags come in one array,
 * we set all tags inputs with a single method.
 * For this simple object there is no choice, but only related.
 */
Fortag.prototype._setTagsinputValue = function(data) {
	var self = this;
	
	if (data) {
		data.forEach(function(tag, index, arr) {
			switch (tag.related_subtype) {
				case 'relation':
				case null:
					if (!self._$relatedInput.length) return false;
					
					self._$relatedInput.tagsinput('add', tag);
					self._saveRelatedArray.push(tag.tag_id);
					
					break;
			}
		});
	}
}

Fortag.prototype._getInputValueAsArray = function(_$input) {
	var s = this._getInputValue(_$input, true);
	
	if (s) return s.split(',');
	
	return s;
}

Fortag.prototype._setInputValueAsString = function(_$input, data) {	
	_$input.val(data.join(',')).change();
}

/**
 * TODO: The final function will not work like this.
 */

Fortag.prototype._uploadMainImg = function() {
	this.main = utils.parseImgIndex($mainInput.val());
}




/** 
 * PUBLIC
 */

Fortag.prototype.save = function() {
	this.enName = this._getInputValue(this._$enNameInput);
	this.bgName = this._getInputValue(this._$bgNameInput);
	this.date = this._getInputValue(this._$dateInput);
	this.tag = this._getInputValue(this._$tagInput);
	this.type = this._getInputValue(this._$typeSelect);
	this.subtype = this._getInputValue(this._$subtypeSelect);
	this.related = this._getTypeaheadValue(this._$relatedInput);
	
	this.related = this._setRelatedType(this.related, 'relation');
	
	this._saveId = this._getInputValue(this._$saveIdInput);
	this._saveRelated = this._getInputValueAsArray(this._$saveRelatedInput);
	
	this.json = {
		enName: this.enName,
		bgName: this.bgName,
		date: this.date,
		tag: this.tag,
		type: this.type,
		subtype: this.subtype,
		object: this.object,
		related: this.related,
		_saveId: this._saveId,
		_saveRelated: this._saveRelated
	};
}

Fortag.prototype.validateTag = function() {
	this._isValid = true;
	
	if (!this.tag) {
		this._isValid = false;
		
		admin.showAlert({message: 'Tаг трябва да е минимум 2 символа.', 
						 status: 'error'});
		
		return false;
	}
}

Fortag.prototype.resetData = function() {
	if (this._$enNameInput.length) this._$enNameInput.val(null);
	if (this._$bgNameInput.length) this._$bgNameInput.val(null);
	if (this._$dateInput.length) this._$dateInput.val(null);
	if (this._$tagInput.length) this._$tagInput.val(null);
	
	
	if (this._$typeSelect.length) this._$typeSelect.val(this._$typeSelect.not('[type=hidden]') ? 
														this._$typeSelect.val() : 
														this._$typeSelect.find('option:first').val());
	if (this._$subtypeSelect.length) this._$subtypeSelect.val(this._$subtypeSelect.not('[type=hidden]') ? 
															  this._$subtypeSelect.val() : 
															  this._$subtypeSelect.find('option:first').val());
	
	if (this._$relatedInput.length) this._$relatedInput.tagsinput('removeAll');
	
	if (this._$saveIdInput.length) this._$saveIdInput.val(null).change();
	if (this._$saveRelatedInput.length) this._$saveRelatedInput.val(null).change();
	
	if (this._$mainInput.length) this._setMainImgValue(this._$mainInput, null);
}

Fortag.prototype.updateData = function(data) {
	this.resetData();

	this._setInputValue(this._$enNameInput, data.en_name || null);
	this._setInputValue(this._$bgNameInput, data.bg_name || null);
	this._setInputValue(this._$dateInput, data.date || null);
	this._setInputValue(this._$tagInput, data.tag || null);
	this._setInputValue(this._$typeSelect, data.type || null);
	this._setInputValue(this._$subtypeSelect, data.subtype || null);
	
	this._setTagsinputValue(data.related || null);
		
	this._setInputValue(this._$saveIdInput, data.tag_id || null);
	this._setInputValueAsString(this._$saveRelatedInput, this._saveRelatedArray);
	
	this._setMainImgValue(this._$mainInput, data.tag || null);
}

Fortag.prototype.setData = function(result) {
	var self = this;
	
	admin.showAlert({message: 'Отварям...', status: 'loading'});

	var get = $.get(this._get + '?tag=' + result.tag + 
								'&object=' + result.object);
						   
	$.when(get).done(function(data) {
		var data = data.length ? JSON.parse(data) : data;
		
		if (!data.events.mysql.connection) {
			admin.showAlert({message: data.events.mysql.error, status: 'error'});
		} else if (!data.events.mysql.result) {
			admin.showAlert({message: data.events.mysql.error, status: 'error'});
		} else {
			self.updateData(data.tags[0]);
			
			admin.hideAlert();
		}	
	}).fail(function(data) {
		console.log(data);
	});					   
}

Fortag.prototype.post = function(target) {
	var self = this
		target = target || false;
	
	/**
	 * The only require field is TAG.
	 * Minimum two characters are required for a tag.
	 * All other can be updated at any time.
	 * TODO: Move all strings to external file.
	 */
	
	this.validateTag();
	
	if (!this._isValid) {
		return false;
	}
	
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
			var s;
			
			switch (data.events.mysql.operation) {
				case 'insert':
					s = 'е записан успешно.';
					
					break;
				case 'update':
					s = 'е обновен успешно.';
					
					break;	
			}
			
			admin.showAlert({message: self.json.object
										  .charAt(0).toUpperCase() + 
									  self.json.object
									  	  .slice(1) + ' ' + s, status: 'success'});
		
			self._updateAfterSave(data.operation, target);
		}
	}).fail(function (data, textStatus, jqXHR) {
		console.log(data);
	});
	
	return true;
}