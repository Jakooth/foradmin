$(document).ready(function() { 
	window.utils = new UtilsManager();
    window.admin = new AdminManager(); 
	window.add = new AddManager();
    window.query = new SearchManager(); 
	window.activity = new LogManager();
	window.imgs = new ImgsManager();
    window.lock = new Auth0Lock('P8wrSYlMVUu5rZDEFGSqFL18tVfgo9Gz',
								'forplay.eu.auth0.com'); 
	window.login = new LoginManager();												
	window.userProfile = null; 
	
	/**
	 * Require immediate login to enable save and logs. 
	 */
	 
	login.showLock();
	
	/**
	 * Send the authorization header on all API requests.
	 * Note there is configuration in .htaccess to allow this.
	 */
	
	$.ajaxSetup({ 
		'beforeSend':  function(xhr) { 
			if (localStorage.getItem('userToken')) { 
				xhr.setRequestHeader('Authorization',  
									 'Bearer ' + localStorage.getItem('userToken')); 
			} 
		} 
	});
});