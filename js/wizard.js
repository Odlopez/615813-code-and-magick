'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarCharacters = document.querySelector('.setup-similar');
  var similarListElement = similarCharacters.querySelector('.setup-similar-list');

  var generateWizardsParameters = function (number) {
    var wizardsParameters = [];

    for (var i = 0; i < number; i++) {
      var wizardOptions = {};

      wizardOptions.name = window.utility.randonElement(window.constants.WIZARD_NAMES) + ' ' + window.utility.randonElement(window.constants.WIZARD_SURNAMES);
      wizardOptions.coatColor = window.utility.randonElement(window.constants.COAT_COLORS);
      wizardOptions.eyesColor = window.utility.randonElement(window.constants.EYES_COLORS);

      wizardsParameters.push(wizardOptions);
    }

    return wizardsParameters;
  };

  var renderWizard = function (wizard) {
    var randomWizard = similarWizardTemplate.cloneNode(true);

    randomWizard.querySelector('.setup-similar-label').textContent = wizard.name;
    randomWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    randomWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return randomWizard;
  };

  var wizards = generateWizardsParameters(window.constants.WIZARDS_QUANTYTI);

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < window.constants.WIZARDS_QUANTYTI; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);

  similarCharacters.classList.remove('hidden');
})();
