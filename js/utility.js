'use strict';

(function () {
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
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      func();
    }
  };

  var isEnterEvent = function (evt, func) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
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
