<?php
/**
 * Simple Machines Forum (SMF)
 *
 * @package SMF
 * @author Simple Machines
 * @copyright 2011 Simple Machines
 * @license http://www.simplemachines.org/about/smf/license.php BSD
 *
 * @version 2.0
 */

/*	This template is, perhaps, the most important template in the theme. It
	contains the main template layer that displays the header and footer of
	the forum, namely with main_above and main_below. It also contains the
	menu sub template, which appropriately displays the menu; the init sub
	template, which is there to set the theme up; (init can be missing.) and
	the linktree sub template, which sorts out the link tree.

	The init sub template should load any data and set any hardcoded options.

	The main_above sub template is what is shown above the main content, and
	should contain anything that should be shown up there.

	The main_below sub template, conversely, is shown after the main content.
	It should probably contain the copyright statement and some other things.

	The linktree sub template should display the link tree, using the data
	in the $context['linktree'] variable.

	The menu sub template should display all the relevant buttons the user
	wants and or needs.

	For more information on the templating system, please see the site at:
	http://www.simplemachines.org/
*/

// Initialize the template... mainly little settings.
function template_init()
{
	global $context, $settings, $options, $txt;

	/* Use images from default theme when using templates from the default theme?
		if this is 'always', images from the default theme will be used.
		if this is 'defaults', images from the default theme will only be used with default templates.
		if this is 'never' or isn't set at all, images from the default theme will not be used. */
	$settings['use_default_images'] = 'never';

	/* What document type definition is being used? (for font size and other issues.)
		'xhtml' for an XHTML 1.0 document type definition.
		'html' for an HTML 4.01 document type definition. */
	$settings['doctype'] = 'xhtml';

	/* The version this template/theme is for.
		This should probably be the version of SMF it was created for. */
	$settings['theme_version'] = '2.0';

	/* Set a setting that tells the theme that it can render the tabs. */
	$settings['use_tabs'] = true;

	/* Use plain buttons - as opposed to text buttons? */
	$settings['use_buttons'] = true;

	/* Show sticky and lock status separate from topic icons? */
	$settings['separate_sticky_lock'] = true;

	/* Does this theme use the strict doctype? */
	$settings['strict_doctype'] = false;

	/* Does this theme use post previews on the message index? */
	$settings['message_index_preview'] = false;

	/* Set the following variable to true if this theme requires the optional theme strings file to be loaded. */
	$settings['require_theme_strings'] = false;
}

