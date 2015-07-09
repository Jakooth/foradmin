function Quote() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var $characterInput = $('#quoteCharacterInput'),
		$urlInput = $('#quoteUrlInput'),
		$saysInput = $('#quoteSaysInput');
	
	
	
	
	/** 
	 * PUBLIC
	 */
	
	/**
	 * Publish
	 */

	this.url = "url-tag";
	this.character;
	this.text;
	
	/**
	 * TODO: Validate fields.
	 */
	
	this.save = function () {
		self.url = $urlInput.val();
		self.character = $characterInput.typeahead().data('tagsinput').itemsArray[0];
		self.says = $saysInput.val();
	}
	
	/** 
	 * INIT
	 */
}