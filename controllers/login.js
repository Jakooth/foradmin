function LoginManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
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
	
	var applyPermissions = function(isAdmin, isSuperAdmin) {
		var $log = $('button.log'),
			$new = $('button.new'),
			$save = $('button.save'),
			$upload = $('button.upload'),
			$publish = $('button.publish');
		
		if (isAdmin) {
			if (isSuperAdmin) {
				$log.show();
				
				$('a[href="#log"]').show();
				$('a[href="#issue"]').show();
				$('a[href="#author"]').show();
				$('a[href="#sticker"]').show();
				$('a[href="#genre"]').show();
				$('a[href="#advert"]').show();
				$('a[href="#sitemap"]').show();
			} else {
				$log.hide();
				
				$('a[href="#log"]').hide();
				$('a[href="#issue"]').hide();
				$('a[href="#author"]').hide();
				$('a[href="#sticker"]').hide();
				$('a[href="#genre"]').hide();
				$('a[href="#advert"]').hide();
				$('a[href="#sitemap"]').hide();
			}
			
			$new.show();
			$upload.show();
			$save.show();
			$publish.show();
		} else {
			$('a[href="#issue"]').hide();
			$('a[href="#author"]').hide();
			$('a[href="#sticker"]').hide();
			$('a[href="#genre"]').hide();
			$('a[href="#advert"]').hide();
			$('a[href="#sitemap"]').hide();
			
			$log.hide();
			$new.hide();
			$upload.hide();
			$save.hide();
			$publish.hide();
		}
	}
	
	
	
	
	/** 
	 * PUBLIC
	 */
	 
	this.showLock = function() {
		applyPermissions(false);
		
		lock.show({dict: bg}, function(err, profile, token) { 	   
			var $login = $('#main button.login'),
				$logout = $('#main button.logout');
			
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
				
				if (window.userProfile['app_metadata']['roles'][0] != 'admin' &&
                    window.userProfile['app_metadata']['roles'][0] != 'superadmin') {
					
					applyPermissions(false, false);
				} else {
					if (window.userProfile['app_metadata']['roles'][0] != 'superadmin') {
						applyPermissions(true, false);
					} else {
						applyPermissions(true, true);
					}
				}
			} 
		});
	}
	 
	

	
	/** 
	 * INIT
	 */
	 
	 
	 
	 
	/** 
	 * EVENTS
	 */
	 
	$(window).on('load', function(e) {
		$('#login img.svg').each(function() {
			utils.convertSVG($(this));
		});
	});
	
	$('#main button.login').click(function(e) { 
		self.showLock();
	});
	
	$('#main button.logout').click(function(e) {
		var $login = $('#main button.login'),
			$logout = $('#main button.logout');
					
		localStorage.removeItem('userToken'); 
		
		window.userProfile = null;
		
		$login.attr('aria-hidden', false);
		$logout.attr('aria-hidden', true);
	}); 
	
	$('#login').on('click', 'button.login', function (e) {
		window.location.href = "foradmin.html#main";
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
}