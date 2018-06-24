'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarCharacters = document.querySelector('.setup-similar');
  var similarListElement = similarCharacters.querySelector('.setup-similar-list');

  var renderWizard = function (wizard) {
    var randomWizard = similarWizardTemplate.cloneNode(true);

    randomWizard.querySelector('.setup-similar-label').textContent = wizard.name;
    randomWizard.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    randomWizard.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return randomWizard;
  };

  var onLoad = function (data) {
    window.utilities.sort(data);

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.constants.WIZARDS_QUANTYTI; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }

    similarListElement.appendChild(fragment);

    similarCharacters.classList.remove('hidden');
  };

  var onError = function (message) {
    var popup = document.createElement('div');

    var onDcumentClick = function () {
      document.body.removeChild(popup);

      document.removeEventListener('click', onDcumentClick);
      document.removeEventListener('keydown', onDcumentKeydown);
    };

    var onDcumentKeydown = function (evt) {
      window.utilities.isEscEvent(evt, onDcumentClick);
    };

    popup.style = 'position: fixed; display: flex; justify-content: center; align-items: center; background-color: rgba(0, 0, 0, 0.8); font-size: 50px; padding: 10px 50px; color: rgb(255, 255, 255); text-align: center; z-index: 10; width: 100%; height: 100%;';
    popup.textContent = message;

    document.body.insertAdjacentElement('afterbegin', popup);
    document.addEventListener('click', onDcumentClick);
    document.addEventListener('keydown', onDcumentKeydown);
  };

  window.backend.load(onLoad, onError);
})();
