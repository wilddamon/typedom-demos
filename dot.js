var Dot = function(element, x, y, targetX, targetY, delay) {
  this.element = element;
  this.x = x;
  this.y = y;
  this.startX = x;
  this.startY = y;
  this.addX = targetX - x;
  this.addY = targetY - y;
  this.delay = delay;
  this.startTime = 0;
}

Dot.initialSize = 1; // px
Dot.finalSize = 32; // px

Dot.prototype.update = function(now) {
  if (!this.startTime) {
    this.startTime = now;
  }
  var elapsed = now - this.startTime;
  if (elapsed < this.delay) { return; }
  var progress = (elapsed - this.delay) / durationMicros;
  this.x = this.addX * progress;
  this.y = this.addY * progress;
  var size = Dot.finalSize * progress;
  var components = [
    new CSSTranslation(
        new CSSSimpleLength(this.x, 'px'),
        new CSSSimpleLength(this.y, 'px')),
    new CSSScale(size, size)];
  this.element.styleMap.set('transform', new TransformValue(components));
}

Dot.prototype.reset = function(now) {
  this.x = this.startX;
  this.y = this.startY;
  this.startTime = now;
}

Dot.prototype.done = function(now) {
  return ((now - this.startTime - this.delay) > durationMicros);
}

