function AddManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	var forplayAPI = '/forapi/forplay.php';
	var fotagsAPI = '/forapi/tags.php';
	
	var platforms = '/forapi/tags.php?object=platform';
	
	

	
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
	
	this.addImage = function(e) {
		var reader = new FileReader();
		
		var $this = $(e.target),
			$file = $this.parents('.file');
				
		reader.onload = function(e) {
			$file.css('background-image', 'url(' + e.target.result + ')');
			$this.data('new', 'true');
			$this.attr('data-new', $this.data('new'));
		}
		
		reader.readAsDataURL(e.target.files[0]);
	}
	
	this.addLayout = function($appender, data, isNew) {
		var getLayout = $.ajax({url: 'renderers/layout.html',
								dataType: 'html'});
			
		$.when(getLayout).done(function(layoutHtml) {
			var tmpls = $.templates({
					layoutTemplate: layoutHtml
				}),
				html = data ? $.templates.layoutTemplate
									     .render(data.data, {saveImgs: data.data.imgs ? 
											     data.data.imgs.length : 0}) : 
							  $.templates.layoutTemplate
										 .render({layout_id: null}),
				id = data ? data.data.layout_id : Math.round(Math.random() * 100000),
				insideAuthor = false;
				
			var $layout,
				$layouts,
				$add;
			 
			if ($appender.is('button.add')) {
				$appender.parents('.layout').after(html);
				
				$add = $appender.parents('.Add');
			} else  {
				$appender.append(html);
				
				$add = $appender;
			}
			
			if (data) {
				$layout = $appender.find('.layout[data-id=' + data.data.layout_id + ']');
			} else {
				if ($appender.is('button.add')) {
					$layout = $appender.parents('.layout').next('.layout');
				} else {
					$layout = $appender.find('.layout:last-of-type');
				}
				
				/**
				 * Assign order values.
				 */
				
				self.sortLayoutByOrder($add);
			}
			
			/**
			 * Insert before previous ID, if not the first.
			 * The problem is we load layouts asynchronously
			 * and the order is not guaranteed.
			 */
			
			$layouts = $add.find('.layout').sort(function (a, b) {
				var contentA = parseInt($(a).attr('data-order'));
				var contentB = parseInt($(b).attr('data-order'));
				
				return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
			});
			
			$add.find('.layout').remove();
			
			$add.append($layouts);
			
			/**
			 * Convert SVGs.
			 */
			 
			utils.convertSVG($layout.find('img.svg'));
			
			/**
			 * Set IDs.
			 */
			
			$layout.find('.textLayout').attr('id',  'textLayout_' + id);
			$layout.find('.imgLayout').attr('id',  'imgLayout_' + id);
			$layout.find('.insideLayout').attr('id',  'insideLayout_' + id);
			$layout.find('.insideLayoutText').attr('id',  'insideLayoutText_' + id);
			
			/**
			 * Set defaults.
			 */
			
			$layout.find('select').change();
			
			/**
			 * Scroll to to the new layout when adding.
			 */
			
			if (isNew) {
				$(document).scrollTop($layout.offset().top - 168);
			}
			
			/**
			 * Initialize editors.
			 */
			
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
			
			/**
			 * Set select values.
			 * This is only if we update with data from SQL.
			 */
			
			if (data) {
				$layout.find('> select:eq(0)')
					   .val(data.data.type).change();
				$layout.find('.center-col:visible > select:eq(0)')
					   .val(data.data.subtype).change();
				$layout.find('.center-col:visible .img-proxy [type=checkbox]')
					   .prop('checked', data.data.ratio == '16-10' ? true : false);
					   
					 
				var $left = $layout.find('.left-col:visible > button'),
					$right = $layout.find('.right-col:visible > button');
					
				var getAside,
					object,
					id;	

				if (data.data.left) {
					object = data.data.left_object;
					id = data.data.left;
				
					if (object == 'quote' || 
						object == 'review' || 
						object == 'feature' ||
						object == 'video' || 
						object == 'aside') {
						
						getAside = $.get(encodeURI(forplayAPI + '?tag=' + id));
					} else {
						getAside = $.get(encodeURI(fotagsAPI + '?tag=' + id + '&object=' + object));
					}
					
					$.when(getAside).done(function(getAsideData) {
						var data = getAsideData.length ? JSON.parse(getAsideData) : getAsideData,
							aside = data.articles ? data.articles[0] : data.tags[0];
						
						switch (aside.subtype) {
							case 'quote':
								$left.css('background-image', 
										  'url(../assets/tags/' + 
										  aside.shot_img);
								break;
							case 'review':
							case 'feature':
							case 'video':
							case 'aside':
								$left.css('background-image', 
										  'url(../assets/articles/' + 
										  utils.parseImgTag(aside.shot_img) + '/' +
										  aside.shot_img + ')');
								break;
							default:
								$left.css('background-image', 
										  'url(../assets/tags/' + 
										  aside.tag + '.jpg');
						}
					}).fail(function() {
						alert("Failed to load aside.");
					});
				}
				
				/**
				 * Set imgs one by one.
				 * We do not use renderer, because there are various layouts.
				 * To avoid some redundant functions we pass reference to the object.
				 */
				 
				if (data.data.imgs) {
					if (data.data.subtype == 'b2') {
						data.data.imgs.forEach(function(img, index, arr) {
							var $sublayout = $layout.find('.sublayout.' + data.data.subtype + 'Sublayout'),
								$img = $sublayout.find('.img-proxy').last(),
								$file = $img.find('[type=file]'),
								$alt = $img.find('> p:eq(0)');	
							
							/**
							 * Do not clone after the last image.
							 */
							
							if (index < data.data.imgs.length - 1) {
								$img.clone().insertAfter($img);
							}
							
							data.object._setImgValue($file, img.tag + '-' + img.index);
							
							$file.data('img', img.tag + '-' + img.index);
							$file.attr('data-img', $file.data('img'));
							
							$alt.html(img.alt ? data.object._unescapeValue(img.alt) : '');
						});
					} else {
						data.data.imgs.forEach(function(img, index, arr) {
							var $img = $layout.find('.sublayout .img-proxy:nth-of-type(' + (Number(img.order) + 1) + ')'),
								$file = $img.find('[type=file]'),
								$video = $img.find('.settings [type=text]:eq(0)'),
								$alt = $img.find('.settings > p:eq(0)'),
								$position = $layout.find('.insideLayout .settings select:nth-of-type(1), ' + 
														 '.sublayout .settings select:nth-of-type(1), ' +
														 '.tracklist select:nth-of-type(1)');
							
							data.object._setImgValue($file, img.tag + '-' + img.index);
							data.object._setInputValue($video, img.video || null);
							
							$file.data('img', img.tag + '-' + img.index);
							$file.attr('data-img', $file.data('img'));
							
							$alt.html(img.alt ? data.object._unescapeValue(img.alt) : '');
							
							if (img.center) CKEDITOR.instances['insideLayoutText_' + data.data.layout_id]
													.setData(data.object._unescapeValue(img.center));
							if (img.valign) data.object._setInputValue($position, img.valign + ' ' + img.align);
							
							/**
							 * There is no chance for multiple authors for multiple images.
							 * This is only for images with caret inside.
							 */
							 
							if (img.author) insideAuthor = img.author;
						});
					}	
				}
			} else {
				self.hideLayouts($layout);
				self.showLayout($layout, 'text');
			}
			
			textEditor.on('instanceReady', function(e) {	 
				e.editor.setReadOnly(false);
			});
			
			insideEditor.on('instanceReady', function(e) {	 
				e.editor.setReadOnly(false);
			});
			 
			admin.loadOptions($layout.find('.insideLayout .settings select:eq(1)'), 
										   '/forapi/tags.php?object=author', 
										   'option', insideAuthor);
		}).fail(function() {
			alert("Failed to load layout.");
		});
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
	
	this.moveLayoutUp = function($appender) {
		var $1 = $appender.parents('.layout'),
			$2 = $appender.parents('.layout').prev();
	
		$1.insertBefore($2);
		
		this.sortLayoutByOrder($appender.parents('.Add'));
	}
	
	this.moveLayoutDown = function($appender) {
		var $1 = $appender.parents('.layout'),
			$2 = $appender.parents('.layout').next();
		
		$1.insertAfter($2);
		
		this.sortLayoutByOrder($appender.parents('.Add'));
	}
	
	this.sortLayoutByOrder = function($add) {
		$.each($add.find('.layout'), function(index, layout) {
			var $layout = $(layout);
			
			$layout.data('order', index);
			$layout.attr('data-order', $layout.data('order'));
		});
	}
	
	this.showLayout = function($layout, value) {
		$layout.find('.' + value + 'Layout').show();
		
		/**
		 * For images hide the side content.
		 */
		
		if (value == 'img' || value == 'inside') {
			$layout.addClass('fullscreen');
		} else {
			$layout.removeClass('fullscreen');
		}
	}
	
	this.hideLayouts =  function($layout) {
		$layout.find('.center-col').hide();
	}
	
	this.showSublayout = function($center, value) {
		$center.find('.' + value + 'Sublayout').show();
		$center.data('sublayout', value);
		$center.attr('data-sublayout', $center.data('sublayout'));
	}
	
	this.hideSublayouts =  function($center) {
		$center.find('.sublayout').hide();
	}
	
	this.addPlatform = function($platform) {
		var getBox = $.get('renderers/box.html');
			
		$.when(getBox).done(function(boxHtmlData) {
			var tmpls = $.templates({
					boxTemplate: boxHtmlData
				}),
				html = $.templates.boxTemplate.render({
					label: $platform.attr('aria-label'),
					subtype: $platform.val(),
					tag: $('#gameTagInput').val(),
					id: $platform.data('id')
				});
			
			var $box = $('#game .Add.Box');
			
			$box.append(html);
		}).fail(function() {
			alert("Failed to load platforms.");
		});
	}
	
	this.removePlatform = function($platform) {
		var $box = $('#game .Add.Box');
		
		$box.find('[data-platform=' + $platform.val() + ']').remove();
	}
	
	this.addTrack = function($appender, data) {
		var self = this;
		
		var getTrack = $.get('renderers/track.html');
			
		$.when(getTrack).done(function(trackHtmlData) {
			var tmpls = $.templates({
					trackTemplate: trackHtmlData
				}),
				html = $.templates.trackTemplate.render(data);
			
			var $tracklist = $appender.parents('.Tracklist');
			
			$appender.before(html);
			
			self.updateTrackOrder($tracklist);
			
			$(document).scrollTop($appender.offset().top);
		}).fail(function() {
			alert("Failed to load track.");
		});
	}
	
	this.removeTrack = function($appender) {
		var $tracklist = $appender.parents('.Tracklist');
		
		$appender.parents('.track').remove();
		
		this.updateTrackOrder($tracklist);
	}
	
	this.updateTrackOrder = function($tracklist) {
		var $tracks = $tracklist.find('.track');
			
		$tracks.each(function(index, track) {
			var $track = $(track);
			
			$track.data('index', $track.index() + 1);
			$track.attr('data-index', $track.data('index'));
		});	
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
	
	$('.Content').on('click', '.layout > button.add', function(e) {
		self.addLayout($(this), false, true);
	});
	
	$('.Content').on('click', '.layout > button.remove', function(e) {
		self.removeLayout($(this));
	});
	
	$('.Content').on('click', '.layout > button.up', function(e) {
		self.moveLayoutUp($(this));
	});
	
	$('.Content').on('click', '.layout > button.down', function(e) {
		self.moveLayoutDown($(this));
	});
	
	/**
	 * Layout type selection.
	 */
	
	$('.Content').on('change', '.layout > select', function(e) {
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
	
	$('.Content').on('change', '.layout .center-col > select', function(e) {
		var $this = $(this),
			$center = $this.parents('.center-col');
		
		self.hideSublayouts($center);
		self.showSublayout($center, $this.val());
	});
	
	/**
	 * Image layout b1 with checkered images
	 */
	
	$('.Content').on('click', '.b2Sublayout button.add', function(e) {
		var $this = $(this),
			$layout = $this.parents('.sublayout'),
			$img = $layout.find('.img-proxy').last();
		
		$img.clone().insertAfter($img);
	});
	
	$('.Content').on('click', '.b2Sublayout button.remove', function(e) {
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
	
	$('.Content').on('change', '.tracklist select', function(e) {
		var $this = $(this);
		
		$this.parents('.tracklist').removeClass('left right top bottom')
								   .addClass($this.val());
	});
	
	/**
	 * Text inside image.
	 */
	
	$('.Content').on('change', '.insideLayout .settings select:nth-of-type(1)', function(e) {
		var $this = $(this);
		
		$this.parents('.insideLayout').removeClass('left right top bottom center')
								   	  .addClass($this.val());
	});
	
	/**
	 * 16:9.
	 */
	 
	$('.Content').on('change', '.img-proxy input[type=checkbox]', function(e) {
		var $this = $(this),
			$checkboxes = $this.parents('.sublayout').find('.img-proxy input[type=checkbox]');
		
		$checkboxes.prop('checked', $this.is(':checked'))
	}); 
	
	$('#game, #band, #album, ' + 
	  '#movie, #eventm, #dlc, ' + 
	  '#book, #person, #company,' +
	  '#character, #serie, #tv').on('change', '.file input[type=file]', function(e) {
	  
		self.addImage(e);
	});
	
	/**
	 * GAMES:GAME
	 */
	
	$('#game').on('change', '#gamePlatformGroup [type=checkbox]', function(e) {
		var $this = $(this);
		
		if ($this.prop('checked')) {
			self.addPlatform($(this));
		} else {
			self.removePlatform($(this));
		}
	});
	
	/**
	 * MUSIC:ALBUM
	 */
	
	$('.Tracklist').on('click', 'button.add', function(e) {
		self.addTrack($(this), {name: '', data: '', order: ''});
	});
	
	$('.Tracklist').on('click', 'button.remove', function(e) {
		self.removeTrack($(this));
	});
}