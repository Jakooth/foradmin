$(document).ready(function() { 
  function embedSVG($img) {		
    var	imgID = $img.attr('id'),
        imgClass = $img.attr('class'),
        imgURL = $img.attr('src'),
        imgGet = $.get(imgURL);	
  
    $.when(imgGet).done(function(data) {
      var $svg = $(data).find('svg');
  
      if (typeof imgID !== 'undefined') {
        $svg.attr('id', imgID);
      }
      
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }
       
      $img.replaceWith($svg);
    }).fail(function() {
      console.log("Failed to convert SVG.");
    });
  }
  
  $('header').find('img.svg').each(function() {
    embedSVG($(this));
  });
});