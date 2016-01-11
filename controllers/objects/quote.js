function Quote(o) {
	Aside.call(this, o);
	
	this._$previewInput = $('#' + this._o + 'PreviewInput');
	this._$urlInput = $('#' + this._o + 'UrlInput');
}

Quote.prototype = Object.create(Aside.prototype);
Quote.prototype.constructor = Quote;




/** 
 * PRIVATE
 */

Quote.prototype._getPreviewText = function() {	
	return this._getInputValue(this._$previewInput);
}

Quote.prototype._getLayouts = function() {
	return null;
}

Quote.prototype._resetLayouts = function() {
	return null;
}

Quote.prototype._setPrimeAndUrl = function() {
	this.url = this._getInputValue(this._$urlInput);
}



/** 
 * PUBLIC
 */

Quote.prototype.validateContent = function() {
	this._isValid = true;
	
	/**
	 * TODO: Validate length match the the varchar field im the DB.
	 * Note DB will throw error anyway.
	 */
	 
	if (!this.title) {
		this._isValid = false;
		
		admin.showAlert({message: 'Напишете герой.', 
						 status: 'error'});
		
		return false;
	}
	
	if (!this.subtitle) {
		this._isValid = false;
		
		admin.showAlert({message: 'Напишете заглавие.', 
						 status: 'error'});
		
		return false;
	}
	
	if (!this.subtype) {
		this._isValid = false;
		
		admin.showAlert({message: 'Невалиден подтип. Питай бат Ваньо.', 
						 status: 'error'});
		
		return false;
	}
	
	if (!this.url) {
		this._isValid = false;
		
		admin.showAlert({message: 'Невалиден адрес на статията. Питай бат Ваньо.', 
						 status: 'error'});
		
		return false;
	}
}

Quote.prototype.validatePublishSettings = function() {
	this._isValid = true;
}

Quote.prototype.validateBestPractices = function() {
	this._isValid = true;
}

Quote.prototype.publish = function() {
	this.date = new Date(utils.today() + ' ' + utils.now());
	this.shot = utils.formatTag(this._$titleInput.val()) + '.jpg';
	
	this.json.date = this.date;
	this.json.shot = this.shot;
}

Quote.prototype.resetData = function(isUpdate) {
	Aside.prototype.resetData.call(this, isUpdate);

	if (this._$previewInput.length) this._$previewInput.val(null);
}

Quote.prototype.updateData = function(data) {
	Aside.prototype.updateData.call(this, data);
	
	this._setInputValue(this._$previewInput, data.preview || null);							
}