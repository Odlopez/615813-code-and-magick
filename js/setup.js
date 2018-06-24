'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var similarCharacters = document.querySelector('.setup-similar');
  var similarListElement = similarCharacters.querySelector('.setup-similar-list');
  var wizardCoat = document.querySelector('.wizard-coat');
  var inputCoatColor = document.querySelector('input[name="coat-color"]');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var inputEyesColor = document.querySelector('input[name="eyes-color"]');
  var inputUsername = document.querySelector('input[name="username"]');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var inputFireballColor = document.querySelector('input[name="fireball-color"]');
  var submit = document.querySelector('.setup-submit');
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
    window.utilities.isEscEvent(evt, onSetupCloseClick);
  };

  var onSetupEnterPress = function (evt) {
    window.utilities.isEnterEvent(evt, onSetupOpenClick);
  };

  var onSetupClosePress = function (evt) {
    window.utilities.isEnterEvent(evt, onSetupCloseClick);
  };

  var onSubmitClick = function (evt) {
    evt.preventDefault();

    var form = evt.target.form;

    if (inputUsername.checkValidity()) {
      window.backend.save(new FormData(form), onSetupCloseClick, window.utilities.renderMessage);
    } else {
      window.utilities.renderMessage(inputUsername.validationMessage);
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  var onCoatClick = window.utilities.changesColor(window.constants.COAT_COLORS, 'fill', inputCoatColor);
  var onWizardEyesClick = window.utilities.changesColor(window.constants.EYES_COLORS, 'fill', inputEyesColor);
  var onFireballClick = window.utilities.changesColor(window.constants.FIREBALL_COLORS, 'backgroundColor', inputFireballColor);

  setupOpen.addEventListener('click', onSetupOpenClick);
  setupOpen.addEventListener('keydown', onSetupEnterPress);
  submit.addEventListener('click', onSubmitClick);

  var fragment = document.createDocumentFragment();
  similarListElement.appendChild(fragment);

  similarCharacters.classList.remove('hidden');
})();
