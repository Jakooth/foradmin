function Game(o) {

	/** 
	 * CONSTRUCTOR
	 */

	var o = $('#fortag').is(':visible') ? 'fortag' : o;
	
	Formain.call(this, o);
	
	/** 
	 * PRIVATE
	 */
	
	this._$boxGroup = $('#' + o + ' .Box select');
	
	this._$platformGroup = $('#' + o + 'PlatformGroup');
	this._$publisherInput = $('#' + o + 'PublisherInput');
	this._$developerInput = $('#' + o + 'DeveloperInput');
	this._$usDateInput = $('#' + o + 'UsDateInput');
	
	/** 
	 * PUBLIC
	 */
	 
	this.boxes; 

	this.platforms;
	this.publisher;
	this.developer;
	this.usDate;
}

Game.prototype = Object.create(Formain.prototype);
Game.prototype.constructor = Game;

/** 
 * PRIVATE
 */

Game.prototype._setTagsinputValue = function(data) {
	Formain.prototype._setTagsinputValue.call(this, data);
	
	var self = this;
	
	if (data) {
		data.forEach(function(tag, index, arr) {
			switch (tag.related_subtype) {
				case 'publisher':
					if (!self._$publisherInput.length) return false;
					
					self._$publisherInput.tagsinput('add', tag);
					self._saveRelatedArray.push(tag.tag_id);
					
					break;
				case 'developer':
					if (!self._$developerInput.length) return false;
					
					self._$developerInput.tagsinput('add', tag);
					self._saveRelatedArray.push(tag.tag_id);
					
					break;
				case 'platform':
					if (!self._$platformGroup.length) return false;
					
					self._$platformGroup.find('[data-id=' + tag.platform_id + ']').prop('checked', true);
					self._saveRelatedArray.push(tag.platform_id);
					
					break;
			}
		});
	}
}

/** 
 * PUBLIC
 */

Game.prototype.save = function() { 
	Formain.prototype.save.call(this);
	
	this.platforms = this._getGroupValue(this._$platformGroup);
	this.publisher = this._getTypeaheadValue(this._$publisherInput);
	this.developer = this._getTypeaheadValue(this._$developerInput);
	this.usDate = this._getInputValue(this._$usDateInput);
	
	this.publisher = this._setRelatedType(this.publisher, 'publisher');
	this.developer = this._setRelatedType(this.developer, 'developer');
	this.platforms = this._setRelatedType(this.platforms, 'platform');
	
	this.json.platforms = this.platforms;
	this.json.publisher = this.publisher;
	this.json.developer = this.developer;
	this.json.usDate = this.usDate;
	
	/**
	 * Override in case of null values.
	 * Very rare case, but just in case.
	 */ 
	this.json.type = 'games';
}

Game.prototype.resetData = function() {
	Formain.prototype.resetData.call(this);
	
	if (this._$usDateInput.length) this._$usDateInput.val(null);
	if (this._$publisherInput.length) this._$publisherInput.tagsinput('removeAll');
	if (this._$developerInput.length) this._$developerInput.tagsinput('removeAll');
	if (this._$platformGroup.length) this._$platformGroup.find('[type=checkbox]').prop('checked', false);
}

Game.prototype.updateData = function(data) {
	Formain.prototype.updateData.call(this, data);

	this._setInputValue(this._$usDateInput, data.us_date || null);
}

/**
 * TODO: The final function will not work like this.
 */

Game.prototype.uploadBoxImage = function() { 
	this.boxes = $boxGroup.map(function (i, element) {
		return {type: $(element).val(),  
				value: $(element).parents('.platform')
							  	 .find('[type=file]').val()
								 .split('/').pop()
								 .split('-').pop()};
	}).get();
}