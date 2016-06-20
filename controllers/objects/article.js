function Article(o) {
	Aside.call(this, o);
	
	this._saveWide;
	this._saveCaret;
	this._saveCover;
	
	this._$wideInput = $('#' + this._o + 'WideInput');
	this._$caretInput = $('#' + this._o + 'CaretInput');
	this._$caretUpload = $('#' + this._o + 'CaretUpload');
	
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
	
	this._$saveWideInput = $('#' + this._o + 'SaveWideInput');
	this._$saveCaretInput = $('#' + this._o + 'SaveCaretInput');
	this._$saveCoverInput = $('#' + this._o + 'SaveCoverInput');
	
	

	
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
 
Article.prototype._updateAfterSave = function(data) {
	Aside.prototype._updateAfterSave.call(this, data);
	
	this._updateLayouts();
	
	$('#publish button.preview').attr('data-url', '/articles/' + this.type + 
												  '/' + this.subtype + 
												  '/' + data.saveId + 
												  '/' + this.url);
} 

Article.prototype._updateLayouts = function() {
	var $layouts = this._$this.find('.layout'),
		$imgs;
	
	$.each($layouts, function(index, layout) {
		var $layout = $(layout);
		
		$imgs = $layout.find('.img-proxy:visible');
		
		$layout.data('saveimgs', $imgs.length);
		$layout.attr('data-saveimgs', $layout.data('saveimgs'));
	});
}
 
Article.prototype._getLayouts = function(id) {
	var self = this;
	
	var $layouts = this._$this.find('.layout');
	
	this.layouts = [];
	
	if ($layouts.length) {
		$layouts.each(function(index, layout) {
			var layout = new Layout($(this).find('.center-col:visible')
										   .attr('id'));
										   
			layout._saveId = $(this).data('id');
		
			self.layouts.push(layout);
		
			if (self.subtype == 'review' && index == 0) {
				self.layouts[0].left = {object: self.prime.object,
										url: self.prime.tag_id,
										valign: 'top'}
			}
		});
	}

	return this.layouts;
}

Article.prototype._resetLayouts = function(isUpdate) {
	var $layouts = this._$this.find('.layout'),
		$appender = $('#article .Content');
	
	if ($layouts.length) {
		$layouts.remove();
	}
	
	if (!isUpdate) {
		add.addLayout($appender);
	}
}

Article.prototype._setLayouts = function(layouts) {
	var self = this;
	
	var $layouts = this._$this.find('.layout'),
		$appender = $('#article .Content');
	
	if ($layouts.length) {
		$layouts.remove();
	}
	
	if (layouts) {
		layouts.forEach(function(layout, index, arr) {
			layout.center = layout.center ? self._unescapeValue(layout.center) : null;
		
			add.addLayout($appender, {data: layout, object: self});
			
			self._saveLayoutsArray.push(layout.layout_id);
		});
	}
}

Article.prototype._getPreviewText = function(id) {
	var preview = null,
		i = 0;
	
	var $layouts = this._$this.find('.layout'),
		$layout = false;
	
	if ($layouts.length) {
		for (i = 0; i < this.layouts.length; i ++) {
			if ($('#article .layout').eq(i)
									 .find('.center-col:visible')
									 .find('p').length > 0 && 
				this.layouts[i].type == 'text') {
				
				$layout = $layouts.eq(i);
				
				break;
			}
		}
		
		/**
		 * If there is not text layout return false.
		 */
		 
		if (!$layout) return false;
		
		preview = $(CKEDITOR.instances[$layout
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

Article.prototype._uploadCaret = function() {
	if (this._$caretUpload.length <= 0) {
		return this._getImageValue(this._$caretInput);
	}
	
	if (!this._$caretUpload.val() || 
		!this._$caretUpload.data('new') || 
		this._$caretUpload.data('new') == 'false') {
		
		return this._getImageValue(this._$caretInput);
	}
	
	var $tags = this._$tagsInput.parents('label').find('.tag');

	var imgData = imgs.createBackgroundImgData(this._$caretUpload, 
											   $tags.eq(0).data().item.tag, 'caret');
	
	imgs.uploadImgs(imgData);
	
	return $tags.eq(0).data().item.tag + 
		   '-caret.' + 
		   this._$caretUpload.val().split('.').pop(); 
}




/** 
 * PUBLIC
 */

Article.prototype.validateContent = function() {
	Aside.prototype.validateContent.call(this);
	
	if (!this._isValid) return false;
	
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
	
	if (!this.shot || !this.wide || !this.caret) {
		this._isValid = false;
		
		admin.showAlert({message: 'Изберете основни картинки или изполвайте една и съща за всички.', 
						 status: 'error'});
		
		return false;
	}
	
	/**
	 * Make sure all images are set. Unfortunately there is no other way, 
	 * because the DB requires unique keys made from image tag and index.
	 */
	 
	var self = this,
		img; 
	
	var $imgs = $('#article .Content  .sublayout .img-proxy:visible .file input');
	
	$imgs.each(function(index, img) {
		img = self._getInputValue($(img)) || $(img).data('img');
		
		if (!img) {
			self._isValid = false;
		
			admin.showAlert({message: 'Някои картинки не са избрани.', 
							 status: 'error'});
			
			return false;
		}
	});
}

Article.prototype.save = function() {
	
	/**
	 * Prototype function is called below.
	 */
	
	this.wide = this._getImageValue(this._$wideInput);
	this.caret = this._uploadCaret();
	
	this.videoTech = this._getInputValue(this._$videoTechSelect, false);
	this.audioTech = this._getInputValue(this._$audioTechSelect, false);
	this.videoUrl = this._getInputValue(this._$videoUrlInput, false);
	this.audioFrame = this._getInputValue(this._$audioFrameInput, false);
	this.audioUrl = this._getInputValue(this._$audioUrlInput, false);
	this.hype = this._getInputValue(this._$hypeSelect, false);
	this.platform = this._getInputValue(this._$versionTestedSelect, false);
	
	this._saveWide = this._getInputValue(this._$saveWideInput);
	this._saveCaret = this._getInputValue(this._$saveCaretInput);
	this._saveCover = this._getInputValue(this._$saveCoverInput);
	
	/**
	 * Better, worse and equal can accept just one tag.
	 */
	
	this.better = this._getTypeaheadValue(this._$betterInput, false);
	this.worse = this._getTypeaheadValue(this._$worseInput, false);
	this.equal = this._getTypeaheadValue(this._$equalInput, false);
	this.betterText = this._getInputValue(this._$betterTextInput, false);
	this.worseText = this._getInputValue(this._$worseTextInput, false);
	this.equalText = this._getInputValue(this._$equalTextInput, false);
	
	this.cover = this._getImageValue(this._$coverInput);
	this.coverAlign = this._getInputValue(this._$coverAlignInput);
	this.coverValign = this._getInputValue(this._$coverValignInput);
	this.theme = this._getInputValue(this._$themeInput);
	this.subtheme = this._getInputValue(this._$subthemeInput);
	
	/**
	 * If there is image selection always use it.
	 * Otherwise take the last saved image.
	 */
	
	this.wide = this.wide || this._saveWide;
	this.caret = this.caret || this._saveCaret;
	this.cover = this.cover || this._saveCover;
	
	/**
	 * Either this or we validate in externally after save.
	 * Right now this is not a blocker, but will be,
	 * when there are dependencies on the prototype values.
	 * One way will be to have method to init variables,
	 * which can be extended on its own before validation.
	 */
	
	Aside.prototype.save.call(this);
			   
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

Article.prototype.resetData = function(isUpdate) {
	Aside.prototype.resetData.call(this, isUpdate);
	
	if (this._$subtypeInput.length) this._$subtypeInput.val('news').change();	
	if (this._$videoTechSelect.length) this._$videoTechSelect.val(null);
	if (this._$audioTechSelect.length) this._$audioTechSelect.val(null);
	if (this._$videoUrlInput.length) this._$videoUrlInput.val(null);
	if (this._$audioFrameInput.length) this._$audioFrameInput.val(null);
	if (this._$audioUrlInput.length) this._$audioUrlInput.val(null);
	if (this._$hypeSelect.length) this._$hypeSelect.val(70);
	if (this._$versionTestedSelect.length) this._$versionTestedSelect.val(1);
	
	if (this._$betterInput.length) this._$betterInput.tagsinput('removeAll');
	if (this._$worseInput.length) this._$worseInput.tagsinput('removeAll');
	if (this._$equalInput.length) this._$equalInput.tagsinput('removeAll');
	if (this._$betterTextInput.length) this._$betterTextInput.val(null);
	if (this._$worseTextInput.length) this._$worseTextInput.val(null);
	if (this._$equalTextInput.length) this._$equalTextInput.val(null);
	
	if (this._$coverAlignInput.length) this._$coverAlignInput.val('center');
	if (this._$coverValignInput.length) this._$coverValignInput.val('top');
	if (this._$themeInput.length) this._$themeInput.val(null);
	if (this._$subthemeInput.length) this._$subthemeInput.val('lighten');
	
	if (this._$wideInput.length) this._$wideInput.val(null);
	if (this._$caretInput.length) this._$caretInput.val(null);
	if (this._$coverInput.length) this._$coverInput.val(null);
	
	if (this._$saveWideInput.length) this._$saveWideInput.val(null).change();
	if (this._$saveCaretInput.length) this._$saveCaretInput.val(null).change();
	if (this._$saveCoverInput.length) this._$saveCoverInput.val(null).change();
	
	/**
	 * Remove image backgrounds.
	 */
	
	this._setImgValue(this._$wideInput, null);
	this._setImgValue(this._$caretInput, null);
	this._setImgValue(this._$coverInput, null);
}

Article.prototype.updateData = function(data) {
	Aside.prototype.updateData.call(this, data);
	
	this._setInputValue(this._$videoTechSelect, data.video_tech);
	this._setInputValue(this._$audioTechSelect, data.audio_tech);
	this._setInputValue(this._$videoUrlInput, data.video_url || null);
	this._setInputValue(this._$audioFrameInput, data.audio_frame || null);
	this._setInputValue(this._$audioUrlInput, data.audio_url || null);
	this._setInputValue(this._$hypeSelect, data.hype || 70);
	this._setInputValue(this._$versionTestedSelect, data.platform || 1);
	
	this._setTagsinputValue(this._$betterInput, data.better || null);
	this._setTagsinputValue(this._$worseInput, data.worse || null);
	this._setTagsinputValue(this._$equalInput, data.equal || null);
	this._setInputValue(this._$betterTextInput, data.better_text || null);
	this._setInputValue(this._$worseTextInput, data.worse_text || null);
	this._setInputValue(this._$equalTextInput, data.equal_text || null);
	
	this._setInputValue(this._$coverAlignInput, data.cover_align || null);
	this._setInputValue(this._$coverValignInput, data.cover_valign || null);
	this._setInputValue(this._$themeInput, data.theme || null);
	this._setInputValue(this._$subthemeInput, data.subtheme || null);
	
	this._setImgValue(this._$wideInput, data.wide_img || null);
	this._setImgValue(this._$caretInput, data.caret_img || null);
	this._setImgValue(this._$coverInput, data.cover_img || null);
	
	this._setInputValue(this._$saveWideInput, data.wide_img || null);
	this._setInputValue(this._$saveCaretInput, data.caret_img || null);
	this._setInputValue(this._$saveCoverInput, data.cover_img || null);
	
	$('#publish button.preview').attr('data-url', '/articles/' + data.type + 
									  '/' + data.subtype + 
									  '/' + data.article_id + 
									  '/' + data.url);
}

