function Fortag(o) {
	
	/** 
	 * PRIVATE
	 */
	
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

Fortag.prototype.save = function() {	
	this.enName = this._$enNameInput.val();
	this.bgName = this._$bgNameInput.val();
	this.date = this._$dateInput.val() || null;
	this.tag = this._$tagInput.val();
	this.type = this._$typeSelect.val();
	this.subtype = this._$subtypeSelect.val() || null;
	this.related = this._$relatedInput.length ? 
				   this._$relatedInput.typeahead()
				   					  .data('tagsinput')
									  .itemsArray : null;
	
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

Fortag.prototype.post = function() {
	var self = this;
	
	/**
	 * The only require field is TAG.
	 * Minimum two characters are required for a tag.
	 * All other can be updated at any time.
	 * TODO: Move all stringa to external file.
	 */
	 
	if (this.tag.length < 2) {
		admin.showAlert({message: 'Tаг трябва да е минимум 2 символа.', 
						 status: 'error'});
		
		return false;
	}
	
	admin.showAlert({message: 'Записвам...', status: 'loading'});
	
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8",
		url: 'http://localhost/forapi/save.php?',
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