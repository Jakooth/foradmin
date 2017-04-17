$(function(){

// ========= Search animation

    var input = $('input#s');
    var divInput = $('div.input');
    var width = divInput.width();
    var outerWidth = divInput.parent().width() - (divInput.outerWidth() - width) - 28;
    var submit = $('#searchSubmit');
    var txt = input.val();
    
    input.bind('focus', function() {
        if(input.val() === txt) {
            input.val('');
        }
        $(this).animate({color: '#999'}, 300); // text color
        $(this).parent().animate({
        }, 300, function() {
            if(!(input.val() === '' || input.val() === txt)) {
                if(!($.browser.msie && $.browser.version < 9)) {
                    submit.fadeIn(300);
                } else {
                    submit.css({display: 'block'});
                }
            }
        }).addClass('focus');
    });
	
	

	
// ============ Login button
    var button = $('#loginButton');
    var box = $('#loginBox');
    var form = $('#loginForm');
    button.removeAttr('href');
    button.mouseup(function(login) {
        box.toggle();
        button.toggleClass('active');
    });
    form.mouseup(function() { 
        return false;
    });
    $(this).mouseup(function(login) {
        if(!($(login.target).parent('#loginButton').length > 0)) {
            button.removeClass('active');
            box.hide();
        }
    });
	
	
// ================= misc

//forum hover submenu 

$("#forum-sub li a + ul").hover(function(){
    $(this).prev().addClass('hover');
}, function() {
    $(this).prev().removeClass('hover');
});

var adminSubMenu = $("#admin_menu .dropmenu li a").next("ul");

adminSubMenu.hover(function() {
	$(this).prev().addClass("firstlevelHover");
}, function(){
	$(this).prev().removeClass("firstlevelHover");
	});

$('#admin_menu ul li ul li ul').hover(function(){
	$(this).parent("li").addClass("subHover");	
}, function(){
		$(this).parent("li").removeClass("subHover");	

});

$("#logo a").hover(function(){
	
	$(this).addClass("hover");
	$(this).children().fadeIn();

},function(){
	$(this).children().fadeOut();
});

});