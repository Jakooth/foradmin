function LogManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	var logAPI = '/forapi/log.php';
	
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
			var data = resultData[0].length ? JSON.parse(resultData[0]) : resultData[0];
			
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
		}).fail(function(resultData) {
			var data = resultData.length ? JSON.parse(resultData) : resultData;
			
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
	
	$body.on('click', '#log [role=option] button', function(e) {
		var $this = $(this);
		
		var ariaPressed = $this.attr('aria-pressed') == 'true' ? true : false;
		
		$this.attr('aria-pressed',  !ariaPressed);
		
		self.acknolwledge($this.parents('[role=option]').data('id'),
						  !ariaPressed);
	});
	
	$header.on('click', 'button.log', function(e) {
		admin.showSection(logSection);
		window.location.href = 'foradmin.jsp' + logSection;
	});
}