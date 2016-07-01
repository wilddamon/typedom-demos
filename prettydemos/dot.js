var Dot = function(element, centerX, centerY, radius, durationMicros) {
  this.element = element;
  this.centerX = centerX;
  this.centerY = centerY;
  this.radius = radius;
  this.durationMicros = durationMicros;
  this.startTime = 0;
  this.delay = 0;
}

Dot.initialSize = 1; // px
Dot.finalSize = 32; // px

Dot.prototype.update = function(now) {
  var elapsed = now - this.startTime;
  if (elapsed < this.delay) { return; }
  this.setPosition(this.calculatePositionOffset(elapsed - this.delay));
};

Dot.prototype.setPosition = function(setPosition) {}

Dot.prototype.calculatePositionOffset = function(timeOffset) {
  var progress = timeOffset / this.durationMicros;
  return [
    this.addX * progress,
    this.addY * progress,
    Dot.finalSize * progress ];
};

Dot.prototype.reset = function(now) {
  var angle = Math.random() * Math.PI * 2;
  this.addX = Math.cos(angle) * this.radius;
  this.addY = Math.sin(angle) * this.radius;
  this.delay = Math.random() * this.durationMicros;
  this.startTime = now;
};

Dot.prototype.done = function(now) {
  return ((now - this.startTime - this.delay) > durationMicros);
};

