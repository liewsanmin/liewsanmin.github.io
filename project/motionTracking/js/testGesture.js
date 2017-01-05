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

const sphere2 = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 3,
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

var SPEED_OF_BALL = 700,
    right = new THREE.Vector3(SPEED_OF_BALL, 0, 0),
    left = new THREE.Vector3(-SPEED_OF_BALL, 0, 0);
    down = new THREE.Vector3(0, -SPEED_OF_BALL, 0);

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

gest.options.subscribeWithCallback(function(gesture) {
     console.log(gesture.direction);

    var right = new THREE.Vector3(SPEED_OF_BALL, 0, 0),
        left = new THREE.Vector3(-SPEED_OF_BALL, 0, 0),
        up = new THREE.Vector3(0, SPEED_OF_BALL, 0),
        down = new THREE.Vector3(0, -SPEED_OF_BALL, 0),
        direction = gesture.direction;
    if(direction == "Left")
        ball.setLinearVelocity(left);
    if(direction == "Right")
        ball.setLinearVelocity(right);
    if(direction == "Up" || direction == "Long up")
        ball.setLinearVelocity(up);
    if(direction == "Down" || direction == "Long down")
        ball.setLinearVelocity(down);

    console.log(ball.getLinearVelocity());

});
gest.options.sensitivity(80);
gest.start();


// Enable CCD if the object moves more than 1 meter in one simulation frame
sphere.setCcdMotionThreshold(1);
sphere2.setCcdMotionThreshold(1);
ball.setCcdMotionThreshold(1);

// Set the radius of the embedded sphere such that it is smaller than the object
sphere.setCcdSweptSphereRadius(0.2);
sphere2.setCcdSweptSphereRadius(0.2);
ball.setCcdSweptSphereRadius(0.2);


world.start(); // Start animations and physics simulation.
