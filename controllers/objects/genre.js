function Genre(o) {
	Fortag.call(this, o);
	
	/** 
	 * PRIVATE
	 */
	
	this._url = 'http://localhost/forapi/save_genre.php';
}

Genre.prototype = Object.create(Fortag.prototype);
Genre.prototype.constructor = Genre;

Genre.prototype.validateTag = function() { 
	Fortag.prototype.validateTag.call(this);
	
	if (!this.bgName) {
		this._isValid = false;
		
		admin.showAlert({message: 'Жанр трябва да е минимум 2 символа.', 
						 status: 'error'});
		
		return false;
	}
}