# Benchmarks for Typed OM

This demo tests the performance of the Typed OM vs the old stringy OM

To run it, the CSSTypedOM runtime flag needs to be enabled.
You can either enable all of experimental-web-platform-features in
chrome://flags, or use this command line flag:

--enable-blink-features=CSSTypedOM


It may also be relevant to turn on GPU Accelerated Compositing:
--force-gpu-rasterization


Start a test by clicking the start button. The test will create a
bunch of elements, and translate them to new positions in each frame.

The string demo uses old style OM methods, for example:

`element.style.transform = "translate(" + x + "px, " + y + "px)";`


The typedom demo uses new Typed OM objects, and creates new objects
within the timed function, for example:

```
element.styleMap.set('transform', new CSSTransformValue([
    new CSSTranslation(
        new CSSTranslation(
            new CSSSimpleLength(x, 'px'),
            new CSSSimpleLength(y, 'px')))]));
```

The typedom-precalc demo uses Typed OM objects, but the construction
of them does not occur within the timed loop, for example:

`element.styleMap.set('transform', precalculatedTransform);`


Results will be printed in the dev console. They will look something
like this:
```
string
min: 10.029999999999745
max: 9.984999999998763
mean: 13.493700000000109
median: 13.350000000000364
stddev: 5.15499401648528
typedom
min: 10
max: 9.965000000000146
mean: 11.882900000000063
median: 11.670000000000073
stddev: 3.7298646878940835
typedom-precalc
min: 10.055000000000291
max: 9.99500000000262
mean: 12.30570000000007
median: 12.114999999997963
stddev: 4.046367755160128
```
