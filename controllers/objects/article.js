function Article(o) {
	Aside.call(this, o);
	
	this._$wideInput = $('#' + this._o + 'WideInput');
	this._$caretInput = $('#' + this._o + 'CaretInput');
	
	this._$videoTechSelect = $('#' + this._o + 'VideoTechSelect');
	this._$audioTechSelect = $('#' + this._o + 'AudioTechSelect');
	this._$videoUrlInput = $('#' + this._o + 'VideoUrlInput');
	this._$audioFrameInput = $('#' + this._o + 'AudioFrameInput');
	this._$audioUrlInput = $('#' + this._o + 'AudioUrlInput');
	this._$hypeSelect = $('#' + this._o + 'HypeSelect');
	this._$versionTestedSelect = $('#' + this._o + 'VersionTestedSelect');
	
	this._$betterInput = $('#' + this._o + 'BetterInput');
	this._$worseInput = $('#' + this._o + 'WorseInput');
	this._$equalInput = $('#' + this._o + 'EqualInput');
	this._$betterTextInput = $('#' + this._o + 'BetterTextInput');
	this._$worseTextInput = $('#' + this._o + 'WorseTextInput');
	this._$equalTextInput = $('#' + this._o + 'EqualTextInput');
	
	this._$coverInput = $('#' + this._o + 'CoverInput');
	this._$coverAlignInput = $('#' + this._o + 'BgHSelect');
	this._$coverValignInput = $('#' + this._o + 'BgVSelect');
	this._$themeInput = $('#' + this._o + 'ThemeSelect');
	this._$subthemeInput = $('#' + this._o + 'SubthemeSelect');
	
	

	
	/** 
	 * PUBLIC
	 */

	this.wide;
	this.caret;
	
	this.videoTech;
	this.audioTech;
	this.videoUrl;
	this.audioFrame;
	this.audioUrl;
	this.hype;
	this.platform;
	
	this.better;
	this.worse;
	this.equal;
	this.betterText;
	this.worseText;
	this.equalText;
	
	this.cover;
	this.coverAlign;
	this.coverValign;
	this.theme;
	this.subtheme;
}

Article.prototype = Object.create(Aside.prototype);
Article.prototype.constructor = Article;

/** 
 * PRIVATE
 */
 
Article.prototype._getLayouts = function(id) {
	var self = this;
	
	var $layouts = this._$this.find('.layout');
	
	this.layouts = [];
	
	if ($layouts.length) {
		$layouts.each(function() {
			self.layouts.push(new Layout($(this)
										 .find('.center-col:visible')
										 .attr('id')));
		});
	}

	return this.layouts;
} 

Article.prototype._getPreviewText = function(id) {
	var preview = null;
	
	var $layouts = this._$this.find('.layout');
	
	if ($layouts.length) {
		
		/**
		 *  Triple precausion for the type of the first layout.
		 */
		 
		if (this.layouts[0].type != 'text') {
			return false;
		}
		
		preview = $(CKEDITOR.instances[$layouts.eq(0)
				  .find('.center-col:visible')
				  .attr('id')].getData())
				  .filter('p')
				  .map(function(i, element) { 
								return $(element).text(); 
				  }).get().join(' ');
	}
	
	preview = this._escapeValue(preview);
	
	return preview;
}




/** 
 * PUBLIC
 */

Article.prototype.validateContent = function() {
	Aside.prototype.validateContent.call(this);
	
	if (this.layouts.length == 0) {
		this._isValid = false;
		
		admin.showAlert({message: 'Добавете съдържание.', 
						 status: 'error'});
		
		return false;
	}
	
	if (this.layouts[0].type != 'text') {
		this._isValid = false;
		
		admin.showAlert({message: 'Типа оформление на първия шаблон, трябва да е винаги текст.', 
						 status: 'error'});
		
		return false;
	}
}

Article.prototype.validateBestPractices = function() {
	Aside.prototype.validateBestPractices.call(this);
	
	/**
	 * Make sure all images are set.
	 */
	var self = this,
		img; 
	
	var $imgs = $('#article .Content  .sublayout .img-proxy:visible .file input');
	
	$imgs.each(function(index, img) {
		img = self._getInputValue($(img));
		
		if (!img) {
			this._isValid = true;
		
			admin.showAlert({message: 'Някои картинки не са избрани.', 
							 status: 'warning'});
			
			return false;
		}
	});
}

Article.prototype.hypeToString = function(hype) {
	var hype = hype || this.hype;
		s = new String(hype);
		
	if (!hype) return null;	
	
	this.hype = s.slice(0, s.length - 1) + (
				s.slice(s.length - 1) == 5 ? '+' : '');
}

Article.prototype.hypeToNumber = function(hype) {
	if (!hype) return null;	
	
	this.hype = hype.indexOf('+') != -1 ? hype.replace('+', 5) 
										: hype + "0";
}

Article.prototype.save = function() { 
	Aside.prototype.save.call(this);
	
	this.wide = this._getImageValue(this._$wideInput);
	this.caret = this._getImageValue(this._$caretInput);
	
	this.videoTech = this._getInputValue(this._$videoTechSelect);
	this.audioTech = this._getInputValue(this._$audioTechSelect);
	this.videoUrl = this._getInputValue(this._$videoUrlInput);
	this.audioFrame = this._getInputValue(this._$audioFrameInput);
	this.audioUrl = this._getInputValue(this._$audioUrlInput);
	this.hype = this._getInputValue(this._$hypeSelect);
	this.platform = this._getInputValue(this._$versionTestedSelect);
	
	/**
	 * Better, worse and equal can accept just one tag.
	 */
	
	this.better = this._getTypeaheadValue(this._$betterInput);
	this.worse = this._getTypeaheadValue(this._$worseInput);
	this.equal = this._getTypeaheadValue(this._$equalInput);
	this.betterText = this._getInputValue(this._$betterTextInput);
	this.worseText = this._getInputValue(this._$worseTextInput);
	this.equalText = this._getInputValue(this._$equalTextInput);
	
	this.cover = this._getImageValue(this._$coverInput);
	this.coverAlign = this._getInputValue(this._$coverAlignInput);
	this.coverValign = this._getInputValue(this._$coverValignInput);
	this.theme = this._getInputValue(this._$themeInput);
	this.subtheme = this._getInputValue(this._$subthemeInput);
			   
	this.json.wide = this.wide;
	this.json.caret = this.caret;
	
	this.json.videoTech = this.videoTech;
	this.json.audioTech = this.audioTech;
	this.json.videoUrl = this.videoUrl;
	this.json.audioFrame = this.audioFrame;
	this.json.audioUrl = this.audioUrl;
	this.json.hype = this.hype;
	this.json.platform = this.platform;
	
	this.json.better = this.better ? this.better[0] : this.better;
	this.json.worse = this.worse ? this.worse[0] : this.worse;
	this.json.equal = this.equal ? this.equal[0] : this.equal;
	this.json.betterText = this.betterText;
	this.json.worseText = this.worseText;
	this.json.equalText = this.equalText;
	
	this.json.cover = this.cover;
	this.json.coverAlign = this.coverAlign;
	this.json.coverValign = this.coverValign;
	this.json.theme = this.theme;
	this.json.subtheme = this.subtheme;
} 