// The main sub template above the content.
function template_html_above()
{
	global $context, $settings, $options, $scripturl, $txt, $modSettings, $localhostCSSPath;
	
	#Valio bullshit
	$localhostCSSPath  =  $settings['theme_url'];


	// Show right to left and the character set for ease of translating.
	echo '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"', $context['right_to_left'] ? ' dir="rtl"' : '', '>
<head>';

	// The ?fin20 part of this link is just here to make sure browsers don't cache it wrongly.
	echo '
	<link rel="shortcut icon" href="http://forplay.bg/favicon.ico" />
	<link href=\'http://fonts.googleapis.com/css?family=PT+Sans:400,400italic,700&amp;subset=cyrillic,latin&amp;v2\' rel=\'stylesheet\' type=\'text/css\' />
	<link rel="stylesheet" type="text/css" href="', $settings['theme_url'], '/css/index', $context['theme_variant'], '.css?v=3.0.0" />
	 <link rel="stylesheet" type="text/css" href="', $settings['theme_url'], '/css/grid.css" />
	';
  
  
  /**
   * Forplay CSS below.
   * START
   */
  
  echo '
  <link href="', $settings['theme_url'], '/forplay/_forplay.css?v=3.0.2" type="text/css" rel="stylesheet"/>
  <link href="', $settings['theme_url'], '/forplay/_login.css?v=3.0.2" type="text/css" rel="stylesheet"/>
  <link href="', $settings['theme_url'], '/forplay/_media.css?v=3.0.2" type="text/css" rel="stylesheet"/>';
  
  /**
   * END
   * Forplay CSS above.
   */
	
	
	// Some browsers need an extra stylesheet due to bugs/compatibility issues.
	foreach (array('ie7', 'ie6', 'webkit') as $cssfix)
		if ($context['browser']['is_' . $cssfix])
			echo '
	<link rel="stylesheet" type="text/css" href="', $settings['default_theme_url'], '/css/', $cssfix, '.css" />';

	// RTL languages require an additional stylesheet.
	if ($context['right_to_left'])
		echo '
	<link rel="stylesheet" type="text/css" href="', $settings['theme_url'], '/css/rtl.css" />';

	// Here comes the JavaScript bits!
	echo '
	<script type="text/javascript" src="', $settings['theme_url'], '/scripts/script.js?fin20"></script>
	<script type="text/javascript" src="', $settings['theme_url'], '/scripts/theme.js?fin20"></script>
	<script type="text/javascript"><!-- // --><![CDATA[
		var smf_theme_url = "', $settings['theme_url'], '";
		var smf_default_theme_url = "', $settings['default_theme_url'], '";
		var smf_images_url = "', $settings['images_url'], '";
		var smf_scripturl = "', $scripturl, '";
		var smf_iso_case_folding = ', $context['server']['iso_case_folding'] ? 'true' : 'false', ';
		var smf_charset = "', $context['character_set'], '";', $context['show_pm_popup'] ? '
		var fPmPopup = function ()
		{
			if (confirm("' . $txt['show_personal_messages'] . '"))
				window.open(smf_prepareScriptUrl(smf_scripturl) + "action=pm");
		}
		addLoadEvent(fPmPopup);' : '', '
		var ajax_notification_text = "', $txt['ajax_in_progress'], '";
		var ajax_notification_cancel_text = "', $txt['modify_cancel'], '";
	// ]]></script>';

	echo '
	<meta http-equiv="Content-Type" content="text/html; charset=', $context['character_set'], '" />
	<meta name="description" content="', $context['page_title_html_safe'], '" />', !empty($context['meta_keywords']) ? '
	<meta name="keywords" content="' . $context['meta_keywords'] . '" />' : '', '
	<title>', $context['page_title_html_safe'], '</title>';

	// Please don't index these Mr Robot.
	if (!empty($context['robot_no_index']))
		echo '
	<meta name="robots" content="noindex" />';

	// Present a canonical url for search engines to prevent duplicate content in their indices.
	if (!empty($context['canonical_url']))
		echo '
	<link rel="canonical" href="', $context['canonical_url'], '" />';

	// Show all the relative links, such as help, search, contents, and the like.
	echo '
	<link rel="help" href="', $scripturl, '?action=help" />
	<link rel="search" href="', $scripturl, '?action=search" />
	<link rel="contents" href="', $scripturl, '" />';

	// If RSS feeds are enabled, advertise the presence of one.
	if (!empty($modSettings['xmlnews_enable']) && (!empty($modSettings['allow_guestAccess']) || $context['user']['is_logged']))
		echo '
	<link rel="alternate" type="application/rss+xml" title="', $context['forum_name_html_safe'], ' - ', $txt['rss'], '" href="', $scripturl, '?type=rss;action=.xml" />';

	// If we're viewing a topic, these should be the previous and next topics, respectively.
	if (!empty($context['current_topic']))
		echo '
	<link rel="prev" href="', $scripturl, '?topic=', $context['current_topic'], '.0;prev_next=prev" />
	<link rel="next" href="', $scripturl, '?topic=', $context['current_topic'], '.0;prev_next=next" />';

	// If we're in a board, or a topic for that matter, the index will be the board's index.
	if (!empty($context['current_board']))
		echo '
	<link rel="index" href="', $scripturl, '?board=', $context['current_board'], '.0" />';

	// Output any remaining HTML headers. (from mods, maybe?)
	echo $context['html_headers'];
  

  
echo '
</head>
<body>';
}

