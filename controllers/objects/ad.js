function Ad(o) {
	Aside.call(this, o);
}

Ad.prototype = Object.create(Aside.prototype);
Ad.prototype.constructor = Ad;




/** 
 * PRIVATE
 */

Quote.prototype._getPreviewText = function() {	
	return null;
}

Quote.prototype._getLayouts = function() {
	return null;
}

Quote.prototype._resetLayouts = function() {
	return null;
}

Quote.prototype._setPrimeAndUrl = function() {
	return null;
}



/** 
 * PUBLIC
 */

Quote.prototype.validateContent = function() {
	this._isValid = true;
}

Quote.prototype.validatePublishSettings = function() {
	this._isValid = true;
}

Quote.prototype.validateBestPractices = function() {
	this._isValid = true;
}

Quote.prototype.publish = function() {

}

Quote.prototype.resetData = function(isUpdate) {

}

Quote.prototype.updateData = function(data) {
					
}