function Article() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var $article = $('#article'),
		$layouts,
		$tagsInput = $('#publishTagsInput'),
		$dateInput = $('#publishDateInput'),
		$urlInput = $('#publishUrlInput'),
		$priorityInput = $('#publishPrioritySelect'),
		$timeInput = $('#publishTimeInput'),
		$issueInput = $('#publishIssueInput'),
		$typeInput = $('#articleTypeSelect'),
		$subtypeInput = $('#articleSubtypeSelect'),
		$titleInput = $('#articleTitleInput'),
		$subtitleInput = $('#articleSubtitleInput'),
		$authorsInput = $('#articleAuthorsInput'),
		$hypeInput = $('#articleHypeSelect'),
		$versionTestedInput = $('#articleVersionTestedSelect'),
		$betterInput = $('#articleBetterInput'),
		$worseInput = $('#articleWorseInput'),
		$equalInput = $('#articleEqualInput'),
		$betterTextInput = $('#articleBetterTextInput'),
		$worseTextInput = $('#articleWorseTextInput'),
		$equalTextInput = $('#articleEqualTextInput'),
		$coverInput = $('#articleCoverInput'),
		$bgHInput = $('#articleBgHSelect'),
		$bgVInput = $('#articleBgVSelect'),
		$themeInput = $('#articleThemeSelect'),
		$subthemeInput = $('#articleSubthemeSelect'),
		$mainWideInput = $('#articleMainWideInput'),
		$mainShotInput = $('#articleMainShotInput'),
		$mainCaretInput = $('#articleMainCaretInput'),
		$videoTechInput = $('#articleVideoTechSelect'),
		$audioTechInput = $('#articleAudioTechSelect'),
		$videoUrlInput = $('#articleVideoUrlInput'),
		$audioFrameInput = $('#articleAudioFrameInput'),
		$audioUrlInput = $('#articleAudioUrlInput');
	
	
	
	
	/** 
	 * PUBLIC
	 */
	
	/**
	 * Publish
	 */

	this.prime = "object-tag";
	this.tags = "";
	this.site = "forplay";
	this.url = "prime-tag";
	this.date = new Date();
	this.priority;
	this.issue = "issue-tag";
	
	/**
	 * Subject
	 */
	
	this.type;
	this.subtype;
	this.audio;
	this.video;
	this.title = "Title Case String";
	this.subtitle = "Title Case String";
	this.authors = "Author,Author,Author";
	this.hype;
	this.versionTested = "Platform";
	this.preview;
	this.layouts = [];
	
	/**
	 * Cover
	 */
	
	this.cover = "game-tag-index.jpg";
	this.bgH;
	this.bgV;
	this.theme;
	this.subtheme;
	this.mainWide = "game-tag-index.jpg";
	this.mainCaret = "game-tag-index.png";
	this.mainShot = "game-tag-index.jpg";
	this.better;
	this.worse;
	this.equal;
	
	/**
	 * External
	 */
	 
	this.stickers; 
	
	/**
	 * TODO: Validate fields.
	 */
	
	this.save = function () {
		self.type = {'tag': $typeInput.val(),
					 'bg': $typeInput.find(':selected').text()};
		self.subtype = {'tag': $subtypeInput.val(),
					 	'bg': $subtypeInput.find(':selected').text()};
		self.title = $titleInput.val();
		self.subtitle = $subtitleInput.val();
		self.authors = $authorsInput.parents('label').find('.tag').map(function (i, element) {
			return $(element).text();
		}).get().join(",");
		
		self.bgH = $bgHInput.val();
		self.bgV = $bgVInput.val();
		self.theme = $themeInput.val() ? $themeInput.find(':selected').text() : "";
		self.subtheme = $subthemeInput.val() ? $subthemeInput.find(':selected').text() : "";
		
		/**
		 * Images names are made from tag and number.
		 * Fisrst strip the path, than strip the tag.
		 * Store the image index and format.
		 * Also store the tag in case the prime tag is different.
		 */
		 
		self.cover = {tag: $coverInput.val().substring($coverInput.val().lastIndexOf('\\') + 1, 
													   $coverInput.val().lastIndexOf('-')), 
					  index: $coverInput.val().split('\\').pop().split('-').pop()};
		self.mainWide = {tag: $mainWideInput.val().substring($mainWideInput.val().lastIndexOf('\\') + 1, 
													 		 $mainWideInput.val().lastIndexOf('-')), 
					 	 index: $mainWideInput.val().split('\\').pop().split('-').pop()}
		self.mainCaret = {tag: $mainCaretInput.val().substring($mainCaretInput.val().lastIndexOf('\\') + 1, 
													 	   	   $mainCaretInput.val().lastIndexOf('-')), 
					 	  index: $mainCaretInput.val().split('\\').pop().split('-').pop()}
		self.mainShot = {tag: $mainShotInput.val().substring($mainShotInput.val().lastIndexOf('\\') + 1, 
													 	     $mainShotInput.val().lastIndexOf('-')), 
					 	 index: $mainShotInput.val().split('\\').pop().split('-').pop()}
		
		if (self.subtype.tag == 'review' || self.subtype.tag == 'video') {
			self.hype = $hypeInput.val();
			
			if (self.type.tag == 'games') {
				self.versionTested = $versionTestedInput.val();
			} else {
				self.versionTested = "";
			}
			
			/**
			 * It is important to have empty value.
			 */
			
			if ($betterInput.typeahead().data('tagsinput').itemsArray[0]) {
				self.better = {value: $betterInput.typeahead().data('tagsinput').itemsArray[0].value, 
						   	   text: $betterTextInput.val() || 
							   		 $betterInput.typeahead().data('tagsinput').itemsArray[0].text}
			}  else {
				self.better = "";
			}
			
			
			if ($worseInput.typeahead().data('tagsinput').itemsArray[0]) {
				self.worse = {value: $worseInput.typeahead().data('tagsinput').itemsArray[0].value, 
						   	  text: $worseTextInput.val() || 
							   		$worseInput.typeahead().data('tagsinput').itemsArray[0].text}
			}  else {
				self.worse = "";
			}
			
			
			if ($equalInput.typeahead().data('tagsinput').itemsArray[0]) {
				self.equal = {value: $equalInput.typeahead().data('tagsinput').itemsArray[0].value, 
						   	  text: $equalTextInput.val() || 
							   		$equalInput.typeahead().data('tagsinput').itemsArray[0].text}
			}  else {
				self.equal = "";
			}
		} else {
			self.hype =
			self.versionTested =
			self.better =
			self.worse =
			self.equal = "";
		}
		
		if (self.subtype.tag == 'news' || self.subtype.tag == "video") {
			if ($audioTechInput.val() == "") {
				self.audio = "";
			} else {
				self.audio = {'tech': $audioTechInput.val(), 
							  'url': $audioUrlInput.val(), 
							  'frame': $audioFrameInput.val()};
			}
			
			if ($videoTechInput.val() == "") {
				self.video = "";
			} else {
				self.video = {'tech': $videoTechInput.val(), 
							  'url': $videoUrlInput.val(),
							  'player': Math.round(Math.random() * 100000)};
			}
		} else {
			self.audio =
			self.video = "";
		}
		
		self.setUrl();
	}
	 
	this.publish = function () {
		self.save();
		
		/**
		 * In the input tags are stored in the sequence you add them,
		 * but we want them in the order they appear in the UI.
		 * Thus we return the SPAN elements and join the text in array.
		 * The result is === to the input value.
		 */
		
		self.tags = $tagsInput.parents('label').find('.tag').map(function (i, element) {
			return $(element).text();
		}).get().join(",");
		
		if (self.type.tag == 'games') {
			self.site = 'forplay';
		} else {
			self.site = 'forlife';
		}
		
		self.date = new Date($dateInput.val() + ' ' + $timeInput.val());
		self.priority = $priorityInput.val();
		self.issue = $issueInput.val();
		
		/**
		 * STICKERS
		 */
		
		var get = $.get('../data/' + self.prime.type 
								   + '/' + self.prime.object 
								   + '/' + self.prime.value + '.xml');
				
		$.when(get).done(function(data) {
			var game = $.xml2json(data);
			
			self.stickers = game.stickers.sticker;
		}).fail(function() {
			alert("Failed to load stickers.");
		});
		
		/**
		 * Always clear the array before pushing new elements.
		 * We crate layouts on publish, to use the url.
		 */
		
		self.layouts = [];
		var $layouts = $article.find('.layout');
		
		if ($layouts.length) {
			self.preview = $('<div>' + 
							 CKEDITOR.instances[$layouts.eq(0)
									 .find('.center-col:visible')
									 .attr('id')].getData() + 
							 '</div>')
			.find('> p')
			.map(function(i, element) { 
				return $(element).text(); 
			}).get().join(' ');
			
			$layouts.each(function () {
				self.layouts.push(new Layout($(this)
											  .find('.center-col:visible')
											  .attr('id')));
			});
		}
		
		/**
		 * The left column is restricted for object information:
		 * game, movie, album, book etc.
		 * For reviews automatically  fill this data in the
		 * first layout left column.
		 */
		
		if (self.subtype.tag == 'review' || 
			self.prime.object == 'event' ||
			self.subtype.tag == 'video') {
			self.layouts[0].left = {type: self.prime.type, 
							   		object: self.prime.object, 
							   		valign: 'top', 
							   		url: self.prime.value};
		}
		
		return self;
	}
	
	this.setUrl = function() {
		var $tags = $tagsInput.parents('label').find('.tag');
		
		if ($tags.length > 0) {
			self.prime = $tags.eq(0).data().item;
		}
		
		if (self.subtype.tag == 'review' || self.subtype.tag == 'video') {
			self.url = self.prime.value;
		} else {
			self.url = utils.formatTag(self.title);
		}
		
		$urlInput.val(self.url);
	}
	
	this.hypeToString = function(hype) {
		var hype = hype || self.hype;
			s = new String(hype);
		
		self.hype = s.slice(0, s.length - 1) + 
					(s.slice(s.length - 1) == 5 ? '+' : '');
	}
	
	this.hypeToNumber = function(hype) {
		self.hype = hype.indexOf('+') != -1 ? hype.replace('+', 5) 
											: hype + "0";
	}
	
	
	
	
	/** 
	 * INIT
	 */
}