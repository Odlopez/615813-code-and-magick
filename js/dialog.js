'use strict';

var handler = document.querySelector('.upload');
var setup = document.querySelector('.setup');

var onHandlerMousedown = function (evt) {
  evt.preventDefault();

  var start = {
    x: evt.clientX,
    y: evt.clientY
  };

  var flag = false;

  var onHandlerMousemove = function (evtMove) {
    evtMove.preventDefault();

    flag = true;

    var shift = {
      x: start.x - evtMove.clientX,
      y: start.y - evtMove.clientY
    };

    start.x = evtMove.clientX;
    start.y = evtMove.clientY;

    setup.style.left = setup.offsetLeft - shift.x + 'px';
    setup.style.top = setup.offsetTop - shift.y + 'px';
  };

  var onHandlerMouseup = function (evtUp) {
    evtUp.preventDefault();

    document.removeEventListener('mousemove', onHandlerMousemove);
    document.removeEventListener('mouseup', onHandlerMouseup);

    if (flag) {
      var onClickPreventDefault = function (e) {
        e.preventDefault();

        handler.removeEventListener('click', onClickPreventDefault);
      };

      handler.addEventListener('click', onClickPreventDefault);
    }
  };

  document.addEventListener('mousemove', onHandlerMousemove);
  document.addEventListener('mouseup', onHandlerMouseup);
};

handler.addEventListener('mousedown', onHandlerMousedown);
