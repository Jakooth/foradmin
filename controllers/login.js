function LoginManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	var profilesAPI = '/forapi/forsecure/profiles.php';
	var auth0clientID = 'P8wrSYlMVUu5rZDEFGSqFL18tVfgo9Gz';
	var auth0Domain = 'forplay.eu.auth0.com';
	var failedLogins = 0;
	var maxLoginAttempts = 1;
	
	var bg = {
		error: {
			forgotPassword: {
				"too_many_requests": "Достигна максималния брой опити за смяна на паролата. Моля, изчакай преди да опиташ отново.",
				"lock.fallback": "Съжаляваме, нещо се обърка при заявката за смяна на парола."
			},
			
			login: {
				"blocked_user": "Потребителят е блокиран.",
				"invalid_user_password": "Невалидна оторизация.",
				"lock.fallback": "Съжаляваме, нещо се обърка при опита за влизане.",
				"lock.invalid_code": "Навалиден код.",
				"lock.invalid_email_password": "Грешен имейл или парола.",
				"lock.invalid_username_password": "Грешен потребител или парола.",
				"lock.network": "Не можем да се свържем със сървъра. Моля, провери интернет връзката си и опитай отново.",
				"lock.popup_closed": "Pop-up прозорецът се затвори. Опитай отново.",
				"lock.unauthorized": "Не е дадено позволение. Опитай отново.",
				"lock.mfa_registration_required": "Изисква се мултифакторна автентикация, но твоето устройство не е в списъка. Моля, регистрирай го преди да продължиш.",
				"lock.mfa_invalid_code": "Навалиден код. Моля, опитай отново.",
				"password_change_required": "Трябва да промениш паролата си, защото това е първото ти влизане или защото валидността на предишната ти парола е изтекла.",
				"password_leaked": "Блокирахме твоето влизане, защото паролата е издадена на друг уебсайт. Изпратихме имейл с инструкции как да я отблокираш.",
				"too_many_attempts": "Твоят профил бе блокиран след последователни неуспешни опити за влизане.",
				"session_missing": "Не можем да завършим оторизацията. Моля, опитай отново, след като затвориш всички отворени диалогови прозорци.",
				"hrd.not_matching_email": "Моля, използвайте твоя корпоративен имейл за вход."
			},
			
			passwordless: {
				"bad.email": "Невалиден имейл.",
				"bad.phone_number": "Невалиден телефон.",
				"lock.fallback": "Съжаляваме, нещо се обърка."
			},
			
			signUp: {
				"invalid_password": "Невалидна парола.",
				"lock.fallback": "Съжаляваме, нещо се обърка при опита за регистрация.",
				"password_dictionary_error": "Паролата ти е твърде лесна за отгатване. Хайде де, бъди по-креативен!",
				"password_no_user_info_error": "Паролата е базирана на информация от профила.",
				"password_strength_error": "Паролата е много лесна.",
				"user_exists": "Потребителят вече съществува.",
				"username_exists": "Потребителското име вече съществува."
			}
		},
		  
		success: {
			logIn: "Благодарим за посещението.",
			forgotPassword: "Току-що ти изпратихме имейл за подновяване на паролата.",
			magicLink: "Изпратихме ти връзка за вход<br />в %s.",
			signUp: "Благодарим за регистрацията."
		},
		
		blankErrorHint: "Това поле не може да остане празно.",
		codeInputPlaceholder: "твоят код",
		databaseEnterpriseLoginInstructions: "",
		databaseEnterpriseAlternativeLoginInstructions: "или",
		databaseSignUpInstructions: "",
		databaseAlternativeSignUpInstructions: "или",
		emailInputPlaceholder: "yours@example.com",
		enterpriseLoginIntructions: "Вход с твоите корпоративни кодове за достъп.",
		enterpriseActiveLoginInstructions: "Моля, въведи корпоративните си кодове за достъп в %s.",
		failedLabel: "Не се получи!",
		forgotPasswordTitle: "Смени си паролата",
		forgotPasswordAction: "Пак се напи и не си спомняш паролата?",
		forgotPasswordInstructions: "Моля, въведи имейл. Ще ти изпратим линк за смяна на паролата.",
		forgotPasswordSubmitLabel: "Изпрати имейл",
		invalidErrorHint: "Невалиден",
		lastLoginInstructions: "Последния път влезе като",
		loginAtLabel: "Влез в %s",
		loginLabel: "Влез",
		loginSubmitLabel: "Влез",
		loginWithLabel: "Влез със %s",
		notYourAccountAction: "Не е твоят профил?",
		passwordInputPlaceholder: "твоята парола",
		  
		passwordStrength: {
			containsAtLeast: "Съдържа поне %d от тези %d типове символи:",
			identicalChars: "Не повече от %d идентични последователни символи (пример, \"%s\" не е позволено)",
			nonEmpty: "Полето с паролата не може да остане празно.",
			numbers: "Цифри (0-9)",
			lengthAtLeast: "Поне %d символа на дължина",
			lowerCase: "Малки букви (а-я)",
			shouldContain: "Трябва да съдържа:",
			specialCharacters: "Специални символи (пример !@#$%^&*)",
			upperCase: "Главни букви (А-Я)"
		},
		
		passwordlessEmailAlternativeInstructions: "В противен случай въведи твоя имейл за вход<br/>или създай профил",
		passwordlessEmailCodeInstructions: "Имейл с кода беше изпратен до %s.",
		passwordlessEmailInstructions: "Въведи твоя имейл за вход<br/>или създай профил",
		passwordlessSMSAlternativeInstructions: "В противен случай въведи твоя телефон за вход<br/>или създай профил",
		passwordlessSMSCodeInstructions: "Изпратихме СМС с код<br/>до %s.",
		passwordlessSMSInstructions: "Въведи твоя телефон за вход<br/>или създай профил",
		phoneNumberInputPlaceholder: "твоят телефон",
		resendCodeAction: "Не получи кода?",
		resendLabel: "Изпрати отново",
		resendingLabel: "Изпращаме отново...",
		retryLabel: "Опитай отново",
		sentLabel: "Изпратено!",
		signupTitle: "Регистрация",
		signUpLabel: "Регистрация",
		signUpSubmitLabel: "Регистрация",
		signUpTerms: "",
		signUpWithLabel: "Регистрация със %s",
		socialLoginInstructions: "",
		socialSignUpInstructions: "",
		ssoEnabled: "Single Sign-On включен",
		submitLabel: "Изпрати",
		unrecoverableError: "Нещо се обърка.<br />Моля пиши на admin@forplay.bg.",
		usernameFormatErrorHint: "Използвай %d-%d букви, цифри и \"_\"",
		usernameInputPlaceholder: "твоето потребителско име",
		usernameOrEmailInputPlaceholder: "потребителско име/имейл",
		title: "Forplay",
		welcome: "Наздраве, %s!",
		windowsAuthInstructions: "Вързан си от твоята корпоративна мрежа&hellip;",
		windowsAuthLabel: "Windows Оторизация",
		mfaInputPlaceholder: "Коде",
		mfaLoginTitle: "Валидиране в 2 стъпки",
		mfaLoginInstructions: "Моля, въведи кода за потвърждение от мобилното приложение.",
		mfaSubmitLabel: "Влез",
		mfaCodeErrorHint: "Използвай %d числа"
	}
	
	var lockAdminOptions = {
		languageDictionary: bg,
		avatar: null,
		autoclose: true,
		allowLogin: true,
		closable: true,
		allowedConnections: ['Username-Password-Authentication'],
		auth: {
			redirect: false
		},
		theme: {
			labeledSubmitButton: false,
      primaryColor: '#FF5722'
		}
	}; 
	
	var lockUserOptions = {
		languageDictionary: bg,
		avatar: null,
		autoclose: true,
		allowLogin: true,
		closable: true,
		allowedConnections: ['facebook', 'google-oauth2'],
		socialButtonStyle: 'small',
		theme: {
			labeledSubmitButton: false,
      primaryColor: '#FF5722'
		},
		auth: {
			redirectUrl: window.location.origin + '/auth/return-url',
			responseType: 'token',
			redirect: true,
			params: {
				state: JSON.stringify({
					return_url: encodeURIComponent(window.location.pathname)
				})
			}
		}
	}; 
	
	window.auth0 = new auth0.WebAuth({domain: auth0Domain, clientID: auth0clientID});
	window.adminLock = new Auth0Lock(auth0clientID, auth0Domain, lockAdminOptions); 
	window.userLock = new Auth0Lock(auth0clientID, auth0Domain, lockUserOptions); 
	
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
	 
	this.showAdminLock = function() {
		applyPermissions(false);
		
		window.adminLock.show();
	}
	
	this.showUserLock = function() {
		window.userLock.show();
	}
	
	this.clearUserProfile = function() {
		localStorage.removeItem('idToken');
		localStorage.removeItem('accessToken');
		localStorage.removeItem('forplayProfile');
		
		window.userProfile = null;
		
		self.renderUserUI();
	}
	
	this.getUserProfile = function() {
		var profile = localStorage.getItem('forplayProfile'),
        accessToken = localStorage.getItem('accessToken'),
        idToken = localStorage.getItem('idToken');
		
		/**
		 * The user is not autheticated.
		 */
		
		if (!profile && (!accessToken || !idToken)) {		
			self.clearUserProfile();
			
			return false;
		}
		
		if (!profile && (accessToken || idToken)) {
			window.userLock.getUserInfo(accessToken, function(err, profile) {
				if (err) {
				  console.log("There is no stored Forplay profile and access has probably expired. " + 
				  			      "Automatically trying to renew log in. Auth 0 says: " + err);
				  
				  self.renewUserProfile();
				  
				  return false;
				}
				
				self.extendUserProfile({idToken: idToken, 
										            accessToken: accessToken}, profile);	
			});
		}
		
		if (profile && accessToken && idToken) {
      window.userProfile = JSON.parse(profile); 
      
			self.renderUserUI(window.userProfile);
			
			return true;
		}
	}
	
	this.renewUserProfile = function() {
		auth0.renewAuth({
			audience: '',
			scope: 'openid app_metadata user_metadata',
      redirectUri: 'http://localhost/auth/silent-callback',
      usePostMessage: true,
		}, function (err, authResult) {
			if (err) {
			  console.log("Failed to renew log in. Logging out. " +
			  			      "Try to log in again or contact admin@forplay.bg. Auth 0 says:" + err);
			  
			  self.clearUserProfile();
			  
			  return;
			}
			
			window.userLock.getUserInfo(authResult.accessToken, function(err, profile) {
				if (err) {
				  console.log("Renew login was successful, but we failed to get your profile. " + 
				  			      "Logging out. Try to log in again or contact admin@forplay.bg. Auth 0 says: " + err);
				  
				  self.clearUserProfile();
				  
				  return;
				}
				
				self.extendUserProfile({idToken: authResult.idToken, 
										            accessToken: authResult.accessToken}, profile);	
			});
		});
	}
	
	this.createUserProfile = function(profile, isUpdate) {
		
		/**
		 * Clean old localStorage items.
		 * This is only for Foplray admins and can be removed soon.
		 */
		
		localStorage.removeItem('userToken');
		
		/**
		 * Now save the new profile and tokens.
		 */
		
		var postProfile = $.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: encodeURI(profilesAPI),
				data: JSON.stringify(profile),
				dataType: 'json'
			}),
			data = null;
		
		$.when(postProfile).done(function(data) {
			var data = data.length ? JSON.parse(data) : data,
          newProfile = $.extend(profile, data.profiles);
      
      localStorage.setItem('forplayProfile', JSON.stringify(newProfile));
      
      window.userProfile = newProfile;
      
			self.renderUserUI(window.userProfile);
			
			if (!isUpdate) {
				self.showUserProfile();
			}
		}).fail(function() {
			if (!isUpdate) {
				console.log("Failed to create Forplay profile.");
			} else {
				console.log("Failed to update Forplay profile.");
			}
			
			self.renderUserUI(window.userProfile);
		});
	}
	
	this.extendUserProfile = function(authResult, profile) {
		localStorage.setItem('idToken', authResult.idToken);
		localStorage.setItem('accessToken', authResult.accessToken);
				
		window.userProfile = profile;
		
		var params = '?email=' + window.userProfile.email,
        getProfile = $.get(encodeURI(profilesAPI + params)),
        data = null;
			
		$.when(getProfile).done(function(data) {
			data = data.length ? JSON.parse(data) : data;
			
			if (!data.profiles) {
				self.createUserProfile(window.userProfile);
			} else {				
				if ((window.userProfile.identities[0].provider == 'facebook' && 
             window.userProfile.identities[0].userId != data.profiles.facebook_id) ||
            (window.userProfile.identities[0].provider == 'google-oauth2' && 
             window.userProfile.identities[0].userId != data.profiles.google_id) || 
            (window.userProfile.identities[0].provider == 'auth0' && 
             window.userProfile.identities[0].userId != data.profiles.auth0_id)) {
						
					$.extend(window.userProfile, data.profiles);  	
						
					self.createUserProfile(window.userProfile, true);	
				} else {
					$.extend(window.userProfile, data.profiles);
          
          localStorage.setItem('forplayProfile', JSON.stringify(window.userProfile));

					self.renderUserUI(window.userProfile);
				}
			} 
			
			/**
			 * TODO: Admin can manage comments.
			 * Usere can modify only their comments.
			 */	
			 
			if (window.userProfile['appMetadata']['roles'][0] != 'admin' &&
				  window.userProfile['appMetadata']['roles'][0] != 'superadmin') {
			
			} else {
				
			} 
		}).fail(function() {
			if (failedLogins >= maxLoginAttempts) {
				console.log("Too many automatic retries. Logging out.  " + 
				  			    "Try to log in again or contact admin@forplay.bg.");
							
				self.clearUserProfile();
			}
			
			console.log("Failed to load profile information from the server. " + 
				  		    "Automatically trying to renew log in.");
			
			failedLogins ++;
			
			self.renewUserProfile();
		});
	}
	
	this.renderUserUI = function(profile) {
		var $profile = $('#userLogin'),
        $avatar = $('#profileChange'),
        $user = $('#userLogin b'),
        $id = $('#profileId'),
        $nickname = $('#profileNickname'),
        $name = $('#profileGivenName'),
        $family = $('#profileFamilyName'),
        $darkened = $('#profileDarkened'),
        $collapsed = $('#profileCollapsed');
			
		var avatar = null;
			
		if (!profile) {
			$profile.removeAttr('style');
			$profile.attr('aria-pressed', false);
			$user.text('Непознат');
			$id.val('');
			$nickname.val('');
			$name.val('');
			$family.val('');
      $darkened.prop('checked', false);
      $collapsed.prop('checked', false);
      
      utils.setTheme('dark', 0);
		} else {
			avatar = profile.pictureLarge ? 
               profile.pictureLarge : 
               profile.picture;
			
			$profile.css('background-image', 'url(' + profile.picture + ')');
			$avatar.css('background-image', 'url(' + avatar + ')');
			$profile.attr('aria-pressed', true);
			$avatar.attr('aria-pressed', true);
			$user.text(profile.nickname || profile.name.split(' ')[0]);
			$nickname.val(profile.nickname);
			$name.val(profile.given_name);
			$family.val(profile.family_name);
      $darkened.prop('checked', Number(profile.darkened));
      $collapsed.prop('checked', Number(profile.collapsed));
      
      utils.setTheme('dark', Number(profile.darkened));
		}
	}
	
	this.showUserProfile = function() {
		$profile = $('#userProfile');
		
		$profile.attr('aria-hidden', false);
	}
	
	this.hideUserProfile = function() {
		$profile = $('#userProfile');
		
		$profile.attr('aria-hidden', true);
	}
	 
	
	 
	 
	/** 
	 * EVENTS
	 */
	
	/**
	 * Admin
	 */ 
	 
	window.adminLock.on("authenticated", function(authResult) {
		var $login = $('#main button.login'),
		  	$logout = $('#main button.logout');
	  
	  window.adminLock.getUserInfo(authResult.accessToken, function(err, profile) {	
      if (err) {
          $login.attr('aria-hidden', false);
          $logout.attr('aria-hidden', true);
        
          return;
      }
      
      self.extendUserProfile(authResult, profile);
		
      $login.css('background-image', 'url(' + window.userProfile.picture + ')');
      $logout.css('background-image', 'url(' + window.userProfile.picture + ')');
      $login.attr('aria-hidden', true);
      $logout.attr('aria-hidden', false);
		
			if (window.userProfile['appMetadata']['roles'][0] != 'admin' &&
				  window.userProfile['appMetadata']['roles'][0] != 'superadmin') {
			
				applyPermissions(false, false);
      } else {
				if (window.userProfile['appMetadata']['roles'][0] != 'superadmin') {
					applyPermissions(true, false);
				} else {
					applyPermissions(true, true);
				}
			}	
	  });
	});
	 
	$(window).on('load', function(e) {
		$('#login img.svg').each(function() {
			utils.convertSVG($(this));
		});
	});
	
	$('#main button.login').click(function(e) { 
		self.showAdminLock();
	});
	
	$('#main button.logout').click(function(e) {
		var $login = $('#main button.login'),
			  $logout = $('#main button.logout');
					
		localStorage.removeItem('idToken');
		localStorage.removeItem('forplayProfile');
		
		window.userProfile = null;
		
		$login.attr('aria-hidden', false);
		$logout.attr('aria-hidden', true);
	}); 
	
	$('#login').on('click', 'button.login', function (e) {
		window.location.href = "foradmin.html#main";
	});
	
	/**
	 * Forplay
	 */
	
	window.userLock.on("authenticated", function(authResult) {
		self.getUserProfile(authResult);
	});
	
	$('#userLogin').click(function(e) {
		
		/**
		 * For some reason this is not working as a selector:
		 * #userLogin[aria-pressed=false].
		 */
		
		if($(this).attr('aria-pressed') == 'true') {
			self.showUserProfile();
			
			return;
		}
		
		self.showUserLock();
	});
	
	$('#profileUpdate').click(function(e) {
		window.userProfile.nickname = $('#profileNickname').val() ? $('#profileNickname').val() : null;
		window.userProfile.given_name = $('#profileGivenName').val() ? $('#profileGivenName').val() : null;
		window.userProfile.family_name = $('#profileFamilyName').val() ? $('#profileFamilyName').val() : null;
    window.userProfile.settings = {
      darkened: $('#profileDarkened').prop('checked') ? 1 : 0,
      collapsed: $('#profileCollapsed').prop('checked') ? 1 : 0
    };
		
		self.createUserProfile(window.userProfile, true);
		self.hideUserProfile();
	});
	
	$('#profileChange').click(function(e) {		
		self.showUserLock();
	});
	
	$('#profileClose').click(function(e) {		
		self.hideUserProfile();
	});
	
	$('#userLogout').click(function(e) {
		self.clearUserProfile();
		self.hideUserProfile();
	}); 
}