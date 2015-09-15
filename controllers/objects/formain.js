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

Formain.prototype.save = function() { 
	Fortag.prototype.save.call(this);
	
	this.stickers = this._$stickersInput.length ? 
				   	this._$stickersInput.typeahead()
				   					   	.data('tagsinput')
									   	.itemsArray : null;
	
	this.serie = this._$serieInput.length ? 
				 this._$serieInput.typeahead()
				   				  .data('tagsinput')
								  .itemsArray : null;
	
	/**
	 * TODO: In fact we need the genre id.
	 */
	
	this.genres = this._$genreGroup.find(':checked').map(function (i, element) {
		return {value: $(element).val(), 
				text: $(element).parents('label').find('span').text()};
	}).get();
	
	this.similar = this._$similarInput.length ? 
				   this._$similarInput.typeahead()
				   					  .data('tagsinput')
									  .itemsArray : null;
									  
	this.country = this._$countryInput.length ? 
				   this._$countryInput.val() : null;
			   
	this.json.stickers = this.stickers;
	this.json.serie = this.serie;
	this.json.genres = this.genres;
	this.json.similar = this.similar;
	this.json.country = this.country;
}