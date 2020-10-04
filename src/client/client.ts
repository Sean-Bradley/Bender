import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'
import Stats from '/jsm/libs/stats.module'
import { GUI } from '/jsm/libs/dat.gui.module'
import Bender from './bender.js'

const bender = new Bender()

const scene: THREE.Scene = new THREE.Scene()

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(4, 4, 6)

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const modelOptions = ["Cube", "Text"]
const axisOptions = ["x", "y", "z"]
const data = {
    model: modelOptions[0],
    axis: axisOptions[1],
    angle: Math.PI / 16,
    text: "seanwasere ThreeJS"
}

const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
const mesh: THREE.Mesh = new THREE.Mesh(new THREE.Geometry(), material)
scene.add(mesh)

let font: THREE.Font
const loader = new THREE.FontLoader();
loader.load('fonts/helvetiker_regular.typeface.json', function (f) {
    font = f
});

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const gui = new GUI()
gui.add(data, "model", modelOptions).onChange(regenerateGeometry)
gui.add(data, "text").onFinishChange(regenerateGeometry)
gui.add(data, "axis", axisOptions).onChange(regenerateGeometry)
gui.add(data, "angle", -Math.PI / 2, Math.PI / 2, 0.01).onChange(regenerateGeometry)
gui.open()

function regenerateGeometry() {
    let newGeometry
    if (data.model === "Cube") {
        newGeometry = new THREE.BoxBufferGeometry(5, 5, 5, 10, 10, 10)
    } else {
        newGeometry = new THREE.TextBufferGeometry(data.text, {
            font: font,
            size: 1,
            height: .2,
            curveSegments: 2
        });
    }

    newGeometry.center()
    bender.bend(newGeometry, data.axis, data.angle)
    mesh.geometry.dispose()
    mesh.geometry = newGeometry
}

const stats = Stats()
document.body.appendChild(stats.dom)

var animate = function () {
    requestAnimationFrame(animate)

    controls.update()

    render()

    stats.update()
};

function render() {
    renderer.render(scene, camera)
}

regenerateGeometry()
animate();
