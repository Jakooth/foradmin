function Movie(o) {

	/** 
	 * CONSTRUCTOR
	 */

	var o = $('#fortag').is(':visible') ? 'fortag' : o;
	
	Formain.call(this, o);
	
	/** 
	 * PRIVATE
	 */
	
	this._$castInput = $('#' + o + 'CastInput');
	this._$directorInput = $('#' + o + 'DirectorInput');
	this._$writerInput = $('#' + o + 'WriterInput');
	this._$cameraInput = $('#' + o + 'CameraInput');
	this._$musicInput = $('#' + o + 'MusicInput');
	this._$worldDateInput = $('#' + o + 'WorldDateInput');
	this._$timeInput = $('#' + o + 'TimeInput');
	
	/** 
	 * PUBLIC
	 */

	this.cast;
	this.director;
	this.writer;
	this.camera;
	this.music;
	this.worldDate;
	this.time;
}

Movie.prototype = Object.create(Formain.prototype);
Movie.prototype.constructor = Movie;

/** 
 * PRIVATE
 */

Movie.prototype._setTagsinputValue = function(data) {
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
				case 'director':
					if (!self._$directorInput.length) return false;
					
					self._$directorInput.tagsinput('add', tag);
					self._saveRelatedArray.push(tag.tag_id);
					
					break;
				case 'writer':
					if (!self._$writerInput.length) return false;
					
					self._$writerInput.tagsinput('add', tag);
					self._saveRelatedArray.push(tag.tag_id);
					
					break;
				case 'camera':
					if (!self._$cameraInput.length) return false;
					
					self._$cameraInput.tagsinput('add', tag);
					self._saveRelatedArray.push(tag.tag_id);
					
					break;
				case 'music':
					if (!self._$musicInput.length) return false;
					
					self._$musicInput.tagsinput('add', tag);
					self._saveRelatedArray.push(tag.tag_id);
					
					break;	
			}
		});
	}
}

/** 
 * PUBLIC
 */
 
Movie.prototype.save = function() { 
	Formain.prototype.save.call(this);
	
	this.cast = this._getTypeaheadValue(this._$castInput);							
	this.director = this._getTypeaheadValue(this._$directorInput);
	this.writer = this._getTypeaheadValue(this._$writerInput);
	this.camera = this._getTypeaheadValue(this._$cameraInput);
	this.music = this._getTypeaheadValue(this._$musicInput);  
	this.worldDate = this._getInputValue(this._$worldDateInput);
	this.time = this._getInputValue(this._$timeInput);
	
	this.cast = this._setRelatedType(this.cast, 'cast');
	this.director = this._setRelatedType(this.director, 'director');
	this.writer = this._setRelatedType(this.writer, 'writer');
	this.camera = this._setRelatedType(this.camera, 'camera');
	this.music = this._setRelatedType(this.music, 'music');
	
	this.json.cast = this.cast;
	this.json.director = this.director;
	this.json.writer = this.writer;
	this.json.camera = this.camera;
	this.json.music = this.music;
	this.json.worldDate = this.worldDate;
	this.json.time = this.time;
	
	/**
	 * Override in case of null values.
	 * Very rare case, but just in case.
	 */ 
	this.json.type = 'movies';
}

Movie.prototype.resetData = function() {
	Formain.prototype.resetData.call(this);
	
	if (this._$worldDateInput.length) this._$worldDateInput.val(null);
	if (this._$timeInput.length) this._$timeInput.val(null);
	if (this._$castInput.length) this._$castInput.tagsinput('removeAll');
	if (this._$directorInput.length) this._$directorInput.tagsinput('removeAll');
	if (this._$writerInput.length) this._$writerInput.tagsinput('removeAll');
	if (this._$cameraInput.length) this._$cameraInput.tagsinput('removeAll');
	if (this._$musicInput.length) this._$musicInput.tagsinput('removeAll');
}

Movie.prototype.updateData = function(data) {
	Formain.prototype.updateData.call(this, data);

	this._setInputValue(this._$worldDateInput, data.world_date || null);
	this._setInputValue(this._$timeInput, data.time || null);
}
