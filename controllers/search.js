function SearchManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
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
	 
	var _query = 'http://localhost/forapi/search.php';
	var _asideQuery = 'http://localhost/forapi/search.php?table=articles';
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
			valign = $(searchValignSelect).val();
		
		window.admin.selectTarget.focus();
		
		$aside.data('object', object);
		$aside.attr('data-object', $aside.data('object'));
		$aside.data('url', url);
		$aside.attr('data-url', $aside.data('url'));
		$aside.data('valign', valign);
		$aside.attr('data-valign', $aside.data('valign'));
		
		/**
		 * Loading the object for preview only.
		 * If it is a quote show the character images.
		 */
		
		var getAside = $.get('http://localhost/forapi/forplay.php?tag=' + id);
			
		$.when(getAside).done(function(getAsideData) {
			var data = getAsideData.length ? JSON.parse(getAsideData) : getAsideData,
				aside = data.articles[0];
			
			switch (aside.subtype) {
				case 'quote':
					window.admin.selectTarget.css('background-image', 
												  'url(../assets/tags/' + 
												  aside.shot_img);
					break;
				default:
					window.admin.selectTarget.css('background-image', 
												  'url(../assets/articles/' + 
												  utils.parseImgTag(aside.shot_img) + '/' +
												  aside.shot_img + ')');
					break;
			}
		}).fail(function() {
			alert("Failed to load aside.");
		});
	}
		
	
	
	/** 
	 * PUBLIC
	 */
	 
	this.json = {}; 
	 
	this.updateSearchTypeahead = function(articlesOnly) {
		_tags.clearPrefetchCache();
		_aside.clearPrefetchCache();
		
		$(searchTagInput).tagsinput('destroy');
		$(searchTagInput).typeahead('destroy');
		
		if (articlesOnly) {
			admin._initTagInput(_aside, 'tags', searchTagInput, 1);
		} else {
			admin._initTagInput(_tags, 'tags', searchTagInput, 1);
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
			
			self.updateSearchTypeahead(isWindow);
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
		window.location.href = 'foradmin.jsp' + searchSection;
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