(function(){
  if (!document.documentElement.addEventListener) {
    return;
  }

  var options, style, loadingStyle, debounce, set;

  options = INSTALL_OPTIONS;

  style = document.createElement('style');
  document.head.appendChild(style);

  loadingStyle = document.createElement('style');
  document.head.appendChild(loadingStyle);

  debounce = function(time, fn) {
    var timeout;

    return function() {
      var args = arguments, that = this;

      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(function(){
        timeout = null;
        return fn.apply(that, args);
      }, time);
    };
  };

  set = function(initial) {
    var width, height, src, image;

    width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    src = 'http://www.unsplash.it/' + (options.imageOptions.grayscale ? 'g/' : '') + width + '/' + height + '/?random' + (options.imageOptions.blur ? '&blur' : '');

    if (initial === true && options.hidePageWhileLoading) {
      loadingStyle.innerHTML = 'html { opacity: 0 !important }';

      image = new Image();
      image.onload = image.onerror = function() {
        loadingStyle.innerHTML = 'html { transition: opacity .3s ease !important; opacity: 1 !important }';
      };
      image.src = src;
    }

    style.innerHTML = (
      'body {' +
        'background: url("' + src + '") no-repeat center center fixed !important;' +
        'background-size: cover !important' +
      '}'
    );
  };

  set(true);

  window.addEventListener('resize', debounce(500, set));
})();
