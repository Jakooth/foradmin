function Formain(o) {
	Fortag.call(this, o);
	
	/** 
	 * PRIVATE
	 */
	
	this._$stickersInput = $('#' + o + 'StickersInput');
	this._$serieInput = $('#' + o + 'SerieInput');
	this._$genreGroup = $('#' + o + 'GenreGroup');
	this._$similarInput = $('#' + o + 'SimilarInput');
	this._$countryInput = $('#' + o + 'CountryInput');
	
	/** 
	 * PUBLIC
	 */

	this.stickers;
	this.serie;
	this.genres;
	this.similar;
	this.country;
};

Formain.prototype = Object.create(Fortag.prototype);
Formain.prototype.constructor = Formain;

/** 
 * PRIVATE
 */
 
/**
 * TODO: In fact we need the genre id.
 */ 

Formain.prototype._getGroupValue = function(_$input) {
	return _$input.find(':checked').map(function (i, element) {
		return {value: $(element).val(), 
				text: $(element).parents('label').find('span').text()};
	}).get();
}

/** 
 * PUBLIC
 */

Formain.prototype.save = function() { 
	Fortag.prototype.save.call(this);
	
	this.stickers = this._getTypeaheadValue(this._$stickersInput);	
	this.serie = this._getTypeaheadValue(this._$serieInput);
	this.genres  =  this._getGroupValue(this._$genreGroup);
	this.similar = this._getTypeaheadValue(this._$similarInput);
	this.country = this._getInputValue(this._$countryInput);
			   
	this.json.stickers = this.stickers;
	this.json.serie = this.serie;
	this.json.genres = this.genres;
	this.json.similar = this.similar;
	this.json.country = this.country;
}