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
	this.subtype = "t";
	this.type = "text";
	this.center;
	this.left = null;
	this.right = null;
	this.imgs = [];
	this.ratio = '16-9';
	
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
				$settings = null,
				$author = null
				$valign = null;	
				
			var img = $img.val(),
				id = Math.round(Math.random() * 100000),
				alt = $p.length == 0 ? "" : $p.html().replace(/br/g, 'br /'),
				ratio = $ratio.is(':checked') ? $ratio.val() : '16-9',
				center = null,
				author = null,
				align = null,
				valign = null
				tracklist = null;
				
			if (self.type == 'inside') {
				$settings = $('#' + self.id).find('.settings');
				$author = $settings.find('select').eq(1);
				$valign = $settings.find('select').eq(0);
				
				/**
				 * To save the layout in the DB we need align and valign
				 * as separate values.
				 */
				align = $valign.val().split(' ')[1];
				valign = $valign.val().split(' ')[0];
				author = $author.val() == "" ? "" : $author.find(':selected').text();
				center = CKEDITOR.instances[self.id.replace('insideLayout', 
															'insideLayoutText')]
												   .getData()
												   .replace(/\n/g, '');
				
				if (self.subtype == "i3" && index < 2) {
					center = false;
				}
			}	
			
			if ($tracklist.length == 1) {
				
				/**
				 * Simply confirm there is a tracklist. 
				 * The link is derived from the prime tag.
				 */
				 
				if ($tracklist.val()) { 
					tracklist = true;
					align = $tracklist.val().split(' ')[1];
					valign = $tracklist.val().split(' ')[0]; 
				}
			}
			
			self.ratio = ratio;
			self.imgs.push({tag: img.substring(img.lastIndexOf('\\') + 1, 
											   img.lastIndexOf('-')), 
							index: img.split('\\').pop().split('-').pop(), 
							pointer: $p.data('pointer') || '',
							video: $video.val(),
							player: id,
							alt: alt,
							ratio: ratio,
							center: center,
							author: author,
							align: align,
							valign: valign,
							tracklist: tracklist});
		});
	}
}