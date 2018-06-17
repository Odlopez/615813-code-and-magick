'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var similarCharacters = document.querySelector('.setup-similar');
  var similarListElement = similarCharacters.querySelector('.setup-similar-list');
  var wizardCoat = document.querySelector('.wizard-coat');
  var inputCoatColor = document.querySelector('input[name="coat-color"]');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var inputEyesColor = document.querySelector('input[name="eyes-color"]');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var inputFireballColor = document.querySelector('input[name="fireball-color"]');
  var setupPosition = {
    x: '50%',
    y: '80px'
  };

  var onSetupOpenClick = function () {
    setup.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
    wizardCoat.addEventListener('click', onCoatClick);
    wizardEyes.addEventListener('click', onWizardEyesClick);
    wizardFireball.addEventListener('click', onFireballClick);
    setupClose.addEventListener('click', onSetupCloseClick);
    setupClose.addEventListener('keydown', onSetupClosePress);

    setupOpen.removeEventListener('click', onSetupOpenClick);
    setupOpen.removeEventListener('keydown', onSetupEnterPress);
  };

  var onSetupCloseClick = function () {
    setup.classList.add('hidden');

    wizardCoat.removeEventListener('click', onCoatClick);
    wizardEyes.removeEventListener('click', onWizardEyesClick);
    wizardFireball.removeEventListener('click', onFireballClick);
    setupClose.removeEventListener('keydown', onSetupClosePress);
    setupClose.removeEventListener('click', onSetupCloseClick);
    document.removeEventListener('keydown', onPopupEscPress);

    setupOpen.addEventListener('click', onSetupOpenClick);
    setupOpen.addEventListener('keydown', onSetupEnterPress);

    setup.style.left = setupPosition.x;
    setup.style.top = setupPosition.y;
  };

  var onPopupEscPress = function (evt) {
    window.utility.isEscEvent(evt, onSetupCloseClick);
  };

  var onSetupEnterPress = function (evt) {
    window.utility.isEnterEvent(evt, onSetupOpenClick);
  };

  var onSetupClosePress = function (evt) {
    window.utility.isEnterEvent(evt, onSetupCloseClick);
  };

  var onCoatClick = window.utility.changesColor(COAT_COLORS, 'fill', inputCoatColor);
  var onWizardEyesClick = window.utility.changesColor(EYES_COLORS, 'fill', inputEyesColor);
  var onFireballClick = window.utility.changesColor(FIREBALL_COLORS, 'backgroundColor', inputFireballColor);

  setupOpen.addEventListener('click', onSetupOpenClick);
  setupOpen.addEventListener('keydown', onSetupEnterPress);

  var fragment = document.createDocumentFragment();
  similarListElement.appendChild(fragment);

  similarCharacters.classList.remove('hidden');
})();
