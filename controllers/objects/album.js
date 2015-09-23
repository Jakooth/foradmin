function Album(o) {
	Formain.call(this, o);
	
	/** 
	 * PRIVATE
	 */
	
	this._$artistInput = $('#' + o + 'ArtistInput');
	this._$trackInput = $('#album .Track .track');
	
	/** 
	 * PUBLIC
	 */
	 
	this.artists;
	this.tracks;
}

Album.prototype = Object.create(Formain.prototype);
Album.prototype.constructor = Album;

Album.prototype.save = function() { 
	Formain.prototype.save.call(this);
	
	this.artists = this._getTypeaheadValue(this._$artistInput);
	this.tracks = this._getTracksValue(this._$trackInput);
	
	this.json.artists = this.artists;
	this.json.tracks = this.tracks;
}

Album.prototype._getTracksValue = function(_$input) {
	return _$input.map(function (i, element) {
		return {order: i + 1,
				name: $(element).find('input:eq(0)').val(),  
				video: $(element).find('input:eq(1)').val()};
	}).get();
}