function template_body_above()
{
	global $context, $settings, $options, $scripturl, $txt, $modSettings;

/**
 * Forplay header with navigation below.
 * START
 */
	
echo '
<div id="holy-wrapper">
  <header id="header" class="fixed">
    <h1 id="logo"> <a href="/"><img 
        id="forPlay" class="svg" src="', $settings['theme_url'], '/forplay/forplay.svg" alt="Forplay&reg;" /></a> </h1>
    <section class="cover-set">
      <div id="covers">
        <article class="cover"> <a href=""></a> </article>
        <article class="cover"> <a href=""></a> </article>
        <article class="cover"> <a href=""></a> </article>
        <article class="cover"> <a href=""></a> </article>
        <article class="cover"> <a href=""></a> </article>
      </div>
    </section>
    <section class="nav-set">';
      
      template_menu();
      
      echo '
      <div id="search-memberarea" class="search" role="search">
        <form id="searchForm"
              method="post"
              action="', $scripturl, '?action=search2"  
              accept-charset="', $context['character_set'], '">
          <input type="text" name="search" placeholder="', $txt['search'], '" id="s" />
          <button type="submit" name="submit" value="" id="searchSubmit" 
                  aria-label="', $txt['search'], '"><img 
                  src="', $settings['theme_url'], '/forplay/search.svg" alt="Търси" class="svg" /></button>
          <input type="hidden" name="advanced" value="0" />';
          
          if (!empty($context['current_topic']))
            echo '
            <input type="hidden" name="topic" 
                   value="', $context['current_topic'], '" />';
            
          elseif (!empty($context['current_board']))
            echo '
            <input type="hidden" name="brd[', $context['current_board'], ']" 
                   value="', $context['current_board'], '" />';
            
        echo '
        </form>
      </div>';
      
      if ($context['user']['is_logged']) {
        echo '
        <div id="loginContainer" class="user" role="region">
          <button id="loginButton" type="button" aria-pressed="false">
          <label><em>Наздраве, </em><strong>', $context['user']['name'];
          
          if ($context['user']['unread_messages'] > 0)
            echo '
            <sup id="inactive_pm_count">', $context['user']['unread_messages'] , '</sup>';
          
          echo '
          </strong></label>';
          
          if (!empty($context['user']['avatar']))
            echo $context['user']['avatar']['image'];
          else
            echo '
            <img src="', $settings['theme_url'], '/forplay/anonymous.svg" class="svg" alt="Непознат" />';   
          
          echo '
          </button>
          <div id="loginBox">
            <div id="loginForm">
              <div>
                <ul>';
              
                foreach ($context['menu_buttons'] as $act => $button) {
                  
                  /**
                   * This is LI with A inside, if you wander about the code mess.
                   */ 
                  
                  echo '
                  <li id="button_', $act, '"> <a 
                      class="', $button['active_button'] ? 'active ' : '', 'firstlevel" 
                      href="', $button['href'], '"', isset($button['target']) ? ' 
                      target="' . $button['target'] . '"' : '', '>', $button['title'], '</a></li>';
                }
                
                  echo '
                  <li><a href="', $scripturl, '?action=unread">', $txt['unread_since_visit'], '</a></li>
                  <li><a href="', $scripturl, '?action=unreadreplies">', $txt['show_unread_replies'], '</a></li>';
                
                if ($context['in_maintenance'] && $context['user']['is_admin'])
			            echo '
					        <li class="notice"><strong>', $txt['maintain_mode_on'], '</strong></li>';
 
                echo '
                </ul>
              </div>
            </div>
          </div>
        </div>';
      }
      
      elseif (!empty($context['show_login_bar'])) {
        echo '
        <script type="text/javascript" src="', $settings['default_theme_url'], '/scripts/sha1.js"></script>
        <div id="loginContainer" class="user" role="region">
          <button id="loginButton" type="button" aria-pressed="false">
          <label><em>Наздраве, </em><strong>Непознат</strong></label>
          <img src="', $settings['theme_url'], '/forplay/anonymous.svg" class="svg" alt="Непознат" />
          </button>
          <div id="loginBox">
            <form id="loginForm" 
                  action="', $scripturl, '?action=login2" 
                  method="post" 
                  accept-charset="', $context['character_set'], '" ', empty($context['disable_login_hashing']) ? ' 
                  onsubmit="hashLoginPassword(this, \'' . $context['session_id'] . '\');"' : '', '>
              <input type="hidden" name="hash_passwrd" value="" />
              <label>
                <input aria-label="Никнейм" placeholder="Никнейм" type="text" name="user" />
              </label>
              <label>
                <input aria-label="Парола" placeholder="Парола" type="password" name="passwrd" />
              </label>
              <label for="cookielength"><span>Запомни ме за</span>
                <select name="cookielength">
                  <option value="60">', $txt['one_hour'], '</option>
                  <option value="1440">', $txt['one_day'], '</option>
                  <option value="10080">', $txt['one_week'], '</option>
                  <option value="43200">', $txt['one_month'], '</option>
                  <option value="-1" selected="selected">', $txt['forever'], '</option>
                </select>
              </label>';
              
              if (!empty($modSettings['enableOpenID']))
                echo '
                <label>
                  <input aria-label="OpenID" placeholder="OpenID" type="text" 
                         name="openid_identifier" id="openid_url" />
                </label>';
              
              echo '
              <input type="submit" value="', $txt['login'], '" id="login" />
              <a href="', $scripturl, '?action=reminder">', $txt['forgot_your_password'], '</a>
            </form>
          </div>
        </div>';
      }
    
    echo '
    </section>
  </header>';

/**
 * END
 * Forplay header with navigation above.
 */

echo '
<div id="content">
	<div class="container">
	<br class="clear" />
		
		  <div id="adv-social">
		<!-- ad & social 
				<div class="adv left">
					 <img src="http://localhost/FORPLAY/html/img/adv-728x90.jpg" alt="Advert 728x90px" />
				</div>
				
				<div id="head-social" class="right">
					 <h3 class="section-heading"><span>Следете ни</span></h3>
					 <ul>
						  <li class="left"><a href="#rss" class="rss">RSS</a></li>
						  <li class="left no-border"><a href="#rss" class="rss">Itunes</a></li>
						  <li class="left"><a href="#rss" class="rss">Facebook</a></li>
						  <li class="left no-border"><a href="#rss" class="rss">Twitter</a></li>
					 </ul>
				</div>	 -->
		  </div>'
	;	

	echo !empty($settings['forum_width']) ? '
<div id="wrapper" style="width: ' . $settings['forum_width'] . '">' : '';



	// The main content should go here.
	echo '
	<div id="content_section"><div class="frame">
		<div id="main_content_section">';

	// Custom banners and shoutboxes should be placed here, before the linktree.

	// Show the navigation tree.
	theme_linktree();
}

