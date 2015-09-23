function AdminManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var objects = 'data/settings/objects.json';
	var subtype = 'data/settings/subtype.json';
	var type = 'data/settings/type.json';
	var hype = 'data/settings/hype.json';
	var theme = 'data/settings/theme.json';
	var subtheme = 'data/settings/subtheme.json';
	var gameGenres = 'data/gamegenres.json';
	var musicGenres = 'data/musicgenres.json';
	var gamePlatforms = 'data/platforms.json';
	var movieGenres = 'data/moviegenres.json';
	var bookGenres = 'data/bookgenres.json';
	var countries = 'data/settings/countries.json';
	
	var bloodhound = function(data, key) {
		return new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace('text', 'value'),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			
			/**
			 * Append some random numuber, to makes sure
			 * the data source is not cached.
			 * TODO: Remove this in the final version,
			 * otherwise it will slow down performance.
			 * Local storage DB ca be cleared from here in Chrome:
			 * chrome://settings/cookies#cont
			 */
			 
			prefetch: data + '?v=' + Math.round(Math.random() * 100000)
		});
	}
	
	var initTypeAhead = function(data, 
								 text, 
								 input, 
								 displayKey) {
		data.initialize();
 
		$(input).typeahead({
			hint: true,
			highlight: true,
			minLength: 1
		}, {
		  	itemValue: 'value',
  			itemText: displayKey || 'text',
			name: text,
		  	displayKey: displayKey || 'text',
		  	source: data.ttAdapter()
		});
	}
	
	var initTagInput = function(data, 
								text, 
								input, 
								maxTags, 
								displayKey) {
		data.initialize();
		
		$(input).tagsinput({
			maxTags: maxTags || null,
			itemValue: 'value',
  			itemText: displayKey || 'text',
			typeaheadjs: [{
      			hint: true,
				highlight: true
			}, {
				name: text,
				displayKey: displayKey || 'text', 
				source: data.ttAdapter()
			}],
			freeInput: false
		});
	}
	
	var initStickersTagInput = function(data, 
								text, 
								input, 
								maxTags, 
								displayKey) {
		data.initialize();
		
		$(input).tagsinput({
			maxTags: maxTags || null,
			itemValue: 'value',
  			itemText: displayKey || 'text',
			typeaheadjs: [{
      			hint: true,
				highlight: true
			}, {
				name: text,
				displayKey: displayKey || 'text', 
				source: data.ttAdapter(),
				templates: {
					suggestion: function(data) {
						return $.templates('<p class="sticker" style="background-image: ' + 
										   'url(../assets/icons/' + 
										   '{{:lib}}/' + 
										   '{{:subtype}}/svg/000000/transparent/' + 
										   '{{:value}}.svg)">{{:text}}</p></div>').render(data);
					}
				}
			}],
			freeInput: false
		});
	}

	
	var games = bloodhound('data/objects/games.json');
	var stickers = bloodhound('data/stickers.json');
	var companies = bloodhound('data/objects/companies.json');
	var issues = bloodhound('data/issues.json');
	var series = bloodhound('data/objects/series.json');
	var movies = bloodhound('data/objects/movies.json');
	var authors = bloodhound('data/authors.json');
	var characters = bloodhound('data/objects/characters.json');
	var persons = bloodhound('data/objects/persons.json');
	var music = bloodhound('data/objects/music.json');
	var books = bloodhound('data/objects/books.json');
	
	/**
	 * Merging all tags into a single data source.
	 * This is in several places, where tags can be from multiple sources.
	 */
	
	var initTagsTagInput = function() {
		var d1 = $.get('data/objects/movies.json'),
			d2 = $.get('data/objects/games.json'),
			d3 = $.get('data/objects/companies.json'),
			d4 = $.get('data/objects/characters.json'),
			d5 = $.get('data/objects/music.json'),
			d6 = $.get('data/objects/series.json'),
			d7 = $.get('data/objects/persons.json'),
			d8 = $.get('data/objects/books.json');
			
		$.when(d1, 
			   d2, 
			   d3, 
			   d4, 
			   d5, 
			   d6,
			   d7,
			   d8).done(function(data1, 
								 data2, 
								 data3,
								 data4,
								 data5,
								 data6,
								 data7,
								 data8) {
			self.allTags = new Bloodhound({
				datumTokenizer: Bloodhound.tokenizers.obj.whitespace('text', 'value'),
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				local: data1[0].concat(data2[0])
							   .concat(data3[0])
							   .concat(data4[0])
							   .concat(data5[0])
							   .concat(data6[0])
							   .concat(data7[0])
							   .concat(data8[0])
			});
			
			self.allTags.initialize();
			
			$('#publishTagsInput, ' + 
			  '#personRelatedInput, ' +
			  '#imagesTagInput, ' + 
			  '#searchTagInput, ' + 
			  '#characterRelatedInput').tagsinput({
				maxTags: null,
				itemValue: 'value',
				itemText: 'value',			 
				typeaheadjs: [{
					hint: true,
					highlight: true
				}, {
					name: 'allTags',
					displayKey: 'value', 
					source: self.allTags.ttAdapter()
				}],
				freeInput: false
			});
		}).fail(function() {
			alert("Failed to load tags.");
		});
	}
	
	/**
	 * Merging games and movie for better, worse and equal.
	 */
	
	var initTagsBWEInputs = function() {
		var d1 = $.get('data/objects/movies.json'),
			d2 = $.get('data/objects/games.json');
			
		$.when(d1, 
			   d2).done(function(data1, 
								 data2) {
			self.bweTags = new Bloodhound({
				datumTokenizer: Bloodhound.tokenizers.obj.whitespace('text', 'value'),
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				local: data1[0].concat(data2[0])
			});
			
			self.bweTags.initialize();
			
			$('#articleBetterInput, ' +
			  '#articleWorseInput, ' +
			  '#articleEqualInput').tagsinput({
				maxTags: 1,
				itemValue: 'value',
				itemText: 'value',			 
				typeaheadjs: [{
					hint: true,
					highlight: true
				}, {
					name: 'bweTags',
					displayKey: 'value', 
					source: self.bweTags.ttAdapter()
				}],
				freeInput: false
			});
		}).fail(function() {
			alert("Failed to load tags.");
		});
	}
	
	
	
	
	/** 
	 * PUBLIC
	 */
	
	this.allTags;
	this.bweTags;
	this.selectTarget = null;
	this.publishTarget = null;
	
	this.loadOptions = function(target, data, renderer) {
		var tmpl = $.get('renderers/' + renderer + '.html'),
			data = $.get(data.prefetch ? data.prefetch.url : data);
		
		$.when(tmpl, data).done(function(tmpl, data) {
			var tmpls = $.templates({
					tmpl: tmpl[0]
				}),
				html = $.templates.tmpl.render(data[0]);
			
			target.append(html);
		}).fail(function() {
			alert("Failed to load options.");
		});
	}
	
	this.hideSections = function() {
		$('section').hide();
	}
	
	this.showSection = function(section, isBreadcrumb) {
		var $section = $(section);
		
		self.hideSections();
		
		if (section == "#main") {
			$('header').removeClass('compact');
			$('header h1').addClass('clip');
			$('header h1 a').attr('tabindex', -1);
			$('header nav').removeClass('clip');
			$('header .breadcrumb').addClass('clip');
			$('header [role=toolbar]').removeClass('clip');
			
			self.removeAllBreadcrumbs();
		} else {
			$('header').addClass('compact');
			$('header h1').removeClass('clip');
			$('header h1 a').attr('tabindex', 0);
			$('header nav').addClass('clip');
			$('header .breadcrumb').removeClass('clip');
			$('header [role=toolbar]').addClass('clip');
			
			if (isBreadcrumb) {
				self.removeBreadcrumb();
			} else {
				self.addBreadcrumb($section);
			}
			
			$section.show();
			$section.find('h2').addClass('clip');
			
			/**
			 * If the section with the CKEDITOR is not visible,
			 * all edit buttons will be disabled.
			 */
			
			if (section == "#aside") {
				add.initAsideTextEditor();
			}
		}
	}
	
	this.showOverlay = function() {
		$('.Overlay').show();
	}
	
	this.hideOverlay = function() {
		$('.Overlay').hide();
	}
	
	this.showSectionInWindow = function(view) {
		var get1 = $.get('renderers/window.html');
			
		$.when(get1).done(function(data1) {
			var html = $(data1).append($(view).show());
			
			self.showOverlay();
			
			$('body').append(html);
			$('.Window :tabbable').eq(1).focus();
			$(window).scrollTop(0);
		}).fail(function() {
			alert("Failed to load window.");
		});
	}
	
	this.showAlert = function(message) {
		var $alert = $('.Alert');
		
		/**
		 * Allow only once instance of an alert.
		 */
		
		if ($alert.is(':visible')) {
			$alert.find('div:first-of-type')
				  .removeClass()
				  .addClass(message.status);
			$alert.find('p').html(message.message);
			
			return false;
		}
		
		var get1 = $.get('renderers/alert.html');
			
		$.when(get1).done(function(data1) {
			var tmpls = $.templates({
					notification: data1
				}),
				html = $.templates.notification.render(message);
			
			self.showOverlay();
			
			$('body').append(html);
			$('.Alert :tabbable').eq(1).focus();
			$(window).scrollTop(0);
		}).fail(function() {
			alert("Failed to load alert.");
		});
	}
	
	this.hideSectionInWindow = function($view) {
		$('main').append($view.hide());
		$('.Window').remove();
		
		self.hideOverlay();
	}
	
	this.addBreadcrumb = function($section) {
		if ($('.breadcrumb li').length != 2) {
			var d1 = $.get('renderers/breadcrumb.html');
			
			$.when(d1).done(function(data1) {
				var html = $(data1);
				
				$('.breadcrumb a').removeClass('active');
				
				$section.find('h2 a').clone().addClass('active').appendTo(html);
				$('.breadcrumb').append(html);
			}).fail(function() {
				alert("Failed to load window.");
			});
		}
	}
	
	this.removeBreadcrumb = function() {
		$('.breadcrumb li:last-child').remove();
		$('.breadcrumb li:last-child a').addClass('active');
	}
	
	this.removeAllBreadcrumbs = function() {
		$('.breadcrumb li').remove();
	}
	
	
	
	
	/** 
	 * INIT
	 */
	 
	this.loadOptions($('#companyTypeSelect'), type, 'option');
	this.loadOptions($('#genreTypeSelect'), type, 'option');
	this.loadOptions($('#personTypeSelect'), type, 'option');
	this.loadOptions($('#characterTypeSelect'), type, 'option');
	this.loadOptions($('#serieTypeSelect'), type, 'option');
	
	initTagInput(games, 'games', '#dlcRelatedInput', 1);
	initTagInput(persons, 'persons', '#bandRelatedInput', 1);
	
	/**
	 * ASIDE
	 */
	 
	this.loadOptions($('#asideTypeSelect'), type, 'option');
	
	initTagInput(authors, 'authors', '#asideAuthorsInput');
	
	/**
	 * ARTICLE
	 */
	
	this.loadOptions($('#articleSubtypeSelect'), subtype, 'option');
	this.loadOptions($('#articleHypeSelect'), hype, 'option');
	this.loadOptions($('#articleTypeSelect'), type, 'option');
	this.loadOptions($('#articleVersionTestedSelect'), gamePlatforms, 'option');
	this.loadOptions($('#articleThemeSelect'), theme, 'option');
	this.loadOptions($('#articleSubthemeSelect'), subtheme, 'option');
	
	initTagInput(authors, 'authors', '#articleAuthorsInput');
	initTagInput(issues, 'issues', '#publishIssueInput', 1, 'value');
	initTagsTagInput();
	initTagsBWEInputs();
	
	/**
	 * URL & SEARCH
	 */
	
	this.loadOptions($('#urlTypeSelect'), type, 'option');
	this.loadOptions($('#searchObjectSelect'), objects, 'option');
	this.loadOptions($('#urlOjbectSelect'), objects, 'option');
	
	/**
	 * QUOTE
	 */
	
	initTagInput(characters, 'characters', '#quoteCharacterInput');
	
	/**
	 * MOVIES::MOVIE
	 */
	
	this.loadOptions($('#movieGenreGroup'), movieGenres, 'checkbox');
	
	initTagInput(series, 'series', '#movieSerieInput', 1);
	initStickersTagInput(stickers, 'stickers', '#movieStickersInput');
	initTagInput(movies, 'movies', '#movieSimilarInput');
	initTagInput(persons, 'persons', '#movieCastInput');
	initTagInput(persons, 'persons', '#movieDirectorInput');
	initTagInput(persons, 'persons', '#movieWriterInput');
	initTagInput(persons, 'persons', '#movieCameraInput');
	initTagInput(persons, 'persons', '#movieMusicInput');
	
	/**
	 * GAMES::GAME
	 */
	
	this.loadOptions($('#gameGenreGroup'), gameGenres, 'checkbox');
	this.loadOptions($('#gamePlatformGroup'), gamePlatforms, 'checkbox');
	
	initTagInput(series, 'series', '#gameSerieInput', 1);
	initStickersTagInput(stickers, 'stickers', '#gameStickersInput');
	initTagInput(companies, 'companies', '#gamePublisherInput', 1);
	initTagInput(companies, 'companies', '#gameDeveloperInput', 1);
	initTagInput(games, 'games', '#gameSimilarInput');
	
	/**
	 * MUSIC::ALBUM
	 */
	
	this.loadOptions($('#albumGenreGroup'), musicGenres, 'checkbox');
	this.loadOptions($('#albumCountrySelect'), countries, 'option');
	
	initTagInput(music, 'music', '#albumArtistInput');
	initStickersTagInput(stickers, 'stickers', '#albumStickersInput');
	initTagInput(music, 'music', '#albumSimilarInput');
	
	/**
	 * MUSIC::EVENT
	 */
	
	this.loadOptions($('#eventGenreGroup'), musicGenres, 'checkbox');
	this.loadOptions($('#eventCountrySelect'), countries, 'option');
	
	initTagInput(music, 'music', '#eventArtistInput');
	initTagInput(series, 'series', '#eventSerieInput', 1);
	initStickersTagInput(stickers, 'stickers', '#eventStickersInput');
	initTagInput(music, 'music', '#eventSimilarInput');
	
	/**
	 * BOOKS::BOOK
	 */
	
	this.loadOptions($('#bookGenreGroup'), bookGenres, 'checkbox');
	this.loadOptions($('#bookCountrySelect'), countries, 'option');
	
	initTagInput(persons, 'persons', '#bookArtistInput');
	initTagInput(persons, 'persons', '#bookTranslatorInput');
	initTagInput(series, 'series', '#bookSerieInput', 1);
	initStickersTagInput(stickers, 'stickers', '#bookStickersInput');
	initTagInput(books, 'books', '#bookSimilarInput');
	
	
	
	
	
	
	
	
	/** 
	 * EVENTS
	 */
	
	/**
	 * Views
	 */
	
	$(window).on('load', function(e) {
		$('img.svg').each(function() {
			utils.convertSVG($(this));
		});
		
		self.showSection(window.location.hash);
		
		/**
		 * Default input values.
		 */
		
		$('#articleTypeSelect').val('games').change();
		$('#articleSubtypeSelect').val('news').change();
		$('#articleVideoTechSelect').val('').change();
		$('#articleAudioTechSelect').val('').change();
		$('#articleBgHSelect').val('center').change();
		$('#articleBgVSelect').val('top').change();
		$('#articleThemeSelect').val('').change();
		$('#articleSubthemeSelect').val('FFFFFF').change();
		$('#publishDateInput').val(utils.today());
		$('#publishTimeInput').val(utils.now());
	});
	
	$('body').on('click', 'nav a:not(.active), header a:not(.active)', function(e) {
		self.showSection($(this).attr('href'), $(this).parents().hasClass('breadcrumb'));
	});
	
	/**
	 * Header
	 */
	
	$('header').on('click', 'button.search', function(e) {
		self.showSection('#search');
	});
	
	$('header').on('click', 'button.logout', function(e) {
		window.location.href = "login.html";
	});
	
	/**
	 * Focus
	 */
	
	$('form').on('focus', '.bootstrap-tagsinput input', function(e) {
		$(this).parents('.bootstrap-tagsinput').addClass('focus');
	});
	
	$('form').on('blur', '.bootstrap-tagsinput input', function(e) {
		$(this).parents('.bootstrap-tagsinput').removeClass('focus');
	});
	
	/**
	 * Windows
	 */
	
	$('body').on('click', '.Window button', function(e) {
		self.hideSectionInWindow($(this).parents('section'));
	});
	
	$('body').on('click', '.Window h2 a', function(e) {
		e.preventDefault();
	});
	
	$('form').on('click', '.create', function(e) {
		e.preventDefault();
		self.showSectionInWindow($(this).attr('href'));
	});
	
	$('section:not(#publish)').on('click', 'button.publish', function(e) {
		e.preventDefault();
		self.showSectionInWindow('#publish');
	});
	
	$('body').on('click', '.Window #search button.ok', function(e) {
		var img = $('#search input:checked').parents('label').find('img').attr('src');														 
		window.admin.selectTarget.focus();
		window.admin.selectTarget.find('input').val(img);
		window.admin.selectTarget.css('background-image', 'url(' + img + ')');
	});
	 
	/**
	 * Article & Publish
	 */
	 
	$('#article').on('click', '.select', function(e) {
		e.preventDefault();
		self.showSectionInWindow('#url');
		
		window.admin.selectTarget = $(this);
	});
	
	$('#url').on('click', 'button.save', function(e) {
		var $objectInput = $('#urlOjbectSelect'),
			$urlInput = $('#urlUrlInput'),
			$vInput = $('#urlVSelect'),
			$col = window.admin.selectTarget.parents('.inline-col');
		
		var type = $objectInput.val().split(',')[0],
			object = $objectInput.val().split(',')[1],
			url = $urlInput.val().split('\\').pop().split('.')[0],
			v = $vInput.val();
		
		window.admin.selectTarget.focus();
		
		$col.data('type', type);
		$col.attr('data-type', $col.data('type'));
		$col.data('object', object);
		$col.attr('data-object', $col.data('object'));
		$col.data('url', url);
		$col.attr('data-url', $col.data('url'));
		$col.data('valign', v);
		$col.attr('data-valign', $col.data('valign'));
		
		/**
		 * Loading the object for preview only.
		 * If it is a quote show the character images.
		 */
		
		var d1 = $.get('../data/' + type + '/' + 
					   				object + '/' + 
									url + '.xml');
			
		$.when(d1).done(function(data1) {
			var aside = $.xml2json(data1);
			
			switch (object) {
				case 'quote':
					window.admin.selectTarget.css('background-image', 
												  'url(../assets/characters/' + 
												  aside.character.tag + 
												  '.png)');
					break;
				case 'caret':
					window.admin.selectTarget.css('background-image', 
												  'url(../assets/articles/' + 
												  aside.main.tag +
												  '/' +
												  aside.main.tag +
												  '-' +
												  aside.main +
												  ')');
					break;
			}
		}).fail(function() {
			alert("Failed to load aside.");
		});
	});
	
	$('#article').on('change', '#articleTypeSelect, #articleSubtypeSelect', function(e) {
		var $reviewRegion = $('#articleReviewRegion'),
			$aVRegion = $('#articleAVRegion'),
			$audioTechSelect = $('#articleAudioTechSelect').parents('label'),
			$gameRegion = $('#articleReviewRegion').children(':gt(0)'),
			$versionTested = $('#articleVersionTestedSelect').parents('.two-cols');
		
		var type = $('#articleTypeSelect').val(),
			subtype = $('#articleSubtypeSelect').val(); 
		
		$aVRegion.hide();
		$audioTechSelect.hide();
		$aVRegion.find('select').val('').change();
		$reviewRegion.hide();
		$gameRegion.hide();
		$versionTested.hide();
		
		if ((subtype == 'review' || subtype == 'video') && type == 'games') {
			$reviewRegion.show();
			$gameRegion.show();
			$versionTested.show();
		}
		
		if ((subtype == 'review' || subtype == 'video') && type == 'movies') {
			$reviewRegion.show();
			$gameRegion.show();
			$versionTested.hide();
		}
		
		if ((subtype == 'review' || subtype == 'video') && type == 'music') {
			$reviewRegion.show();
		}
		
		if (subtype == "news") {
			$aVRegion.show();
			$audioTechSelect.show();
		}
		
		if (subtype == "video") {
			$aVRegion.show();
		}
	});
	
	$('#article').on('change', '#articleVideoTechSelect', function(e) {
		var $videoTechSelect = $('#articleVideoUrlInput').parents('label');
																
		if ($(this).val() == "") {
			$videoTechSelect.hide();
		} else {
			$videoTechSelect.show();
		}
	});
	
	$('#article').on('change', '#articleAudioTechSelect', function(e) {
		var $audioFrameSelect = $('#articleAudioFrameInput').parents('label')
			$audioUrlSelect = $('#articleAudioUrlInput').parents('label');
																
		if ($(this).val() == "") {
			$audioFrameSelect.hide();
			$audioUrlSelect.hide();
		} else {
			$audioFrameSelect.show();
			$audioUrlSelect.show();
		}
	});
	
	$('#article').on('change', '#articleBgHSelect, #articleBgVSelect', function(e) {
		$('#article .h-preview').css('background-position', $('#articleBgHSelect')
					   			.val() + ' ' + $('#articleBgVSelect').val());
		$('#article .v-preview').css('background-position', $('#articleBgHSelect')
					   			.val() + ' ' + $('#articleBgVSelect').val());
		$('#article .Main .file:eq(0)').css('background-position', $('#articleBgHSelect')
					   				   .val() + ' ' + $('#articleBgVSelect').val());
	});
	
	$('#article').on('change', '#articleThemeSelect', function(e) {
		var $this = $(this);
		
		var t1 = $this.find(':selected').text(),
			t2 = $('#articleSubthemeSelect').find(':selected').text(),
			v1 = $this.val() || "",
			v2 = $('#articleSubthemeSelect').val() || "";
		
		if (v1.length && v2.length) {
			t1 += " ";
			t1 += t2;
		} else if (!v1.length && v2.length) {
			t1 = t2;
		}
																
		$('#article').removeClass().addClass(t1);
	});
	
	$('#article').on('change', '#articleSubthemeSelect', function(e) {
		var $this = $(this);
		
		var t2 = $this.find(':selected').text(),
			t1 = $('#articleThemeSelect').find(':selected').text(),
			v2 = $this.val() || "",
			v1 = $('#articleThemeSelect').val() || "";
		
		if (v1.length && v2.length) {
			t1 += " ";
			t1 += t2;
		} else if (!v1.length && v2.length) {
			t1 = t2;
		}
		
		$('#article').removeClass().addClass(t1);
	});
	
	$('#article').on('click', 'button.save, button.publish', function(e) {
		var a = new Article();
		
		a.save();
		
		window.admin.publishTarget = a;
		
		/**
		 * By default all news with video go with priority.
		 */
		
		if (a.video) {
			$('#publishPrioritySelect').val('video').change();
		}
		
		$('#publishPrioritySelect').prop('disabled', false);
		
		console.log(window.admin.publishTarget);
	});
	
	$('#publish').on('click', 'button.publish', function(e) {
		var isArticle = $('#article').is(':visible');
		
		window.admin.publishTarget.publish();
		
		if (isArticle) {
			window.admin.publishTarget.hypeToString();
		}
		
		self.showSection('#xml');
		
		if (isArticle) {
			utils.xml(window.admin.publishTarget, 'article', '#xmlCodeOutput');	
		} else {
			utils.xml(window.admin.publishTarget, 'aside', '#xmlCodeOutput');	
		}
		
		console.log(window.admin.publishTarget);
	});
	
	$('#publish').on('change', '#publishTagsInput', function(e) {
		window.admin.publishTarget.setUrl();													  
															  
		$('#publishUrlInput').parents('label').find('span')
							 .contents().last()
							 .replaceWith(window.admin.publishTarget.url);
	});
	
	$('#quote').on('click', 'button.save', function(e) {
		var o = new Quote();
		
		o.save();
		
		self.showSectionInWindow('#xml');
		utils.xml(o, 'quote', '#xmlCodeOutput');	
		
		console.log(o);
	});
	
	/**
	 * Objects
	 */
	
	$('#aside').on('click', 'button.save, button.publish', function(e) {
		var a = new Aside();
		
		a.save();
		
		window.admin.publishTarget = a;

		$('#publishPrioritySelect').prop('disabled', true);
		
		console.log(window.admin.publishTarget);
	});
	
	
	$('main').on('keyup', '[id*=EnNameInput]',  function(e) {
		var $this = $(this);												 
														 
		$this.parents('form').find('[id*=TagInput]')
							 .val(utils.formatTag($this.val()));
	});
	
	$('#game, #movie, #album, ' + 
	  '#event, #book, #platform, ' +
	  '#genre').on('click', 'button.save', function(e) {
		
		var id = $(this).parents('section').prop('id'),
			o;
			
		switch (id) {
			case 'game':
				var o = new Game(id);
				
				break;
			case 'movie':
				var o = new Movie(id);
				
				break;
			case 'album':
				var o = new Album(id);
				
				break;
			case 'event':
				var o = new Event(id);
				
				break;
			case 'book':
				var o = new Platform(id);
				
				break;
			case 'platform':
				var o = new Platform(id);
				
				break;
			case 'genre':
				var o = new Genre(id);
				
				break;	
		}
		
		o.save();
		o.post();
	});
	
	$('#company, #person, #character, ' + 
	  '#serie, #dlc, #band').on('click', 'button.save', function(e) {
		  
		var o = new Fortag($(this).parents('section').prop('id'));
		
		o.save();
		o.post();
	});
}