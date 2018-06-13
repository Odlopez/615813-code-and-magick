'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвин'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_QUANTYTI = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var settingsWindow = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var similarCharacters = document.querySelector('.setup-similar');
var similarListElement = similarCharacters.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizardCoat = document.querySelector('.wizard-coat');
var inputCoatColor = document.querySelector('input[name="coat-color"]');
var wizardEyes = document.querySelector('.wizard-eyes');
var inputEyesColor = document.querySelector('input[name="eyes-color"]');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var inputFireballColor = document.querySelector('input[name="fireball-color"]');

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

var onSetupOpenClick = function () {
  settingsWindow.classList.remove('hidden');

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
  settingsWindow.classList.add('hidden');

  wizardCoat.removeEventListener('click', onCoatClick);
  wizardEyes.removeEventListener('click', onWizardEyesClick);
  wizardFireball.removeEventListener('click', onFireballClick);
  setupClose.removeEventListener('keydown', onSetupClosePress);
  setupClose.removeEventListener('click', onSetupCloseClick);
  document.removeEventListener('keydown', onPopupEscPress);

  setupOpen.addEventListener('click', onSetupOpenClick);
  setupOpen.addEventListener('keydown', onSetupEnterPress);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onSetupCloseClick();
  }
};

var onSetupEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onSetupOpenClick();
  }
};

var onSetupClosePress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onSetupCloseClick();
  }
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

var onCoatClick = changesColorElement(COAT_COLORS, 'fill', inputCoatColor);
var onWizardEyesClick = changesColorElement(EYES_COLORS, 'fill', inputEyesColor);
var onFireballClick = changesColorElement(FIREBALL_COLORS, 'backgroundColor', inputFireballColor);

setupOpen.addEventListener('click', onSetupOpenClick);
setupOpen.addEventListener('keydown', onSetupEnterPress);

var wizards = generateWizardsParameters(WIZARDS_QUANTYTI);

var fragment = document.createDocumentFragment();

for (var i = 0; i < WIZARDS_QUANTYTI; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

similarCharacters.classList.remove('hidden');
