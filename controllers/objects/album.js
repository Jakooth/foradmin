function Album(o) {
			
	/** 
	 * CONSTRUCTOR
	 */

	var o = $('#fortag').is(':visible') ? 'fortag' : o;
	
	Formain.call(this, o);
	
	/** 
	 * PRIVATE
	 */
	 
	this._saveTracks;
	this._saveTracksArray = new Array();
	
	this._$artistInput = $('#' + o + 'ArtistInput');
	this._$trackInput = $('#album .Tracklist .track');
	
	this._$saveTracksInput = $('#' + o + 'SaveTracksInput');
	
	/** 
	 * PUBLIC
	 */
	 
	this.artists;
	this.tracks;
}

Album.prototype = Object.create(Formain.prototype);
Album.prototype.constructor = Album;

/** 
 * PRIVATE
 */
 
Album.prototype._updateAfterSave = function(data, target) {
	Formain.prototype._updateAfterSave.call(this, data, target);
	
	if (data.saveTracks) this._$saveTracksInput.val(data.saveTracks.join(',')).change();
} 

Album.prototype._setTagsinputValue = function(data) {
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

Album.prototype._getTracksValue = function(_$input) {
	return _$input.map(function (i, element) {
		return {order: i + 1,
				name: $(element).find('input:eq(0)').val(),  
				video: $(element).find('input:eq(1)').val()};
	}).get();
}

Album.prototype._setTracksValue = function(tracks) {
	var self = this;

	if (tracks) {
		tracks.forEach(function(tag, index, arr) {
			add.addTrack($('#album .Tracklist button.add'), tag);
			
			self._saveTracksArray.push(tag.track_id);
		});
	}
}

/** 
 * PUBLIC
 */
 
Album.prototype.save = function() { 
	Formain.prototype.save.call(this);
	
	this.artists = this._getTypeaheadValue(this._$artistInput);
	this.tracks = this._getTracksValue(this._$trackInput);
	
	this.artists = this._setRelatedType(this.artists, 'artist');
	
	this._saveTracks = this._getInputValueAsArray(this._$saveTracksInput);
	
	this.json.artists = this.artists;
	this.json.tracks = this.tracks;
	this.json._saveTracks = this._saveTracks;
	
	/**
	 * Override in case of null values.
	 * Very rare case, but just in case.
	 */ 
	 
	this.json.type = 'music';
}

Album.prototype.resetData = function() {
	Formain.prototype.resetData.call(this);
	
	if (this._$saveTracksInput.length) this._$saveTracksInput.val(null);
	if (this._$artistInput.length) this._$artistInput.tagsinput('removeAll');
								   this._$trackInput.remove();
								   this._saveTracksArray = new Array();
}

Album.prototype.updateData = function(data) {
	Formain.prototype.updateData.call(this, data);
	
	this._setTracksValue(data.tracks || null);
	
	this._setInputValueAsString(this._$saveTracksInput, this._saveTracksArray);
}
