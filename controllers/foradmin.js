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
	var gameGenres = 'http://localhost/forapi/get.php?object=genre&type=games';
	var musicGenres = 'http://localhost/forapi/get.php?object=genre&type=music';
	var platforms = 'http://localhost/forapi/get.php?object=platform';
	var movieGenres = 'http://localhost/forapi/get.php?object=genre&type=movies';
	var bookGenres = 'http://localhost/forapi/get.php?object=genre&type=books';
	var countries = 'http://localhost/forapi/get.php?object=country';
	
	var bloodhound = function(data, nameField) {
		var nameField = nameField || 'en_name';
		
		return new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace(nameField, 'tag'),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			initialize: false,
			
			/**
			 * Local storage DB can be cleared from here in Chrome:
			 * chrome://settings/cookies#cont
			 */
			 
			prefetch: {url: data, transform: function(data) {
				return data.tags;
			}}
		});
	}
	
	this._bloodhound = function(data, nameField) {
		return bloodhound(data, nameField);
	}
	
	var _createObject = function(id) {
		var o;
		
		switch (id) {
			case 'game':
				o = new Game(id);
				
				break;
			case 'movie':
				o = new Movie(id);
				
				break;
			case 'album':
				o = new Album(id);
				
				break;
			case 'event':
				o = new Happening(id);
				
				break;
			case 'book':
				o = new Platform(id);
				
				break;
			case 'platform':
				o = new Platform(id);
				
				break;
			case 'genre':
				o = new Genre(id);
				
				break;
			case 'sticker':
				o = new Sticker(id);
				
				break;
			default:
				o = new Fortag(id);
		}
		
		return o;
	}
	
	this._createObject = function(id) {
		return _createObject(id);
	}
	
	var initTypeAhead = function(data, 
								 text, 
								 input, 
								 displayKey) {
		
		var promise = data.initialize(true);
		
		promise.done(function() {
			$(input).typeahead({
				hint: true,
				highlight: true,
				minLength: 1
			}, {
				itemValue: 'tag',
				itemText: displayKey || 'en_name',
				name: text,
				displayKey: displayKey || 'en_name',
				source: data.ttAdapter()
			});
		}).fail(function() {
			/**
			 * TODO: Fail logic.
			 */
		});
	}
	
	this._initTagInput = function(data, 
								  text, 
								  input, 
								  maxTags, 
								  displayKey) {
								  
		initTagInput(data, text, input, maxTags, displayKey);
	}
	
	var initTagInput = function(data, 
								text, 
								input, 
								maxTags, 
								displayKey) {
		
		var promise = data.initialize(true);
		
		promise.done(function() {
			$(input).tagsinput({
				maxTags: maxTags || null,
				itemValue: 'tag',
				itemText: displayKey || 'en_name',
				typeaheadjs: [{
					hint: true,
					highlight: true
				}, {
					name: text,
					displayKey: displayKey || 'en_name', 
					source: data.ttAdapter()
				}],
				freeInput: false
			});
		}).fail(function() {
			/**
			 * TODO: Fail logic.
			 */
		});	
	}
	
	/**
	 * TODO: Everything is the same like the @initTagInput, but
	 * there is a template renderer function.
	 * Try to move this function as an argument or something.
	 */
	
	var initStickersTagInput = function(data, 
								text, 
								input, 
								maxTags, 
								displayKey) {
		
		var promise = data.initialize(true);
		
		promise.done(function() {
			$(input).tagsinput({
				maxTags: maxTags || null,
				itemValue: 'tag',
				itemText: displayKey || 'name',
				typeaheadjs: [{
					hint: true,
					highlight: true
				}, {
					name: text,
					displayKey: displayKey || 'name', 
					source: data.ttAdapter(),
					templates: {
						suggestion: function(data) {
							return $.templates('<div class="sticker" style="background-image: ' + 
											   'url(../assets/icons/' + 
											   '{{:lib}}/' + 
											   '{{:subtype}}/svg/000000/transparent/' + 
											   '{{:tag}}.svg)">{{:name}}</div>').render(data);
						}
					}
				}],
				freeInput: false
			});				 
		}).fail(function() {
			/**
			 * TODO: Fail logic.
			 */
		});
	}

	var games = bloodhound('http://localhost/forapi/get.php?object=game');
	var stickers = bloodhound('http://localhost/forapi/get.php?object=sticker');
	var companies = bloodhound('http://localhost/forapi/get.php?object=company');
	var issues = bloodhound('http://localhost/forapi/get.php?object=issue', 'name');
	var series = bloodhound('http://localhost/forapi/get.php?object=serie');
	var movies = bloodhound('http://localhost/forapi/get.php?object=movie');
	var authors = bloodhound('http://localhost/forapi/get.php?object=author');
	var characters = bloodhound('http://localhost/forapi/get.php?object=character');
	var persons = bloodhound('http://localhost/forapi/get.php?object=person');
	var music = bloodhound('http://localhost/forapi/get.php?type=music');
	var books = bloodhound('http://localhost/forapi/get.php?object=book');
	var tags = bloodhound('http://localhost/forapi/get.php');
	
	/**
	 * Clear cache and reinitialize tag input.
	 * The goal it to update typeahead data, after adding new tag.
	 */
	
	this.updateTypeahead = function() {		
		games.clearPrefetchCache();
		stickers.clearPrefetchCache();
		companies.clearPrefetchCache();
		issues.clearPrefetchCache();
		series.clearPrefetchCache();
		movies.clearPrefetchCache();
		authors.clearPrefetchCache();
		characters.clearPrefetchCache();
		persons.clearPrefetchCache();
		music.clearPrefetchCache();
		books.clearPrefetchCache();
		tags.clearPrefetchCache();
		
		/**
		 * TODO: Try to simplify this process.
		 */
		 
		$("#bookArtistInput").tagsinput('destroy');
		$("#bookTranslatorInput").tagsinput('destroy');
		$("#bookSerieInput").tagsinput('destroy');
		$("#bookStickersInput").tagsinput('destroy');
		$("#bookRelatedInput").tagsinput('destroy');
		
		$("#eventArtistInput").tagsinput('destroy');
		$("#eventSerieInput").tagsinput('destroy');
		$("#eventStickersInput").tagsinput('destroy');
		$("#eventRelatedInput").tagsinput('destroy');
		$("#albumArtistInput").tagsinput('destroy');
		$("#albumStickersInput").tagsinput('destroy');
		$("#albumRelatedInput").tagsinput('destroy');
		
		$("#gameSerieInput").tagsinput('destroy');
		$("#gameStickersInput").tagsinput('destroy');
		$("#gamePublisherInput").tagsinput('destroy');
		$("#gameDeveloperInput").tagsinput('destroy');
		$("#gameRelatedInput").tagsinput('destroy');
		
		$("#movieSerieInput").tagsinput('destroy');
		$("#movieStickersInput").tagsinput('destroy');
		$("#movieRelatedInput").tagsinput('destroy');
		$("#movieCastInput").tagsinput('destroy');
		$("#movieDirectorInput").tagsinput('destroy');
		$("#movieWriterInput").tagsinput('destroy');
		$("#movieCameraInput").tagsinput('destroy');
		$("#movieMusicInput").tagsinput('destroy');
		
		$("#articleAuthorsInput").tagsinput('destroy');
		$("#publishIssueInput").tagsinput('destroy');
		$("#publishTagsInput").tagsinput('destroy');
		$("#articleBetterInput").tagsinput('destroy');
		$("#articleWorseInput").tagsinput('destroy');
		$("#articleEqualInput").tagsinput('destroy');
		$("#asideAuthorsInput").tagsinput('destroy');
		$("#imagesTagInput").tagsinput('destroy');
		$("#personRelatedInput").tagsinput('destroy');
		$("#characterRelatedInput").tagsinput('destroy');
		$("#dlcRelatedInput").tagsinput('destroy');
		$("#bandRelatedInput").tagsinput('destroy');
		
		initTagInput(persons, 'persons', '#bookArtistInput');
		initTagInput(persons, 'persons', '#bookTranslatorInput');
		initTagInput(series, 'series', '#bookSerieInput', 1);
		initStickersTagInput(stickers, 'stickers', '#bookStickersInput');
		initTagInput(books, 'books', '#bookRelatedInput');
		
		initTagInput(music, 'music', '#eventArtistInput');
		initTagInput(series, 'series', '#eventSerieInput', 1);
		initStickersTagInput(stickers, 'stickers', '#eventStickersInput');
		initTagInput(music, 'music', '#eventRelatedInput');
		initTagInput(music, 'music', '#albumArtistInput');
		initStickersTagInput(stickers, 'stickers', '#albumStickersInput');
		initTagInput(music, 'music', '#albumRelatedInput');
		
		initTagInput(series, 'series', '#gameSerieInput', 1);
		initStickersTagInput(stickers, 'stickers', '#gameStickersInput');
		initTagInput(companies, 'companies', '#gamePublisherInput', 1);
		initTagInput(companies, 'companies', '#gameDeveloperInput', 1);
		initTagInput(games, 'games', '#gameRelatedInput');
		
		initTagInput(series, 'series', '#movieSerieInput', 1);
		initStickersTagInput(stickers, 'stickers', '#movieStickersInput');
		initTagInput(movies, 'movies', '#movieRelatedInput');
		initTagInput(persons, 'persons', '#movieCastInput');
		initTagInput(persons, 'persons', '#movieDirectorInput');
		initTagInput(persons, 'persons', '#movieWriterInput');
		initTagInput(persons, 'persons', '#movieCameraInput');
		initTagInput(persons, 'persons', '#movieMusicInput');
		
		initTagInput(authors, 'authors', '#articleAuthorsInput');
		initTagInput(issues, 'issues', '#publishIssueInput', 1, 'name');
		initTagInput(tags, 'tags', '#publishTagsInput');
		initTagInput(tags, 'tags', '#articleBetterInput', 1);
		initTagInput(tags, 'tags', '#articleWorseInput', 1);
		initTagInput(tags, 'tags', '#articleEqualInput', 1);
		initTagInput(authors, 'authors', '#asideAuthorsInput');
		initTagInput(tags, 'tags', '#imagesTagInput');
		initTagInput(tags, 'tags', '#personRelatedInput');
		initTagInput(tags, 'tags', '#characterRelatedInput');
		initTagInput(games, 'games', '#dlcRelatedInput', 1);
		initTagInput(persons, 'persons', '#bandRelatedInput', 1);
	}
	
	
	
	
	/** 
	 * PUBLIC
	 */
	
	this.selectTarget = null;
	this.publishTarget = null;
	
	this.loadOptions = function(target, data, renderer) {
		var tmpl = $.get('renderers/' + renderer + '.html'),
			data = $.get(data.prefetch ? data.prefetch.url : data);
		
		$.when(tmpl, data).done(function(tmpl, data) {
			var tmpls = $.templates({
					tmpl: tmpl[0]
				}),
				html,
				json;
			
			/**
			 * Data from PHP need to be parsed first.
			 * Otherwise tags are available as property in a json file.
			 */
			
			if (!data[0].tags) {
				json = JSON.parse(data[0]).tags;
			} else {
				json = data[0].tags;
			}
			
			html = $.templates.tmpl.render(json, {getId: utils.getObjectPropertyByIndex});
				
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
		
		$('body').trigger({
			type: 'sectionshow',
			section: section.split('#')[1]
		});
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
			$('[role=dialog] :tabbable').eq(1).focus();
			$(window).scrollTop(0);
		}).fail(function() {
			alert("Failed to load window.");
		});
	}
	
	this.showAlert = function(message) {
		var $alert = $('[role=alertdialog]');
		
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
	
	this.hideAlert = function() {
		$('[role=alertdialog]').remove();
		
		self.hideOverlay();
	}
	
	this.hideSectionInWindow = function($view) {
		
		/**
		 * Alerts do not have associated view section.
		 */
		 
		if ($view.length <= 0) {
			$('[role=alertdialog]').remove();
		} else {
			$('main').append($view.hide());
			$('[role=dialog]').remove();
		}
		
		/**
		 * There is a case where we validate a dialog.
		 * Hide the alert, but keep the overlay,
		 * if a dialog is still open.
		 */
		
		if ($('[role=dialog]:visible').length <= 0) {
			self.hideOverlay();
		}
	}
	
	this.addBreadcrumb = function($section) {
		if ($('.breadcrumb li').length != 2) {
			var d1 = $.get('renderers/breadcrumb.html');
			
			$.when(d1).done(function(data1) {
				var html = $(data1);
				
				$('.breadcrumb a').removeClass('active');
				
				$section.find('h2 a').clone().addClass('active').appendTo(html);
				$('.breadcrumb ul').append(html);
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
	
	this.setDefaults = function() {
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
		$('#publishPrioritySelect').val('');
		
		var $hidden = $('[type=hidden]');
		
		$hidden.each(function(index, hidden) {
			var $this = $(hidden);
			
			$this.parents('label').find('b').text($this.val() || 'hidden');
		});
	}
	
	
	
	
	/** 
	 * INIT
	 */
	 
	this.loadOptions($('#companyTypeSelect'), type, 'option');
	this.loadOptions($('#genreTypeSelect'), type, 'option');
	this.loadOptions($('#personTypeSelect'), type, 'option');
	this.loadOptions($('#characterTypeSelect'), type, 'option');
	this.loadOptions($('#serieTypeSelect'), type, 'option');
	
	initTagInput(tags, 'tags', '#imagesTagInput');
	initTagInput(tags, 'tags', '#personRelatedInput');
	initTagInput(tags, 'tags', '#characterRelatedInput');
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
	this.loadOptions($('#articleVersionTestedSelect'), platforms, 'option');
	this.loadOptions($('#articleThemeSelect'), theme, 'option');
	this.loadOptions($('#articleSubthemeSelect'), subtheme, 'option');
	
	initTagInput(authors, 'authors', '#articleAuthorsInput');
	initTagInput(issues, 'issues', '#publishIssueInput', 1, 'name');
	initTagInput(tags, 'tags', '#publishTagsInput');
	initTagInput(tags, 'tags', '#articleBetterInput', 1);
	initTagInput(tags, 'tags', '#articleWorseInput', 1);
	initTagInput(tags, 'tags', '#articleEqualInput', 1);
	
	/**
	 * URL & SEARCH
	 */
	
	this.loadOptions($('#urlTypeSelect'), type, 'option');
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
	initTagInput(movies, 'movies', '#movieRelatedInput');
	initTagInput(persons, 'persons', '#movieCastInput');
	initTagInput(persons, 'persons', '#movieDirectorInput');
	initTagInput(persons, 'persons', '#movieWriterInput');
	initTagInput(persons, 'persons', '#movieCameraInput');
	initTagInput(persons, 'persons', '#movieMusicInput');
	
	/**
	 * GAMES::GAME
	 */
	
	this.loadOptions($('#gameGenreGroup'), gameGenres, 'checkbox');
	this.loadOptions($('#gamePlatformGroup'), platforms, 'checkbox');
	
	initTagInput(series, 'series', '#gameSerieInput', 1);
	initStickersTagInput(stickers, 'stickers', '#gameStickersInput');
	initTagInput(companies, 'companies', '#gamePublisherInput', 1);
	initTagInput(companies, 'companies', '#gameDeveloperInput', 1);
	initTagInput(games, 'games', '#gameRelatedInput');
	
	/**
	 * MUSIC::ALBUM
	 */
	
	this.loadOptions($('#albumGenreGroup'), musicGenres, 'checkbox');
	this.loadOptions($('#albumCountrySelect'), countries, 'option');
	
	initTagInput(music, 'music', '#albumArtistInput');
	initStickersTagInput(stickers, 'stickers', '#albumStickersInput');
	initTagInput(music, 'music', '#albumRelatedInput');
	
	/**
	 * MUSIC::EVENT
	 */
	
	this.loadOptions($('#eventGenreGroup'), musicGenres, 'checkbox');
	this.loadOptions($('#eventCountrySelect'), countries, 'option');
	
	initTagInput(music, 'music', '#eventArtistInput');
	initTagInput(series, 'series', '#eventSerieInput', 1);
	initStickersTagInput(stickers, 'stickers', '#eventStickersInput');
	initTagInput(music, 'music', '#eventRelatedInput');
	
	/**
	 * BOOKS::BOOK
	 */
	
	this.loadOptions($('#bookGenreGroup'), bookGenres, 'checkbox');
	this.loadOptions($('#bookCountrySelect'), countries, 'option');
	
	initTagInput(persons, 'persons', '#bookArtistInput');
	initTagInput(persons, 'persons', '#bookTranslatorInput');
	initTagInput(series, 'series', '#bookSerieInput', 1);
	initStickersTagInput(stickers, 'stickers', '#bookStickersInput');
	initTagInput(books, 'books', '#bookRelatedInput');
	
	
	
	
	
	
	
	
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
		
		self.setDefaults();
	});
	
	$('body').on('change', '[type=hidden]', function(e) {
		var $this = $(this);
			
		$this.parents('label').find('b').text($this.val());
	});
	
	$('body').on('click', 'nav a:not(.active), header a:not(.active)', function(e) {
		$this = $(this);																		
																				
		self.showSection($this.attr('href'), $this.parents().hasClass('breadcrumb'));
		
		self.setDefaults();
	});
	
	/**
	 * Header
	 */
	
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
	
	$('body').on('click', '[role*=dialog] button', function(e) {
		var $this = $(this);													
		
		/**
		 * Do not hide the dialog if there is validation message.
		 * Hide it if this is an alert or cancel button.
		 */
		 
		if (window.admin.publishTarget) {
			if (window.admin.publishTarget._isValid || 
				$this.parents('[role=alertdialog]').length > 0 ||
				$this.hasClass('cancel')) {
				
				self.hideSectionInWindow($this.parents('section'));
			} else {
				return false;
			}
		}
		
		/**
		 * First case is only for publish section.
		 */
		 
		if ($this.parents('[role=alertdialog]').length > 0 ||
			$this.hasClass('cancel')) {
			
			self.hideSectionInWindow($this.parents('section'));
		}
	});
	
	$('body').on('click', '[role=dialog] h2 a', function(e) {
		e.preventDefault();
	});
	
	$('form').on('click', '.create', function(e) {
		e.preventDefault();
		self.showSectionInWindow($(this).attr('href'));
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
	
	$('#aside').on('click', 'button.save, button.publish', function(e) {
		e.preventDefault();
		
		var a = new Aside('aside');
		
		a.save();
		
		window.admin.publishTarget = a;
		
		if (!a._isValid) return false;
		
		self.showSectionInWindow('#publish');

		$('#publishPrioritySelect [value=aside]').prop('disabled', false);
		$('#publishPrioritySelect [value=cover]').prop('disabled', true);
		$('#publishPrioritySelect [value=video]').prop('disabled', true);
		$('#publishPrioritySelect [value=review]').prop('disabled', true);
		$('#publishPrioritySelect [value=feature]').prop('disabled', true);
		
		console.log(window.admin.publishTarget);
	});
	
	$('#article').on('click', 'button.save, button.publish', function(e) {
		e.preventDefault();
		
		var a = new Article('article');
		
		a.save();
		
		window.admin.publishTarget = a;
		
		if (!a._isValid) return false;
		
		self.showSectionInWindow('#publish');
		
		/**
		 * By default all news with video go with priority.
		 */
		
		if (a.videoUrl) {
			$('#publishPrioritySelect').val('video').change();
		}
		
		$('#publishPrioritySelect [value=aside]').prop('disabled', true);
		$('#publishPrioritySelect [value=cover]').prop('disabled', false);
		$('#publishPrioritySelect [value=video]').prop('disabled', false);
		$('#publishPrioritySelect [value=review]').prop('disabled', false);
		$('#publishPrioritySelect [value=feature]').prop('disabled', false);
		
		console.log(window.admin.publishTarget);
	});
	
	$('#publish').on('click', 'button.publish', function(e) {
		var isArticle = $('#article').is(':visible');
		
		/**
		 * There is no longer difference between the two.
		 * Keeping this code just in case.
		 */
		
		if (isArticle) {
			window.admin.publishTarget.post();	
		} else {
			window.admin.publishTarget.post();
		}
		
		console.log(window.admin.publishTarget);
	});
	
	$('#publish').on('change', '#publishTagsInput', function(e) {
		window.admin.publishTarget._setPrimeAndUrl();													  
															  
		$('#publishUrlInput').parents('label').find('b')
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
	
	$('main').on('keyup', '[id*=EnNameInput]',  function(e) {
		var $this = $(this);												 
														 
		$this.parents('form').find('[id*=TagInput]')
							 .val(utils.formatTag($this.val()));
	});
	
	$('main').on('change', '[type=hidden]',  function(e) {
		var $this = $(this);												 
														 
		$this.next('span').find('b').text($this.val());
	});
	
	$('main').on('change', '[id*=sticker]',  function(e) {
		var $this = $(this);
		
		var tag = $('#stickerTagInput').val(),
			lib = $('#stickerLibInput').val(),
			subtype = $('#stickerSubtypeSelect').val();
														 
		$this.parents('section').find('.Main .file')
			 .css('background-image', 
				  'url(../assets/icons/' + 
				   lib + '/' + 
				   subtype + '/svg/000000/transparent/' + 
				   tag + '.svg)');
	});
	
	$('main').on('change', '#stickerMainInput',  function(e) {
		var $this = $(this);
		
		var tag = utils.parseSticker($this.val()),
			enName = utils.parseStickerName(tag);
		
		$('#stickerTagInput').val(tag);
		$('#stickerEnNameInput').val(enName);
	});
	
	$('#game, #movie, #album, ' + 
	  '#event, #book, #platform, ' +
	  '#genre, #sticker').on('click', 'button.save', function(e) {
		
		var id = $(this).parents('section').prop('id'),
			o = _createObject(id);
		
		o.save();
		o.post();
	});
	
	$('#company, #person, #character, ' + 
	  '#serie, #dlc, #band').on('click', 'button.save', function(e) {
		  
		var id = $(this).parents('section').prop('id'),
			o = _createObject(id);
		
		o.save();
		o.post();
	});
}