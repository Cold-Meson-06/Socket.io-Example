{
    const explosionGeometry = new THREE.IcosahedronGeometry(1, 3)
    const explosionGeometry2 = new THREE.IcosahedronGeometry(1, 1)
    const explosionMaterial2 = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x00ffaa })
    const explosionMaterial = new THREE.MeshBasicMaterial({ wireframe: true, color: 0xff0000 })
    window.megaExplode = (at, scene, maxLifeTime = 20, growScale = 2) => {
        const explosion = new THREE.Mesh(explosionGeometry2, explosionMaterial2)
        explosion.position.copy(at)
        explosion.lifetime = maxLifeTime
        scene.add(explosion)
        BigSmoke(scene, at)
        explosion.update = () => {
            explosion.scale.addScalar(growScale) 
            if (explosion.lifetime-- <= 0){
                scene.remove(explosion)
                G.stopAutoUpdate(explosion)
            }
        }
        G.autoUpdate(explosion)
    }
    window.coolExplode = (at, scene, maxLifeTime = 20, growScale = 2) => {
        const explosion = new THREE.Mesh(explosionGeometry2, explosionMaterial2)
        explosion.position.copy(at)
        explosion.lifetime = maxLifeTime
        scene.add(explosion)
        spawnCoolSmoke(scene, at)
        explosion.update = () => {
            explosion.scale.addScalar(growScale) 
            if (explosion.lifetime-- <= 0){
                scene.remove(explosion)
                G.stopAutoUpdate(explosion)
            }
        }
        G.autoUpdate(explosion)
    }
    window.explode = (at, scene, maxLifeTime = 20, growScale = 2) => {
        const explosion = new THREE.Mesh(explosionGeometry, explosionMaterial)
        explosion.position.copy(at)
        explosion.lifetime = maxLifeTime
        scene.add(explosion)
        stuffSmoke(scene, at)
        explosion.update = () => {
            explosion.scale.addScalar(growScale) 
            if (explosion.lifetime-- <= 0){
                scene.remove(explosion)
                G.stopAutoUpdate(explosion)
            }
        }
        G.autoUpdate(explosion)
    }
}