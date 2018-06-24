'use strict';

(function () {
  var load = function (onLoad, onError) {
    var CALLBACK_NAME = '__jsonpCallback';
    var DATA_URL = 'https://js.dump.academy/code-and-magick/data';

    window[CALLBACK_NAME] = onLoad;

    try {
      var loader = document.createElement('script');
      loader.src = DATA_URL + '?callback=' + CALLBACK_NAME;
    } catch (err) {
      onError('Ошибка - ' + err.name + ' : ' + err.message);
    }


    loader.addEventListener('error', function () {
      onError('Произошла ошибка при загрузке данных');
    });
    document.body.append(loader);
  };

  window.backend = {
    load: load
  };
})();
