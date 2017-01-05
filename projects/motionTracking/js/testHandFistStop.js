const world = new WHS.World({
    autoresize: "window",
    stats: 'fps', // Statistics tool for developers.
    stats: true,
    rendering: {
        background: {
          color: 0x162129
        }
    },

    gravity: { // Physic gravity.
        x: 0,
        y: 0,
        z: 0
    },

    camera: {
        position: [0, 10, 200]
    },
});

/**
Create the ball
*/
const ball = new WHS.Sphere({ // Create ball component.
    geometry: {
        radius: 15,
        widthSegments: 700,
        heightSegments: 700
    },

    mass: 5, // Mass of physics object.

    material: {
        color: 0xFFFF00,
        kind: 'basic'
    },

    position: [0, 0, 0]
});
ball.addTo(world); // Add ball to world.


const sphere = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 5, // Mass of physics object.

  material: {
    color: 0xCD15E9,
    kind: 'basic'
  },

  position: [-20, 0, 0],


});
sphere.addTo(world);


const upBall = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 30,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 5, // Mass of physics object.

  material: {
    color: 0x0410BA,
    kind: 'basic'
  },

  position: [-100, 100, 0],


});
upBall.addTo(world);

const sphere2 = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 10,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 1, // Mass of physics object.

  material: {
    color: 0xff0000,
    kind: 'basic'
  },

  position: [20, 0, 0],

});
sphere2.addTo(world);

const sphere3 = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 10,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 1, // Mass of physics object.

  material: {
    color: 0xff0000,
    kind: 'basic'
  },

  position: [30, 0, 0],

});
sphere3.addTo(world);

const sphere4 = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 10,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 1, // Mass of physics object.

  material: {
    color: 0xff0000,
    kind: 'basic'
  },

  position: [40, 0, 0],

});
sphere4.addTo(world);

const sphere5 = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 10,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 1, // Mass of physics object.

  material: {
    color: 0xff0000,
    kind: 'basic'
  },

  position: [50, 0, 0],

});
sphere5.addTo(world);

const sphere6 = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 10,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 1, // Mass of physics object.

  material: {
    color: 0xff0000,
    kind: 'basic'
  },

  position: [60, 0, 0],

});
sphere6.addTo(world);



var SPEED_OF_BALL = 300,
    right = new THREE.Vector3(SPEED_OF_BALL, 0, 0),
    left = new THREE.Vector3(-SPEED_OF_BALL, 0, 0);
    down = new THREE.Vector3(0, -SPEED_OF_BALL, 0);
    up = new THREE.Vector3(0, SPEED_OF_BALL, 0);
    stop = new THREE.Vector3(0, 0, 0);
    topRight = new THREE.Vector3(20, 40, 0);

sphere.setLinearVelocity(right);
sphere2.setLinearVelocity(left);
ball.setLinearVelocity(down);



/**
add left wall
*/
const leftWall = new WHS.Box({
  geometry: {
    width: 1,
    height: window.innerHeight,
    depth: 1
  },

  mass: 0,

  material: {
    kind: 'basic',
    color: 0xffffff
  },

  position: [-(window.innerWidth / 4), 0, 0]
});
leftWall.addTo(world);


/**
add right wall
*/
const rightWall = new WHS.Box({
  geometry: {
    width: 1,
    height: window.innerHeight,
    depth: 1
  },

  mass: 0,

  material: {
    kind: 'basic',
    color: 0xffffff
  },

  position: [(window.innerWidth / 4), 0, 0]
});
rightWall.addTo(world);


/**
add bottom wall
*/
const bottomWall = new WHS.Box({
  geometry: {
    width: window.innerWidth,
    height: 1,
    depth: 1
  },

  mass: 0,

  material: {
    kind: 'basic',
    color: 0xffffff
  },

  position: [0, -(window.innerHeight / 4.3), 0]
});
bottomWall.addTo(world);


/**
add top wall
*/
const topWall = new WHS.Box({
  geometry: {
    width: window.innerWidth,
    height: 1,
    depth: 1
  },

  mass: 0,

  material: {
    kind: 'basic',
    color: 0xffffff
  },

  position: [0, (window.innerHeight / 3.8), 0]
});
topWall.addTo(world);



