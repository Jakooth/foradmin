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

	/**
	 * The problem is tags input data will not give tags in order.
	 * We need the first one to set the url.
	 */
	 
	var $tags = this._$tagsInput.parents('label').find('.tag');
	
	if ($tags.length <= 0) return false;
	
	if ($tags.length > 0) {
		this.prime = $tags.eq(0).data().item;
	}
	
	/**
	 * Now preview the URL.
	 */
	
	var s = this._getInputValue(this._$previewInput);
	
	if (!s) s = '';
	
	s = s.slice(0, 128);
	s = s.slice(0, s.lastIndexOf('-'));
	
	this.url = utils.formatTag(s);
	
	this._$urlInput.val(this.url).change();
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
	 
	if (!this._getTypeaheadValue(this._$tagsInput)) {
		this._isValid = false;
		
		admin.showAlert({message: 'Изберете герой или персона.', 
						 status: 'error'});
		
		return false;
	}
	
	if (!this._getTypeaheadValue(this._$tagsInput)[0].en_name) {
		this._isValid = false;
		
		admin.showAlert({message: 'Избераният герой или персона няма име на латинца.', 
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
	this.title = this._getTypeaheadValue(this._$tagsInput)[0].en_name;
	this.date = new Date(utils.today() + ' ' + utils.now());
	this.shot = this._getTypeaheadValue(this._$tagsInput)[0].tag + '.' + 
				this._getTypeaheadValue(this._$tagsInput)[0].img;
	
	this.json.title = this.title;
	this.json.date = this.date;
	this.json.shot = this.shot;
}

Quote.prototype.resetData = function(isUpdate) {
	Aside.prototype.resetData.call(this, isUpdate);

	if (this._$previewInput.length) this._$previewInput.val(null);
	if (this._$urlInput.length) this._$urlInput.val(null).change();
}

Quote.prototype.updateData = function(data) {
	Aside.prototype.updateData.call(this, data);
	
	this._setInputValue(this._$previewInput, data.preview || null);							
}