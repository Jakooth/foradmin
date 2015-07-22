function Book() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var $mainInput = $('#bookMainInput'),
		$enNameInput = $('#bookEnNameInput'),
		$bgNameInput = $('#bookBgNameInput'),
		$serieInput = $('#bookSerieInput'),
		$artistInput = $('#bookArtistInput'),
		$translatorInput = $('#bookTranslatorInput'),
		$tagInput = $('#bookTagInput'),
		$stickersInput = $('#bookStickersInput'),
		$genreInput = $('#bookGenreGroup'),
		$countrySelect = $('#bookCountrySelect'),
		$dateInput = $('#bookDateInput'),
		$similarInput = $('#bookSimilarInput');
	
	
	
	
	/** 
	 * PUBLIC
	 * Variables without value are objects.
	 */

	this.main = "C:/fakepath/object-tag-index.png";
	this.enName = "Title Case String";
	this.bgName = "Title Case String";
	this.serie = "object-tag";
	this.artist;
	this.translator;
	this.country = "Country";
	this.tag = "object-tag";
	this.stickers;
	this.genre = [];
	this.date = new Date();
	this.similar = "object-tag,object-tag,object-tag";
	
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
		self.bgName = $bgNameInput.val();
		self.serie = $serieInput.val();
		self.artist = $artistInput.typeahead().data('tagsinput').itemsArray[0];
		self.translator = $translatorInput.typeahead().data('tagsinput').itemsArray[0];
		self.country = $countrySelect.find(':selected').text();
		self.tag = $tagInput.val();
		self.stickers = $stickersInput.typeahead().data('tagsinput').itemsArray;
		self.genre = $genreInput.find(':checked').map(function (i, element) {
			return {value: $(element).val(), 
					text: $(element).parents('label').find('span').text()};
		}).get();
		self.date = new Date($dateInput.val());
		self.similar = $similarInput.val();
	}
	
	
	
	
	/** 
	 * INIT
	 */
}