$(document).ready(function() { 
  $.get('/forapi/forplay.php?offset=0&limit=5')
   .done(function(data, textStatus, jqXHR) {
    var i = 0,
        articles = JSON.parse(data).articles,
        article,
        service = 'https://forplay.bg/forapi/phplib/timthumb/timthumb.php',
        bg;
        
    var $covers = $('#covers article'),
        $cover;    
    
    for(i; i < articles.length; i ++) {
      $cover = $covers.eq(i);
      
      article = articles[i];
      bg = service + '?src=/assets/articles/' + 
           article.cover_img.substring(0, article.cover_img.lastIndexOf('-')) + '/' + 
           article.cover_img + '&w=960&h=540';
      
      $cover.css('background-image', 'url(' + bg + ')');
      $cover.find('a').prop('href', '/articles/' + article.type + '/' + 
                                                   article.subtype + '/' + 
                                                   article.article_id + '/' + 
                                                   article.url + '')
    }
  }).fail(function(data, textStatus, jqXHR) {
    console.log('Failed to load covers.');
  });
});