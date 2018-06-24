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

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/code-and-magick';

    xhr.responseType = 'json';
    xhr.timeout = window.constants.ALLOWABLE_LOAD_TIME;

    xhr.open('POST', URL);

    xhr.send(data);

    xhr.addEventListener('load', function (evt) {
      try {
        if (evt.target.status === window.constants.SUCCESS_STATUS) {
          onLoad();
        } else {
          onError('Статус загрузки ' + evt.target.status);
        }
      } catch (err) {
        onError('Ошибка - ' + err.name + ' : ' + err.message);
      }
    });

    xhr.addEventListener('timeout', function (evt) {
      onError('Загрузка не успела произойти за ' + evt.target.timeout + 'ms');
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка загрузки данных');
    });
  };

  window.backend = {
    load: load,
    save: save
  };
})();
