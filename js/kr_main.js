var stats,
  scene,
  renderer,
  camera,
  cameraControls,
  relic,
  tunnel,
  sky;

// - - - - - - - - - - - - - - - - - - - - - - POST FX VARS
var composer,
  pass_render,
  pass_film,
  pass_tilt,
  pass_bokeh;

var global_time_seed = 0,
  global_time_rate = 0.01;


// init the scene
function init() {

  if (Detector.webgl) {
    renderer = new THREE.WebGLRenderer({
      antialias: true, // to get smoother output
    //preserveDrawingBuffer: true // to allow screenshot
    });
  } else {
    Detector.addGetWebGLMessage();
    return true;
  }
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  window.addEventListener('resize', onWindowResize, false);

  // renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.autoClear = false;
  // renderer.toneMapping = THREE.ReinhardToneMapping;
  // renderer.toneMappingExposure = 3;
  document.getElementById('container').appendChild(renderer.domElement);

  // add Stats.js - https://github.com/mrdoob/stats.js
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  document.body.appendChild(stats.domElement);

  // create a scene
  scene = new THREE.Scene();
  // scene.fog = new THREE.Fog(
  //   new THREE.Color(0, 0, 0),
  //   0, 100);
  // 3.7, 6.3);

  // put a camera in the scene
  // camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight,
  // 1, 100);
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight,
    100, 2000000);
  camera.position.set(0, 100, 2000);

  // camera.position.set(0, 0, 5);
  scene.add(camera);

  // create a camera contol
  cameraControls = new THREE.TrackballControls(camera, renderer.domElement);

  // - - - - - - - - - - - - - - - - - - - - - - POST FX COMPOSER
  composer = new THREE.EffectComposer(renderer);
  initPostprocessing();

  var helper = new THREE.GridHelper(10000, 2, 0xffffff, 0xffffff);
  scene.add(helper);

  //relic = new Relic.RelicScene("carbon");
  //gui_setupSceneControls();

  initSky();
//audioBoss.loop("relicAssets/carbon/audio/test1.wav");
}

function initSky() {

  // Add Sky Mesh
  sky = new THREE.Sky();
  scene.add(sky.mesh);

  sunSphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(20000, 16, 8),
    new THREE.MeshBasicMaterial({
      color: 0xffffff
    })
  );
  sunSphere.position.y = -70000;
  sunSphere.visible = false;
  scene.add(sunSphere);
  console.log(sky);
  gui_initSky();
}
;

// animation loop
function animate() {

  requestAnimationFrame(animate);

  // if (relic && relic.ready) {
  //   relic.update();
  // }

  render();
  global_time_seed += global_time_rate;
  stats.update();
}

var PIseconds;
// render the scene
function render() {

  // update camera controls
  cameraControls.update();

  // relic_update();

  // actually render the scene
  renderer.render(scene, camera);

// testShaderLoop();
// composer.render();
}

var depthMaterial,
  depthRenderTarget;

function initPostprocessing() {
  // Setup render pass
  pass_render = new THREE.RenderPass(scene, camera);
  // Setup depth pass
  depthMaterial = new THREE.MeshDepthMaterial();
  depthMaterial.depthPacking = THREE.RGBADepthPacking;
  depthMaterial.blending = THREE.NoBlending;
  var pars = {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter
  };
  depthRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight,
    pars);
  depthRenderTarget.texture.name = "SSAOShader.rt";

  // Setup SSAO pass
  pass_ssao = new THREE.ShaderPass(THREE.SSAOShader);
  pass_ssao.renderToScreen = true;
  //ssaoPass.uniforms[ "tDiffuse" ].value will be set by ShaderPass
  pass_ssao.uniforms["tDepth"].value = depthRenderTarget.texture;
  pass_ssao.uniforms['size'].value.set(window.innerWidth, window.innerHeight);
  pass_ssao.uniforms['cameraNear'].value = camera.near;
  pass_ssao.uniforms['cameraFar'].value = camera.far;
  //pass_ssao.uniforms['onlyAO'].value = (postprocessing.renderMode == 1);
  pass_ssao.uniforms['aoClamp'].value = 0.3;
  pass_ssao.uniforms['lumInfluence'].value = 0.5;

  // BOKEH PASS
  var width = window.innerWidth;
  var height = window.innerHeight;
  pass_bokeh = new THREE.BokehPass(scene, camera, {
    focus: 1.0,
    aperture: 0.025,
    maxblur: 1.0,
    width: width,
    height: height
  });
  pass_bokeh.renderToScreen = true;

  composer.addPass(pass_render);
  composer.addPass(pass_ssao);
  composer.autoClear = false;
//composer.addPass(pass_bokeh);
//gui_setup_postFX_Controls();
}

if (!init()) animate();

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();

}
