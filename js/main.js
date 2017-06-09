var stats,
	scene,
	renderer,
	composer,
	camera,
	cameraControls,
	relic,
	tunnel;

// function updateShaders(){};

// init the scene
function init() {
	// -----------------------------------------------  WEB GL COMPATIBILITY CHECK
	if (Detector.webgl) {
		renderer = new THREE.WebGLRenderer({
			antialias: true
		});
	} else {
		Detector.addGetWebGLMessage();
		return true;
	}

	// -----------------------------------------------  RENDERER
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.alpha = true;
	document.getElementById('container').appendChild(renderer.domElement);

	// -----------------------------------------------  STATS
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	document.body.appendChild(stats.domElement);

	// -----------------------------------------------  SCENE AND CAMERA
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight,1, 1000);
	camera.position.set(0, 0, 5);
	scene.add(camera);

	// HELPERS
	// var gridHelper = new THREE.GridHelper( 5, 10, 0x0000ff, 0x808080 );
	// scene.add( gridHelper );

	// -----------------------------------------------  LIGHTS
	// Lights

	var light = new THREE.PointLight(0xffffff, 1.0);
	light.position.set(5.0, 2.0, 5.0);
	scene.add(light);

	// -----------------------------------------------  SETUP SHADER LIBRARY
	setupShaderLibrary(camera);

	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	cameraControls.enableDamping = true;

	// -----------------------------------------------  FLUID LAYOUT
	THREEx.WindowResize.bind(renderer, camera);

	// -----------------------------------------------  RELIC
	relic = new Relic.RelicScene("carbon");
    //audioBoss.loop("relicAssets/carbon/audio/test1.wav");
}

// ----------------------------------------------- < LOOP
function animate() {
	requestAnimationFrame(animate);
	if (relic && relic.ready) {
		relic.update();
	}
	render();
	stats.update();
}
function render() {
	cameraControls.update();
	updateShaders();
	renderer.render(scene, camera);
}
// ----------------------------------------------- LOOP >

if (!init()) animate();
