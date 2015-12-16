function Formain(o) {
	Fortag.call(this, o);
	
	/** 
	 * PRIVATE
	 */
	
	this._$stickersInput = $('#' + o + 'StickersInput');
	this._$serieInput = $('#' + o + 'SerieInput');
	this._$genreGroup = $('#' + o + 'GenreGroup');
	this._$countrySelect = $('#' + o + 'CountrySelect');
	
	/** 
	 * PUBLIC
	 */

	this.stickers;
	this.serie;
	this.genres;
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

Formain.prototype._setGroupValue = function(_$input, data) {

}

/** 
 * PUBLIC
 */

Formain.prototype.save = function() { 
	Fortag.prototype.save.call(this);
	
	this.stickers = this._getTypeaheadValue(this._$stickersInput);	
	this.serie = this._getTypeaheadValue(this._$serieInput);
	this.genres  =  this._getGroupValue(this._$genreGroup);
	this.country = this._getInputValue(this._$countrySelect);
	
	this._setRelatedType(this.serie, 'serie');
			   
	this.json.stickers = this.stickers;
	this.json.serie = this.serie;
	this.json.genres = this.genres;
	this.json.country = this.country;
}

Formain.prototype.updateData = function(data) {
	Fortag.prototype.updateData.call(this, data);
	
	this._setInputValue(this._$countrySelect, data.country || null);
	this._setTagsinputValue(this._$serieInput, data.serie || null);
	this._setTagsinputValue(this._$stickersInput, data.stickers || null);
	this._setGroupValue(this._$genreGroup, data.genres || null)
}