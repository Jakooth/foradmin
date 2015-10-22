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

Sticker.prototype.validateTag = function() { 
	Fortag.prototype.validateTag.call(this);
	
	if (!this._$mainInput.prop('files').length == 1) {
		this._isValid = false;
		
		admin.showAlert({message: 'Трябва да изберете стикер.', 
						 status: 'error'});
		
		return false;
	}
	
	if (!this._$mainInput.prop('files')[0].type.match('image.svg')) {
		this._isValid = false;
		
		admin.showAlert({message: 'Стикера трябва да е в SVG формат.', 
						 status: 'error'});
		
		return false;
	}
	
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