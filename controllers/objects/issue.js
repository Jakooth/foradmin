function Issue(o) {
	Fortag.call(this, o);
	
	/** 
	 * PRIVATE
	 */
	
	this._url = '/forapi/forsecure/save_issue.php';
}

Issue.prototype = Object.create(Fortag.prototype);
Issue.prototype.constructor = Issue;

Issue.prototype.validateTag = function() { 
	this._isValid = true;
	
	if (!this.bgName) {
		this._isValid = false;
		
		admin.showAlert({message: 'Брой трябва да е минимум 2 символа.', 
						 status: 'error'});
		
		return false;
	}
	
	if (!this.tag) {
		this._isValid = false;
		
		admin.showAlert({message: 'Въведете уникален номер на броя.', 
						 status: 'error'});
		
		return false;
	}
}