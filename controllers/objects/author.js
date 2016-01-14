function Author(o) {
	Fortag.call(this, o);
	
	/** 
	 * PRIVATE
	 */
	
	this._url = 'http://localhost/forapi/save_author.php';
}

Author.prototype = Object.create(Fortag.prototype);
Author.prototype.constructor = Author;

Author.prototype.validateTag = function() { 
	Fortag.prototype.validateTag.call(this);
	
	if (!this.enName) {
		this._isValid = false;
		
		admin.showAlert({message: 'Автор трябва да е минимум 2 символа.', 
						 status: 'error'});
		
		return false;
	}
}