function Happening(o) {
	Formain.call(this, o);
	
	/** 
	 * PRIVATE
	 */
	
	this._$artistInput = $('#' + o + 'ArtistInput');
	this._$endDateInput = $('#' + o + 'EndDateInput');
	this._$cityInput = $('#' + o + 'CityInput');
	
	/** 
	 * PUBLIC
	 */
	 
	this.artists;
	this.endDate;
	this.city;
}

Happening.prototype = Object.create(Formain.prototype);
Happening.prototype.constructor = Happening;

/** 
 * PRIVATE
 */

Happening.prototype._setTagsinputValue = function(data) {
	Formain.prototype._setTagsinputValue.call(this, data);
	
	var self = this;
	
	if (data) {
		data.forEach(function(tag, index, arr) {
			switch (tag.related_subtype) {
				case 'artist':
					if (!self._$artistInput.length) return false;
					
					self._$artistInput.tagsinput('add', tag);
					self._saveRelatedArray.push(tag.tag_id);
					
					break;
			}
		});
	}
}

/** 
 * PUBLIC
 */

Happening.prototype.save = function() { 
	Formain.prototype.save.call(this);
	
	this.artists = this._getTypeaheadValue(this._$artistInput);
	this.endDate = this._getInputValue(this._$endDateInput);
	this.city = this._getInputValue(this._$cityInput);
	
	this.artists = this._setRelatedType(this.artists, 'artist');
	
	this.json.artists = this.artists;
	this.json.endDate = this.endDate;
	this.json.city = this.city;
	
	/**
	 * Override in case of null values.
	 * Very rare case, but just in case.
	 */ 
	this.json.type = 'music';
}

Happening.prototype.resetData = function() {
	Formain.prototype.resetData.call(this);
	
	if (this._$endDateInput.length) this._$endDateInput.val(null);
	if (this._$cityInput.length) this._$cityInput.val(null);
	if (this._$artistInput.length) this._$artistInput.tagsinput('removeAll');
}

Happening.prototype.updateData = function(data) {
	Formain.prototype.updateData.call(this, data);
	
	this._setInputValue(this._$endDateInput, data.end_date || null);
	this._setInputValue(this._$cityInput, data.city || null);
}
