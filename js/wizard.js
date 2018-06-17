'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвин'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARDS_QUANTYTI = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarCharacters = document.querySelector('.setup-similar');
  var similarListElement = similarCharacters.querySelector('.setup-similar-list');

  var generateWizardsParameters = function (number) {
    var wizardsParameters = [];

    for (var i = 0; i < number; i++) {
      var wizardOptions = {};

      wizardOptions.name = window.utility.randonElement(WIZARD_NAMES) + ' ' + window.utility.randonElement(WIZARD_SURNAMES);
      wizardOptions.coatColor = window.utility.randonElement(COAT_COLORS);
      wizardOptions.eyesColor = window.utility.randonElement(EYES_COLORS);

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

  var wizards = generateWizardsParameters(WIZARDS_QUANTYTI);

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < WIZARDS_QUANTYTI; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);

  similarCharacters.classList.remove('hidden');
})();
