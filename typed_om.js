typedom_demo = {
  animationFrame: 0,
  createDot:function(element, centerX, centerY, radius) {
    var angle = Math.random() * Math.PI * 2;
    return new Dot(
    element,
    centerX,
    centerY,
    Math.cos(angle) * radius + centerX,
    Math.sin(angle) * radius + centerY,
    Math.random() * durationMicros);
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

