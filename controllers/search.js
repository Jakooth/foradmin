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
		searchSubtypeSelect = searchSection + 'SubtypeSelect';
	
	/**
	 * Default search will return only latest new items.
	 */
	 
	var _query = 'http://localhost/forapi/search.php';
	var _subtype = 'data/settings/subtype.json';
	var _type = 'data/settings/type.json';
	
	var _tags = admin._bloodhound(_query);
	
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
		
		_renderSearchResult(searchRequest);
	}
		
	
	
	/** 
	 * PUBLIC
	 */
	 
	this.json = {}; 
	 
	this.updateSearchTypeahead = function() {
		_tags.clearPrefetchCache();
		
		$(searchTagInput).tagsinput('destroy');
		
		admin._initTagInput(_tags, 'tags', searchTagInput, 1);
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
		if (e.section == 'search') {
			_renderSearchResult();
		}
	});
	
	$body.on('click', '#search button.search', function(e) {
		_doSearch();
	});
	
	$body.on('dblclick', '#search [role=option]', function(e) {
		var $this = $(this);

		var o = admin._createObject($this.data('object'));
		
		admin.showSection('#' + $this.data('object'));
		o.setData({tag: $this.data('tag'),
				   object: $this.data('object')});
	});
	
	$header.on('click', 'button.search', function(e) {
		admin.showSection(searchSection);
		window.location.href = 'foradmin.jsp' + searchSection;
	});
	
	/**
	 * For prototype purpose only.
	 */
	
	$body.on('click', '[role=dialog] #search button.ok', function(e) {
		var img = $(searchSection + ' input:checked').parents('label')
													 .find('img')
													 .attr('src');
		
		window.admin.selectTarget.focus();
		window.admin.selectTarget.find('input').val(img);
		window.admin.selectTarget.css('background-image', 'url(' + img + ')');
	});
}