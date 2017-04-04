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
	 * EVENTS
	 */
   
  $body.on('sectionshow', function(e) {
		var isWindow = e.isWindow || false;
		
		if (e.section == 'comments') {		
			_doComments();
		}
	}); 
   
  $header.on('click', 'button.comments', function(e) {
		admin.showSection(commentsSection);
		window.location.href = 'foradmin.html' + commentsSection;
	});
}