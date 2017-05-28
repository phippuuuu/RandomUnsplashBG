(function () {
  if (!document.documentElement.addEventListener) return

  function getRandomID () {
    return Math.floor(Math.random() * 1083)
  }

  var options = INSTALL_OPTIONS
  var isPreview = INSTALL_ID === 'preview'
  var imageID = getRandomID()

  var style = document.createElement('style')
  document.head.appendChild(style)

  var loadingStyle = document.createElement('style')
  document.head.appendChild(loadingStyle)

  function debounce (time, fn) {
    var timeout

    return function () {
      var args = arguments
      var self = this

      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(function () {
        timeout = null
        return fn.apply(self, args)
      }, time)
    }
  }

  var resizeHandler = debounce(500, function () { updateElement() })

  function updateElement (initial) {
    var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    var src = [
      'https://www.unsplash.it/',
      (options.imageOptions.grayscale ? 'g/' : ''),
      width,
      '/',
      height,
      '/?image=' + imageID,
      (options.imageOptions.blur ? '&blur' : ''),
      (isPreview ? '&' + (new Date()).getTime() : '')
    ].join('')

    function onFinish () {
      loadingStyle.innerHTML = 'html { transition: opacity .3s ease !important; opacity: 1 !important }'
    }

    loadingStyle.innerHTML = options.hidePageWhileLoading ? 'html { opacity: 0 !important }' : ''

    var image = new window.Image()
    image.onload = function () {
      style.innerHTML = (
        'body {' +
          'background: url("' + src + '") no-repeat center center fixed !important;' +
          'background-size: cover !important' +
        '}'
      )
      onFinish()
    }

    image.onerror = onFinish
    image.src = src

    if (initial) {
      window.addEventListener('resize', resizeHandler)
    }
  }

  updateElement(true)

  window.INSTALL_SCOPE = {
    setOptions: function setOptions (nextOptions) {
      options = nextOptions
      updateElement()
    }
  }
}())
