// THREE EXTENSION
dat.GUI.prototype.addThreeColor = function(obj, varName) {
  // threejs & dat.gui have color incompatible formats so we use a dummy data as target :
  var dummy = {};
  // set dummy initial value :
  dummy[varName] = obj[varName].getStyle();
  return this.addColor(dummy, varName)
    .onChange(function(colorValue) {
      //set color from result :
      obj[varName].setStyle(colorValue);
    });
};
dat.GUI.prototype.addThreeUniformColor = function(material, uniformName, label) {
  return this.addThreeColor(material.uniforms[uniformName], "value").name(
    label || uniformName);
};


var gui = new dat.GUI({
  width: 500
});

var gui_scene = gui.addFolder('scene');
var gui_scene_params = {
  global_time_rate: 0.01
};
var gui_scene_sky = gui_scene.addFolder('sky');
gui_scene_sky.open();
var gui_skyParams = {
  turbidity: 10,
  rayleigh: 2,
  mieCoefficient: 0.005,
  mieDirectionalG: 0.8,
  luminance: 1,
  inclination: 0.49, // elevation / inclination
  azimuth: 0.25, // Facing front,
  sun: !true
};
var distance = 400000;

// var gui_scene_fog = gui_scene.addFolder('fog');
// var gui_scene_camera = gui_scene.addFolder('camera');
// - - - - - - - - - - - - - - - - - - - - - - POST FX
// var gui_post = gui.addFolder('post');
// var gui_post_ssao = gui_post.addFolder('ssao');
// var gui_post_bokeh = gui_post.addFolder('bokeh');
// var gui_bokeh_params = {
//   focus: 1,
//   aperture: 0.025,
//   maxBlur: 1
// };


function gui_setupSceneControls() {
  // time
  // gui_scene.add(gui_scene_params, 'global_time_rate', 0, 0.5).onChange(function(
  //   value) {
  //   global_time_rate = value;
  // });


  // Fog
  // gui_scene_fog.add(scene.fog, "near", 0, 100);
  // gui_scene_fog.add(scene.fog,  "far", 0, 100);
  // gui_scene_fog.addColor(scene.fog, "color");

  // Camera
  // gui_scene_camera.add(camera, 'fov', 0, 360).onChange(
  //   handler_cameraChanged);
  // gui_scene_camera.add(camera, 'near', 0, 360).onChange(
  //   handler_cameraChanged);
  // gui_scene_camera.add(camera, 'far', 0, 360).onChange(
  //   handler_cameraChanged);
}

function gui_initSky() {
  gui_scene_sky.add(gui_skyParams, "turbidity", 1.0, 20.0, 0.1).onChange(
    gui_skyChanged);
  gui_scene_sky.add(gui_skyParams, "rayleigh", 0.0, 4, 0.001).onChange(
    gui_skyChanged);
  gui_scene_sky.add(gui_skyParams, "mieCoefficient", 0.0, 0.1, 0.001).onChange(
    gui_skyChanged);
  gui_scene_sky.add(gui_skyParams, "mieDirectionalG", 0.0, 1, 0.001).onChange(
    gui_skyChanged);
  gui_scene_sky.add(gui_skyParams, "luminance", 0.0, 2).onChange(
    gui_skyChanged);
  gui_scene_sky.add(gui_skyParams, "inclination", 0, 1, 0.0001).onChange(
    gui_skyChanged);
  gui_scene_sky.add(gui_skyParams, "azimuth", 0, 1, 0.0001).onChange(
    gui_skyChanged);
  gui_scene_sky.add(gui_skyParams, "sun").onChange(gui_skyChanged);

  gui_skyChanged();


}

function gui_skyChanged() {
  var uniforms = sky.uniforms;
  uniforms.turbidity.value = gui_skyParams.turbidity;
  uniforms.rayleigh.value = gui_skyParams.rayleigh;
  uniforms.luminance.value = gui_skyParams.luminance;
  uniforms.mieCoefficient.value = gui_skyParams.mieCoefficient;
  uniforms.mieDirectionalG.value = gui_skyParams.mieDirectionalG;

  var theta = Math.PI * (gui_skyParams.inclination - 0.5);
  var phi = 2 * Math.PI * (gui_skyParams.azimuth - 0.5);

  sunSphere.position.x = distance * Math.cos(phi);
  sunSphere.position.y = distance * Math.sin(phi) * Math.sin(theta);
  sunSphere.position.z = distance * Math.sin(phi) * Math.cos(theta);

  sunSphere.visible = gui_skyParams.sun;
  sky.uniforms.sunPosition.value.copy(sunSphere.position);
  renderer.render(scene, camera);
}

function gui_setup_postFX_Controls() {
  // ssao
  // gui_post_ssao.add(pass_ssao.uniforms.aoClamp, "value", 0, 10);
  // gui_post_ssao.add(pass_ssao.uniforms.lumInfluence, "value", 0, 10);
  //
  // // bokeh
  // gui_post_bokeh.add(gui_bokeh_params, "focus", 0, 2).onChange(
  //   gui_handler_postbokeh);
  // gui_post_bokeh.add(gui_bokeh_params, "aperture", 0, 1).onChange(
  //   gui_handler_postbokeh);
  // gui_post_bokeh.add(gui_bokeh_params, "maxBlur", 0, 3).onChange(
  //   gui_handler_postbokeh);
}

function gui_handler_postbokeh() {
  // pass_bokeh.uniforms.focus.value = gui_bokeh_params.focus;
  // pass_bokeh.uniforms.aperture.value = gui_bokeh_params.aperture;
  // pass_bokeh.uniforms.maxblur.value = gui_bokeh_params.maxBlur;
}

function handler_cameraChanged() {
  camera.updateProjectionMatrix();
  pass_ssao.uniforms.cameraNear.value = camera.near;
  pass_ssao.uniforms.cameraFar.value = camera.far;
}
