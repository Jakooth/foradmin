$(document).ready(function() { 
	window.utils = new UtilsManager();
    window.admin = new AdminManager(); window.add = new AddManager();
    window.query = new SearchManager(); window.activity = new LogManager();
    window.lock = new Auth0Lock('P8wrSYlMVUu5rZDEFGSqFL18tVfgo9Gz',
								'forplay.eu.auth0.com'); 
								
	window.userProfile; 
	
	function showLock() {
		var bg = {
			"loadingTitle":                  "Моля изчакайте...",
			"close":                         "Затвори",
			"windowsAuthTitle":              "Windows Валидация",
			"invalid":                       "Невалиден",
			"mustMatch":                     "Трябва да съвпада",
			"loginSocialButton":             "Влез като {connection:title}",
			"signupSocialButton":            "Регистрирай се като {connection:title}",
			"networkError":                  "Няма връзка със сървъра.<br />Моля опитай пак.",
			"noConnectionError":             "Няма връзка към интернет.",
			"signin": {
			"title":                            "Вход",
			"action":                           "Влез",
			"actionDomain":                     "Влез към адрес {domain}",
			"all":                              "Не е твоят профил?",
			"strategyEmailEmpty":               "Емайлът е празен.",
			"strategyEmailInvalid":             "Емайлът е невалиден.",
			"strategyDomainInvalid":            "Адресът {domain} не е настроен.",
			"signinText":                       "Влез",
			"signupText":                       "Регистрирай се",
			"forgotText":                       "Пак са напи и не си помниш паролата?",
			"cancelAction":                     "Отмени",
			"footerText":                       "",
			"emailPlaceholder":                 "Емайл",
			"usernamePlaceholder":              "Форплеец",
			"passwordPlaceholder":              "Парола",
			"separatorText":                    "или",
			"serverErrorText":                  "Имаше проблем при пенетрирането на входа.",
			"returnUserLabel":                  "Последния път влиза като...",
			"domainUserLabel":                  "Вие сте свързани от корпоративнат ви мрежа...",
			"wrongEmailPasswordErrorText":      "Навлиден емайл или парола.",
			"passwordChangeRequiredErrorText":  "Трябва да си смените паролата.",
			"unauthorizedErrorText":            "Нямата достъп.",
			"userBlockedErrorText":             "Профилът ви е блокриан",
			"or":                               "... или влезта като",
			"loadingMessage":                   "Влизане като {connection}...",
			"popupCredentials":                 "Въведте кодовете си за достъп",
			"userClosedPopup":                  "Прозорецът се затвори. Опитай пак.",
			"userConsentFailed":                "Нямате позволение. Опитай пак."
			},
			"signup": {
			"description":                 "",
			"title":                       "Sign Up",
			"action":                      "Sign Up",
			"signinText":                  "Log In",
			"signupText":                  "Sign Up",
			"emailPlaceholder":            "Email",
			"usernamePlaceholder":         "Username",
			"passwordPlaceholder":         "Create a Password",
			"cancelAction":                "Cancel",
			"headerText":                  "Please enter your email and password",
			"footerText":                  "",
			"serverErrorText":             "There was an error processing the signup.",
			"userExistsErrorText":         "The user already exists.",
			"signupOnSSODomainErrorText":  "This domain {domain} has been configured for Single Sign On and you can't create an account. Try signing in instead.",
			"usernameInUseErrorText":      "The username is already in use.",
			"invalidPassword":             "Password is too weak.",

			"passwordStrength": {
			  "nonEmpty": "Non-empty password required",
			  "lengthAtLeast": "At least %d characters in length",
			  "shouldContain": "Should contain:",
			  "containsAtLeast" : "Contain at least %d of the following %d types of characters:",
			  "lowerCase": "Lower case letters (a-z)",
			  "upperCase": "Upper case letters (A-Z)",
			  "numbers": "Numbers (i.e. 0-9)",
			  "specialCharacters" : "Special characters (e.g. !@#$%^&*)",
			  "identicalChars": "No more than %d identical characters in a row (e.g., \"%s\" not allowed)"
			}

			},
			"newReset": {
			"title":                       "Password Reset",
			"action":                      "Send",
			"emailPlaceholder":            "Email",
			"cancelAction":                "Cancel",
			"footerText":                  "",
			"successText":                 "We've just sent you an email to reset your password.",
			"headerText":                  "Please enter your email address. We will send you an email to reset your password.",
			"serverErrorText":             "There was an error processing the password reset.",
			"userDoesNotExistErrorText":   "User does not exist.",
			"tooManyRequestsErrorText":    "You have reached the limit on password reset attempts.  Please wait before trying again."
			},
			"reset": {
			"title":                       "Password Change",
			"action":                      "Send",
			"emailPlaceholder":            "Email",
			"passwordPlaceholder":         "New Password",
			"repeatPasswordPlaceholder":   "Confirm New Password",
			"cancelAction":                "Cancel",
			"footerText":                  "",
			"successText":                 "We've just sent you an email to reset your password.",
			"enterSamePasswordText":       "Please enter the same password.",
			"headerText":                  "Please enter your email and the new password. We will send you an email to confirm the password change.",
			"serverErrorText":             "There was an error processing the password reset.",
			"userDoesNotExistErrorText":   "User does not exist.",
			"tooManyRequestsErrorText":    "You have reached the limit on password reset attempts.  Please wait before trying again.",
			"invalidPassword":             "Password is too weak."
			}
		}
	
		lock.show({dict: bg}, function(err, profile, token) { 	   
			var $login = $('button.login'),
				$logout = $('button.logout');
			
			if (err) {
				$login.attr('aria-hidden', false);
				$logout.attr('aria-hidden', true);
			} else { 
				localStorage.setItem('userToken', token);
				
				window.userProfile = profile; 
				
				$login.css('background-image', 'url(' + window.userProfile.picture + ')');
				$logout.css('background-image', 'url(' + window.userProfile.picture + ')');
				$login.attr('aria-hidden', true);
				$logout.attr('aria-hidden', false);
			} 
		});
	}
	
	$('button.login').click(function(e) { 
		showLock();
	});
	
	showLock();
	
	$('button.logout').click(function(e) {
		var $login = $('button.login'),
			$logout = $('button.logout');
					
		localStorage.removeItem('userToken'); 
		
		window.userProfile = null;
		
		$login.attr('aria-hidden', false);
		$logout.attr('aria-hidden', true);
	}); 
	
	$.ajaxSetup({ 
		'beforeSend':  function(xhr) { 
			if (localStorage.getItem('userToken')) { 
				xhr.setRequestHeader('Authorization',  
									 'Bearer ' + localStorage.getItem('userToken')); 
			} 
		} 
	});
	
	/**
	 * Forplay customization.
	 */
	
	/*
	window.lock.once('shown', function() {
		var $lock = $('#a0-lock .a0-panel');
		
		$('body').attr('aria-busy', true);
		$('head style:eq(1)').remove();
		
		$lock.prepend('<h1><img alt="Forplay&amp;reg;" src="../assets/forplay.svg" class="svg"/></h1>');
		
		utils.convertSVG($lock.find('.svg:eq(0)'));
	});
	
	window.lock.once('hidden', function() {
		$('body').attr('aria-busy', false);
	});
	*/
});