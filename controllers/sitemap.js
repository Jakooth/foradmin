function SitemapManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	var sitemapGoogleAPI = '/forapi/forsecure/google.php';
	var sitemapAPI = '/forapi/sitemap.php';
	
	var $body =  $('body');
	
	var sitemapSection = '#sitemap',
		  sitemapPreviewInput = sitemapSection + 'CodeOutput';
	
	var _doSitemap = function() {
		var sitemapRequest = $.ajax({
			type: "GET",
			url: sitemapAPI
		});
		
		admin.showAlert({message: 'Генериране...', status: 'loading'});
		
		$.when(sitemapRequest).done(function(sitemapXML) {
			$(sitemapPreviewInput).text($(sitemapXML.documentElement).prop('outerHTML'));
			
			admin.hideAlert();
		}).fail(function() {
			console.log("Failed to generate sitemap.");
		});
	}
	
	var _submitSitemapToGoogle = function($opener) {
		window.open(sitemapGoogleAPI, '_blank');
	}
	
	
	
	
	/** 
	 * EVENTS
	 */
	
	$body.on('click', '#sitemap button.save', function(e) {
		_doSitemap();
	});
	
	$body.on('click', '#sitemap button.publish', function(e) {
		_submitSitemapToGoogle();
	});
}