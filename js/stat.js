'use strict';
var getСloudСoordinates = function (startingPointСoordinates, width, height, angle) {
  var array = [];

  var pointX = startingPointСoordinates[0] + angle;
  var pointY = startingPointСoordinates[1];
  array[0] = [pointX, pointY];

  pointX = pointX + width - angle * 2;
  array[1] = [pointX, pointY];

  pointX = pointX + angle;
  pointY = pointY + angle;
  array[2] = [pointX, pointY];

  pointY = pointY + height - angle * 2;
  array[3] = [pointX, pointY];

  pointX = pointX - angle;
  pointY = pointY + angle;
  array[4] = [pointX, pointY];

  pointX = pointX - width + angle * 2;
  array[5] = [pointX, pointY];

  pointX = pointX - angle;
  pointY = pointY - angle;
  array[6] = [pointX, pointY];


  pointY = pointY - height + angle * 2;
  array[7] = [pointX, pointY];

  return array;
};

var drawsMessage = function (ctx, startingPointСoordinates, width, height, angle, color) {
  var array = getСloudСoordinates(startingPointСoordinates, width, height, angle);

  ctx.beginPath();
  ctx.moveTo(startingPointСoordinates[0], startingPointСoordinates[1] + angle);

  for (var i = 0; i < array.length; i++) {
    ctx.lineTo(array[i][0], array[i][1]);
  }

  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fill();
};

var getMaxTime = function (arr) {
  var maxTime = arr[0] || 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxTime) {
      maxTime = arr[i];
    }
  }

  return maxTime;
};

var renderText = function (ctx, string, x, y, paragraph) {

  while (string.indexOf('\n') + 1) {
    var subString = string.slice(0, string.indexOf('\n'));

    ctx.fillText(subString, x, y);

    y += paragraph;

    string = string.slice(string.indexOf('\n') + 1);
  }

  ctx.fillText(string, x, y);
};

var renderColumn = function (ctx, x, y, width, height, color, text, textIndent) {
  ctx.beginPath();
  ctx.moveTo(x, y);

  ctx.lineTo(x, y - height);
  ctx.lineTo(x + width, y - height);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  ctx.fillStyle = 'hsl(0, 0%, 0%)';
  ctx.fillText(text, x, y + textIndent);
};

var getColor = function () {
  var h = Math.round(200 + Math.random() * 25);
  var s = Math.round(60 + Math.random() * 40);
  var l = Math.round(25 + Math.random() * 25);
  return 'hsl(' + h + ',' + s + '%,' + l + '%)';
};

window.renderStatistics = function (ctx, names, times) {
  var STARTING_POINT_COORDINATES = [100, 10];
  var MESSAGE_WIDTH = 420;
  var MESSAGE_HEIGHT = 270;
  var MESSAGE_ANGLE = 20;
  var SHADOW_SHIFT = [110, 20];
  var MESSAGE_TEXT = 'Ура вы победили!\nСписок результатов:';
  var MESSAGE_FONT = '16px PT Mono';
  var LEFT_TEXT_INDENT = 170;
  var TOP_TEXT_INDENT = 20;
  var COLUMN_WIDTH = 40;
  var COLUMN_HEIGHT = 150;
  var COLUMN_INDENT = 50;
  var HISTOGRAM_BASE_LINE = 230;
  var LEFT_HISTOGRAM_INDENT = 150;
  var USER_COLOR = 'rgba(255, 0, 0, 1)';

  // Если в массивах разное количество элементов, отбрасываем лишние у того, что длинее до идентичной со вторым массивом длины.
  names.length = times.length = (names.length > times.length) ? times.length : names.length;

  drawsMessage(ctx, SHADOW_SHIFT, MESSAGE_WIDTH, MESSAGE_HEIGHT, MESSAGE_ANGLE, 'hsla(0, 0%, 0%, 0.7)');
  drawsMessage(ctx, STARTING_POINT_COORDINATES, MESSAGE_WIDTH, MESSAGE_HEIGHT, MESSAGE_ANGLE, 'hsl(0, 0%, 100%)');

  ctx.font = MESSAGE_FONT;
  ctx.fillStyle = 'hsl(0, 0%, 0%)';
  ctx.textBaseline = 'hanging';

  renderText(ctx, MESSAGE_TEXT, LEFT_TEXT_INDENT, SHADOW_SHIFT[1], TOP_TEXT_INDENT);

  var heightFactor = COLUMN_HEIGHT / getMaxTime(times);
  var x = LEFT_HISTOGRAM_INDENT;
  var y = HISTOGRAM_BASE_LINE;

  for (var i = 0; i < names.length; i++) {
    var height = Math.floor(heightFactor * times[i]);
    var color = (names[i] === 'Вы') ? USER_COLOR : getColor();

    renderColumn(ctx, x, y, COLUMN_WIDTH, height, color, names[i], TOP_TEXT_INDENT);

    x += COLUMN_WIDTH + COLUMN_INDENT;
  }
};
