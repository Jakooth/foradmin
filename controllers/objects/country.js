function Country(o) {
	Fortag.call(this, o);
	
	/** 
	 * PRIVATE
	 */
	
	this._url = 'http://localhost/forapi/save_country.php';
}

Country.prototype = Object.create(Fortag.prototype);
Country.prototype.constructor = Country;

Country.prototype.validateTag = function() { 
	Fortag.prototype.validateTag.call(this);
	
	if (!this.bgName) {
		this._isValid = false;
		
		admin.showAlert({message: 'Държава трябва да е минимум 2 символа.', 
						 status: 'error'});
		
		return false;
	}
}