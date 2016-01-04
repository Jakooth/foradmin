function Book(o) {
	Formain.call(this, o);
	
	/** 
	 * PRIVATE
	 */
	
	this._$authorInput = $('#' + o + 'AuthorInput');
	this._$translatorInput = $('#' + o + 'TranslatorInput');
	
	/** 
	 * PUBLIC
	 */
	 
	this.author;
	this.translator;
}

Book.prototype = Object.create(Formain.prototype);
Book.prototype.constructor = Book;

/** 
 * PRIVATE
 */

Book.prototype._setTagsinputValue = function(data) {
	Formain.prototype._setTagsinputValue.call(this, data);
	
	var self = this;
	
	if (data) {
		data.forEach(function(tag, index, arr) {
			switch (tag.related_subtype) {
				case 'author':
					if (!self._$authorInput.length) return false;
					
					self._$authorInput.tagsinput('add', tag);
					self._saveRelatedArray.push(tag.tag_id);
					
					break;
				case 'translator':
					if (!self._$translatorInput.length) return false;
					
					self._$translatorInput.tagsinput('add', tag);
					self._saveRelatedArray.push(tag.tag_id);
					
					break;
			}
		});
	}
}

/** 
 * PUBLIC
 */
 
Book.prototype.save = function() { 
	Formain.prototype.save.call(this);
	
	this.author = this._getTypeaheadValue(this._$authorInput);
	this.translator = this._getTypeaheadValue(this._$translatorInput);
	
	this.author = this._setRelatedType(this.author, 'author');
	this.translator = this._setRelatedType(this.translator, 'translator');
	
	this.json.author = this.author;
	this.json.translator = this.translator;
	
	/**
	 * Override in case of null values.
	 * Very rare case, but just in case.
	 */ 
	this.json.type = 'books';
}

Book.prototype.resetData = function() {
	Formain.prototype.resetData.call(this);
	
	if (this._$authorInput.length) this._$authorInput.tagsinput('removeAll');
	if (this._$translatorInput.length) this._$translatorInput.tagsinput('removeAll');
}
