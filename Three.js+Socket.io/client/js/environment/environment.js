{
    G.Environment = class Environment extends THREE.Scene {
        constructor() {
            super()
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
            this.add(ambientLight)

            this.planeGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10)
            this.planeMaterial = new THREE.MeshBasicMaterial({ wireframe: true, color: 0xffffff })

            this.planes = [
                [0, 0, 0, -0.5 * Math.PI, 0, 0],
                [-800, 20, 0, 0, Math.PI * 0.5, 0],
                [800, 20, 0, 0, Math.PI * 0.5, 0],
                [0, 20, 800, 0, 0, 0],
                [0, 20, -800, 0, 0, 0],
            ].map(arr => {
                const plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial)
                plane.position.set(arr[0], arr[1], arr[2])
                plane.rotation.set(arr[3], arr[4], arr[5])
                this.add(plane)
                return plane
            })


        }

    }

}