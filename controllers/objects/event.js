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

Happening.prototype.save = function() { 
	Formain.prototype.save.call(this);
	
	this.artists = this._getTypeaheadValue(this._$artistInput);
	this.endDate = this._getInputValue(this._$endDateInput);
	this.city = this._getInputValue(this._$cityInput);
	
	this.json.artists = this.artists;
	this.json.endDate = this.endDate;
	this.json.city = this.city;
}
