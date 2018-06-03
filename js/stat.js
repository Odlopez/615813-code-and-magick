'use strict';
var getMaxTime = function (arr) {
  var maxTime = arr[0] || 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxTime) {
      maxTime = arr[i];
    }
  }

  return maxTime;
};

var getColor = function () {
  var h = Math.round(200 + Math.random() * 40);
  var s = Math.round(40 + Math.random() * 60);
  var l = Math.round(20 + Math.random() * 30);

  return 'hsl(' + h + ',' + s + '%,' + l + '%)';
};

window.renderStatistics = function (ctx, names, times) {
  var SHADOW_SHIFT = [110, 20];
  var MESSAGE_FONT = '16px PT Mono';
  var cloud = {
    color: 'hsl(0, 0%, 100%)',
    start: [100, 10],
    width: 420,
    height: 270,
    angle: 20,
    drawsMessage: function (color, start, width, height, angle) {
      color = color || this.color;
      start = start || this.start;
      width = width || this.width;
      height = height || this.height;
      angle = angle || this.angle;

      var coordinates = this.getСloudСoordinates(start, width, height, angle);

      ctx.beginPath();
      ctx.moveTo(start[0], start[1] + angle);

      for (var i = 0; i < coordinates.length; i++) {
        ctx.lineTo(coordinates[i][0], coordinates[i][1]);
      }

      ctx.closePath();
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.fill();
    },
    getСloudСoordinates: function (start, width, height, angle) {
      start = start || this.start;
      width = width || this.width;
      height = height || this.height;
      angle = angle || this.angle;
      var array = [];

      var pointX = start[0] + angle;
      var pointY = start[1];
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
    }
  };
  var message = {
    start: [170, 20],
    text: 'Ура вы победили!\nСписок результатов:',
    interval: 20,
    renderText: function (start, text, interval) {
      start = start || this.start;
      text = text || this.text;
      interval = interval || this.interval;

      while (text.indexOf('\n') + 1) {
        var subString = text.slice(0, text.indexOf('\n'));

        ctx.fillText(subString, start[0], start[1]);

        start[1] += interval;
        text = text.slice(text.indexOf('\n') + 1);
      }

      ctx.fillText(text, start[0], start[1]);
    }
  };
  var histogram = {
    columnWidth: 40,
    columnHeight: 150,
    columnInterval: 50,
    textIndent: 10,
    start: [150, 230],
    userColor: 'rgba(255, 0, 0, 1)',
    renderColumn: function (text, start, color, height, width, textIndent) {
      var x = start[0];
      var y = start[1];
      height = height || this.columnHeight;
      width = width || this.columnWidth;
      textIndent = textIndent || this.textIndent;

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
    },
    makeHistogram: function (start) {
      var heightFactor = this.columnHeight / getMaxTime(times);
      start = start || this.start;

      for (var i = 0; i < names.length; i++) {
        var height = Math.floor(heightFactor * times[i]);
        var color = (names[i] === 'Вы') ? this.userColor : getColor();

        this.renderColumn(names[i], start, color, height);

        start[0] += this.columnWidth + this.columnInterval;
      }
    }
  };

  // Если в массивах разное количество элементов, отбрасываем лишние у того, что длинее до идентичной со вторым массивом длины.
  names.length = times.length = (names.length > times.length) ? times.length : names.length;

  cloud.drawsMessage('hsla(0, 0%, 0%, 0.7)', SHADOW_SHIFT);
  cloud.drawsMessage();

  ctx.font = MESSAGE_FONT;
  ctx.fillStyle = 'hsl(0, 0%, 0%)';
  ctx.textBaseline = 'hanging';

  message.renderText();
  histogram.makeHistogram();
};
