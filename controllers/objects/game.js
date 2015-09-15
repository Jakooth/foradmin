function Game(o) {
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

Game.prototype.save = function() { 
	Formain.prototype.save.call(this);
	
	/**
	 * TODO: In fact we need the platform id and not text values.
	 */
	
	this.platforms = this._$platformGroup.find(':checked').map(function (i, element) {
		return {value: $(element).val(), 
				text: $(element).parents('label').find('span').text()};
	}).get();
	
	this.publisher = this._$publisherInput.length ? 
				 	 this._$publisherInput.typeahead()
				   				   	  	  .data('tagsinput')
								  	  	  .itemsArray : null;
	
	this.developer = this._$developerInput.length ? 
				 	 this._$developerInput.typeahead()
				   				   	  	  .data('tagsinput')
								  	  	  .itemsArray : null;
										  
	this.usDate = this._$usDateInput.val() || null;
	
	this.json.platforms = this.platforms;
	this.json.publisher = this.publisher;
	this.json.developer = this.developer;
	this.json.usDate = this.usDate;
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