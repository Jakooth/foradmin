$(document).ready(function() { 
  $('#covers').on('mouseover', 'article:not(:eq(0))', function (e) {
    var $this = $(this),
        $c1 = $('#covers article:eq(1)'),
        $c2 = $('#covers article:eq(2)'),
        $c3 = $('#covers article:eq(0)'),
        $c4 = $('#covers article:eq(3)'),
        $c5 = $('#covers article:eq(4)');
    
    if ($this.index() > 2) {
      $c3.addClass('unfocus unfocus-left');
    } else {
      $c3.addClass('unfocus unfocus-right');
    }
    
    $this.index() == 4 ? $c4.addClass('unfocus') : null;
    $this.index() == 1 ? $c2.addClass('unfocus') : null;
  });
  
  $('#covers').on('mouseout', 'article:not(:eq(0))', function (e) {                            
    var $this = $(this),
        $c1 = $('#covers article:eq(1)'),
        $c2 = $('#covers article:eq(2)'),
        $c3 = $('#covers article:eq(0)'),
        $c4 = $('#covers article:eq(3)'),
        $c5 = $('#covers article:eq(4)');
    
    $c3.removeClass('unfocus unfocus-left');
    $c3.removeClass('unfocus unfocus-right');
  
    $c4.removeClass('unfocus');
    $c2.removeClass('unfocus');
  });
});