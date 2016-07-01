# Benchmarks for Typed OM

## This demo tests the performance of the Typed OM vs the old stringy OM

To run it, the CSSTypedOM runtime flag needs to be enabled.
You can either enable all of experimental-web-platform-features in
chrome://flags, or use this command line flag:

`--enable-blink-features=CSSTypedOM`


It may also be relevant to turn on GPU Accelerated Compositing:
`--force-gpu-rasterization`


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
min: 9.28500000000031
max: 38.900000000000546
mean: 13.907899999999973
median: 11.664999999999964
stddev: 5.514118024670864
typedom
min: 9.6200000000008
max: 58.55500000000029
mean: 16.829400000000096
median: 12.579999999999927
stddev: 12.304960814240781
typedom-precalc
min: 2.9399999999986903
max: 48.13500000000204
mean: 4.83130000000012
median: 3.7700000000004366
stddev: 4.6776555356290785
```
