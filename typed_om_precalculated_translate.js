var PrecalcDot = function(element, centerX, centerY, radius, durationMicros) {
  Dot.call(this, element, centerX, centerY, radius, durationMicros);

  this.positions = [];
  this.index = 0;
}
PrecalcDot.prototype = Object.create(Dot.prototype);
PrecalcDot.prototype.constructor = PrecalcDot;

PrecalcDot.prototype.calculatePositions = function(fps) {
  Dot.prototype.reset.call(this, 0);
  var frameLength = Math.floor(this.durationMicros / fps); // micros / fps
  for (var i = 0; i < this.durationMicros; i += frameLength) {
    var position = this.calculatePositionOffset(i);
    if (position) {
      var components = [
        new CSSTranslation(
            new CSSSimpleLength(position[0], 'px'),
            new CSSSimpleLength(position[1], 'px')),
            new CSSScale(position[2], position[2])];
      this.positions.push(new TransformValue(components));
    }
  }
};

PrecalcDot.prototype.setPosition = function(position) {
  var position = this.positions[this.index++];
  this.element.styleMap.set('transform', position);
};

PrecalcDot.prototype.done = function(now) {
  return !this.startTime || this.index >= this.positions.length;
};

PrecalcDot.prototype.reset = function(now) {
  this.index = 0;
  this.startTime = now;
};

typedom_precalc_translate = {
  animationFrame: 0,
  createDot:function(element, centerX, centerY, radius, durationMicros) {
    var angle = Math.random() * Math.PI * 2;
    var dot = new PrecalcDot(
    element,
    centerX,
    centerY,
    radius,
    durationMicros);
    dot.calculatePositions(20);
    return dot;
  },
  start:function(dots) {
    function updateDots(dots, timestamp) {
      for (var i = 0; i < dots.length; ++i) {
        if (dots[i].done(timestamp)) {
          dots[i].reset(timestamp);
          } else {
          dots[i].update(timestamp);
        }
      }
      updateFPS(timestamp);
      this.animationFrame = window.requestAnimationFrame(updateDots.bind(this, dots));
    }
    this.animationFrame = window.requestAnimationFrame(updateDots.bind(this, dots));
  },
  stop:function(dot) {
    if (this.animationFrame) {
      window.cancelAnimationFrame(this.animationFrame);
      this.animationFrame = 0;
    }
  },
};

