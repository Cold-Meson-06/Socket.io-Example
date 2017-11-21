{
    const cubeGeometry = new THREE.CubeGeometry(4, 4, 4)
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 })
    const sphereGeometry = new THREE.IcosahedronGeometry(5, 1)
    const sphereMaterial = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x0000ff })
    const laneGeometry = new THREE.IcosahedronGeometry(0.5, 0)

    G.EvilCube = class EvilCube extends THREE.Mesh {
        constructor(target) {
            super(sphereGeometry, sphereMaterial)

            const This = this
            this.position.set(24, 10, 5)

            this.maxHP = 1000
            this.HP = this.maxHP


            this.miniBalls = [[0, 1], [0, -1], [1, 0], [-1, 0]].map(arr => {
                const miniBall = new THREE.Mesh(laneGeometry, sphereMaterial)
                miniBall.position.set(arr[0] * 10, 0, arr[1] * 10)
                This.add(miniBall)
                return miniBall
            })

            const cubeMaterial = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x00ff00 })
            const colorMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, blending: THREE.MultiplyBlending })
            this.EvilCube = new THREE.SceneUtils.createMultiMaterialObject(cubeGeometry, [colorMaterial, cubeMaterial])
            this.add(this.EvilCube)
            this.target = target
            this.attackAngle = new THREE.Vector3()
            this.scene = null
            G.autoUpdate(this)

            this.onHPChange = _ => _
        }
        update(dt, tick) {
            this.EvilCube.rotation.y -= 0.1
            this.EvilCube.position.y = sin(tick * 2) * 1.4
            this.rotation.y += 0.1
            this.position.y = 24 + (Math.sin(tick) * 20)
            this.position.x = Math.cos(tick) * 20
            this.position.z = Math.cos(tick) * 20

            if (Math.random() > 0.98) {
                this.attack()
            }
        }
        onDamage(amount){
            this.HP -= amount
            this.onHPChange(this.HP)
        }
        Die(){
            this.scene.remove(this)
            G.stopAutoUpdate(this)
            megaExplode(this.position, this.scene, 90, 8)
        }
        attack() {
            this.attackAngle.subVectors(this.target.position, this.position).normalize()
            if (Math.random() > 0.5) {
                attack(this.target, this.position, this.attackAngle, 2, this.scene, 90, 5)
            } else {
                attack(this.target, this.position, this.attackAngle, 2, this.scene, 90, 3)
                //specialAttack(this.target, this.position, 2, this.scene)
            }
        }
    }
}