function Sticker(o) {
	Fortag.call(this, o);
	
	/** 
	 * PRIVATE
	 */
	
	this._url = 'http://localhost/forapi/save_sticker.php';
	
	this._$libInput = $('#' + o + 'LibInput');
	
	/** 
	 * PUBLIC
	 */
	
	this.lib;
}

Sticker.prototype = Object.create(Fortag.prototype);
Sticker.prototype.constructor = Sticker;

Sticker.prototype.save = function() { 
	Fortag.prototype.save.call(this);
	
	this.lib = this._getInputValue(this._$libInput);
	
	this.json.lib = this.lib;
}

Sticker.prototype.resetData = function() {
	Fortag.prototype.resetData.call(this);
	
	if (this._$libInput.length) this._$libInput.val(null);
}

Sticker.prototype.updateData = function(data) {
	Fortag.prototype.updateData.call(this, data);

	this._setInputValue(this._$libInput, data.lib || null);
}

Sticker.prototype.validateTag = function() { 
	Fortag.prototype.validateTag.call(this);
	
	if (!this.enName) {
		this._isValid = false;
		
		admin.showAlert({message: 'Стикер трябва да е минимум 2 символа.', 
						 status: 'error'});
		
		return false;
	}
	
	if (!this.lib) {
		this._isValid = false;
		
		admin.showAlert({message: 'Трябва да бъде избрана библиотека.', 
						 status: 'error'});
		
		return false;
	}
	
	if (!this.subtype) {
		this._isValid = false;
		
		admin.showAlert({message: 'Трябва да бъде избран подтип.', 
						 status: 'error'});
		
		return false;
	}
}