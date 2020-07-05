import { 
    Engine,
    World,
    Bodies,
    Constraint, 
    Render,
    Mouse,
    MouseConstraint,
    Events,
    Vector,
    Composites,
    Vertices,
    Body
    } from 'matter-js'





document.body.style.margin = 0
document.body.style.padding = 0

// create an engine
let engine = Engine.create(),
    world = engine.world,
// create a renderer
    render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 1000,
            height: 600,
            background: '#000',
            // showBroadphase: true,
            showAxes: true,
            // showCollisions: true,
            // showConvexHulls: true,
            // showVelocity: true,
            wireframes: false // <-- important
        }
})

// add bodies
World.add(world, [
    // walls
    Bodies.rectangle(400, 0, 1200, 50, { isStatic: true }),
    Bodies.rectangle(400, 600, 1200, 50, { isStatic: true }),
    Bodies.rectangle(1000, 300, 50, 600, { isStatic: true }),
    Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
]);

    // add bodies
    var group = Body.nextGroup(true);


    var catapult = Bodies.rectangle(400, 520, 320, 20, { collisionFilter: { group: group }, restitution: .9 });
    let circle = Bodies.circle(560, 100, 45, { density: 0.05, restitution: .5, friction: .7, slop: 2, collisionFilter: { group: group }}),
        circle2 = Bodies.circle(300, 100, 45, { density: 0.05, restitution: .5, friction: .7, slop: 2, collisionFilter: { group: group }})
    console.log(circle)
    World.add(world, [
        catapult,
        circle,
        circle2,
        Constraint.create({ 
            bodyA: catapult,
            pointA: { x: 120, y: 20 },
            bodyB: circle,
            stiffness: 1,
            length: 0,
            damping: 1,
            visible: false,
        }),
        Constraint.create({ 
            bodyA: catapult,
            pointA: { x: -120, y: 20 },
            bodyB: circle2,
            stiffness: 1,
            length: 0,
            damping: 1,
            visible: false,
        })
    ]);

var box = Bodies.rectangle(870, 520, 320, 20, {isStatic: true});
Body.rotate(box,-.7)
World.add(world, box)

window.addEventListener('keypress', e => {
    if(e.keyCode === 119) {
        console.log('go')
        Body.setAngularVelocity(circle, 0.25);
        Body.setAngularVelocity(circle2, 0.25);
    }
    if(e.keyCode === 115) {
        console.log('back')
        Body.setAngularVelocity(circle, -0.25);
        Body.setAngularVelocity(circle2, -0.25);
    }
})


// add mouse control
let mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });


    

World.add(world, mouseConstraint);


// keep the mouse in sync with rendering
render.mouse = mouse;

// run the engine
Engine.run(engine)

// run the renderer
Render.run(render)


