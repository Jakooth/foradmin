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

Book.prototype.save = function() { 
	Formain.prototype.save.call(this);
	
	this.author = this._getTypeaheadValue(this._$authorInput);
	this.translator = this._getTypeaheadValue(this._$translatorInput);
	
	this.json.author = this.author;
	this.json.translator = this.translator;
}
