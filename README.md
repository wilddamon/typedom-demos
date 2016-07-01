# Benchmarks for Typed OM

This demo tests the performance of the Typed OM vs the old stringy OM

## Setup
To run it, the CSSTypedOM runtime flag needs to be enabled.
You can either enable all of experimental-web-platform-features in
chrome://flags, or use this command line flag:

`--enable-blink-features=CSSTypedOM`


It may also be relevant to turn on GPU Accelerated Compositing:
`--force-gpu-rasterization`

## Running
Start a test by clicking the start button. The test will create a
bunch of elements, and translate them to new positions in each frame.

The string demo uses old style OM methods, for example:

```javascript
element.style.transform = "translate(" + x + "px, " + y + "px)";
```


The typedom demo uses new Typed OM objects, and creates new objects
within the timed function, for example:

```javascript
element.styleMap.set('transform', new CSSTransformValue([
    new CSSTranslation(
        new CSSTranslation(
            new CSSSimpleLength(x, 'px'),
            new CSSSimpleLength(y, 'px')))]));
```

The typedom-precalc demo uses Typed OM objects, but the construction
of them does not occur within the timed loop, for example:

```javascript
element.styleMap.set('transform', precalculatedTransform);
```


Results will be printed in the dev console. They will look something
like this:
```
string
min: 9.060000000000173
max: 19.80999999999949
mean: 11.677349999999974
median: 11.074999999999818
stddev: 2.1872469516494637
typedom
min: 10.25
max: 40.5049999999992
mean: 13.83429999999995
median: 11.844999999999345
stddev: 5.653476541916474
typedom-precalc
min: 2.9500000000007276
max: 32.43500000000131
mean: 4.479999999999891
median: 3.5800000000017462
stddev: 3.3095570700623567
```

## Notes on findings so far
As using Typed OM means creating lots of objects through bindings,
performance is limited by time spent in GC.
Tracing on my Macbook Pro shows a GC occurring every 5 frames or so.
