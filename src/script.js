import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
    // Debug GUI
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// // Access Helper
// const axesHelper=new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')

/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font)=>
        {
            const textGeometry = new TextGeometry(
                'Pradhuman',
                {
                    font: font,
                    size:0.5,
                    height:0.2,
                    curveSegments:5,
                    bevelEnabled:true,
                    bevelThickness:0.03,
                    bevelSize:0.02,
                    bevelOffset:0,
                    bevelSegments:4
                }
            )
            textGeometry.center()

            const materialText = new THREE.MeshMatcapMaterial({matcap:matcapTexture})
            // const materialText = new THREE.MeshNormalMaterial()
            const materialObject = new THREE.MeshNormalMaterial()

            const text = new THREE.Mesh(textGeometry,materialText)
            scene.add(text)

            const donutGeometry = new THREE.TorusGeometry(0.3,0.2,20,45)
            const cubegeometry = new THREE.BoxGeometry( 0.4, 0.4, 0.4);

            for(let i =0;i<80;i++){
                //donut
                const donut = new THREE.Mesh(donutGeometry,materialObject)
                donut.position.x = (Math.random()-0.5)*10
                donut.position.y = (Math.random()-0.5)*10
                donut.position.z = (Math.random()-0.5)*10
                donut.rotation.x=Math.random() * Math.PI
                donut.rotation.y=Math.random() * Math.PI
                //cube
                const cube = new THREE.Mesh(cubegeometry,materialObject)
                cube.position.x = (Math.random()-0.5)*10
                cube.position.y = (Math.random()-0.5)*10
                cube.position.z = (Math.random()-0.5)*10
                cube.rotation.x=Math.random() * Math.PI
                cube.rotation.y=Math.random() * Math.PI
                
                const scale = Math.random()
                donut.scale.set(scale, scale, scale)
                cube.scale.set(scale, scale, scale)
                scene.add(donut)
                scene.add(cube)
//////////////////
//self tried ,not working
                // const move = ()=>{
                //     donut.position.x += Math.random() *100
                //     donut.position.y += Math.random()*100
                //     donut.position.z += Math.random()*100
                //     donut.rotation.x = Math.PI*2
                //     donut.rotation.y = Math.PI*2
                //     window.requestAnimationFrame(move)
                // }
//////////////////
            }
            

        }
)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()