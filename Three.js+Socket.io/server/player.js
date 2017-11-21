
class Player {
    constructor(name, socket) {

        this.name = name        //The name of the player. Warning: undefined effects with duplicates.
        this.changed = false    //If the player has updated and not synced.
        this.socket = socket    //The socket instance of that player.

        this.position = { x: 0, y: 0, z: 0 }    //The 3D position of the player.
        this.rotation = { x: 0, y: 0, z: 0 }    //The 3D rotation of the player.

        //The serialized version.
        this.serialized = {
            name: name,
            px: 0,
            py: 0,
            pz: 0,
            rx: 0,
            ry: 0,
            rz: 0,
        }

    }

    //Updates and returns the serialized 
    //version of the player.
    serialize() {
        this.serialized.px = this.position.x
        this.serialized.py = this.position.y
        this.serialized.pz = this.position.z
        this.serialized.rx = this.rotation.x
        this.serialized.ry = this.rotation.y
        this.serialized.rz = this.rotation.z
        return this.serialized
    }

    //Updates the positional data,
    //so, in the next `serialize()` call we will 
    //return fresh values.
    update(data) {
        this.position.x = data.px
        this.position.y = data.py
        this.position.z = data.pz
        this.rotation.x = data.rx
        this.rotation.y = data.ry
        this.rotation.z = data.rz
        this.changed = true
        return this
    }
}