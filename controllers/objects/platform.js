function Platform(o) {
	Fortag.call(this, o);
	
	/** 
	 * PRIVATE
	 */
	
	this._url = '/forapi/save_platform.php';
}

Platform.prototype = Object.create(Fortag.prototype);
Platform.prototype.constructor = Platform;

Platform.prototype.validateTag = function() { 
	Fortag.prototype.validateTag.call(this);
	
	if (!this.enName) {
		this._isValid = false;
		
		admin.showAlert({message: 'Платформа трябва да е минимум 2 символа.', 
						 status: 'error'});
		
		return false;
	}
}