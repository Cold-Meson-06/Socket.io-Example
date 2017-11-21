{
    const smokeGeometry = new THREE.PlaneGeometry(1, 1, 1, 1)
    const smokeGeometry2 = new THREE.PlaneGeometry(1, 1, 2, 2)
    const smokeMaterial = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x999999 })
    const smokeMaterial2 = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x33ff33 })
    const coolSmokeGeometry = new THREE.PlaneGeometry(1, 1, 3, 3)
    const coolSmokeMaterial = new THREE.MeshBasicMaterial({ wireframe: true, color: 0xffff00 })
    window.spawnSmoke = (scene, pos, maxLifeTime = 40) => {
        const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial)
        smoke.position.copy(pos)
        smoke.rotation.set(
            Math.random() * Math.TWO_PI,
            Math.random() * Math.TWO_PI,
            Math.random() * Math.TWO_PI
        )
        smoke.lifetime = maxLifeTime
        scene.add(smoke)
        smoke.update = () => {
            smoke.scale.addScalar(0.001)
            if (!(smoke.lifetime-- >= 1)) {
                scene.remove(smoke)
                G.stopAutoUpdate(smoke)
            }
        }
        G.autoUpdate(smoke)
    }
    window.stuffSmoke = (scene, pos, maxLifeTime = 100) => {
        utils.range(5).map(() => {
            const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial)
            smoke.position.copy(pos)
            smoke.rotation.set(
                Math.random() * Math.TWO_PI,
                Math.random() * Math.TWO_PI,
                Math.random() * Math.TWO_PI
            )
            smoke.scale.addScalar(Math.random() * 20)
            smoke.lifetime = (Math.random() * maxLifeTime)
            scene.add(smoke)
            smoke.update = () => {
                smoke.scale.addScalar(0.2)
                if (!(smoke.lifetime-- >= 1)) {
                    scene.remove(smoke)
                    G.stopAutoUpdate(smoke)
                }
            }
            G.autoUpdate(smoke)
        })
    }
    window.spawnCoolSmoke = (scene, pos, maxLifeTime = 200) => {
        utils.range(10).map(() => {
            const smoke = new THREE.Mesh(coolSmokeGeometry, coolSmokeMaterial)
            smoke.position.copy(pos)
            smoke.rotation.set(
                Math.random() * Math.TWO_PI,
                Math.random() * Math.TWO_PI,
                Math.random() * Math.TWO_PI
            )
            smoke.forward = new THREE.Vector3()
            smoke.forward.set(
                utils.randFBetw(-Math.TWO_PI, Math.TWO_PI),
                utils.randFBetw(-Math.TWO_PI, Math.TWO_PI),
                utils.randFBetw(-Math.TWO_PI, Math.TWO_PI)
            )
            smoke.waitTime = Math.random() * 4
            smoke.scale.addScalar(Math.random() * 10)
            smoke.lifetime = (Math.random() * maxLifeTime)
            scene.add(smoke)
            smoke.update = () => {
                smoke.scale.addScalar(0.2)
                smoke.rotation.y += 0.1
                if (smoke.waitTime >= 0) {
                    smoke.waitTime--
                } else {
                    smoke.position.addScaledVector(smoke.forward, 0.2)
                }
                if (!(smoke.lifetime-- >= 1)) {
                    scene.remove(smoke)
                    G.stopAutoUpdate(smoke)
                }
            }
            G.autoUpdate(smoke)
        })
    }
    window.BigSmoke = (scene, pos, maxLifeTime = 200) => {
        utils.range(300).map(() => {
            const smoke = new THREE.Mesh(smokeGeometry2, smokeMaterial2)
            smoke.position.copy(pos)
            smoke.rotation.set(
                Math.random() * Math.TWO_PI,
                Math.random() * Math.TWO_PI,
                Math.random() * Math.TWO_PI
            )
            smoke.forward = new THREE.Vector3()
            smoke.forward.set(
                utils.randFBetw(-Math.TWO_PI, Math.TWO_PI),
                utils.randFBetw(-Math.TWO_PI, Math.TWO_PI),
                utils.randFBetw(-Math.TWO_PI, Math.TWO_PI)
            )
            smoke.waitTime = Math.random() * 10
            smoke.scale.addScalar(Math.random() * 60)
            smoke.lifetime = (Math.random() * maxLifeTime)
            scene.add(smoke)
            smoke.update = () => {
                smoke.scale.addScalar(0.2)
                smoke.rotation.y += 0.1
                if (smoke.waitTime >= 0) {
                    smoke.waitTime--
                } else {
                    smoke.position.addScaledVector(smoke.forward, 2)
                }
                if (!(smoke.lifetime-- >= 1)) {
                    scene.remove(smoke)
                    G.stopAutoUpdate(smoke)
                }
            }
            G.autoUpdate(smoke)
        })
    }
}