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
  
Formain.prototype._setTagsinputValue = function(data) {
	Fortag.prototype._setTagsinputValue.call(this, data);
	
	var self = this;
	
	if (data) {
		data.forEach(function(tag, index, arr) {
			switch (tag.related_subtype) {
				case 'serie':
					if (!self._$serieInput.length) return false;
					
					self._$serieInput.tagsinput('add', tag);
					self._saveRelatedArray.push(tag.tag_id);
					
					break;
				case 'sticker':
					if (!self._$stickersInput.length) return false;
					
					self._$stickersInput.tagsinput('add', tag);
					self._saveRelatedArray.push(tag.tag_id);
					
					break;
				case 'genre':
					if (!self._$genreGroup.length) return false;
					
					self._$genreGroup.find('[data-id=' + tag.genre_id + ']').prop('checked', true);
					self._saveRelatedArray.push(tag.genre_id);
					
					break;
				case 'country':
					if (!self._$countrySelect.length) return false;
					
					self._$countrySelect.val(tag.country_id);
					self._saveRelatedArray.push(tag.country_id);
					
					break;	
			}
		});
	}
} 

Formain.prototype._getGroupValue = function(_$input) {
	return _$input.find(':checked').map(function (i, element) {
		return {tag: $(element).val(), 
				name: $(element).parents('label').find('span').text(),
				tag_id: $(element).data('id')};
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
	this.country = this._getInputValue(this._$countrySelect);
	
	this.serie = this._setRelatedType(this.serie, 'serie');
	this.stickers = this._setRelatedType(this.stickers, 'sticker');
	this.genres = this._setRelatedType(this.genres, 'genre');
	
	this.country = this._setRelatedValueType(this.country, 'country');
			   
	this.json.stickers = this.stickers;
	this.json.serie = this.serie;
	this.json.genres = this.genres;
	this.json.country = this.country;
}

Formain.prototype.resetData = function() {
	Fortag.prototype.resetData.call(this);
	
	if (this._$serieInput.length) this._$serieInput.tagsinput('removeAll');
	if (this._$stickersInput.length) this._$stickersInput.tagsinput('removeAll');
	if (this._$genreGroup.length) this._$genreGroup.find('[type=checkbox]').prop('checked', false);
	if (this._$countrySelect.length) this._$countrySelect.val(this._$countrySelect.find('option:first').val());
}