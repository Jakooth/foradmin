function ImgsManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
		
	var imgsAPI = '/forapi/forsecure/imgs.php';
	
	var imagesSection = '#images',
		imagesList = imagesSection + ' [role=listbox]',
		imagesTagInput = imagesSection + 'TagInput';
		
	var _getTypeaheadValue = function(_$input) {
		return Fortag.prototype._getTypeaheadValue.call(self, _$input);
	}	
	
	var _getImgsByTag = function() {
		var imgsRequest = $.get(imgsAPI + '?tag=' + 
								_getTypeaheadValue($(imagesTagInput))[0].tag);
		
		admin.showAlert({message: 'Търся...', status: 'loading'});
		
		_renderImgsResult(imgsRequest);
	}
	
	var _renderImgsResult = function(data) {
		var getResult = data,
			getRenderer = $.get('renderers/image.html');
		
		$.when(getResult, getRenderer).done(function(resultData, renderData) {
			
			/**
			 * Result is either JSON from the GET
			 * or directly a parsed object from the POST.
			 */
			
			var data = resultData[0].length ? 
					   JSON.parse(resultData[0]) : 
					   resultData[0];
					   
			/**
			 * Remove "." and ".." from the result.
			 */
			 
			data = data.imgs.slice(0, data.imgs.length - 2);
			
			/**
			 * And also try to remove the "_extras" folder.
			 */
			
			if (data[data.length - 1] == '_extras') {
				data = data.slice(0, data.length - 1);
			}
			
			var tmpls = $.templates({
					imgsTemplate: renderData[0]
				}),
				html = $.templates
						.imgsTemplate
						.render(data, {parseImgTag: utils.parseImgTag,
									   preventCache: String(
													utils.today() + 
													utils.now()).replace(/[-:]|– |- /g, '')});
			
			$(imagesList).find('[role=option][data-new=false]').remove();				
			$(imagesList).append(html);
			
			if (window.admin.imgTarget) {
				$(imagesSection).find('[id="' + window.admin.imgTarget.data('img') + '"] [type=radio]')
								.prop('checked', true)
								.focus();
			}
			
			/**
			 * Update new images with the selected tag
			 * and recalculate the index.
			 */
			
			_setNewImgsTag();
			
			admin.hideAlert();
		}).fail(function(resultData) {
			var data = resultData[0].length ? JSON.parse(resultData[0]) : resultData[0];
			
			console.log(data);
		});
	}
	
	var _setImgValue = function(_$input, data) {
		Aside.prototype._setImgValue.call(self, _$input, data);
	}
	
	var _getTypeaheadValue = function(_$input) {
		return Fortag.prototype._getTypeaheadValue.call(self, _$input);
	}
	
	var _getInputValue = function(_$input) {
		return Fortag.prototype._getInputValue.call(self, _$input);
	}
	
	var _getLastIndex = function(notNew) {
		var $lastImg = $(imagesSection + ' [role=option]:nth-of-type(2)');
		
		if (notNew) {
			$lastImg = $(imagesSection + ' [role=option]:not([data-new=true]):eq(1)');
		}
		
		var index = $lastImg.length > 0 ? 
					Number(utils.parseImgIndex($lastImg.prop('id')).split('.')[0]) : 0;
		
		index ++;
		
		return index;
	}
	
	this._escapeValue = function(data) {
		return _escapeValue(data);
	}
	
	this._updateUpload = function(img, self, e) {
		var	progress = Math.ceil(((e.loaded) / e.total) * 100);
		
		if (progress > 100) {
			progress == 100;
		}
		
		img.target.find('[role=progressbar]').css('width', 100 - progress + '%');
	}
	
	var _setNewImgsTag = function() {
		var imgs = $(imagesSection).find('.img[data-new=true]'),
			imgIndex = _getLastIndex(true);
		
		$.each(imgs, function(index, img) {
			var $img = $(img);
			
			var tag = _getTypeaheadValue($(imagesTagInput))[0].tag;
			
			if (imgIndex <= 9) {
				imgIndex = '0' + imgIndex;
			}
			
			$img.prop('id', tag + '-' + imgIndex + '.jpg');
			$img.find('[type=radio]').prop('value', tag + '-' + imgIndex + '.jpg');
			$img.find('[type=checkbox]').prop('value', tag + '-' + imgIndex + '.jpg');

			imgIndex ++;
		});
	}
	
	var _escapeValue = function(data) {
	
		/**
		 * There is an error if you simple return quoted string.
		 * For this reason we return string object to string.
		 */
		
		return new String(Fortag.prototype._escapeValue
										  .call(this, data)).toString();
	}
	
	
	
	
	/** 
	 * PUBLIC
	 */ 
	
	this.addImage = function($input, e) {
		var imgGet = $.get('renderers/image.html');
		
		$.when(imgGet).done(function(imgHtml) {
			var tmpls = $.templates({
					imgsTemplate: imgHtml
				}),
				files = e.target.files;
				
			var $ul = $input.parents('[role=listbox]'),
				$li, $img;	
				
			var i, f, reader;	
					
			for (i = 0, f; f = files[i]; i++) {
				if (!f.type.match('image.*')) {
					continue;
				}
				
				reader = new FileReader();
				
				reader.onload = function(e) {
				
					/**
					 * Guess the index by looking at the last image.
					 * There is a small changes this will change after upload,
					 * but is not critical, because can be updated.
					 * The wrong image will be displayed immediately.
					 */
					
					var $lastImg = $(imagesSection + ' [role=option]:nth-of-type(2)');
					
					var tag = utils.parseImgTag($lastImg.prop('id'));
						imgIndex = _getLastIndex();
						
					if (imgIndex <= 9) {
						imgIndex = '0' + imgIndex;
					}	
					
					var data = [tag + '-' + imgIndex + '.jpg'],
						html = $.templates
								.imgsTemplate
								.render(data, {parseImgTag: utils.parseImgTag});
				
					if ($lastImg.length > 0) {
						$lastImg.before(html);
					} else {
						$ul.append(html);
					}
					
					$li = $ul.find('[role=option]:nth-of-type(2)');
					$img = $li.find('label img');
					
					$img.attr('src', e.target.result);
					$li.data('new', 'true');
					$li.attr('data-new', $li.data('new'));
					
					$li.find('[type=radio]:visible').prop('checked', true).focus();
				}
				
				reader.readAsDataURL(f);
			}
		}).fail(function() {
			alert("Failed to load images.");
		});
	}
	
	this.removeImage = function($appender) {
		var $option = $appender.parents('[role=option]');
		
		if ($option.data('new') == 'true') {
			$option.remove();
		} else {
			var img = {
				tag: utils.parseImgTag($option.prop('id')),
				img: $option.prop('id')
			}
			
			var searchRequest = $.ajax({
				type: "DELETE",
				contentType: "application/json; charset=utf-8",
				url: imgsAPI,
				data: JSON.stringify(img),
				dataType: 'json'
			});
			
			$option.remove();
		}
	}
	
	this.createImgsData = function() {
		var imgs = $(imagesSection).find('.img[data-new=true]'),
			arr = new Array();
		
		$.each(imgs, function(index, img) {
			var $img = $(img);
		
			arr.push({
				src: $img.find('img').prop('src'),
				target: $img,
				alt: $img.find('p').text(),
				path: $(imagesTagInput).tagsinput()[0].itemsArray[0].tag,
				type: 'shot',
				isGallery: $img.find('input').prop('checked')
			});
		});
		
		return arr;
	}
	
	this.createImgData = function($img, tag, type) {
		var arr = new Array();
		
		arr.push({
			src: $img.prop('src'),
			target: $img,
			path: tag,
			type: type,
			subtype: $img.data('subtype')
		});
		
		return arr;
	}
	
	this.createBackgroundImgData = function($input, tag, type) {
		var arr = new Array();
		
		arr.push({
			src: $input.parents('.file').css('background-image').slice(5, -2),
			target: $input,
			path: tag,
			type: type,
			subtype: $input.data('subtype')
		});
		
		return arr;
	}
	
	/**
	 * @imgs is in format [{src: 'data URL', 
	 * 					    target: 'DOM element',
	 *						type: 'shot, caret, tag or box'
	 *						subtype: 'poster, cover, ps4, win, etc.'
	 * 					    path: 'tag', 
	 * 					    alt: 'string', 
	 * 					    isGallery: 'boolean'}]
	 */
	
	this.uploadImgs = function(imgs) {
		var self = this;
		
		$.each(imgs, function(index, img) {
			var imgForm = new FormData(),
				imgFile = self.createFileFromData(img.src);
			
			imgForm.append('img', imgFile);
			imgForm.append('path', img.path);
			imgForm.append('type', img.type);
			imgForm.append('subtype', img.subtype);
			imgForm.append('alt', img.alt);
			imgForm.append('isGallery', img.isGallery);
			
			var xhr = new XMLHttpRequest();
			
			xhr.upload.addEventListener('progress', 
				self._updateUpload.bind(null, img, self), 
			false);
			
			xhr.onloadend = function(e) {
				var response = JSON.parse(e.target.response);
			
				img.target.data('new', 'false');
				img.target.attr('data-new', 'false');
				
				if (response.events.upload) {
					img.target.attr('aria-invalid', 'true');
					img.target.find('[role=progressbar]')
							  .css('width', '')
							  .text(response.events.upload.error);
						
					return;
				}
				
				if (window.admin.imgTarget) {
					var imgChoice = $(imagesSection).find('[name=imgChoice]:checked').val();
					
					if (imgChoice.indexOf(img.path) != -1) {
						_setImgValue(window.admin.imgTarget, imgChoice);
						
						window.admin.imgTarget.focus();
					}
				}
			};
			
			xhr.open("POST", imgsAPI);
			xhr.setRequestHeader('Authorization',  
							     'Bearer ' + localStorage.getItem('idToken')); 
			xhr.send(imgForm);
		});
	}
	
	this.createFileFromData = function(data) {
        var byteString,
			mimeString,
			bytesArray = [],
			i;
		
        if (data.split(',')[0].indexOf('base64') >= 0) {
            byteString = atob(data.split(',')[1]);
        }
        else {
            byteString = unescape(data.split(',')[1]);
        }

        mimeString = data.split(',')[0]
						 .split(':')[1]
						 .split(';')[0];
		
        for (i = 0; i < byteString.length; i++) {
            bytesArray.push(byteString.charCodeAt(i));
        }
		
        return new Blob(
            [new Uint8Array(bytesArray)],
            {type: mimeString}
        );
    }
	
	this.postShots = function() {
		var tag = _getTypeaheadValue($(imagesTagInput)),
			imgs = $(imagesSection).find('.img[data-new=true]'),
			isDialog = $('#images').parents('[role=dialog]').length > 0 ? true : false;
			
		if (!tag) {
			admin.showAlert({message: 'Изберете таг, към който да прикачите картинки.', 
							 status: 'error'});
			
			return false;
		}

		if (imgs.length <= 0 && !isDialog) {
			admin.showAlert({message: 'Не са избрани картинки за качване.', 
							 status: 'error'});
			
			return false;
		}
		
		var imgData = self.createImgsData();
		
		this.uploadImgs(imgData);
	}
	
	
	
	
	
	
	
	
	/** 
	 * EVENTS
	 */
	
	$(imagesSection).on('click', 'button.remove', function(e) {
		self.removeImage($(this));
	});
	
	$(imagesSection).on('click', '[role=option]', function(e) {
		$(this).find('[type=radio]').prop('checked', true).change();
	});
	
	$('#article, #aside').on('click', '.file input[type=file]', function(e) {
		var $this = $(this),
			$that = $('#articleCaretUpload'),
			$subtype = $('#articleSubtypeSelect');
		
		/**
		 * Right side of the caret will upload a new image.
		 * Rest the new indicator, if another image is selected.
		 */
		
		if ($this.prop('id') == 'articleCaretUpload') {
			return;
		} else {
			$that.data('new', 'false');
			$that.attr('data-new', 'false');
			
			e.preventDefault();
		}
		
		var id = $(this).parents('section').prop('id'),
			tags = _getTypeaheadValue($('#' + id + 'TagsInput'));
		
		admin.showSectionInWindow(imagesSection);
		
		$(imagesTagInput).tagsinput('removeAll');
		
		if (tags && $subtype.val() == 'review') {
			$(imagesTagInput).tagsinput('add', tags[0]);
		}
		
		window.admin.imgTarget = $this;
	});
	
	$('#article').on('change', '#articleCaretUpload', function(e) {
		var $this = $(this);
		
		/**
		 * Guarantee there is a selected tag,
		 * before uploading a caret.
		 */
		
		var $tags = $('#articleTagsInput').parents('label').find('.tag');
	
		if ($tags.length <= 0) {
			e.preventDefault();
			
			admin.showAlert({message: 'Трябва да изберте основен таг, преди да качите картинка за кара или да използвате вече качена.', 
						 status: 'error'});
						 
			return;
		}
		
		add.addImage(e);
	});
	
	$('#article').on('change', '.z2Sublayout [type=text]', function(e) {
		var $this = $(this),
			$proxy = $this.parents('.img-proxy'),
			$img = $proxy.find('[type=file]');
			
		var data = Math.round(Math.random() * 100000) + '-' + 
				   Math.round(Math.random() * 100000) + '.jpg';
		
		$img.parents('.file').css('background-image', 'url(' + $this.val() + ')');
		
		$img.data('img', data);
		$img.attr('data-img', $img.data('img'));	
	});
	
	$(imagesSection).on('change', '.file input[type=file]', function(e) {
		self.addImage($(this), e);
	});
	
	$(imagesSection).on('click', 'button.upload, button.ok', function(e) {
		self.postShots();
	});
	
	$(imagesSection).on('click', 'button.ok', function(e) {
		var $imgChoice = $(imagesSection).find('[role=option]:not([data-new=true]) [name=imgChoice]:checked');
		
		if ($imgChoice.length > 0) {
			_setImgValue(window.admin.imgTarget, $imgChoice.val());
				
			window.admin.imgTarget.focus();
		}
		
		admin.hideSectionInWindow($(imagesSection));
	});
	
	$(imagesSection).on('change', imagesTagInput, function(e) {
		if (!_getInputValue($(this))) {
			$(imagesList).find('.img[role=option]:not([data-new=true])').remove();
			
			return;
		}
		
		_getImgsByTag();
	});
}