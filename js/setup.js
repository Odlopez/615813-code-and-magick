'use strict';

var settingsWindow = document.querySelector('.setup');
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвин'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var similarCharacters = document.querySelector('.setup-similar');
var similarListElement = similarCharacters.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomArrayElement = function (arr) {
  var randomIndexNumber = Math.floor(Math.random() * arr.length);

  return arr[randomIndexNumber];
};

var generateWizardsParameters = function (number) {
  var wizardsParameters = [];

  for (var i = 0; i < number; i++) {
    var wizardOptions = {};

    wizardOptions.name = getRandomArrayElement(WIZARD_NAMES) + ' ' + getRandomArrayElement(WIZARD_SURNAMES);
    wizardOptions.coatColor = getRandomArrayElement(COAT_COLORS);
    wizardOptions.eyesColor = getRandomArrayElement(EYES_COLORS);

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

settingsWindow.classList.remove('hidden');

var wizards = generateWizardsParameters(4);

var fragment = document.createDocumentFragment();

for (var i = 0; i < 4; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

similarCharacters.classList.remove('hidden');
