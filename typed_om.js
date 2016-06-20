var TopLeftDot = function(element, centerX, centerY, radius, durationMicros) {
  Dot.prototype.constructor.call(this, element, centerX, centerY, radius, durationMicros);
}
TopLeftDot.prototype = Object.create(Dot.prototype);
TopLeftDot.prototype.constructor = TopLeftDot;

TopLeftDot.prototype.setPosition = function(position) {
  var size = position[2];
  this.element.styleMap.set('left', new CSSSimpleLength(this.centerX + position[0], 'px'));
  this.element.styleMap.set('top', new CSSSimpleLength(this.centerY + position[1], 'px'));
  this.element.styleMap.set('width', new CSSSimpleLength(size, 'px'));
  this.element.styleMap.set('height', new CSSSimpleLength(size, 'px'));
};

typedom_topleft = {
  animationFrame: 0,
  createDot:function(element, centerX, centerY, radius) {
    var angle = Math.random() * Math.PI * 2;
    var dot = new TopLeftDot(
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

