function SearchManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	var forplayAPI = '/forapi/forplay.php';
	var fotagsAPI = '/forapi/get.php';
	
	var $body =  $('body'),
		$header = $('header');
	
	var searchSection = '#search',
		searchList = searchSection + ' [role=listbox]',
		searchTagInput = searchSection + 'TagInput',
		searchTableSelect = searchSection + 'TableSelect',
		searchTypeSelect = searchSection + 'TypeSelect',
		searchSubtypeSelect = searchSection + 'SubtypeSelect',
		searchValignSelect = searchSection + 'ValignSelect';
	
	/**
	 * Default search will return only latest new items.
	 */
	 
	var _query = '/forapi/search.php';
	var _asideQuery = '/forapi/search.php?table=articles';
	var _subtype = 'data/settings/subtype.json';
	var _type = 'data/settings/type.json';
	
	var _tags = admin._bloodhound(_query);
	var _aside = admin._bloodhound(_asideQuery);
	
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
	
	this._unescapeValue = function(data) {
		return _unescapeValue(data);
	}
	
	var _unescapeValue = function(data) {
	
		/**
		 * There is an error if you simple return quoted string.
		 * For this reason we return string object to string.
		 */
		
		return new String(Fortag.prototype._unescapeValue
										  .call(this, data)).toString();
	}
	
	var _renderSearchResult = function(data) {
		var getResult = data || $.get(_query),
			getRenderer = $.get('renderers/search.html');
		
		$.when(getResult, getRenderer).done(function(resultData, renderData) {
			
			/**
			 * Result is either JSON from the GET
			 * or directly a parsed object from the POST.
			 */
			
			var data = resultData[0].length ? JSON.parse(resultData[0]) : resultData[0];
			
			if (!data.events.mysql.connection) {
				admin.showAlert({message: data.events.mysql.error, status: 'error'});
			} else if (!data.events.mysql.result) {
				admin.showAlert({message: data.events.mysql.error, status: 'error'});
			} else {
				var tmpls = $.templates({
						searchTemplate: renderData[0]
					}),
					html = $.templates
							.searchTemplate
							.render(data.tags);
				
				$(searchList).find('[role=option]').remove();				
				$(searchList).append(html);
			}
			
			admin.hideAlert();
		}).fail(function(resultData) {
			var data = resultData[0].length ? JSON.parse(resultData[0]) : resultData[0];
			
			console.log(data);
		});
	}
	
	var _collectSearchData = function() {
		var tag = _getTypeaheadValue($(searchTagInput)),
			table = _getInputValue($(searchTableSelect)),
			type = _getInputValue($(searchTypeSelect)),
			subtype = _getInputValue($(searchSubtypeSelect));
			
		this.json = {
			tag: tag,
			table: table,
			type: type,
			subtype: subtype
		};
	}
	
	var _doSearch = function() {
		_collectSearchData();
	
		var searchRequest = $.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: _query,
			data: JSON.stringify(this.json),
			dataType: 'json'
		});
		
		admin.showAlert({message: 'Търся...', status: 'loading'});
		
		_renderSearchResult(searchRequest);
	}
	
	var _selectSearch = function() {
		var $search = $(searchSection + ' input:checked').parents('[role=option]'),
			$aside = window.admin.selectTarget.parents('.inline-col');
		
		var object = $search.data('object'),
			id = $search.data('id'),
			url = $search.data('tag'),
			valign = $(searchValignSelect).val(),
			getAside;
		
		window.admin.selectTarget.focus();
		
		$aside.data('object', object);
		$aside.attr('data-object', $aside.data('object'));
		$aside.data('url', id);
		$aside.attr('data-url', $aside.data('url'));
		$aside.data('valign', valign);
		$aside.attr('data-valign', $aside.data('valign'));
		
		/**
		 * Loading the object for preview only.
		 * If it is a quote show the character images.
		 */
		
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
					window.admin.selectTarget.css('background-image', 
												  'url(../assets/tags/' + 
												  aside.shot_img);
					break;
				case 'review':
				case 'feature':
				case 'video':
				case 'aside':
					window.admin.selectTarget.css('background-image', 
												  'url(../assets/articles/' + 
												  utils.parseImgTag(aside.shot_img) + '/' +
												  aside.shot_img + ')');
					break;
				default:
					window.admin.selectTarget.css('background-image', 
												  'url(../assets/tags/' + 
												  aside.tag + '.jpg');
			}
		}).fail(function() {
			alert("Failed to load aside.");
		});
	}
		
	
	
	/** 
	 * PUBLIC
	 */
	 
	this.json = {}; 
	 
	this.updateSearchTagsinput = function(articlesOnly) {
		_tags.clearPrefetchCache();
		_aside.clearPrefetchCache();

		if (articlesOnly) {
			admin.refreshTagsinput(_aside, searchTagInput);
		} else {
			admin.refreshTagsinput(_tags,  searchTagInput);
		}
	}
	
	
	
	/** 
	 * INIT
	 */
	
	admin.loadOptions($(searchTypeSelect), _type, 'option');
	admin.loadOptions($(searchSubtypeSelect), _subtype, 'option');
	
	admin._initTagInput(_tags, 'tags', searchTagInput, 1);	
	 
		
		
	/** 
	 * EVENTS
	 */
	 
	$body.on('sectionshow', function(e) {
		var isWindow = e.isWindow || false;
		
		if (e.section == 'search') {
			if (isWindow) {
				$(searchTableSelect).val('articles');
			} else {
				$(searchTableSelect).val(null);
			}
		
			_doSearch();
			
			setTimeout(function() {
				self.updateSearchTagsinput(isWindow);
			}, 600);
		}
	});
	
	$body.on('click', '#search button.search', function(e) {
		_doSearch();
	});
	
	$body.on('change', searchTagInput, function(e) {
		_doSearch();
	});
	
	$body.on('dblclick', '#search [role=option]', function(e) {
		var $this = $(this)
			$dialog = $this.parents('[role=dialog]');
		
		var o, oType;
		
		/**
		 * Prevent opening from dialog view.
		 * Dialog view is only for selection.
		 */
		
		if ($dialog.length > 0) {
			_selectSearch();
			
			return false;
		}
		
		switch ($this.data('object')) {
			case 'review':
			case 'feature':
			case 'news':
			case 'video':
				oType = 'article';
				
				break;	
			default:
				oType = $this.data('object');
				
				break;
		}
		
		o = admin._createObject(oType);
		
		admin.showSection('#' + oType);
		
		o.setData({tag: $this.data('id'),
				   object: $this.data('object')});
	});
	
	$header.on('click', 'button.search', function(e) {
		admin.showSection(searchSection);
		window.location.href = 'foradmin.html' + searchSection;
	});
	
	/**
	 * This is the search for left or right part of the layout.
	 */
	
	$('#article').on('click', '.select', function(e) {
		e.preventDefault();
		
		admin.showSectionInWindow(searchSection);
		
		window.admin.selectTarget = $(this);
	});
	
	$body.on('click', '[role=dialog] #search button.ok', function(e) {
		_selectSearch();
	});
}