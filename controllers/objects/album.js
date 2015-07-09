function Album() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var $mainInput = $('#albumMainInput'),
		$enNameInput = $('#albumEnNameInput'),
		$artistInput = $('#albumArtistInput'),
		$tagInput = $('#albumTagInput'),
		$stickersInput = $('#albumStickersInput'),
		$genreInput = $('#albumGenreGroup'),
		$countrySelect = $('#albumCountrySelect'),
		$dateInput = $('#albumDateInput'),
		$similarInput = $('#albumSimilarInput'),
		$trackInputs = $('#album .Track .track');
	
	
	
	
	/** 
	 * PUBLIC
	 * Variables without value are objects.
	 */

	this.main = "C:/fakepath/object-tag-index.png";
	this.enName = "Title Case String";
	this.artist;
	this.country = "Country";
	this.tag = "object-tag";
	this.stickers;
	this.genre = [];
	this.date = new Date();
	this.similar = "object-tag,object-tag,object-tag";
	this.tracks = [];
	
	/**
	 * TODO: Validate fields.
	 */
	
	this.save = function () {
		
		/**
		 * Images names are made from tag and number.
		 * Fisrst strip the path, than strip the tag.
		 * Only store the image index and format.
		 */
		
		self.main = $mainInput.val().split('/').pop().split('-').pop() || 
					self.main.split('-').pop();
		
		self.enName = $enNameInput.val();
		self.artist = $artistInput.typeahead().data('tagsinput').itemsArray[0];
		self.country = $countrySelect.find(':selected').text();
		self.tag = $tagInput.val();
		self.stickers = $stickersInput.typeahead().data('tagsinput').itemsArray;
		self.genre = $genreInput.find(':checked').map(function (i, element) {
			return {value: $(element).val(), 
					text: $(element).parents('label').find('span').text()};
		}).get();
		self.date = new Date($dateInput.val());
		self.similar = $similarInput.val();
		self.tracks = $trackInputs.map(function (i, element) {
			return {name: $(element).find('input:eq(0)').val(),  
					video: $(element).find('input:eq(1)').val()};
		}).get();
	}
	
	
	
	
	/** 
	 * INIT
	 */
}