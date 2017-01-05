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
        y: -100,
        z: 0
    },

    camera: {
        position: [0, 10, 200]
    },
    // helpers: {
    //     grid: {
    //         size: 100,
    //         step: 100,
    //         color1: 0xff0000
    //     },
    //
    //     axis: {
    //         size: 100
    //     }
    // }
});

const sphere = new WHS.Sphere({ // Create sphere component.
    geometry: {
        radius: 5,
        widthSegments: 32,
        heightSegments: 32
    },

    mass: 0, // Mass of physics object.

    material: {
        color: 0xCD15E9,
        kind: 'basic'
    },

    position: [0, 0, 0]
});

sphere.addTo(world); // Add sphere to world.

const sphere1 = new WHS.Sphere({ // Create sphere component.
    geometry: {
        radius: 5,
        widthSegments: 32,
        heightSegments: 32
    },

    mass: 5, // Mass of physics object.

    material: {
        color: 0xCDfff9,
        kind: 'basic'
    },

    position: [20, 80, 0]
});

// sphere1.addTo(world); // Add sphere to world.

// const box = new WHS.Box({
//     geometry: {
//         width: 5,
//         height: 5,
//         depth: 5
//     },
//     mass: 0,
//     material: {
//         kind: 'basic',
//         color: 0x46E915
//     },
//     // helpers: {
//     //     box: true
//     // },
// });
// box.position.set(0, 30, 0);
// box.addTo(world);
// box.scale.set(2, 2, 2)

// const plane = new WHS.Plane({
//   geometry: {
//     width: 100,
//     height: 100
//   },
//
//   mass: 0,
//
//   material: {
//     color: 0xDCE5E1,
//     kind: 'basic'
//   },
//
//   rotation: {
//     x: - Math.PI / 2
//   }
// });
// plane.addTo(world);


// const mouse = new WHS.VirtualMouse(world);
// mouse.track(box);

// box.on('mouseover', () => {
//   // sphere.material.color.set(0xffff00);
//   console.log('mouseover');
// });

// box.on('mousemove', () => {
//   console.log('mousemove');
//   sphere.setLinearVelocity(mouse.project().sub(sphere.position));
// });

// box.on('mouseout', () => {
//   // sphere.material.color.set(0xF2F2F2);
//   console.log('mouseout');
// });

// box.on('click', () => {
//   alert('click!');
// });

// mouse.on('move', () => {
//     console.log('mousemove');
// sphere.setLinearVelocity(1,2,3);
// sphere.setLinearVelocity(mouse.project().sub(sphere.position));
// sphere1.setLinearVelocity(mouse.project().sub(sphere1.position));
// });



gest.options.subscribeWithCallback(function(gesture) {
     console.log(gesture.direction);

    var right = new THREE.Vector3(80, 0, 0),
        left = new THREE.Vector3(-80, 0, 0),
        up = new THREE.Vector3(0, 80, 0),
        down = new THREE.Vector3(0, -80, 0),
        direction = gesture.direction;
    if(direction == "Left")
        sphere.setLinearVelocity(left);
    if(direction == "Right")
        sphere.setLinearVelocity(right);
    if(direction == "Up" || direction == "Long up")
        sphere.setLinearVelocity(up);
    if(direction == "Down" || direction == "Long down")
        sphere.setLinearVelocity(down);

    console.log(sphere.getLinearVelocity());
});
gest.options.sensitivity(90);
gest.start();


// const loop = new WHS.Loop((clock) => {
//     new WHS.Loop(() => {
//       box.rotation.y += 0.02;
//     }).start(world);
//   if (clock.getElapsedTime() > 5)
//     loop.stop(world);
// });
// loop.start(world);

world.start(); // Start animations and physics simulation.
