function LoginManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	
	
	
	/** 
	 * PUBLIC
	 */
	 
	

	
	/** 
	 * INIT
	 */
	 
	 
	 
	 
	/** 
	 * EVENTS
	 */
	 
	$(window).on('load', function (e) {
		$('img.svg').each(function() {
			utils.convertSVG($(this));
		});
	});
	
	$('#login').on('click', 'button.login', function (e) {
		window.location.href = "foradmin.html#main";
	});
}