function AdminManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var subtype = 'data/settings/subtype.json';
	var type = 'data/settings/type.json';
	var object = 'data/settings/object.json';
	var hype = 'data/settings/hype.json';
	var theme = 'data/settings/theme.json';
	var subtheme = 'data/settings/subtheme.json';
	var gameGenres = '/forapi/get.php?object=genre&type=games';
	var musicGenres = '/forapi/get.php?object=genre&type=music';
	var platforms = '/forapi/get.php?object=platform';
	var movieGenres = '/forapi/get.php?object=genre&type=movies';
	var bookGenres = '/forapi/get.php?object=genre&type=books';
	var countries = '/forapi/get.php?object=country';
	
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
	
	/** 
	 * This function will post data from a JSON file.
	 * Data format can be different so modifications will be required.
	 */
	 
	var _automatedSave = function() {

		/**
		 * Step 1: Specify the source file.
		 */
		 
		var get = $.get('data/objects/series.json');
		
		$.when(get).done(function(getData, textStatus, jqXHR) {
			var data = Array.isArray(getData) ? getData : JSON.parse(getData),
				o;
			
			$.each(data, function(index, item) {
			
				/**
				 * Step 2: Create the desired object type.
				 */
				
				o = _createObject('serie'); 
				
				/**
				 * Step 3: Modify data, if needed.
				 */
				
				/*
				var names,
					enName,
					bgName;	
				
				if (item.object == 'person') {
					names = item.value.split('-');
					enName = new Array();
					bgName = item.text;
					
					$.each(names, function(index, name) {
						enName.push(name.charAt(0).toUpperCase() + name.slice(1));
					});
					
					enName = enName.join(' ');
				} else {
					enName = item.text;
					bgName = null;
				}
				*/
				
				/**
				 * Step 4: Map JSON data to object properties.
				 */
				
				o.enName = query._escapeValue(item.text),
				//o.bgName = bgName ? query._escapeValue(bgName) : null,
				o.tag = query._escapeValue(item.value),
				o.type = query._escapeValue(item.type);
				
				o.json = {
					enName: o.enName,
					//bgName: o.bgName,
					tag: o.tag,
					type: o.type,
					object: o.object
				};
				
				console.log(o);
				
				//o.post();
			});			
		}).fail(function(data, textStatus, jqXHR) {
			console.log(data);
		});
	}
	
	this._automatedSave = function(id) {
		_automatedSave();
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
				o = new Book(id);
				
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
			case 'article':
				o = new Article(id);
				
				break;
			case 'aside':
				o = new Aside(id);
				
				break;
			case 'quote':
				o = new Quote(id);
				
				break;
			case 'author':
				o = new Author(id);
				
				break;
			case 'issue':
				o = new Issue(id);
				
				break;
			case 'country':
				o = new Country(id);
				
				break;	
			default:
				o = new Fortag(id);
				
				break;
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
		
		promise.done(function(promise, textStatus, jqXHR) {
		
			/**
			 * Get latest issue.
			 */
			 
			if (text ==  'issues') {
				var issues = Object.keys(data.index.datums),
					latest = JSON.parse(issues[issues.length - 1]);
			
				$('#publishIssueInput').attr('placeholder', 'Брой ' + 
															latest.tag + ' ' + 
															latest.en_name);
			}
			
			/**
			 * Create the input.
			 */
		
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
					source: data.ttAdapter(),
					templates: {
						suggestion: function(data) {
							if (data.lib) {
								return $.templates('<div class="sticker" style="background-image: ' + 
												   'url(../assets/icons/' + 
												   '{{:lib}}/' + 
												   '{{:subtype}}/svg/000000/transparent/' + 
												   '{{:tag}}.svg)">{{:en_name}}</div>').render(data);
							} else {
								return $.templates('<div>{{:~unescapeValue(en_name)}} '  +  
												   '{{if object}}({{:object}}){{/if}}</div>').render(data, {unescapeValue: 
																									 query._unescapeValue});	   
							}
						}
					}
				}],
				freeInput: false
			});
		}).fail(function() {
			console.log('Failed to create tagsinput.');
		});	
	}
	
	this.refreshTagsinput = function(data, input) {
		
		var promise = data.initialize(true);
		
		promise.done(function() {
			$(input).tagsinput()[0].refresh();
		}).fail(function() {
			console.log('Failed to refresh tagsinput.');
		});	
	}
	
	/**
	 * Tagsinput data sources.
	 */

	var games = bloodhound('/forapi/get.php?object=game');
	var stickers = bloodhound('/forapi/get.php?object=sticker');
	var companies = bloodhound('/forapi/get.php?object=company');
	var issues = bloodhound('/forapi/get.php?object=issue');
	var series = bloodhound('/forapi/get.php?object=serie');
	var movies = bloodhound('/forapi/get.php?object=movie');
	var authors = bloodhound('/forapi/get.php?object=author');
	var characters = bloodhound('/forapi/get.php?object=character');
	var persons = bloodhound('/forapi/get.php?object=person');
	var music = bloodhound('/forapi/get.php?type=music');
	var books = bloodhound('/forapi/get.php?object=book');
	var tags = bloodhound('/forapi/get.php');
	
	/**
	 * Clear cache and reinitialize tag input.
	 * The goal it to update typeahead data, after adding new tag.
	 */
	
	this.updateAllTypeahead = function() {		
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
		
		this.refreshTagsinput(persons, '#bookAuthorInput');
		this.refreshTagsinput(persons, '#bookTranslatorInput');
		this.refreshTagsinput(series, '#bookSerieInput');
		this.refreshTagsinput(stickers, '#bookStickersInput');
		this.refreshTagsinput(books, '#bookRelatedInput');
		
		this.refreshTagsinput(music, '#eventArtistInput');
		this.refreshTagsinput(series, '#eventSerieInput');
		this.refreshTagsinput(stickers, '#eventStickersInput');
		this.refreshTagsinput(music, '#eventRelatedInput');
		this.refreshTagsinput(music, '#albumArtistInput');
		this.refreshTagsinput(stickers, '#albumStickersInput');
		this.refreshTagsinput(music, '#albumRelatedInput');
		
		this.refreshTagsinput(series, '#gameSerieInput');
		this.refreshTagsinput(stickers, '#gameStickersInput');
		this.refreshTagsinput(companies, '#gamePublisherInput');
		this.refreshTagsinput(companies, '#gameDeveloperInput');
		this.refreshTagsinput(games, '#gameRelatedInput');
		
		this.refreshTagsinput(series, '#movieSerieInput');
		this.refreshTagsinput(stickers, '#movieStickersInput');
		this.refreshTagsinput(movies, '#movieRelatedInput');
		this.refreshTagsinput(persons, '#movieCastInput');
		this.refreshTagsinput(persons, '#movieDirectorInput');
		this.refreshTagsinput(persons, '#movieWriterInput');
		this.refreshTagsinput(persons, '#movieCameraInput');
		this.refreshTagsinput(persons, '#movieMusicInput');
		
		this.refreshTagsinput(authors, '#articleAuthorsInput');
		this.refreshTagsinput(issues, '#publishIssueInput');
		this.refreshTagsinput(tags, '#asideTagsInput');
		this.refreshTagsinput(tags, '#articleTagsInput');
		this.refreshTagsinput(tags, '#articleBetterInput');
		this.refreshTagsinput(tags, '#articleWorseInput');
		this.refreshTagsinput(tags, '#articleEqualInput');
		this.refreshTagsinput(authors, '#asideAuthorsInput');
		this.refreshTagsinput(tags, '#imagesTagInput');
		this.refreshTagsinput(tags, '#personRelatedInput');
		this.refreshTagsinput(tags, '#characterRelatedInput');
		this.refreshTagsinput(games, '#dlcRelatedInput');
		this.refreshTagsinput(persons, '#bandRelatedInput');
	}
	
	
	
	
	/** 
	 * PUBLIC
	 */
	
	this.selectTarget = null;
	this.publishTarget = null;
	
	this.loadOptions = function(target, data, renderer, selected) {
		var tmpl = $.get('renderers/' + renderer + '.html'),
			data = $.get(data.prefetch ? data.prefetch.url : data);
		
		$.when(tmpl, data).done(function(tmpl, data) {
			var tmpls = $.templates({
					tmpl: tmpl[0]
				}),
				html,
				json;
				
			var $html;
			
			/**
			 * Data from PHP need to be parsed first.
			 * Otherwise tags are available as property in a json file.
			 */
			
			if (!data[0].tags) {
				json = JSON.parse(data[0]).tags;
			} else {
				json = data[0].tags;
			}
			
			$html = $($.templates.tmpl.render(json, {getId: utils.getObjectPropertyByIndex}));
			
			if (selected) {
				$html.filter(':contains(' + selected + ')').prop('selected', true);
			}
				
			target.append($html);
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
		$('body').attr('aria-busy', true);
	}
	
	this.hideOverlay = function() {
		$('body').attr('aria-busy', false);
	}
	
	this.showSectionInWindow = function(section, createTarget) {
		var getWindow = $.get('renderers/window.html');
			
		$.when(getWindow).done(function(windowHtml) {
			var html = $(windowHtml).append($(section).show());
			
			self.showOverlay();
			
			$('body').append(html);
			$('[role=dialog] :tabbable').eq(1).focus();
			$(window).scrollTop(0);
			
			window.admin.createTarget = createTarget || false;
			
			$('body').trigger({
				type: 'sectionshow',
				section: section.split('#')[1],
				isWindow: true
			});
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
		$('#fortagObjectSelect').val('game').change();
		$('#articleTypeSelect').val('games').change();
		$('#articleSubtypeSelect').val('news').change();
		$('#articleVideoTechSelect').val('').change();
		$('#articleAudioTechSelect').val('').change();
		$('#articleBgHSelect').val('center').change();
		$('#articleBgVSelect').val('top').change();
		$('#articleThemeSelect').val('').change();
		$('#articleSubthemeSelect').val('lighten').change();
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
	
	this.loadOptions($('#fortagTypeSelect'), type, 'option');
	this.loadOptions($('#fortagObjectSelect'), object, 'option');
	this.loadOptions($('#companyTypeSelect'), type, 'option');
	this.loadOptions($('#genreTypeSelect'), type, 'option');
	this.loadOptions($('#personTypeSelect'), type, 'option');
	this.loadOptions($('#characterTypeSelect'), type, 'option');
	this.loadOptions($('#serieTypeSelect'), type, 'option');
	
	initTagInput(tags, 'tags', '#imagesTagInput');
	initTagInput(tags, 'tags', '#personRelatedInput');
	initTagInput(tags, 'tags', '#characterRelatedInput');
	initTagInput(games, 'games', '#dlcRelatedInput', 1);
	initTagInput(persons, 'persons', '#bandRelatedInput');
	
	/**
	 * ASIDE
	 */
	 
	this.loadOptions($('#asideTypeSelect'), type, 'option');
	
	initTagInput(authors, 'authors', '#asideAuthorsInput');
	initTagInput(tags, 'tags', '#asideTagsInput', 5);
	
	/**
	 * QUOTE
	 */
	
	this.loadOptions($('#quoteTypeSelect'), type, 'option');
	
	/**
	 * ARTICLE
	 */
	
	this.loadOptions($('#articleSubtypeSelect'), subtype, 'option');
	this.loadOptions($('#articleHypeSelect'), hype, 'option');
	this.loadOptions($('#articleTypeSelect'), type, 'option');
	this.loadOptions($('#articleVersionTestedSelect'), platforms, 'option');
	this.loadOptions($('#articleThemeSelect'), theme, 'option');
	this.loadOptions($('#articleSubthemeSelect'), subtheme, 'option');
	
	initTagInput(issues, 'issues', '#publishIssueInput', 1);
	initTagInput(authors, 'authors', '#articleAuthorsInput');
	initTagInput(tags, 'tags', '#articleTagsInput', 5);
	initTagInput(tags, 'tags', '#articleBetterInput', 1);
	initTagInput(tags, 'tags', '#articleWorseInput', 1);
	initTagInput(tags, 'tags', '#articleEqualInput', 1);
	
	
	
	/**
	 * MOVIES::MOVIE
	 */
	
	this.loadOptions($('#movieGenreGroup'), movieGenres, 'checkbox');
	
	initTagInput(series, 'series', '#movieSerieInput', 1);
	initTagInput(stickers, 'stickers', '#movieStickersInput');
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
	initTagInput(stickers, 'stickers', '#gameStickersInput');
	initTagInput(companies, 'companies', '#gamePublisherInput', 1);
	initTagInput(companies, 'companies', '#gameDeveloperInput', 1);
	initTagInput(games, 'games', '#gameRelatedInput');
	
	/**
	 * MUSIC::ALBUM
	 */
	
	this.loadOptions($('#albumGenreGroup'), musicGenres, 'checkbox');
	this.loadOptions($('#albumCountrySelect'), countries, 'option');
	
	initTagInput(music, 'music', '#albumArtistInput');
	initTagInput(stickers, 'stickers', '#albumStickersInput');
	initTagInput(music, 'music', '#albumRelatedInput');
	
	/**
	 * MUSIC::EVENT
	 */
	
	this.loadOptions($('#eventGenreGroup'), musicGenres, 'checkbox');
	this.loadOptions($('#eventCountrySelect'), countries, 'option');
	
	initTagInput(music, 'music', '#eventArtistInput');
	initTagInput(series, 'series', '#eventSerieInput', 1);
	initTagInput(stickers, 'stickers', '#eventStickersInput');
	initTagInput(music, 'music', '#eventRelatedInput');
	
	/**
	 * BOOKS::BOOK
	 */
	
	this.loadOptions($('#bookGenreGroup'), bookGenres, 'checkbox');
	this.loadOptions($('#bookCountrySelect'), countries, 'option');
	
	initTagInput(persons, 'persons', '#bookAuthorInput');
	initTagInput(persons, 'persons', '#bookTranslatorInput');
	initTagInput(series, 'series', '#bookSerieInput', 1);
	initTagInput(stickers, 'stickers', '#bookStickersInput');
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
	
	$('body').on('sectionshow', function(e) {
		if (e.isWindow) return false;
	
		var o = _createObject(e.section);
		
		o.resetData();
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
	
	$('body').on('click', 'button.new', function(e) {
		var section = $(this).parents('section').prop('id'),
			o = _createObject(section);
		
		o.resetData();
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
	
	$('body').on('click', '[role*=dialog] [role=toolbar] button', function(e) {
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
		var $this = $(this);
		
		e.preventDefault();
		
		self.showSectionInWindow($this.attr('href'), 
								 $this.parents('div').find('input[id]'));
	});
	
	$('#fortag').on('change', '#fortagObjectSelect', function(e) {
		var $typeSelect = $('#fortagTypeSelect');
																
		if ($(this).val() == "band" || 
			$(this).val() == "event" || 
			$(this).val() == "album") {
			
			$typeSelect.prop('disabled', true);
			$typeSelect.val('music');
			
			return;
		}
		
		if ($(this).val() == "movie" || 
			$(this).val() == "tv") {
			
			$typeSelect.prop('disabled', true);
			$typeSelect.val('movies');
			
			return;
		}
		
		if ($(this).val() == "game" || 
			$(this).val() == "dlc") {
			
			$typeSelect.prop('disabled', true);
			$typeSelect.val('games');
			
			return;
		}
		
		if ($(this).val() == "book") {
			
			$typeSelect.prop('disabled', true);
			$typeSelect.val('books');
			
			return;
		}
		
		if ($(this).val() == "board") {
			
			$typeSelect.prop('disabled', true);
			$typeSelect.val('boards');
			
			return;
		}
		
		$typeSelect.prop('disabled', false);
	});
	 
	/**
	 * Article & Publish
	 */
	 
	$('#publish').on('click', 'button.preview', function(e) {	
		window.open($(this).data('url'), '_blank');
	}); 
	 
	$('#article').on('keydown', '.img-proxy [contenteditable=true]', function(e) {	
		if (e.keyCode === 13) {
			document.execCommand('insertHTML', false, '<br /><br />');
			
			return false;
		}
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
		var $audioFrameSelect = $('#articleAudioFrameInput').parents('label'),
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
		
		var v1 = $this.val() || '',
			v2 = $('#articleSubthemeSelect').val() || '';
		
		if (v1.length && v2.length) {
			v1 += " ";
			v1 += v2;
		} else if (!v1.length && v2.length) {
			v1 = v2;
		}
																
		$('#article').removeClass().addClass(v1);
	});
	
	$('#article').on('change', '#articleSubthemeSelect', function(e) {
		var $this = $(this);
		
		var v2 = $this.val() || '',
			v1 = $('#articleThemeSelect').val() || '';
		
		if (v1.length && v2.length) {
			v1 += " ";
			v1 += v2;
		} else if (!v1.length && v2.length) {
			v1 = v2;
		}
		
		$('#article').removeClass().addClass(v1);
	});
	
	$('#aside').on('click', 'button.save, button.publish', function(e) {
		e.preventDefault();
		
		var $this = $(this);
		
		var a = new Aside('aside');
		
		a.save();
		
		window.admin.publishTarget = a;
		
		if (!a._isValid) return false;

		$('#publishPrioritySelect [value=aside]').prop('disabled', false);
		$('#publishPrioritySelect [value=cover]').prop('disabled', true);
		$('#publishPrioritySelect [value=video]').prop('disabled', true);
		$('#publishPrioritySelect [value=review]').prop('disabled', true);
		$('#publishPrioritySelect [value=feature]').prop('disabled', true);
		
		if ($this.hasClass('publish')) {
			self.showSectionInWindow('#publish');
		} else {
			window.admin.publishTarget.post();
		}
		
		console.log(window.admin.publishTarget);
	});
	
	$('#article').on('click', 'button.save, button.publish', function(e) {
		e.preventDefault();
		
		var $this = $(this),
			$priority = $('#publishPrioritySelect');
		
		var a = new Article('article');
		
		a.save();
		
		window.admin.publishTarget = a;
		
		if (!a._isValid) return false;
		
		/**
		 * By default all news with video go with priority.
		 */
		
		if (a.videoUrl && $priority.val() == '') {
			$priority.val('video').change();
		}
		
		$('#publishPrioritySelect [value=aside]').prop('disabled', true);
		$('#publishPrioritySelect [value=cover]').prop('disabled', false);
		$('#publishPrioritySelect [value=video]').prop('disabled', false);
		$('#publishPrioritySelect [value=review]').prop('disabled', false);
		$('#publishPrioritySelect [value=feature]').prop('disabled', false);
		
		/**
		 * For save directly update and do not show the dialog.
		 */
		
		if ($this.hasClass('publish')) {
			self.showSectionInWindow('#publish');
		} else {
			window.admin.publishTarget.post();
		}
		
		console.log(window.admin.publishTarget);
	});
	
	$('#publish').on('click', 'button.publish', function(e) {
		window.admin.publishTarget.post();
		
		console.log(window.admin.publishTarget);
	});
	
	$('#quote').on('click', 'button.save', function(e) {
		var a = new Quote('quote');
		
		a.save();
		
		window.admin.publishTarget = a;
		
		if (!a._isValid) return false;
		
		window.admin.publishTarget.post();
		
		console.log(a);
	});
	
	$('#quote').on('keyup', '#quoteSubtitleInput',  function(e) {
		var $this = $(this);
		
		$('#quoteUrlInput').val(utils.formatTag($this.val())).change();
	});

	/**
	 * Objects
	 */
	
	$('body').on('keyup', '[id*=EnNameInput]',  function(e) {
		var $this = $(this);												 
														 
		$this.parents('form').find('[id*=TagInput]')
							 .val(utils.formatTag($this.val()));
	});
	
	$('body').on('keyup', '[id*=TagInput]',  function(e) {
		var $this = $(this);												 
														 
		$this.val(utils.formatTag($this.val()));
	});
	
	$('body').on('change', '[type=hidden]',  function(e) {
		var $this = $(this);												 
														 
		$this.next('span').find('b').text($this.val());
	});
	
	$('main').on('change', '[id*=sticker]',  function(e) {
		var $this = $(this);
		
		var tag = $('#stickerTagInput').val(),
			lib = $('#stickerLibInput').val(),
			subtype = $('#stickerSubtypeSelect').val();
		
		if (!tag || !lib || !subtype) return false;
														 
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
	
	/**
	 * TODO: Next two section are now similar and can be merged.
	 * Not merging to avoid additional testing.
	 */
	
	$('#game, #movie, #album, ' + 
	  '#event, #book, #platform, ' +
	  '#genre, #sticker, #fortag').on('click', 'button.save', function(e) {
		
		var $this = $(this),
			$dialog = $this.parents('[role=dialog]');
		
		/**
		 * If this a fortag we need to pick the object from the drop down.
		 */
		 
		var id = $this.parents('section').prop('id') != 'fortag' ?
				 $this.parents('section').prop('id') :
				 $('#fortagObjectSelect').val(),
			o = _createObject(id);
		
		o.save();
		o.post({dialog: $dialog, target: window.admin.createTarget});
	});
	
	$('#company, #person, #character, ' + 
	  '#serie, #dlc, #band' + 
	  '#country, #author, #issue').on('click', 'button.save', function(e) {
		
		var $this = $(this),
			$dialog = $this.parents('[role=dialog]');
		  
		var id = $this.parents('section').prop('id'),
			o = _createObject(id);
		
		o.save();
		o.post({dialog: $dialog, target: window.admin.createTarget});
	});
}