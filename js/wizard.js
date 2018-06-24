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
    document.body.textContent = message;
  };

  window.backend.load(onLoad, onError);
})();
