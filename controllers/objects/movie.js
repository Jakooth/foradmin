function Movie(o) {
	Formain.call(this, o);
	
	/** 
	 * PRIVATE
	 */
	
	this._$posterInput = $('#' + o + 'PosterInput');
	
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
	 
	this.poster; 

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

Movie.prototype.save = function() { 
	Formain.prototype.save.call(this);
	
	this.cast = this._getTypeaheadValue(this._$castInput);							
	this.director = this._getTypeaheadValue(this._$directorInput);
	this.writer = this._getTypeaheadValue(this._$writerInput);
	this.camera = this._getTypeaheadValue(this._$cameraInput);
	this.music = this._getTypeaheadValue(this._$musicInput);  
	this.worldDate = this._getInputValue(this._$worldDateInput);
	this.time = this._getInputValue(this._$timeInput);
	
	this.json.cast = this.cast;
	this.json.director = this.director;
	this.json.writer = this.writer;
	this.json.camera = this.camera;
	this.json.music = this.music;
	this.json.worldDate = this.worldDate;
	this.json.time = this.time;
}

/**
 * TODO: The final function will not work like this.
 */

Game.prototype.uploadPosterImage = function() { 
	this.poster = utils.parseImgIndex($posterInput.val());
}
