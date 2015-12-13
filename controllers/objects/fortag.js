function Fortag(o) {
	
	/** 
	 * PRIVATE
	 */
	
	this._url = 'http://localhost/forapi/save.php';
	this._get = 'http://localhost/forapi/get.php';
	this._isValid = true;
	this._saveId;
	this._saveRelated;
	
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

Fortag.prototype._updateAfterSave = function(data) {
	this._$saveIdInput.val(data.saveId).change();
	this._$saveRelatedInput.val(data.saveRelated.join(',')).change();	
}

Fortag.prototype._escapeValue = function(data) {
	
	/**
	 * First remove any new lines. 
	 * The spacing betweem paragrpahs is done with styles.
	 */
	 
	var s = data.replace(/\n/g, '');
	
	/**
	 * Next decode to ensure there are no extre coded characters.
	 */
	
	s = he.decode(s);
	
	/**
	 * Finaly escape HTML and special characters.
	 * Note ecode will also conver cyrilic characters to HTML entities
	 * and escape will just escape special characters.
	 */
	
	s = he.escape(s);
	
	/**
	 * There is an error if you simple return quoted string.
	 * For this reason we return string object to string.
	 */
	
	return new String(s).toString();
}

Fortag.prototype._getTypeaheadValue = function(_$input) {
	return _$input.length ? 
		   _$input.typeahead()
		   		  .data('tagsinput')
				  .itemsArray.length <= 0 ? null : 
		   _$input.typeahead()
		   		  .data('tagsinput')
				  .itemsArray : null;
}

/**
 * @return only valuse for visible inputs.
 * Note that inputs of type hidden are considered visible, 
 * but read only.
 */

Fortag.prototype._getInputValue = function(_$input) {
	return _$input.length && _$input.is(':visible, [type=hidden]') ?
		   this._escapeValue(_$input.val()) || null : null;
}

Fortag.prototype._getInputValueAsArray = function(_$input) {
	var s = this._getInputValue(_$input);
	
	if (s) return s.split(',');
	
	return s;
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

/**
 * TODO: The final function will not work like this.
 */

Fortag.prototype.uploadMainImage = function() {
	this.main = utils.parseImgIndex($mainInput.val());
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
}

Fortag.prototype.setData = function(data) {
	var get = $.get(this._get + '?tag=' + data.tag + 
								'&object=' + data.object);
						   
	$.when(get).done(function(data) {
		console.log(data);
	}).fail(function(data) {
		console.log(data);
	});					   
}

Fortag.prototype.post = function() {
	var self = this;
	
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
		
			self._updateAfterSave(data.operation);
		}
	}).fail(function (data, textStatus, jqXHR) {
		console.log(data);
	});
	
	return true;
}