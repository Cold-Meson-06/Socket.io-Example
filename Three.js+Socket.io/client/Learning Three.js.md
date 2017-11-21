- Three.js current state

#Renderer

```js
const renderer = new THREE.WebGLRenderer()
renderer.setSize(innerWidth, innerHeight)
renderer.shadowMapEnabled = true
document.body.appendChild(renderer.domElement)
```

The renderer is basically an html5 canvas, I know this because of the `renderer.setSize()` method.
The `renderer.shadowMapEnabled` i dont have any idea of why this is in a so global thing like this, but i understand his porsupose.
The renderer has an `domElement` property, so we can attach it to other html elements on the page

#Scene

```js
const scene = new THREE.Scene()
scene.fog = new THREE.Fog(0xffffff, 0.015, 100)
```

The scene is like an container, you can only render one at time by `renderer.render(scene, camera)`
It has the `fog` property to we set an `THREE.Fog` to it.
The scene also have an `overrideMaterial` properti that we can set to any THREE material, and all objects in that scene will have theirs materials changed.
Has also the `add` method to add new meshes to be rendered, and the `traverse` method, thas acepts an function, this function will be executed for every object in the scene, even the childs.

#Camera

```js
const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000)
camera.position.x = -30
camera.position.y = 40
camera.position.z = 30
camera.lookAt(scene.position)
```

The camera, you know, is the camera. It has the very usefull `lookAt` method that acepts an vec3.
The camera is also one of the arguments nessesary to render an scene.

#Axis Helper

```js
const axes = new THREE.AxisHelper(20)
scene.add(axes)
```

Is an mesh than draws lines indicating the axes of is parent container, the `20` must be probably its scale.

#Light

```js
const spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(-40, 60, -10)
spotLight.castShadow = true
scene.add(spotLight)
```

The lights in THREE.js are just it, lights... 
They have the castShadow property, if not set, any mesh in the scene with the `[mesh].castShadow` property set will not cast shadows from that light.

#Materials and Gemetry

```js
const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1)
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.receiveShadow = true
plane.rotation.x = -0.5 * Math.PI
plane.position.x = 15
plane.position.y = 0
plane.position.z = 0
scene.add(plane)

const cubeGeometry = new THREE.CubeGeometry(4, 4, 4)
const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 })
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cube.castShadow = true
cube.position.x = -4
cube.position.y = 3
cube.position.z = 0
scene.add(cube)
const sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff })
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.castShadow = true
sphere.position.x = 20
sphere.position.y = 4
sphere.position.z = 2
scene.add(sphere)
```

That example illustrate 3 mehes using `THREE.MeshLambertMaterial`, All meshes in THREE.js are made of a mesh and a geometry, correct-me if im wrong, but i think than materials are just shaders.
They can have childs too, they will be added to the mesh local matrix. They also have a geometry property that sets some `THREE.[some]Geometry` that acepts paramters like width an dheigth.

#Full Scene Example:

