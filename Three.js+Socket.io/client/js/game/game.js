const G = (function () {
    const updateLoop = []
    let tick = 0
    let gameSpeed = 0.01
    return {
        autoUpdate(obj) {
            if (typeof obj.update === 'function') {
                return updateLoop.push(obj)
            }
            return null
        },
        stopAutoUpdate(obj) {
            return updateLoop.splice(updateLoop.indexOf(obj), 1)
        },
        loop(fn) {
            let frameHandle = null
            let stopped = false
            const loop = (dt) => {
                tick += gameSpeed
                for (let key in updateLoop) {
                    updateLoop[key].update(dt, tick)
                }
                fn(dt)
                frameHandle = requestAnimationFrame(loop)
            }
            loop()
            return {
                start() {
                    if (!stopped){
                        return
                    }
                    stopped = false
                    loop()
                },
                stop() {
                    stopped = true
                    cancelAnimationFrame(frameHandle)
                },
                toggle() {
                    stopped = !stopped
                        ? this.start()
                        : this.stop()
                },
                setGamespeed(s){
                    return gameSpeed = s
                }
            }
        }
    }
})()