function Caret() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var $aside = $('#aside'),
		$tagsInput = $('#publishTagsInput'),
		$dateInput = $('#publishDateInput'),
		$urlInput = $('#publishUrlInput'),
		$timeInput = $('#publishTimeInput'),
		$issueInput = $('#publishIssueInput'),
		$typeInput = $('#asideTypeSelect'),
		$titleInput = $('#asideTitleInput'),
		$subtitleInput = $('#asideSubtitleInput'),
		$authorsInput = $('#asideAuthorsInput'),
		$mainInput = $('#asideMainInput');
	
	
	
	
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
	this.issue = "issue-tag";
	
	/**
	 * Subject
	 */
	
	this.type;
	this.subtype = {'tag': 'caret',
					 'bg': 'каре'};
	this.title = "Title Case String";
	this.subtitle = "Title Case String";
	this.authors = "Author,Author,Author";
	this.center;
	
	/**
	 * Cover
	 */
	
	this.main = "game-tag-index.jpg"; 
	
	/**
	 * TODO: Validate fields.
	 */
	
	this.save = function () {
		self.type = {'tag': $typeInput.val(),
					 'bg': $typeInput.find(':selected').text()};
		self.title = $titleInput.val();
		self.subtitle = $subtitleInput.val();
		self.authors = $authorsInput.parents('label').find('.tag').map(function (i, element) {
			return $(element).text();
		}).get().join(",");
		
		/**
		 * Images names are made from tag and number.
		 * Fisrst strip the path, than strip the tag.
		 * Store the image index and format.
		 * Also store the tag in case the prime tag is different.
		 */
		 
		self.main = {tag: $mainInput.val().substring($mainInput.val().lastIndexOf('\\') + 1, 
													 $mainInput.val().lastIndexOf('-')), 
					 index: $mainInput.val().split('\\').pop().split('-').pop()}
		
		/**
		 * Always clear the array before pushing new elements.
		 */
		
		self.center = CKEDITOR.instances['textLayout_aside'].getData().replace(/\n/g, '');
		
		self.url = self.title.toLowerCase().replace(/[:?\.,!]|– |- /g, '');
		self.url = self.url.replace(/ /g, '-');
		
		$urlInput.val(self.url);
		$urlInput.parents('label').find('span').contents().last().replaceWith(self.url);
	}
	 
	this.publish = function () {
		self.save();
		
		/**
		 * In the input tags are stored in the sequence you add them,
		 * but we want them in the order they appear in the UI.
		 * Thus we return the SPAN elements and join the text in array.
		 * The result is === to the input value.
		 */
		
		self.prime = $tagsInput.parents('label').find('.tag').eq(0).data().item;
		self.tags = $tagsInput.parents('label').find('.tag').map(function (i, element) {
			return $(element).text();
		}).get().join(",");
		
		if (self.type.tag == 'games') {
			self.site = 'forplay';
		} else {
			self.site = 'forlife';
		}
		
		self.date = new Date($dateInput.val() + ' ' + $timeInput.val());
		self.issue = $issueInput.val();
		
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
	
	/** 
	 * INIT
	 */
}