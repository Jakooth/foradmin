function Layout(id) {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var $this = $('#' + id);
	var $layout = $this.parents('.layout');
	var $imgs = $this.find('.sublayout:visible .img-proxy');
	var $left = $layout.find('.left-col');
	var $right = $layout.find('.right-col');
	
	
	
	
	/** 
	 * PUBLIC
	 */
	
	this.id = id;
	this.subtype = "text";
	this.type = "text";
	this.center;
	this.left = false;
	this.right = false;
	this.imgs = [];
	this.ratio = false;
	
	this.setCenter = function() {
		self.center = CKEDITOR.instances[self.id].getData().replace(/\n/g, '');
	}
	
	this.setAside = function() {
		if ($left.data('type').length > 0) {
			self.left = {type: $left.data('type'), 
						 object: $left.data('object'), 
						 valign: $left.data('valign'), 
						 url: $left.data('url')};
		}
		
		if ($right.data('type').length > 0) {
			self.right = {type: $right.data('type'), 
						  object: $right.data('object'), 
						  valign: $right.data('valign'), 
						  url: $right.data('url')};
		}
	}
	
	this.setType = function() {
		self.type = $layout.find('> select').val();
	}
	
	this.setSubtype = function() {
		self.subtype = $this.find('> select').val();
	}


	
	
	/** 
	 * INIT
	 */
	 
	this.setType();
	
	if (this.type == 'text') {
		this.setCenter();
		this.setAside();
	} else if (this.type == 'img' || 
			   this.type == 'inside') {
		this.setSubtype();
		
		$imgs.each(function (index, value) {
			var $this = $(value),
				$p = $this.find('p'),
				$img = $this.find('input[type=file]'),
				$ratio = $this.find('input[type=checkbox]'),
				$video  = $this.find('input[type=text]'),
				$tracklist = $this.find('select'),
				$settings = false,
				$author = false
				$valign = false;	
				
			var img = $img.val(),
				id = Math.round(Math.random() * 100000),
				alt = $p.length == 0 ? "" : $p.html().replace(/br/g, 'br /'),
				ratio = $ratio.is(':checked') ? $ratio.val() : false,
				center = false,
				author = false,
				valign = false;
				
			if (self.type == 'inside') {
				$settings = $('#' + self.id).find('.settings');
				$author = $settings.find('select').eq(1);
				$valign = $settings.find('select').eq(0);
				
				valign = $valign.val();
				author = $author.val() == "" ? "" : $author.find(':selected').text();
				center = CKEDITOR.instances[self.id.replace('insideLayout', 
															'insideLayoutText')]
												   .getData()
												   .replace(/\n/g, '');
				
				
			}	
			
			self.ratio = ratio;
			self.imgs.push({tag: img.substring(img.lastIndexOf('\\') + 1, 
											   img.lastIndexOf('-')), 
							index: img.split('\\').pop().split('-').pop(), 
							pointer: $p.data('pointer'),
							video: $video.val(),
							player: id,
							alt: alt,
							ratio: ratio,
							center: center,
							author: author,
							valign: valign,
							tracklist: $tracklist.val()});
		});
	}
}