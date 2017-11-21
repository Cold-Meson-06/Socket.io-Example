{
    G.GameRenderer = class GameRenderer extends THREE.WebGLRenderer {
        constructor() {
            super({ antialias: true })
            this.setSize(innerWidth, innerHeight)
            document.body.appendChild(this.domElement)
        }
    }
}