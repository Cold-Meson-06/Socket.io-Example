{

    

    //Common THREE objects used in the players
    const playerMaterial = new THREE.CubeGeometry(2, 2, 2) 
    const playerGeometry = new THREE.MeshBasicMaterial({ wireframe:true, color: 0xff0000 })

    //The class Player is just for redering players in the space
    G.Player = class Player extends THREE.Mesh {
        
        //The initial data passed from the server
        constructor(data){
            
            //Call the THREE.Mesh constructor
            super(playerMaterial, playerGeometry)
            

            //BUG: the position/rotation vector data is not a standard

            //Set their server data
            this.playerName = data.name
            this.position.set(data.px, data.py, data.pz)
            this.rotation.set(data.rx, data.ry, data.rz)
 
            //And create it axis viewer
            let axis = new THREE.AxisHelper(20)
            axis.rotateY(Math.PI)
            this.add(axis)
            
            //BUG: requiring not defined variable

            //Add it to the main scene
            //BUG: scene cannot be global
            if(data.name === window.userName){
                this.visible = false
            }else{
                this.fustrumViewerCamera = new THREE.PerspectiveCamera(1, 45, 1, 100)
                this.fustrumViewerHelper = new THREE.CameraHelper(this.fustrumViewerCamera)
                this.add(this.fustrumViewerHelper)
            }
                
            
            scene.add(this)

        }

        //Updates the position and rotation.
        //The data usually comes from sockets handlers
        sync(data){
            this.position.set(data.px, data.py, data.pz)
            this.rotation.set(data.rx, data.ry, data.rz)
        }

        //Just removes the mesh from the main scene
        disconnect(){
            //BUG: scene cannot be global
            scene.remove(this)
        }
    }
}