function template_body_below()
{
	global $context, $settings, $options, $scripturl, $txt, $modSettings;

	echo '
		</div>
	</div></div>
	</div>';

	// Show the "Powered by" and "Valid" logos, as well as the copyright. Remember, the copyright must be somewhere!
	/*echo '
	<div id="footer_section"><div class="frame">
		<ul class="reset">
			<li class="copyright">', theme_copyright(), '</li>
			<li><a id="button_xhtml" href="http://validator.w3.org/check?uri=referer" target="_blank" class="new_win" title="', $txt['valid_xhtml'], '"><span>', $txt['xhtml'], '</span></a></li>
			', !empty($modSettings['xmlnews_enable']) && (!empty($modSettings['allow_guestAccess']) || $context['user']['is_logged']) ? '<li><a id="button_rss" href="' . $scripturl . '?action=.xml;type=rss" class="new_win"><span>' . $txt['rss'] . '</span></a></li>' : '', '
			<li class="last"><a id="button_wap2" href="', $scripturl , '?wap2" class="new_win"><span>', $txt['wap2'], '</span></a></li>
		</ul>'; */

	// Show the load time?
	/* if ($context['show_load_time'])
		echo '
		<p>', $txt['page_created'], $context['load_time'], $txt['seconds_with'], $context['load_queries'], $txt['queries'], '</p>';

	echo '
	</div>*/
	echo'<div style="height: 50px;" class="container"></div></div>', !empty($settings['forum_width']) ? '
</div>
</div>' : '';
}

