function Formain(o) {
	
	/** 
	 * CONSTRUCTOR
	 */

	var o = $('#fortag').is(':visible') ? 'fortag' : o;
	
	Fortag.call(this, o);
	
	/** 
	 * PRIVATE
	 */
	
	this._$posterInput = $('#' + o + 'PosterInput');
	this._$coverInput = $('#' + o + 'CoverInput');
	
	this._$stickersInput = $('#' + o + 'StickersInput');
	this._$serieInput = $('#' + o + 'SerieInput');
	this._$genreGroup = $('#' + o + 'GenreGroup');
	this._$countrySelect = $('#' + o + 'CountrySelect');
	
	/** 
	 * PUBLIC
	 */
	
	this.poster;
	this.cover;	

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
 
Formain.prototype._updateAfterSave = function(data, target) {
	Fortag.prototype._updateAfterSave.call(this, data, target);
	
	/**
	 * Cover and poster images are no longer new.
	 */
	
	if (this._$posterInput.length > 0) {
		this._$posterInput.data('new', 'false');
		this._$posterInput.attr('data-new', 'false');
	}
	
	if (this._$coverInput.length > 0) {
		this._$coverInput.data('new', 'false');
		this._$coverInput.attr('data-new', 'false');
	}
}  
  
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

Formain.prototype._setPosterImgValue = function(_$input, tag) {
	if (tag) {
		if (!_$input.length) return false;
		
		_$input.parents('.file')
			   .css('background-image', 
					'url(../assets/articles/' + tag + 
					'/_extras/'  + tag + '-poster.jpg');
	} else {
		_$input.parents('.file')
			   .css('background-image', 
					'none');
	}
}

Formain.prototype._setCoverImgValue = function(_$input, tag) {
	if (tag) {
		if (!_$input.length) return false;
		
		_$input.parents('.file')
			   .css('background-image', 
					'url(../assets/articles/' + tag + 
					'/_extras/'  + tag + '-cover.jpg');
	} else {
		_$input.parents('.file')
			   .css('background-image', 
					'none');
	}
}

Formain.prototype._uploadImgs = function() {
	Fortag.prototype._uploadImgs.call(this);
	
	if (this._$posterInput.length <= 0 && this._$coverInput.length <= 0 ) {
		this.poster = null;
		this.cover = null;
		
		return;
	}
	
	if (this._$posterInput.length <= 0  && this._$coverInput.length > 0 ) {
		this.poster = null;
		
		if (!this._$coverInput.val() || 
			!this._$coverInput.data('new') || 
			this._$coverInput.data('new') == 'false') {
			
			this.cover = null;
			
			return;
		}

		var imgData = imgs.createBackgroundImgData(this._$coverInput, 
												   this.tag, this.object);
		
		imgs.uploadImgs(imgData);
	}
	
	if (this._$posterInput.length > 0  && this._$coverInput.length <= 0 ) {
		this.cover = null;
		
		if (!this._$posterInput.val() || 
			!this._$posterInput.data('new') || 
			this._$posterInput.data('new') == 'false') {
			
			this.poster = null;
			
			return;
		}

		var imgData = imgs.createBackgroundImgData(this._$posterInput, 
												   this.tag, this.object);
		
		imgs.uploadImgs(imgData);
	}
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
	
	if (this._$posterInput.length) this._setPosterImgValue(this._$posterInput, null);
	if (this._$coverInput.length) this._setCoverImgValue(this._$coverInput, null);
}

Formain.prototype.updateData = function(data) {
	Fortag.prototype.updateData.call(this, data);
	
	this._setPosterImgValue(this._$posterInput, data.tag || null);
	this._setCoverImgValue(this._$coverInput, data.tag || null);
}