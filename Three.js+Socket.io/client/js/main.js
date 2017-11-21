let scene;
function MAIN() {


    const renderer = new G.GameRenderer()
    scene = new G.Environment()

    let PACKET_SEND_THRESHOLD = 50

    const camera = new G.FPSCamera(innerWidth / innerHeight).bindTo(renderer)
    let gameDone = false
    let inSync = false
    let pressed = false
    
    camera.onclick = () => {
        const wd = camera.getWorldDirection()
        playerShoot({
            px: camera.position.x,
            py: camera.position.y,
            pz: camera.position.z,
            rx: wd.x,
            ry: wd.y,
            rz: wd.z,
        })
    }

    socket.on('SRV:receive_shoot', msg => {
        WScoolShoot(scene, msg)
    })


    camera.onChange = () => inSync = false

    connect()

    const gameControll = G.loop((dt) => {

        camera.update()
        renderer.render(scene, camera)

    })

    async function callAfter(wich, time) {
        return new Promise((res, rej) => setTimeout(() => {
            res()
            wich()
        }, time))
    }

    function loop() {
        if (!inSync) {
            playerPositionChange(camera)
            inSync = true
        }
        callAfter(loop, PACKET_SEND_THRESHOLD)
    }

    loop()
}