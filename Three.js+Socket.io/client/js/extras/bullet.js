{
    const bulletGeometry = new THREE.IcosahedronGeometry(1, 0)
    const coolBulletGeometry = new THREE.IcosahedronGeometry(1, 2)
    const coolBulletMaterial = new THREE.MeshBasicMaterial({ wireframe: true, color: 0xaaff11 })
    const bulletMaterial = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x00ffff })
    const bulletMaterial2 = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x00ff00 })

    window.shoot = (scene, camera, collider, maxLifeTime = 90, speed = 3) => {
        const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial)
        bullet.geometry.computeBoundingSphere()
        bullet.position.copy(camera.position)
        bullet.forward = camera.getWorldDirection()
        bullet.rotation.copy(camera.getWorldDirection())
        bullet.lifetime = maxLifeTime
        bullet.intersectIcosahedron = (s) => bullet.position.distanceTo(s.position) < s.geometry.parameters.radius + bullet.geometry.parameters.radius
        scene.add(bullet)
        bullet.update = () => {
            if (bullet.lifetime-- >= 1) {
                spawnSmoke(scene, bullet.position)
                bullet.position.addScaledVector(bullet.forward, speed)
                if (bullet.intersectIcosahedron(collider)) {
                    collider.onDamage(Number.parseInt(10 + Math.random() * 50))
                    explode(bullet.position, scene)
                    scene.remove(bullet)
                    G.stopAutoUpdate(bullet)
                }
            } else {
                explode(bullet.position, scene, 3, 2)
                scene.remove(bullet)
                G.stopAutoUpdate(bullet)
            }
        }
        G.autoUpdate(bullet)
    }

    window.WScoolShoot = (scene, data, maxLifeTime = 90, speed = 3) => {
        
        const bullet = new THREE.Mesh(coolBulletGeometry, coolBulletMaterial)
        const frwd = new THREE.Vector3(data.rx, data.ry, data.rz)
        const pos = new THREE.Vector3(data.px, data.py, data.pz)
        bullet.position.copy(pos)
        bullet.forward = frwd
        bullet.rotation.copy(frwd)
        bullet.lifetime = maxLifeTime
        scene.add(bullet)
        bullet.update = () => {
            if (bullet.lifetime-- >= 1) {
                spawnSmoke(scene, bullet.position)
                bullet.position.addScaledVector(bullet.forward, speed)
            } else {
                coolExplode(bullet.position, scene, 3, 2)
                scene.remove(bullet)
                G.stopAutoUpdate(bullet)
            }
        }
        G.autoUpdate(bullet)
        
    }
    window.attack = (target, startPos, angle, treshoold, scene, maxLifeTime = 90, speed = 3) => {
        const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial2)
        bullet.geometry.computeBoundingSphere()
        bullet.position.copy(startPos)
        bullet.forward = angle.clone()
        bullet.rotation.copy(bullet.forward)
        bullet.lifetime = maxLifeTime
        bullet.intersectSphere = () => bullet.position.distanceTo(target.position) < treshoold + bullet.geometry.parameters.radius
        scene.add(bullet)
        bullet.deflect = (growRate = 3, lifetime = 2) => {
            explode(bullet.position, scene, growRate, lifetime)
            scene.remove(bullet)
            G.stopAutoUpdate(bullet)
        }
        bullet.update = () => {
            if (bullet.lifetime-- >= 1) {
                spawnSmoke(scene, bullet.position)
                bullet.position.addScaledVector(bullet.forward, 3)
                if (bullet.intersectSphere()) {
                    target.onDamage(Number.parseInt(10 + Math.random() * 30))
                    bullet.deflect(20, 15)
                }
            } else {
                bullet.deflect()
            }
        }
        G.autoUpdate(bullet)
    }


    window.specialAttack = (target, startPos, treshoold, scene, maxLifeTime = 100, speed = 3) => {
        const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial)
        bullet.geometry.computeBoundingSphere()
        bullet.position.copy(startPos)
        bullet.forward = new THREE.Vector3()
        bullet.lifetime = maxLifeTime
        bullet.intersectSphere = () => bullet.position.distanceTo(target.position) < treshoold + bullet.geometry.parameters.radius
        scene.add(bullet)
        bullet.deflect = (growRate = 3, lifetime = 2) => {
            explode(bullet.position, scene, growRate, lifetime)
            scene.remove(bullet)
            G.stopAutoUpdate(bullet)
        }
        bullet.update = () => {
            if (bullet.lifetime-- >= 1) {
                spawnSmoke(scene, bullet.position)
                bullet.forward.subVectors(target.position, bullet.position).normalize()
                bullet.position.addScaledVector(bullet.forward, 1.3)
                if (bullet.intersectSphere()) {
                    bullet.deflect(8, 5)
                }
            } else {
                bullet.deflect()
            }
        }
        G.autoUpdate(bullet)
    }

}