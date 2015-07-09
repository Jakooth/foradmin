function Movie() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var $mainInput = $('#movieMainInput'),
		$posterInput = $('#moviePosterInput'),
		$enNameInput = $('#movieEnNameInput'),
		$bgNameInput = $('#movieBgNameInput'),
		$serieInput = $('#movieSerieInput'),
		$tagInput = $('#movieTagInput'),
		$stickersInput = $('#movieStickersInput'),
		$genreInput = $('#movieGenreGroup'),
		$castInput = $('#movieCastInput'),
		$directorInput = $('#movieDirectorInput'),
		$writerInput = $('#movieWriterInput'),
		$cameraInput = $('#movieCameraInput'),
		$musicInput = $('#movieMusicInput'),
		$platformInput = $('#gamePlatformGroup'),
		$publisherInput = $('#gamePublisherInput'),
		$developerInput = $('#gameDeveloperInput'),
		$bgDateInput = $('#movieBgDateInput'),
		$worldDateInput = $('#movieWorldDateInput'),
		$timeInput = $('#movieTimeInput'),
		$similarInput = $('#movieSimilarInput');
	
	
	
	
	/** 
	 * PUBLIC
	 * Variables without value are objects.
	 */

	this.main = "assets/bwe/movie-tag.jpg";
	this.poster = "movie-tag-poster.jpg";
	this.enName = "Title Case String";
	this.bgName = "Title Case String";
	this.serie = "object-tag";
	this.tag = "object-tag";
	this.stickers;
	this.genre = [];
	this.cast;
	this.directors;
	this.writers;
	this.camera;
	this.music;
	this.bgDate = new Date();
	this.worldDate = new Date();
	this.time = 0;
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
		
		self.main = $mainInput.val().split('\\').pop() || 
					self.main.split('\\').pop();
					
		self.poster = $posterInput.val().split('/').pop().split('-').pop() || 
					  self.poster.split('-').pop();			
					
		self.enName = $enNameInput.val();
		self.bgName = $bgNameInput.val();
		self.serie = $serieInput.val();
		self.tag = $tagInput.val();
		self.stickers = $stickersInput.typeahead().data('tagsinput').itemsArray;
		self.genre = $genreInput.find(':checked').map(function (i, element) {
			return {value: $(element).val(), 
					text: $(element).parents('label').find('span').text()};
		}).get();
		self.cast = $castInput.typeahead().data('tagsinput').itemsArray;
		self.directors = $directorInput.typeahead().data('tagsinput').itemsArray;
		self.writers = $writerInput.typeahead().data('tagsinput').itemsArray;
		self.camera = $cameraInput.typeahead().data('tagsinput').itemsArray;
		self.music = $musicInput.typeahead().data('tagsinput').itemsArray;
		self.bgDate = new Date($bgDateInput.val());
		self.worldDate = new Date($worldDateInput.val());
		self.time = $timeInput.val();
		self.similar = $similarInput.val();
	}
	
	
	
	
	/** 
	 * INIT
	 */
}