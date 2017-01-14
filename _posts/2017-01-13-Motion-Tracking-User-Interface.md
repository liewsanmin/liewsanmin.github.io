---
title: "Motion Tracking User Interface"
layout: post
date: 2017-01-13
blog: true
tag:
- JavaScript
- Motion Tracking UI
- HTML
---

![image][2]
![image][3]


Inspired by Iron Man's movie user interface. I decided to start another side
project to make something similar. Spending some free time during this one month
break before Spring semester starts, I have made something similar.

![image][1]

## Program Explained

There are 2 programs with different libraries I found while browsing. They can
be found here and here. The first one uses 2 ways to move, WASD or moves your
hand around the webcam. Currently, this one only tracks left, right, up, and down
hand swipes. The second one uses WASD to move the ball, and hand fist shape with
your palm facing towards the camera to stop the ball from moving further.

## Program Background

These 2 programs are supported by JavaScript and HTML. The libraries used are
js-objectdetect and gest.js which I found from GitHub. The 2d-like world is
created using whitestrom js 3d world creator.

## Goals and achievements

The main goal is to create the exact replica of Iron Man's cool user interface
within a month's time during my Winter break. Well~ I did not achieve this goal
but I managed to discover state of the art free motion tracking Javascript
libraries and 3D world creators. I also get to explore the different
functionalities of Javascript, HTML, as well the convenience of WebGL that is
easily accessible.

## References

- [js-objectdetect](https://github.com/mtschirs/js-objectdetect)
- [gest.js](https://github.com/hadimichael/gest.js)
- [whitestrom.js](https://github.com/WhitestormJS/whitestorm.js)


[1]: https://liewsanmin.github.io/images/motionTracking/ironManHologram.jpg
[2]: https://liewsanmin.github.io/images/motionTracking/gest.png
[3]: https://liewsanmin.github.io/images/motionTracking/objectDetect.png
