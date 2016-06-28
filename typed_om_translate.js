var TranslateDot = function(element, centerX, centerY, radius, durationMicros) {
  Dot.call(this, element, centerX, centerY, radius, durationMicros);
}
TranslateDot.prototype = Object.create(Dot.prototype);
TranslateDot.prototype.constructor = TranslateDot;

TranslateDot.prototype.setPosition = function(position) {
  var components = [
    new CSSTranslation(
      new CSSSimpleLength(position[0], 'px'),
      new CSSSimpleLength(position[1], 'px')),
    new CSSScale(position[2], position[2])];
  this.element.styleMap.set('transform', new CSSTransformValue(components));
};

typedom_translate = {
  animationFrame: 0,
  createDot:function(element, centerX, centerY, radius, durationMicros) {
    var angle = Math.random() * Math.PI * 2;
    return new TranslateDot(
        element,
        centerX,
        centerY,
        radius,
        durationMicros);
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
