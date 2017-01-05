/**
Create the world
*/
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
Track the mouse movement
*/
const mouse = new WHS.VirtualMouse(world);

// mouse.on('move', () => {
//   console.log(ball.position);
// });



/**
Create the ball
*/
const ball = new WHS.Sphere({ // Create ball component.
    geometry: {
        radius: 5,
        widthSegments: 32,
        heightSegments: 32
    },

    mass: 1, // Mass of physics object.

    material: {
        color: 0xCD15E9,
        kind: 'basic'
    },

    position: [0, 0, 0],

    // physics: {
    //     group: 1,
    //     mask: 2
    // }
});
ball.addTo(world); // Add ball to world.

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

  position: [-(window.innerWidth / 4), 0, 0],

  // physics: {
  //     group: 1,
  //     mask: 2
  // }
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

  position: [(window.innerWidth / 4), 0, 0],

  // physics: {
  //     group: 1,
  //     mask: 2
  // }
});
rightWall.addTo(world);

console.log(window.innerWidth);
console.log(window.innerHeight);
console.log(window.outerWidth);
console.log(window.outerHeight);

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

  position: [0, -(window.innerHeight / 4.3), 0],

  // physics: {
  //     group: 1,
  //     mask: 2
  // }
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

  position: [0, (window.innerHeight / 3.8), 0],

  // physics: {
  //     group: 1,
  //     mask: 2
  // }
});
topWall.addTo(world);



/**
control ball movements
*/
var SPEED_OF_BALL = 300;
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

world.start(); // Start animations and physics simulation.