function template_html_below()
{
	global $context, $settings, $options, $scripturl, $txt, $modSettings;
		echo '
<script type="text/javascript">!window.jQuery && document.write(unescape(\'%3Cscript src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"%3E%3C/script%3E\'))</script>
<script src="', $settings['theme_url'], '/scripts/jquery.color.js"></script>
<script src="', $settings['theme_url'], '/scripts/global.js?v=3.0.1"></script>
<script type="text/javascript">

$(function (){
	var icon_status = $(".table_list td.icon img[src$=\'on.png\']");
	icon_status.parents("td.icon").addClass("icon_unread");
	
	var unread_pm_container = $("strong#inactive_pm_count");
	var unread_pm_container_html = $("strong#inactive_pm_count").html();
	
	if(unread_pm_container_html > 0) {
		unread_pm_container.addClass("unread-messages-notify");
	}
	
	else {
		unread_pm_container.removeClass("unread-messages-notify");	
	}
	
	console.log(unread_pm_container_html);
});
</script>';

/**
 * Forplay script below.
 * START
 */

echo '
<script src="', $settings['theme_url'], '/forplay/_forplay.js" type="text/javascript"></script>
<script src="', $settings['theme_url'], '/forplay/_svg.js" type="text/javascript"></script>
<script src="', $settings['theme_url'], '/forplay/_covers.js" type="text/javascript"></script>';

/**
 * END
 * Forplay script above.
 */

echo '
</body></html>';
}

// Show a linktree. This is that thing that shows "My Community | General Category | General Discussion"..
function theme_linktree($force_show = false)
{
	global $context, $settings, $options, $shown_linktree;

	// If linktree is empty, just return - also allow an override.
	if (empty($context['linktree']) || (!empty($context['dont_default_linktree']) && !$force_show))
		return;

	echo '
	<div class="navigate_section">
		<ul>';

	// Each tree item has a URL and name. Some may have extra_before and extra_after.
	foreach ($context['linktree'] as $link_num => $tree)
	{
		echo '
			<li', ($link_num == count($context['linktree']) - 1) ? ' class="last"' : '', '>';

		// Show something before the link?
		if (isset($tree['extra_before']))
			echo $tree['extra_before'];

		// Show the link, including a URL if it should have one.
		echo $settings['linktree_link'] && isset($tree['url']) ? '
				<a href="' . $tree['url'] . '"><span>' . $tree['name'] . '</span></a>' : '<span>' . $tree['name'] . '</span>';

		// Show something after the link...?
		if (isset($tree['extra_after']))
			echo $tree['extra_after'];

		// Don't show a separator for the last one.
		if ($link_num != count($context['linktree']) - 1)
			echo ' &#187;';

		echo '
			</li>';
	}
	echo '
		</ul>
	</div>';

	$shown_linktree = true;
}

/**
 * Forplay nav below.
 * START
 */
function template_menu()
{
	global $context, $settings, $options, $scripturl, $txt;
  
  echo '
  <nav id="nav">
    <ul id="forum-sub">';
    
      foreach ($context['menu_buttons'] as $act => $button) { 
        echo '
				<li id="button_', $act, '"> <a class="', $button['active_button'] ? 'active ' : '', 'firstlevel" 
                                       href="', $button['href'], '"', isset($button['target']) ? ' 
                                       target="' . $button['target'] . '"' : '', '> ', $button['title'], '</a>';
		    
        /**
         * Submenu.
         */
        
        if (!empty($button['sub_buttons'])) {
			    echo '<ul>';

			    foreach ($button['sub_buttons'] as $childbutton) {
				    echo '
						<li> <a href="', $childbutton['href'], '"', isset($childbutton['target']) ? ' 
                    target="' . $childbutton['target'] . '"' : '', '> <span', isset($childbutton['is_last']) ? ' 
                    class="last"' : '', '>', $childbutton['title'], !empty($childbutton['sub_buttons']) ? '...' : '', '</span></a></li>';
			    }
				  
          echo '</ul>';
		    }
		    
        echo '</li>';
	    }
    
    echo '
    </ul>
  </nav>';
}
/**
 * END
 * Forplay nav above.
 */

// Generate a strip of buttons.
function template_button_strip($button_strip, $direction = 'top', $strip_options = array())
{
	global $settings, $context, $txt, $scripturl;

	if (!is_array($strip_options))
		$strip_options = array();

	// List the buttons in reverse order for RTL languages.
	if ($context['right_to_left'])
		$button_strip = array_reverse($button_strip, true);

	// Create the buttons...
	$buttons = array();
	foreach ($button_strip as $key => $value)
	{
		if (!isset($value['test']) || !empty($context[$value['test']]))
			$buttons[] = '
				<li><a' . (isset($value['id']) ? ' id="button_strip_' . $value['id'] . '"' : '') . ' class="button_strip_' . $key . (isset($value['active']) ? ' active' : '') . '" href="' . $value['url'] . '"' . (isset($value['custom']) ? ' ' . $value['custom'] : '') . '><span>' . $txt[$value['text']] . '</span></a></li>';
	}

	// No buttons? No button strip either.
	if (empty($buttons))
		return;

	// Make the last one, as easy as possible.
	$buttons[count($buttons) - 1] = str_replace('<span>', '<span class="last">', $buttons[count($buttons) - 1]);

	echo '
		<div class="buttonlist', !empty($direction) ? ' float' . $direction : '', '"', (empty($buttons) ? ' style="display: none;"' : ''), (!empty($strip_options['id']) ? ' id="' . $strip_options['id'] . '"': ''), '>
			<ul>',
				implode('', $buttons), '
			</ul>
		</div>';
}

?>