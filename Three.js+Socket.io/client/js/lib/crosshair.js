const canvas = utils.getCanvas.creatingIt()
canvas.resize(30, 30)
canvas.setParent(document.body)
canvas.style.position = "absolute"
canvas.style.left = "50%"
canvas.style.top = "50%"
canvas.style.transform = "translate(-50%, -50%)"
const crossHair = canvas.get2D()
crossHair.fillStyle = "#ffffff"
crossHair.fillRect(1, 15, 29, 1)
crossHair.fillRect(15, 1, 1, 29)