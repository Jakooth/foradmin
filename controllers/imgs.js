function ImgsManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
		
	var imgsAPI = '/forapi/forsecure/imgs.php';
	
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
	
	$('#images').on('click', 'button.remove', function(e) {
		self.removeImage($(this));
	});
	
	$('#images').on('change', '.file input[type=file]', function(e) {
		self.addImage($(this), e);
	});
	
	$('#images').on('click', 'button.upload', function(e) {
		self.postShots();
	});
}