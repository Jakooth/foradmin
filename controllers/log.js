function LogManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	var logAPI = '/forapi/forsecure/log.php';
	var forplayAPI = '/forapi/forplay.php';
	var fotagsAPI = '/forapi/tags.php';
	
	var $body =  $('body'),
		$header = $('header');
	
	var logSection = '#log',
		logList = logSection + ' [role=listbox]';
		
	var _query = logAPI;	
	
	var _renderLogResult = function(data) {
		var getResult = data || $.get(_query),
			getRenderer = $.get('renderers/log.html');
		
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
						logTemplate: renderData[0]
					}),
					html = $.templates
							.logTemplate
							.render(data.logs);
				
				$(logList).find('[role=option]').remove();				
				$(logList).append(html);
			}
			
			$('#log img.svg').each(function() {
				utils.convertSVG($(this));
			});
			
			admin.hideAlert();
		}).fail(function(resultData) {
			var data = resultData.length ? JSON.parse(resultData) : resultData;
			
			if (resultData.statusText) {
				admin.showAlert({message: resultData.statusText, status: 'error'});
				
				return;
			}
			
			if (!data.events.mysql.connection) {
				admin.showAlert({message: data.events.mysql.error, status: 'error'});
			} else if (!data.events.mysql.result) {
				admin.showAlert({message: data.events.mysql.error, status: 'error'});
			}
			
			console.log(data);
		});
	}
	
	var _doLog = function() {
		var logRequest = $.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			url: _query,
			dataType: 'json'
		});
		
		admin.showAlert({message: 'Търся...', status: 'loading'});
		
		_renderLogResult(logRequest);
	}
	
	this._openLog = function($opener) {
		var object = $opener.data('object'),
			tag = $opener.data('tag'),
			getId;
			
		var $opener = $opener;
	
		if (object == 'quote' || 
			object == 'review' || 
			object == 'news' || 
			object == 'feature' ||
			object == 'video' || 
			object == 'aside') {
			
			getId = $.get(encodeURI(forplayAPI + '?url=' + tag + '&subtype=' + object));
		} else {
			getId = $.get(encodeURI(fotagsAPI + '?url=' + tag + '&object=' + object));
		}
		
		$.when(getId).done(function(dataId) {
			var data = dataId.length ? 
					   JSON.parse(dataId).tags ? 
							JSON.parse(dataId).tags[0] : 
							JSON.parse(dataId).articles[0] : 
					   dataId.tags ? 
							dataId.tags[0] : 
							dataId.articles[0];
							
			$opener.data('id', data.article_id || data.tag_id);				
			$opener.attr('data-id', $opener.data('id'));
			
			query._openSearch($opener);
		}).fail(function() {
			console.log("Failed to load id.");
		});
	}
	
	
	
	
	/** 
	 * PUBLIC
	 */
	
	this.acknolwledge = function(id, acknowledged) {
		var logRequest = $.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: _query,
			data: JSON.stringify({id: id, acknowledged: acknowledged}),
			dataType: 'json'
		});
		
		admin.showAlert({message: 'Записвам...', status: 'loading'});
		
		$.when(logRequest).done(function(resultData) {
			
			/**
			 * Result is either JSON from the GET
			 * or directly a parsed object from the POST.
			 */
			
			var data = resultData.length ? JSON.parse(resultData) : resultData;
			
			if (!data.events.mysql.connection) {
				admin.showAlert({message: data.events.mysql.error, status: 'error'});
			} else if (!data.events.mysql.result) {
				admin.showAlert({message: data.events.mysql.error, status: 'error'});
			}
			
			admin.hideAlert();
			
			/**
			 * No matter of the result scroll to the next item.
			 */
			 
			var $top = $('button[aria-pressed=false]:eq(0)');
			 
			if ($top) {
				$(window).scrollTop($top.offset().top - 84);
			}
		}).fail(function(resultData) {
			var data = resultData.length ? JSON.parse(resultData) : resultData;
			
			if (resultData.statusText) {
				admin.showAlert({message: resultData.statusText, status: 'error'});
				
				return;
			}
			
			if (!data.events.mysql.connection) {
				admin.showAlert({message: data.events.mysql.error, status: 'error'});
			} else if (!data.events.mysql.result) {
				admin.showAlert({message: data.events.mysql.error, status: 'error'});
			}
			
			console.log(data);
		});
	}
	
	
	
	
	/** 
	 * EVENTS
	 */
	 
	$body.on('sectionshow', function(e) {
		var isWindow = e.isWindow || false;
		
		if (e.section == 'log') {		
			_doLog();
		}
	});
	
	$body.on('click', '#log button.refresh', function(e) {
		_doLog();
	});
	
	$body.on('dblclick touchend', '#log [role=option]', function(e) {
		
		/**
		 * TODO: First query to get the ID.
		 */
		 
		self._openLog($(this));
	});
	
	$body.on('click', '#log [role=option] button', function(e) {
		var $this = $(this);
		
		var ariaPressed = $this.attr('aria-pressed') == 'true' ? true : false;
		
		$this.attr('aria-pressed',  !ariaPressed);
		
		self.acknolwledge($this.parents('[role=option]').data('log'),
						  !ariaPressed);
	});
	
	$header.on('click', 'button.log', function(e) {
		admin.showSection(logSection);
		window.location.href = 'foradmin.html' + logSection;
	});
}