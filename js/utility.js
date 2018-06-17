'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var getRandomArrayElement = function (arr) {
    var randomIndexNumber = Math.floor(Math.random() * arr.length);

    return arr[randomIndexNumber];
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
    if (evt.keyCode === ESC_KEYCODE) {
      func();
    }
  };

  var isEnterEvent = function (evt, func) {
    if (evt.keyCode === ENTER_KEYCODE) {
      func();
    }
  };

  window.utility = {
    randonElement: getRandomArrayElement,
    changesColor: changesColorElement,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
