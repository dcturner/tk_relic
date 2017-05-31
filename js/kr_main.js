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
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 3;
  document.getElementById('container').appendChild(renderer.domElement);

  // add Stats.js - https://github.com/mrdoob/stats.js
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  document.body.appendChild(stats.domElement);

  // create a scene
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(
    new THREE.Color(0, 0, 0),
    0, 100);
    // 3.7, 6.3);

  // put a camera in the scene
  camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight,
    1, 100);


  camera.position.set(0, 0, 5);
  scene.add(camera);

  // create a camera contol
  cameraControls = new THREE.TrackballControls(camera, renderer.domElement);


  // - - - - - - - - - - - - - - - - - - - - - - POST FX COMPOSER
  composer = new THREE.EffectComposer(renderer);
  initPostprocessing();

  // transparently support window resize
  THREEx.WindowResize.bind(renderer, camera);
  // allow 'p' to make screenshot
  THREEx.Screenshot.bindKey(renderer);
  // allow 'f' to go fullscreen where this feature is supported
  if (THREEx.FullScreen.available()) {
    THREEx.FullScreen.bindKey();
    document.getElementById('inlineDoc').innerHTML += "- <i>f</i> for fullscreen";
  }

  //  - - - - - - - - - - - -SKY
  sky = new THREE.Sky();
  scene.add(sky.mesh);


  // here you add your objects
  // // - you will most likely replace this part by your own
  var light = new THREE.AmbientLight(0x111111);
  scene.add(light);
  var light = new THREE.DirectionalLight(0xffffff);
  light.position.set(Math.random(), Math.random(), Math.random()).normalize();
  scene.add(light);
  var light = new THREE.DirectionalLight(0xffffff);
  light.position.set(Math.random(), Math.random(), Math.random()).normalize();
  scene.add(light);
  // var light = new THREE.PointLight(Math.random() * 0xffffff);
  // light.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() -
  //   0.5)
  //   .normalize().multiplyScalar(1.2);
  // scene.add(light);
  // var light = new THREE.PointLight(Math.random() * 0xffffff);
  // light.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() -
  //   0.5)
  //   .normalize().multiplyScalar(1.2);
  // scene.add(light);

  relic = new Relic.RelicScene("carbon");
  gui_setupSceneControls();
//audioBoss.loop("relicAssets/carbon/audio/test1.wav");
}



// animation loop
function animate() {

  // loop on request animation loop
  // - it has to be at the begining of the function
  // - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
  requestAnimationFrame(animate);

  if (relic && relic.ready) {
    relic.update();
  }

  // do the render
  render();

  global_time_seed += global_time_rate;
  stats.update();
}

var PIseconds;
// render the scene
function render() {

  // update camera controls
  cameraControls.update();

  relic_update();

  // actually render the scene
  //renderer.render(scene, camera);
  testShaderLoop();
  composer.render();
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
  //composer.addPass(pass_bokeh);

//gui_setup_postFX_Controls();
}

if (!init()) animate();
