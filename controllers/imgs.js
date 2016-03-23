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
						.render(data, {parseImgTag: utils.parseImgTag});
			
			$(imagesList).find('[role=option][data-new=false]').remove();				
			$(imagesList).append(html);
			
			if (window.admin.imgTarget) {
				$(imagesSection).find('[id="' + window.admin.imgTarget.data('img') + '"] [type=radio]')
								.prop('checked', true)
								.focus();
			}
			
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
	
	this._escapeValue = function(data) {
		return _escapeValue(data);
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
			var html = imgHtml, 
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
					$ul.append(html);
					
					$li = $ul.find('[role=option]:last-child');
					$img = $li.find('img');
					
					$img.attr('src', e.target.result);
					$li.data('new', 'true');
					$li.attr('data-new', $li.data('new'));
				}
				
				reader.readAsDataURL(f);
			}
		}).fail(function() {
			alert("Failed to load images.");
		});
	}
	
	this.removeImage = function($appender) {
		$appender.parents('[role=option]').remove();
	}
	
	this.createImgsData = function() {
		var imgs = $('#images').find('.img[data-new=true]'),
			arr = new Array();
		
		$.each(imgs, function(index, img) {
			var $img = $(img);
		
			arr.push({
				src: $img.find('img').prop('src'),
				target: $img,
				alt: $img.find('p').text(),
				path: $('#imagesTagInput').tagsinput()[0].itemsArray[0].tag,
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
			
			xhr.open("POST", imgsAPI);
			xhr.setRequestHeader('Authorization',  
							     'Bearer ' + localStorage.getItem('userToken')); 
			xhr.send(imgForm);
			
			/**
			 * TODO: On success set the data-new attribute to false;
			 * TODO: Error check for over 2MB.
			 */
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
	
		/**
		 * TODO: Validate tag input is empty.
		 * TODO: Validate images are not selected.
		 */
		
		var imgData = self.createImgsData();
		
		this.uploadImgs(imgData);
	}
	
	
	
	
	
	
	
	
	/** 
	 * EVENTS
	 */
	
	$(imagesSection).on('click', 'button.remove', function(e) {
		self.removeImage($(this));
	});
	
	$('#article, #aside').on('click', '.file input[type=file]', function(e) {
		e.preventDefault();
		
		var $this = $(this);
		
		var id = $(this).parents('section').prop('id'),
			tags = _getTypeaheadValue($('#' + id + 'TagsInput'));
		
		admin.showSectionInWindow(imagesSection);
		
		if (tags) {
			$(imagesTagInput).tagsinput('removeAll');
			$(imagesTagInput).tagsinput('add', tags[0]);
		}
		
		window.admin.imgTarget = $this;
	});
	
	$(imagesSection).on('change', '.file input[type=file]', function(e) {
		self.addImage($(this), e);
	});
	
	$(imagesSection).on('click', 'button.upload', function(e) {
		self.postShots();
	});
	
	$(imagesSection).on('click', 'button.ok', function(e) {
		var img = $(imagesSection).find('[name=imgChoice]:checked').val();
	
		_setImgValue(window.admin.imgTarget, img);
		
		window.admin.imgTarget.data('img', img);
		window.admin.imgTarget.attr('data-img', window.admin.imgTarget.data('img'));
		window.admin.imgTarget.focus();
		
		admin.hideSectionInWindow($(imagesSection));
	});
	
	$(imagesSection).on('change', imagesTagInput, function(e) {
		if (!_getInputValue($(this))) return;
		
		_getImgsByTag();
	});
}