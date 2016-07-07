function Tv(o) {

	/** 
	 * CONSTRUCTOR
	 */

	var o = $('#fortag').is(':visible') ? 'fortag' : o;
	
	Formain.call(this, o);
	
	/** 
	 * PRIVATE
	 */
	
	this._$castInput = $('#' + o + 'CastInput');
	this._$starsInput = $('#' + o + 'StarsInput');
	this._$charactersInput = $('#' + o + 'CharactersInput');
	this._$seasonsInput = $('#' + o + 'SeasonsInput');
	this._$endDateInput = $('#' + o + 'EndDateInput');
	this._$awardsInput = $('#' + o + 'AwardsInput');
	
	/** 
	 * PUBLIC
	 */

	this.cast;
	this.stars;
	this.characters;
	this.seasons;
	this.endDate;
	this.awards;
}

Tv.prototype = Object.create(Formain.prototype);
Tv.prototype.constructor = Tv;

/** 
 * PRIVATE
 */

Tv.prototype._setTagsinputValue = function(data) {
	Formain.prototype._setTagsinputValue.call(this, data);
	
	var self = this;
	
	if (data) {
		data.forEach(function(tag, index, arr) {
			switch (tag.related_subtype) {
				case 'cast':
					if (!self._$castInput.length) return false;
					
					self._$castInput.tagsinput('add', tag);
					self._saveRelatedArray.push(tag.tag_id);
					
					break;
				case 'star':
					if (!self._$starsInput.length) return false;
					
					self._$starsInput.tagsinput('add', tag);
					self._saveRelatedArray.push(tag.tag_id);
					
					break;
				case 'character':
					if (!self._$charactersInput.length) return false;
					
					self._$charactersInput.tagsinput('add', tag);
					self._saveRelatedArray.push(tag.tag_id);
					
					break;
			}
		});
	}
}

/** 
 * PUBLIC
 */
 
Tv.prototype.save = function() { 
	Formain.prototype.save.call(this);
	
	this.cast = this._getTypeaheadValue(this._$castInput);							
	this.stars = this._getTypeaheadValue(this._$starsInput);
	this.characters = this._getTypeaheadValue(this._$charactersInput);
	this.endDate = this._getInputValue(this._$endDateInput);
	this.seasons = this._getInputValue(this._$seasonsInput);
	this.awards = this._getInputValue(this._$awardsInput);
	
	this.cast = this._setRelatedType(this.cast, 'cast');
	this.stars = this._setRelatedType(this.stars, 'star');
	this.characters = this._setRelatedType(this.characters, 'character');
	
	this.json.cast = this.cast;
	this.json.stars = this.stars;
	this.json.characters = this.characters;
	this.json.endDate = this.endDate;
	this.json.seasons = this.seasons;
	this.json.awards = this.awards;
	
	/**
	 * Override in case of null values.
	 * Very rare case, but just in case.
	 */ 
	this.json.type = 'movies';
}

Tv.prototype.resetData = function() {
	Formain.prototype.resetData.call(this);
	
	if (this._$endDateInput.length) this._$endDateInput.val(null);
	if (this._$seasonsInput.length) this._$seasonsInput.val(null);
	if (this._$awardsInput.length) this._$awardsInput.val(null);
	if (this._$castInput.length) this._$castInput.tagsinput('removeAll');
	if (this._$starsInput.length) this._$starsInput.tagsinput('removeAll');
	if (this._$charactersInput.length) this._$charactersInput.tagsinput('removeAll');
}

Tv.prototype.updateData = function(data) {
	Formain.prototype.updateData.call(this, data);

	this._setInputValue(this._$endDateInput, data.end_date || null);
	this._setInputValue(this._$seasonsInput, data.seasons || null);
	this._setInputValue(this._$awardsInput, data.awards || null);
}
