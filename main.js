import * as THREE from 'three';
import  { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

// Create a scene
const scene = new THREE.Scene();
var color = new THREE.Color("#000000");;
// Create an ambient light
const ambientLight = new THREE.AmbientLight(color.getHex(), 0.5);
scene.add(ambientLight);

scene.background = new THREE.Color(0xeeeeee);

// Create a transparent material
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  transparent: true,
  opacity: 0.5,
});

var data = fetch('./data.json')
.then((response) => response.json())
.then((json) => {
    function jsonToHtml(json) {
        return `<pre>${JSON.stringify(json, null, 2)}</pre>`;
      }

    console.log(json)

    var loader = new FontLoader();
    loader.load('font.json', function (font) {
        // Create TextGeometry
        var geometry = new TextGeometry(jsonToHtml(json), {
            font: font,
            size: 0.08, // Size of the text
            height: 0, // Depth of the text
            curveSegments: 12, // Number of points on the curves
            bevelEnabled: false // No bevel
        });
    
        // Create material
        var material = new THREE.MeshBasicMaterial({ color: color.getHex() });
    
        // Create mesh
        var textMesh = new THREE.Mesh(geometry, material);

        textMesh.position.x = -5.5;
        textMesh.position.y = 3.5;
    
        // Add mesh to the scene
        scene.add(textMesh);
    });
}
    );

// Create a new FileLoader
// Create a new FileLoader


// Set the dimensions of the cube (width, height, depth)
const cubeWidth = 1.15;
const cubeHeight = 1.24;
const cubeLength = 1.38;

// Create a cube with the transparent material
const geometry = new THREE.BoxGeometry(cubeWidth, cubeHeight, cubeLength);
const cube = new THREE.Mesh(geometry, material);

var cubeColor3 = new THREE.Color("#00BDFF");;


var innerCubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5); // smaller size
var innerCubeMaterialCube2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var innerCubeMaterialCube3 = new THREE.MeshBasicMaterial({ color: cubeColor3.getHex() });

var cube2 = new THREE.Mesh(innerCubeGeometry, innerCubeMaterialCube2);
var cube3 = new THREE.Mesh(innerCubeGeometry, innerCubeMaterialCube3);


cube2.position.set(0.2, -0.3, 0.4);
cube.add(cube2)

cube3.position.set(0.2, -0.3, -0.4);
cube.add(cube3)

// Add the cube to the scene
scene.add(cube);


// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setPixelRatio(window.devicePixelRatio);

// Animation loop
const animate = function () {
  requestAnimationFrame(animate);

  // Rotate the cube
  cube.rotation.y += 0.01;
//   cube.rotation.x += 0.01;

  // Render the scene
  renderer.render(scene, camera);
};

// Start the animation loop
animate();
