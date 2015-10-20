var jq = document.createElement('script');
jq.src = "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js";
document.querySelector('head').appendChild(jq);

jq.onload = procede;

function procede()
{
  $(document).ready(function() {
    var Width = $(window).width();
    var Height = $(window).height();
    $('body').css('background-image', 'url("http://www.unsplash.it/' + Width + '/' + Height + '/?random")');
    
    $( window ).resize(function() {
      var Width = $(window).width();
      var Height = $(window).height();
      $('body').css('background-image', 'url("http://www.unsplash.it/' + Width + '/' + Height + '/?random")');
    });
  });
}