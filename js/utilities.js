'use strict';

(function () {
  var getRandomArrayElement = function (arr) {
    var randomIndexNumber = Math.floor(Math.random() * arr.length);

    return arr[randomIndexNumber];
  };

  var getRandomNumber = function (to, from) {
    from = from || 0;

    return Math.round(Math.random() * (to - from) + from);
  };

  var sortFisherYates = function (arr, getNewArray) {
    var j;
    var x;

    if (getNewArray) {
      arr = arr.slice(0);
    }

    for (var i = arr.length - 1; i > 0; i--) {
      j = getRandomNumber(arr.length - 1);
      x = arr[j];
      arr[j] = arr[i];
      arr[i] = x;
    }

    return arr;
  };

  var changesColorElement = function (colors, parameter, input) {
    return function (evt) {
      var color;

      do {
        color = getRandomArrayElement(colors);
      } while (evt.target.style[parameter] === color);

      evt.target.style[parameter] = color;
      input.value = color;
    };
  };

  var isEscEvent = function (evt, func) {
    if (evt.keyCode === window.constants.KEY_CODE.ESC) {
      func(evt);
    }
  };

  var isEnterEvent = function (evt, func) {
    if (evt.keyCode === window.constants.KEY_CODE.ENTER) {
      func(evt);
    }
  };

  var renderErrorMessage = function (message) {
    var popup = document.createElement('div');

    var onPopupClick = function () {

      document.body.removeChild(popup);

      popup.removeEventListener('click', onPopupClick);
      document.removeEventListener('keydown', onDcumentKeydown);
    };

    var onDcumentKeydown = function (evt) {
      isEscEvent(evt, onPopupClick);
    };

    popup.className = 'error-message';
    popup.textContent = message;

    document.body.insertAdjacentElement('afterbegin', popup);
    popup.addEventListener('click', onPopupClick);
    document.addEventListener('keydown', onDcumentKeydown);
  };

  window.utilities = {
    randonElement: getRandomArrayElement,
    changesColor: changesColorElement,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    sort: sortFisherYates,
    renderMessage: renderErrorMessage
  };
})();
