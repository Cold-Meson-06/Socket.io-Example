{

    const NEAR_TO_PI = Math.PI - 0.00001
    const NEAR_TO_ZERO = 0.00001

    G.FPSCamera = class FPSCamera extends THREE.PerspectiveCamera {

        constructor(aspect = 1, fov = 45, near = 0.1, far = 10000) {

            super(fov, aspect, near, far)

            this.position.set(0, 0, 0)

            this.forward = new THREE.Vector3().addVectors(this.position, this.getWorldDirection())
            this.mouse = new THREE.Vector2(0, Math.PI / 2)
            this.sensivity = 0.004
            this.mouseIsLocked = false

            //Events
            this.onclick = _ => _
            this.onChange = _ => _

            const This = this

            this.keys = new utils.BooleanicKeys({
                KeyW() {
                    This.position.add(This.getWorldDirection().setY(0).normalize())
                    This.onChange()
                },
                KeyS() {
                    This.position.sub(This.getWorldDirection().setY(0).normalize())
                    This.onChange()
                },
                KeyD() {
                    This.position.add(This.getWorldDirection().cross(This.up).normalize())
                    This.onChange()
                },
                KeyA() {
                    This.position.sub(This.getWorldDirection().cross(This.up).normalize())
                    This.onChange()
                },
                Space() {
                    This.position.add(This.up)
                    This.onChange()
                },
                ShiftLeft() {
                    This.position.sub(This.up)
                    This.onChange()
                },
            }, window)
        }

        bindTo(renderer) {

            document.onpointerlockchange = e => {
                this.mouseIsLocked = document.pointerLockElement === renderer.domElement
            }

            renderer.domElement.onmousemove = e => {
                if (this.mouseIsLocked) {
                    this.mouse.x += e.movementX * this.sensivity
                    this.mouse.y += e.movementY * this.sensivity
                    this.mouse.y = THREE.Math.clamp(this.mouse.y, NEAR_TO_ZERO, NEAR_TO_PI)
                    this.onChange()
                }
            }

            renderer.domElement.onclick = e => {
                if (this.mouseIsLocked) {
                    this.onclick(e)
                } else {
                    renderer.domElement.requestPointerLock()
                }
            }

            return this
        }

        update(dt) {

            this.keys.update(dt)
            this.forward.setX(sin(this.mouse.y) * cos(this.mouse.x))
            this.forward.setY(cos(this.mouse.y))
            this.forward.setZ(sin(this.mouse.y) * sin(this.mouse.x))
            this.forward.add(this.position)
            this.lookAt(this.forward)
            return this

        }
    }
}