// set up js-objectdetect
var autoplay = function() {
    function getScripts(urls, callback) {
        var numDone = 0;

        function getScript(url, callback) {
            var script = document.createElement('script'),
                    head = document.getElementsByTagName('head')[0],
                    done = false;

                script.src = url;
                script.onload = script.onreadystatechange = function() {
                    if (!done && (!this.readyState || this.readyState ==
                        'loaded' || this.readyState == 'complete')) {
                        done = true;
                        callback();
                        script.onload = script.onreadystatechange = null;
                        head.removeChild(script);
                    }
                };

            head.appendChild(script);
        }

        function getScriptCallback() {
            if (urls.length > 0) getScript(urls.shift(), getScriptCallback);
            else callback();
        }

        getScript(urls.shift(), getScriptCallback);
    }

    getScripts([
        '//mtschirs.github.io/js-objectdetect/examples/js/compatibility.js',
        '//mtschirs.github.io/js-objectdetect/js/objectdetect.js',
        '//mtschirs.github.io/js-objectdetect/js/objectdetect.handfist.js',
        '//mtschirs.github.io/js-objectdetect/examples/js/jquery.js'],

        function() {
            var canvas = $('<canvas style="position: fixed; z-index: 1001;top: 10px; right: 10px; opacity: 0.9">').get(0),
                context = canvas.getContext('2d'),
                video = document.createElement('video'),
                fist_pos_old,
                detector;

            document.getElementsByTagName('body')[0].appendChild(canvas);

            try {
                compatibility.getUserMedia({video: true}, function(stream) {
                    try {
                        video.src = compatibility.URL.createObjectURL(stream);
                    } catch (error) {
                        video.src = stream;
                    }
                    compatibility.requestAnimationFrame(play);
                }, function (error) {
                    alert("WebRTC not available");
                });
            } catch (error) {
                alert(error);
            }

            function play() {
                compatibility.requestAnimationFrame(play);
                if (video.paused) video.play();

                if (video.readyState === video.HAVE_ENOUGH_DATA &&
                    video.videoWidth > 0) {

                    /* Prepare the detector once the video dimensions are known: */
                    if (!detector) {
                        var width = ~~(80 * video.videoWidth /
                                       video.videoHeight);
                        var height = 80;
                        detector = new objectdetect.detector(width, height,
                                   1.1, objectdetect.handfist);
                    }

                    /* Draw video overlay: */
                    canvas.width = ~~(100 * video.videoWidth /
                                      video.videoHeight);
                    canvas.height = 100;
                    context.drawImage(video, 0, 0, canvas.clientWidth,
                                      canvas.clientHeight);

                    var coords = detector.detect(video, 1);
                    if (coords[0]) {
                        var coord = coords[0];

                        /* Rescale coordinates from detector to video coordinate space: */
                        coord[0] *= video.videoWidth / detector.canvas.width;
                        coord[1] *= video.videoHeight / detector.canvas.height;
                        coord[2] *= video.videoWidth / detector.canvas.width;
                        coord[3] *= video.videoHeight / detector.canvas.height;

                        /* Find coordinates with maximum confidence: */
                        var coord = coords[0];
                        for (var i = coords.length - 1; i >= 0; --i)
                            if (coords[i][4] > coord[4]) coord = coords[i];

                        // /* Scroll window: */
                        // var fist_pos = [coord[0] + coord[2] / 2, coord[1] + coord[3] / 2];
                        // if (fist_pos_old) {
                        //     var dx = (fist_pos[0] - fist_pos_old[0]) / video.videoWidth,
                        //         dy = (fist_pos[1] - fist_pos_old[1]) / video.videoHeight;
                        //
                        //         window.scrollBy(dx * 200, dy * 200);
                        // } else fist_pos_old = fist_pos;

                        /* Draw coordinates on video overlay: */
                        context.beginPath();
                        context.lineWidth = '2';
                        context.fillStyle = 'rgba(0, 255, 255, 0.5)';
                        context.fillRect(
                            coord[0] / video.videoWidth * canvas.clientWidth,
                            coord[1] / video.videoHeight * canvas.clientHeight,
                            coord[2] / video.videoWidth * canvas.clientWidth,
                            coord[3] / video.videoHeight * canvas.clientHeight);
                        context.stroke();

                        // I think stop balls here

                        ball.setLinearVelocity(stop);
                    } else{
                        fist_pos_old = null;
                    }
                }
            }
        }
    );
};
const mouse = new WHS.VirtualMouse(world);
mouse.track(upBall);

upBall.on('click', () => {
  ball.setLinearVelocity(up);
});

// Enable CCD if the object moves more than 1 meter in one simulation frame
sphere.setCcdMotionThreshold(1);
sphere2.setCcdMotionThreshold(1);
ball.setCcdMotionThreshold(1);
sphere3.setCcdMotionThreshold(1);

// Set the radius of the embedded sphere such that it is smaller than the object
sphere.setCcdSweptSphereRadius(0.2);
sphere2.setCcdSweptSphereRadius(0.2);
ball.setCcdSweptSphereRadius(0.2);
sphere3.setCcdSweptSphereRadius(0.2);

world.start(); // Start animations and physics simulation.
autoplay();
