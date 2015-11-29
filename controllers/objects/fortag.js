function Fortag(o) {
	
	/** 
	 * PRIVATE
	 */
	
	this._url = 'http://localhost/forapi/save.php';
	this._isValid = true;
	
	this._$mainInput = $('#' + o + 'MainInput');
	
	this._$enNameInput = $('#' + o + 'EnNameInput');
	this._$bgNameInput = $('#' + o + 'BgNameInput');
	this._$tagInput = $('#' + o + 'TagInput');
	this._$dateInput = $('#' + o + 'DateInput');
	this._$typeSelect = $('#' + o + 'TypeSelect');
	this._$subtypeSelect = $('#' + o + 'SubtypeSelect');
	this._$relatedInput = $('#' + o + 'RelatedInput');
	
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

Fortag.prototype._getTypeaheadValue = function(_$input) {
	return _$input.length ? 
		   _$input.typeahead()
		   		  .data('tagsinput')
				  .itemsArray.length <= 0 ? null : 
		   _$input.typeahead()
		   		  .data('tagsinput')
				  .itemsArray : null;
}

Fortag.prototype._getInputValue = function(_$input) {
	return _$input.length && _$input.is(':visible') ?
		   _$input.val() || null : null;
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
	
	this.json = {
		enName: this.enName,
		bgName: this.bgName,
		date: this.date,
		tag: this.tag,
		type: this.type,
		subtype: this.subtype,
		object: this.object,
		related: this.related
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