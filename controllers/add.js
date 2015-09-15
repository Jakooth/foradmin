function AddManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var gamePlatforms = 'data/platforms.json';
	
	
	
	
	
	
	
	
	/** 
	 * PUBLIC
	 */
	
	this.initAsideTextEditor = function() {
		if (!CKEDITOR.instances.textLayout_aside) {
			var asideEditor = CKEDITOR.inline('textLayout_aside', {
				extraPlugins: 'sourcedialog',
				toolbar: [
					{
						name: 'clipboard', 
						groups: [ 'clipboard', 'undo' ], 
						items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ]
					}, { 
						name: 'basicstyles', 
						groups: [ 'basicstyles', 'cleanup' ], 
						items: [ 'Bold', 'Italic', 'Underline', 'RemoveFormat' ] 
					}, { 
						name: 'links', 
						items: [ 'Link', 'Unlink' ] 
					}, { 
						name: 'Sourcedialog', 
						items: [ 'Sourcedialog' ] 
					}
				]
			});
			
			asideEditor.on('instanceReady', function(e) {	 
				e.editor.setReadOnly(false);
			});
		}
	}
	
	this.addLayout = function($appender) {
		var d1 = $.get('renderers/layout.html');
			
		$.when(d1).done(function(data1) {
			var html = data1,
				id = Math.round(Math.random() * 100000); 
			
			$appender.before(html);
			
			var $layout = $appender.prev();
			
			utils.convertSVG($layout.find('img.svg'));
			$layout.find('.textLayout').attr('id',  'textLayout_' + id);
			$layout.find('.imgLayout').attr('id',  'imgLayout_' + id);
			$layout.find('.insideLayout').attr('id',  'insideLayout_' + id);
			$layout.find('.insideLayoutText').attr('id',  'insideLayoutText_' + id);
			
			$(document).scrollTop($appender.offset().top);
			
			var textEditor = CKEDITOR.inline('textLayout_' + id, {
				extraPlugins: 'sourcedialog',
				toolbar: [
					{
						name: 'clipboard', 
						groups: [ 'clipboard', 'undo' ], 
						items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ]
					}, { 
						name: 'basicstyles', 
						groups: [ 'basicstyles', 'cleanup' ], 
						items: [ 'Bold', 'Italic', 'RemoveFormat' ] 
					}, { 
						name: 'paragraph', 
						groups: [ 'blocks' ], 
						items: [ 'Blockquote' ] 
					}, { 
						name: 'links', 
						items: [ 'Link', 'Unlink' ] 
					}, { 
						name: 'styles', 
						items: [ 'Format' ] 
					}, { 
						name: 'Sourcedialog', 
						items: [ 'Sourcedialog' ] 
					}
				]
			});
			
			var insideEditor = CKEDITOR.inline('insideLayoutText_' + id, {
				extraPlugins: 'sourcedialog',
				toolbar: [
					{
						name: 'clipboard', 
						groups: [ 'clipboard', 'undo' ], 
						items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ]
					}, { 
						name: 'basicstyles', 
						groups: [ 'basicstyles', 'cleanup' ], 
						items: [ 'Bold', 'Italic', 'RemoveFormat' ] 
					}, { 
						name: 'paragraph', 
						groups: [ 'blocks' ], 
						items: [ 'NumberedList', 'Blockquote' ] 
					}, { 
						name: 'links', 
						items: [ 'Link', 'Unlink' ] 
					}, { 
						name: 'styles', 
						items: [ 'Format' ] 
					}, { 
						name: 'Sourcedialog', 
						items: [ 'Sourcedialog' ] 
					}
				]
			});
			
			self.hideLayouts($layout);
			self.showLayout($layout, 'text');
			
			textEditor.on('instanceReady', function(e) {	 
				e.editor.setReadOnly(false);
			});
			
			insideEditor.on('instanceReady', function(e) {	 
				e.editor.setReadOnly(false);
			});
			
			admin.loadOptions($layout.find('.insideLayout .settings select:eq(1)'), 
							  'data/authors.json', 
							  'option');
		}).fail(function() {
			alert("Failed to load layout.");
		});
	}
	
	this.showLayout = function($appender, value) {
		$appender.find('.' + value + 'Layout').show();
		
		/**
		 * For images hide the side content.
		 */
		
		if (value == 'img' || value == 'inside') {
			$appender.addClass('fullscreen');
		} else {
			$appender.removeClass('fullscreen');
		}
	}
	
	this.hideLayouts =  function($appender) {
		$appender.find('.center-col').hide();
	}
	
	this.showSublayout = function($appender, value) {
		$appender.find('.' + value + 'Sublayout').show();
		$appender.data('sublayout', value);
		$appender.attr('data-sublayout', $appender.data('sublayout'));
	}
	
	this.hideSublayouts =  function($appender) {
		$appender.find('.sublayout').hide();
	}
	
	this.addPlatform = function($appender) {
		var d1 = $.get('renderers/box.html');
			
		$.when(d1).done(function(data1) {
			var html = data1;
			
			var $box = $appender.parents('.Box');
			
			$appender.before(html)
			
			$(document).scrollTop($appender.offset().top);
			
			admin.loadOptions($box.find('.platform:last-of-type select'), gamePlatforms, 'option');
			utils.convertSVG($box.find('img'));
		}).fail(function() {
			alert("Failed to load platforms.");
		});
	}
	
	this.removePlatform = function($appender) {
		$appender.parents('.platform').remove();
	}
	
	this.addTrack = function($appender) {
		var d1 = $.get('renderers/track.html');
			
		$.when(d1).done(function(data1) {
			var html = data1;
			
			var $box = $appender.parents('.Track'),
				$last;
			
			$appender.before(html);
			
			$last = $appender.prev();
			$last.data('index', $last.index() + 1);
			$last.attr('data-index', $last.data('index'))
			
			$(document).scrollTop($appender.offset().top);
		}).fail(function() {
			alert("Failed to load track.");
		});
	}
	
	this.removeTrack = function($appender) {
		$appender.parents('.track').remove();
	}
	
	this.removeLayout = function($appender) {
		var $layout = $appender.parents('.layout'),
			$cke = $layout.find('.cke_editable');
			
		var cke1 = $cke.eq(0).prop('id'),
			cke2 = $cke.eq(1).prop('id');
		
		$layout.remove();
		
		if ($cke.length > 0) {
			CKEDITOR.instances[cke1].destroy();
			CKEDITOR.instances[cke2].destroy();
		}
	}
	
	this.addImage = function($input, e) {
		var d1 = $.get('renderers/image.html');
		
		$.when(d1).done(function(data1) {
			var html = data1, 
				files = e.target.files, 
				i, f, reader;
				
			var $ul = $input.parents('[role=listbox]');
			
			for (i = 0; f = files[i]; i++) {
				if (!f.type.match('image.*')) {
					continue;
				}
				
				reader = new FileReader();
				
				reader.onload = function(e) {
					$ul.append(html);
					$ul.find('[role=option]:last-child img').attr('src', e.target.result);
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
	
	
	
	
	/** 
	 * INIT
	 */
	
	CKEDITOR.disableAutoInline = true;
	 
	 
	 
	
	
	
	
	/** 
	 * EVENTS
	 */
	
	/**
	 * ARTICLE
	 */
	
	$('.Content').on('click', '> button.add', function (e) {
		self.addLayout($(this));
	});
	
	/**
	 * Layout type selection.
	 */
	
	$('.Content').on('change', '.layout > select', function (e) {
		var $this = $(this),
			$layout = $this.parents('.layout'),
			$imgs = $this.parents('.layout').find('.center-col.imgLayout'),
			$inside = $this.parents('.layout').find('.center-col.insideLayout');
		
		self.hideLayouts($layout);
		self.showLayout($layout, $this.val());
		
		$imgs.find('> select').val('a1').change();
		$inside.find('> select').val('i1').change();
	});
	
	/**
	 * Sublayout type selection.
	 */
	
	$('.Content').on('change', '.layout .center-col > select', function (e) {
		var $this = $(this),
			$center = $this.parents('.center-col');
		
		self.hideSublayouts($center);
		self.showSublayout($center, $this.val());
		
		/**
		 * Default tracklist position.
		 */
		
		if ($this.val() == 'f3') {
			$center.find('.f3Sublayout select').val('bottom right').change();
		}
		
		/**
		 * Default text insde image position.
		 */
		
		if ($this.val() == 'i1') {
			$center.find('.settings select:nth-of-type(1)').val('top center').change();
		}
	});
	
	/**
	 * Image layout b1 with checkered images
	 */
	
	$('.Content').on('click', '.b2Sublayout button.add', function (e) {
		var $this = $(this),
			$layout = $this.parents('.sublayout'),
			$img = $layout.find('.img-proxy').first();
		
		$img.clone().insertAfter($img);
	});
	
	$('.Content').on('click', '.b2Sublayout button.remove', function (e) {
		var $this = $(this),
			$layout = $this.parents('.sublayout'),
			$imgs = $layout.find('.img-proxy');
		
		if ($imgs.length > 1) {
			$imgs.last().remove();
		}
	});
	
	/**
	 * Tracklist.
	 */
	
	$('.Content').on('change', '.tracklist select', function (e) {
		var $this = $(this);
		
		$this.parents('.tracklist').removeClass('left right top bottom')
								   .addClass($this.val());
	});
	
	/**
	 * Text inside image.
	 */
	
	$('.Content').on('change', '.insideLayout .settings select:nth-of-type(1)', function (e) {
		var $this = $(this);
		
		$this.parents('.insideLayout').removeClass('left right top bottom center')
								   	  .addClass($this.val());
	});
	
	/**
	 * 16:9.
	 */
	 
	$('.Content').on('change', '.img-proxy input[type=checkbox]', function (e) {
		var $this = $(this),
			$checkboxes = $this.parents('.sublayout').find('.img-proxy input[type=checkbox]');
		
		$checkboxes.prop('checked', $this.is(':checked'))
	}); 
	
	$('.Content').on('click', '.layout > button.remove', function (e) {
		self.removeLayout($(this));
	});
	
	$('#game, #article, #album, ' + 
	  '#movie, #aside, #eventm, ' + 
	  '#book, #person, #company,' +
	  '#character, #serie, #dlc').on('change', '.file input[type=file]', function (e) {
		var reader = new FileReader();
		
		var $file = $(e.target).parents('.file');
				
		reader.onload = function(e) {
			$file.css('background-image', 'url(' + e.target.result + ')');
		}
		
		reader.readAsDataURL(e.target.files[0]);
	});
	
	$('#images').on('click', 'button.remove', function (e) {
		self.removeImage($(this));
	});
	
	$('#images').on('change', '.file input[type=file]', function (e) {
		self.addImage($(this), e);
	});
	
	/**
	 * GAMES:GAME
	 */
	
	$('.Box').on('click', 'button.add', function (e) {
		self.addPlatform($(this));
	});
	
	$('.Box').on('click', 'button.remove', function (e) {
		self.removePlatform($(this));
	});
	
	/**
	 * MUSIC:ALBUM
	 */
	
	$('.Track').on('click', 'button.add', function (e) {
		self.addTrack($(this));
	});
	
	$('.Track').on('click', 'button.remove', function (e) {
		self.removeTrack($(this));
	});
}