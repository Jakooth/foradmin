function Game() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var $mainInput = $('#gameMainInput'),
		$enNameInput = $('#gameEnNameInput'),
		$bgNameInput = $('#gameBgNameInput'),
		$serieInput = $('#gameSerieInput'),
		$tagInput = $('#gameTagInput'),
		$stickersInput = $('#gameStickersInput'),
		$genreInput = $('#gameGenreGroup'),
		$platformInput = $('#gamePlatformGroup'),
		$publisherInput = $('#gamePublisherInput'),
		$developerInput = $('#gameDeveloperInput'),
		$usDateInput = $('#gameUsDateInput'),
		$euDateInput = $('#gameEuDateInput'),
		$similarInput = $('#gameSimilarInput');
		$boxInputs = $('#game .Box select');
	
	
	
	
	/** 
	 * PUBLIC
	 * Variables without value are objects.
	 */

	this.main = "assets/bwe/game-tag.jpg";
	this.enName = "Title Case String";
	this.bgName = "Title Case String";
	this.serie = "object-tag";
	this.tag = "object-tag";
	this.stickers;
	this.genre = [];
	this.platform = "Platform,Platform,Platform";
	this.publisher;
	this.developer;
	this.usDate = new Date();
	this.euDate = new Date();
	this.similar = "object-tag,object-tag,object-tag";
	this.boxes = [];
	
	/**
	 * TODO: Validate fields.
	 */
	
	this.save = function () {
		
		/**
		 * Images names are made from tag and number.
		 * Fisrst strip the path, than strip the tag.
		 * Only store the image index and format.
		 */
		
		self.main = $mainInput.val().split('\\').pop() || 
					self.main.split('\\').pop();
					
		self.enName = $enNameInput.val();
		self.bgName = $bgNameInput.val();
		self.serie = $serieInput.val();
		self.tag = $tagInput.val();
		self.stickers = $stickersInput.typeahead().data('tagsinput').itemsArray;
		self.genre = $genreInput.find(':checked').map(function (i, element) {
			return {value: $(element).val(), 
					text: $(element).parents('label').find('span').text()};
		}).get();
		self.platform = $platformInput.find(':checked').map(function (i, element) {
			return $(element).val();
		}).get().join(",");
		self.publisher = $publisherInput.typeahead().data('tagsinput').itemsArray[0];
		self.developer = $developerInput.typeahead().data('tagsinput').itemsArray[0];
		self.usDate = new Date($usDateInput.val());
		self.euDate = new Date($euDateInput.val());
		self.similar = $similarInput.val();
		self.boxes = $boxInputs.map(function (i, element) {
			return {type: $(element).val(),  
					img:$(element).parents('.platform')
								  .find('[type=file]').val().split('/').pop()
								  							.split('-').pop()};
		}).get();
	}
	
	
	
	
	/** 
	 * INIT
	 */
}