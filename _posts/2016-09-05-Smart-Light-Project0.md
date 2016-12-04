---
title: "Building a Smart Lamp"
layout: post
date: 2016-09-05
blog: true
tag:
- C
- Photon Microcontroller
- Led
- HTML
---

A few months ago when I was getting ready to bed and wanted to turn off the lights,
the usual routine started with complaining the switch being too far away. Then I
will mimic the 'spiderman web shot move' to turn off the switch, but that
never works. Until one day it dawned on me, I could buy a lamp that is connected
to my phone! Googled it, too [pricey](http://www.lifx.com/). Fine, I decided to make one from
the items I have in my room from my past courses taken at the University.

So ever wonder how to build a classic smart lamp? Continue reading to find out!

Items required:

1. [Photon MicroController](https://store.particle.io/#photon)
2. [Breadboard](https://en.wikipedia.org/wiki/Breadboard)
3. [300 ohm Resistors](https://en.wikipedia.org/wiki/Resistor)
4. [10 microfarads Capacitors](https://en.wikipedia.org/wiki/Capacitor)
5. [Jumpers](https://en.wikipedia.org/wiki/Jump_wire)
6. [Neopixel LEDs for colours](https://www.adafruit.com/products/1938?gclid=CjwKEAiAmo_CBRC9qbGQssjqi28SJABYTgZxbdhb1iwW3GfXefobpdTPjvbHwmncGrqHDkgsBxgIMhoC-oDw_wcB)


## Assembling the circuit

Grab a breadboard and start plugging in the components based on the image shown
below! Make sure you don't mess up with the positive and negative terminals. Or
else you might see some fireworks :D

![image][1]

![image][2]
*This is what your circuit board should look like*

## Setting up the Photon

I won't go over the details here, but you should check out their
[tutorial](https://docs.particle.io/guide/getting-started/start/photon/#connect-your-photon)
on setting up your Photon.

## Coding the Photon

You can clone the [repo](https://github.com/liewsanmin/smartBulb) or
download it. Once you have the code, you can program the microcontroller via the
[Particle's](build.particle.io) main IDE. The simple explanation of this is that
they communicate all data via the Cloud :D

## Web Interface

From the html code I uploaded. It will create a simple webpage so that you can
use it on any wifi connected devices. MAKE SURE your **device ID** and **access token**
in the html code are matched with your device!! You should be able to realize that
when you follow the tutorial while setting up your Photon microcontroller.

Go ahead and click the options and click 'Do It!'. Good work! You built a smart
light. It is really amazing to see how convenient it is for us to build one as
technology continues to improve.

[1]: https://liewsanmin.github.io/images/circuitBoardLayout.jpg
[2]: https://liewsanmin.github.io/images/myCircuitBoard.jpg
