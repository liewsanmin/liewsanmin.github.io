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

var colors = [0xFBFF70, 0x70FFF2, 0xFFDA70, 0xDA881D, 0x1DDA8E, 0x6F1DDA,
             0xff0000, 0xCD15E9];

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

    position: [-20, 0, 0]
});
ball.addTo(world); // Add ball to world.


var SPEED_OF_BALL = 200,
    right = new THREE.Vector3(SPEED_OF_BALL, 0, 0),
    left = new THREE.Vector3(-SPEED_OF_BALL, 0, 0);
    down = new THREE.Vector3(0, -SPEED_OF_BALL, 0);
    up = new THREE.Vector3(0, SPEED_OF_BALL, 0);
    stop = new THREE.Vector3(0, 0, 0);
    topRight = new THREE.Vector3(20, 40, 0);

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
create multiple balls
*/
for(i = 0; i < 8; i++){
    const sphere = new WHS.Sphere({ // Create sphere comonent.
      geometry: {
        radius: 5,
        widthSegments: 32,
        heightSegments: 32
      },

      mass: 1, // Mass of physics object.

      material: {
        color: colors[i],
        kind: 'basic'
      },

      position: [getRandomArbitrary(-300, 300), getRandomArbitrary(-100, 100), 0],


    });
    sphere.addTo(world);

    // Enable CCD if the object moves more than 1 meter in one simulation frame
    sphere.setCcdMotionThreshold(1);

    // Set the radius of the embedded sphere such that it is smaller than the object
    sphere.setCcdSweptSphereRadius(0.2);
}



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


document.onkeydown = checkKey;
function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '87') {
        // up arrow
        ball.setLinearVelocity(up);
    }
    else if (e.keyCode == '83') {
        // down arrow
        ball.setLinearVelocity(down);
    }
    else if (e.keyCode == '65') {
       // left arrow
       ball.setLinearVelocity(left);
    }
    else if (e.keyCode == '68') {
       // right arrow
       ball.setLinearVelocity(right);
    }
}

autoplay(); // for js-objectDetect
world.start(); // Start animations and physics simulation.
