var StringTransformDot = function(element, centerX, centerY, radius, durationMicros) {
  Dot.prototype.constructor.call(this, element, centerX, centerY, radius, durationMicros);
};
StringTransformDot.prototype = Object.create(Dot.prototype);
StringTransformDot.prototype.constructor = StringTransformDot;

StringTransformDot.prototype.setPosition = function(position) {
  this.element.style.transform = 'translate(' + position[0] + 'px,' + position[1] + 'px) scale(' + position[2] + ')';
};

string_om_transform = {
  animationFrame: 0,
  createDot:function(element, centerX, centerY, radius) {
    var angle = Math.random() * Math.PI * 2;
    var dot = new StringTransformDot(
    element,
    centerX,
    centerY,
    radius,
    durationMicros);
    dot.reset(0);
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
  stop:function() {
    if (this.animationFrame) {
      window.cancelAnimationFrame(this.animationFrame);
      this.animationFrame = 0;
    }
  },
};