```js
function CreateMesh(geo, mat) {
    return {
        at(x, y, z) {
            const mesh = new THREE.Mesh(geo, mat)
            scene.add(mesh)
            mesh.position.set(x, y, z)
            return mesh
        }
    }
}


//Create the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(innerWidth, innerHeight)
renderer.shadowMapEnabled = true
document.body.appendChild(renderer.domElement)

//Create the scene
const scene = new THREE.Scene()

//Create the camera
const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100)
camera.position.set(0, 5, 0)
camera.lookAt(scene.position)
camera.forward = camera.getWorldDirection()
camera.globalForward = new THREE.Vector3().addVectors(camera.position, camera.getWorldDirection())
camera.mouse = new THREE.Vector2(0, Math.PI / 2)

//Create an axis helper
const axes = new THREE.AxisHelper(0.02)
axes.position = camera.globalForward
scene.add(axes)

//Create an ambient light
const ambientLight = new THREE.AmbientLight(0xffffff)
ambientLight.intensity = 0.3
scene.add(ambientLight)
//Ambient Lights doesnt needs an mesh as they are global

//Create an point light
const pointLight = new THREE.PointLight(0xaaaaff)
pointLight.distance = 100
pointLight.castShadow = true
scene.add(pointLight)
scene.add(new THREE.CameraHelper(pointLight.shadow.camera) )

//Create an mesh for the lamp
const pointLightGeometry = new THREE.IcosahedronGeometry(1, 4)
const pointLightMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaff })
const pointLightMesh = new THREE.Mesh(pointLightGeometry, pointLightMaterial)
scene.add(pointLightMesh)

//Create a directional light
const directionalLight = new THREE.DirectionalLight(0xff0000, 0.2)
directionalLight.castShadow = true
directionalLight.shadow.camera.near = 2
directionalLight.shadow.camera.far = 200
directionalLight.shadow.camera.left = -50
directionalLight.shadow.camera.right = 50
directionalLight.shadow.camera.top = 50
directionalLight.shadow.camera.bottom = -50
directionalLight.position.y = 100
scene.add(directionalLight)
scene.add(new THREE.CameraHelper(directionalLight.shadow.camera))

//Create an spot light
const spotLight = new THREE.SpotLight(0xffffff)
spotLight.castShadow = true
scene.add(spotLight)
scene.add(new THREE.CameraHelper(spotLight.shadow.camera))

//Create an hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0x00aaff, 0x00ff00, 1)
scene.add(hemisphereLight)
//Hemisphere Lights doesnt needs an mesh as they are global

//Create an mesh for the lamp
const lampGeometry = new THREE.CubeGeometry(3, 3, 3)
const lampMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
const lamp = new THREE.Mesh(lampGeometry, lampMaterial)
scene.add(lamp)

//Create an plane
const planeGeometry = new THREE.PlaneGeometry(100, 100, 50, 50)
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.receiveShadow = true
plane.rotation.x = -0.5 * Math.PI
plane.position.set(15, -2, 0)
scene.add(plane)

//Create an cube
const cubeGeometry = new THREE.CubeGeometry(4, 4, 4)
const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 })
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cube.castShadow = true
cube.position.set(-4, 3, 0)
scene.add(cube)

//Create an sphere
const sphereGeometry = new THREE.IcosahedronGeometry(4, 2)
const sphereMaterial = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x0000ff })
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.castShadow = true
sphere.position.set(20, 4, 2)
scene.add(sphere)

const depthCube = CreateMesh(cubeGeometry, new THREE.MeshDepthMaterial()).at(8, 3, 4)
const phongSpherer = CreateMesh(sphereGeometry, new THREE.MeshPhongMaterial()).at(8, 6, 8)
const alphaCube1 = CreateMesh(cubeGeometry, new THREE.MeshPhongMaterial()).at(45, 4, 8)
alphaCube1.opacity = 0.5
const alphaCube2 = CreateMesh(cubeGeometry, new THREE.MeshPhongMaterial()).at(45, 5, 7)
alphaCube2.opacity = 0.5

const matArray = []
matArray.push(new THREE.MeshPhongMaterial())
matArray.push(new THREE.MeshBasicMaterial({ color: 0x0051ba }))
matArray.push(new THREE.MeshBasicMaterial({ color: 0xffd500 }))
matArray.push(new THREE.MeshPhongMaterial())
matArray.push(new THREE.MeshBasicMaterial({ color: 0xC41E3A }))
matArray.push(new THREE.MeshDepthMaterial())
const cubeGeom = new THREE.CubeGeometry(3, 3, 3)
const cubeFace = new THREE.Mesh(cubeGeom, matArray)
scene.add(cubeFace)
cubeFace.position.set(10, 10, 10)

//Create the ui controlls
const cubes = []
const controlls = {
    speed: 0.02,
    'set override': () => scene.overrideMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff }),
    'spawn cube': () => cubes.push((_ => {
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cube.position.set(lamp.position.x, lamp.position.y, lamp.position.z)
        scene.add(cube)
        return cube
    })())
}
const gui = new dat.GUI()
gui.add(controlls, 'speed', 0, 5)
gui.add(controlls, 'set override')
gui.add(controlls, 'spawn cube')

//Create the mouse controlls
let mouseIsLocked = false
document.onpointerlockchange = e => mouseIsLocked = document.pointerLockElement === renderer.domElement
renderer.domElement.onclick = e => renderer.domElement.requestPointerLock()
onmousemove = e => {
    if (mouseIsLocked) {
        camera.mouse.x += e.movementX * 0.004
        camera.mouse.y += e.movementY * 0.004
        camera.mouse.y = THREE.Math.clamp(camera.mouse.y, 0.001, Math.PI - 0.001)
    }
}

//Create the keyboard controlls
const keys = new utils.BooleanicKeys({
    KeyW() { camera.position.add(camera.getWorldDirection().setY(0).normalize()) },
    KeyS() { camera.position.sub(camera.getWorldDirection().setY(0).normalize()) },
    KeyD() { camera.position.add(camera.getWorldDirection().cross(camera.up).normalize()) },
    KeyA() { camera.position.sub(camera.getWorldDirection().cross(camera.up).normalize()) },
    Space() { camera.position.add(camera.up) },
    ShiftLeft() { camera.position.sub(camera.up) },
}, window)

//Main loop
let step = 0
const render = dt => {
    //Regular update code
    keys.update(dt)
    step += controlls.speed

    //Rotate the cube
    cube.rotation.x += controlls.speed
    cube.rotation.y += controlls.speed
    cube.rotation.z += controlls.speed

    //Update camera vectors
    camera.forward.setX(sin(camera.mouse.y) * cos(camera.mouse.x))
    camera.forward.setY(cos(camera.mouse.y))
    camera.forward.setZ(sin(camera.mouse.y) * sin(camera.mouse.x))
    camera.globalForward.addVectors(camera.forward, camera.position)
    camera.lookAt(camera.globalForward)
    axes.position.set(camera.globalForward.x, camera.globalForward.y, camera.globalForward.z)

    //Update spot light and lamp
    spotLight.position.set(100 * sin(step), 30, 100 * cos(step))
    lamp.position.set(100 * sin(step), 30, 100 * cos(step), )

    pointLightMesh.position.x = pointLight.position.x = 10 + cos(step / 3) * 10
    pointLightMesh.position.y = pointLight.position.y = 22 + cos(step / 2) * 20
    pointLightMesh.position.z = pointLight.position.z = 10 + sin(step / 3) * 10
    
    //Render
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}
render()

```