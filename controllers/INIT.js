$(document).ready(function() { 
	window.utils = new UtilsManager();
  window.admin = new AdminManager(); 
	window.add = new AddManager();
  window.query = new SearchManager(); 
	window.activity = new LogManager();
	window.sitemap = new SitemapManager();
	window.imgs = new ImgsManager();
  window.comments = new CommentsManager();
    
	window.login = new LoginManager();												
	window.userProfile = null; 
	
	/**
	 * @createTarget when opening a window to create a tag. 
	 * @publishTarget the object, which is saved and we are about to publish. 
	 * @imgTarget when selecting an image to keep a reference to the input. 
	 * @selectTarget when selecting aside content. 
	 */
	
	window.admin.createTarget = null;
	window.admin.publishTarget = null;
	window.admin.imgTarget = null;
	window.admin.selectTarget = null;
	
	/**
	 * Require immediate login to enable save and logs. 
	 */
	 
	//login.showAdminLock();
	
	/**
	 * Send the authorization header on all API requests.
	 * Note there is configuration in .htaccess to allow this.
	 */
	
	$.ajaxSetup({ 
		'beforeSend': function(xhr) { 
			if (localStorage.getItem('idToken')) { 
				xhr.setRequestHeader('Authorization',  
									           'Bearer ' + localStorage.getItem('idToken')); 
			} 
		} 
	});
});