var StringDot = function(element, centerX, centerY, radius, durationMicros) {
  Dot.prototype.constructor.call(this, element, centerX, centerY, radius, durationMicros);
};
StringDot.prototype = Object.create(Dot.prototype);
StringDot.prototype.constructor = StringDot;

StringDot.prototype.setPosition = function(position) {
  var size = position[2];
  this.element.style.left = this.centerX + position[0] + 'px';
  this.element.style.top = this.centerY + position[1] + 'px';
  this.element.style.width = size + 'px';
  this.element.style.height = size + 'px';
};

string_om_topleft = {
  animationFrame: 0,
  createDot:function(element, centerX, centerY, radius) {
    var angle = Math.random() * Math.PI * 2;
    var dot = new StringDot(
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

