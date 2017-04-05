function CommentsManager() {
  
  /** 
	 * PRIVATE
	 */
	 
	var self = this;
	var commentAPI = '/forapi/forsecure/comment.php';
  
  var $body =  $('body'),
		  $header = $('header');
      
  var _query = commentAPI;    
  
  var commentsSection = '#comments',
      commentsList = commentsSection + ' [role=listbox]';
  
  
  
  
  
  
  
  
  /** 
	 * PRIVATE
	 */
  
  var _doComments = function() {
		var commentsRequest = $.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			url: _query,
			dataType: 'json'
		});
		
		admin.showAlert({message: 'Търся...', status: 'loading'});
		
		_renderCommentsResult(commentsRequest);
	}
  
  var _renderCommentsResult = function(data) {
		var getResult = data || $.get(_query),
			  getRenderer = $.get('renderers/comment.html');
		
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
						commentTemplate: renderData[0]
					}),
					html = $.templates
                  .commentTemplate
                  .render(data.comments, {
                    unescape: utils.unescape
                  });
				
				$(commentsList).find('[role=option]').remove();				
				$(commentsList).append(html);
			}
			
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
  
  
  
  
  
  
  
  
  /** 
	 * PUBLIC
	 */
  
  this.ban = function(data) {
    var self = this;
    
    admin.showAlert({message: 'Наказвам...', status: 'loading'});
    
    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: commentAPI,
      data: JSON.stringify(data),
      dataType: 'json'
    }).done(function (data, textStatus, jqXHR) {
    
			/**
			 * Result is either JSON from the GET
			 * or directly a parsed object from the POST.
			 */
			
			var data = data.length ? JSON.parse(data) : data;
			
			if (!data.events.mysql.connection) {
				admin.showAlert({message: data.events.mysql.error, status: 'error'});
			} else if (!data.events.mysql.result) {
				admin.showAlert({message: data.events.mysql.error, status: 'error'});
			}
			
			admin.hideAlert();
    }).fail(function (data, textStatus, jqXHR) {
      var data = data.length ? JSON.parse(data) : data;
			
			if (data.statusText) {
				admin.showAlert({message: data.statusText, status: 'error'});
				
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
		
		if (e.section == 'comments') {		
			_doComments();
		}
	}); 
  
  $body.on('click', '#comments button.refresh', function(e) {
		_doComments();
	});
  
  $body.on('click', '#comments [role=option] button', function(e) {
		var $this = $(this);
		
		var banned = $this.attr('aria-pressed') == 'true' ? 0 : 1,
        ariaPressed = $this.attr('aria-pressed') == 'true' ? true : false,
        id = $this.parents('[role=option]').data('id');
		
		$this.attr('aria-pressed',  !ariaPressed);
		
		self.ban({
      commentId: id,
      banned: banned
    });
	});
   
  $header.on('click', 'button.comments', function(e) {
		admin.showSection(commentsSection);
		window.location.href = 'foradmin.html' + commentsSection;
	});
}