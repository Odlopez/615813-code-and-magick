'use strict';

(function () {
  var handler = document.querySelector('.upload');
  var setup = document.querySelector('.setup');

  var onHandlerMousedown = function (evt) {
    evt.preventDefault();

    var start = {
      x: evt.clientX,
      y: evt.clientY
    };

    var isMove = false;

    var onHandlerMousemove = function (evtMove) {
      evtMove.preventDefault();

      isMove = true;

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

      if (isMove) {
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

  var onSetupMouseDown = function (evt) {
    evt.preventDefault();

    var elem = evt.target.closest('img[draggable="true"]');

    if (!elem) {
      return;
    }

    var shift = {
      x: evt.clientX - elem.offsetLeft,
      y: evt.clientY - elem.offsetTop
    };

    var onElemMousemove = function (evtMove) {
      evtMove.preventDefault();

      elem.style.position = 'absolute';
      elem.style.zIndex = 1000;

      elem.style.left = evtMove.clientX - shift.x + 'px';
      elem.style.top = evtMove.clientY - shift.y + 'px';
    };

    var onElemMouseup = function (evtDown) {
      evtDown.preventDefault();
      elem.style.position = 'static';

      var elemEnd = document.elementFromPoint(evtDown.clientX, evtDown.clientY).closest('.setup-artifacts-cell');

      if (elemEnd) {
        elemEnd.appendChild(elem);
      }

      document.removeEventListener('mousemove', onElemMousemove);
      document.removeEventListener('mouseup', onElemMouseup);
    };

    if (elem) {
      document.addEventListener('mousemove', onElemMousemove);
      document.addEventListener('mouseup', onElemMouseup);
    }
  };

  setup.addEventListener('mousedown', onSetupMouseDown);
  handler.addEventListener('mousedown', onHandlerMousedown);
})();
