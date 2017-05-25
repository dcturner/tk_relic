var gui = new dat.GUI({
  width: 500
});

var gui_scene = gui.addFolder('scene');
var gui_scene_fog = gui_scene.addFolder('fog');
var gui_scene_camera = gui_scene.addFolder('camera');
// - - - - - - - - - - - - - - - - - - - - - - POST FX
var gui_post = gui.addFolder('post');
var gui_post_ssao = gui_post.addFolder('ssao');
var gui_post_bokeh = gui_post.addFolder('bokeh');

function gui_setupSceneControls() {
  // Fog
  gui_scene_fog.add(scene.fog, "near", 0, 100);
  gui_scene_fog.add(scene.fog, "far", 0, 100);
  gui_scene_fog.addColor(scene.fog, "color");

  // Camera
  gui_scene_camera.add(camera, 'fov', 0, 360).onChange(handler_cameraChanged);
  gui_scene_camera.add(camera, 'near', 0, 360).onChange(handler_cameraChanged);
  gui_scene_camera.add(camera, 'far', 0, 360).onChange(handler_cameraChanged);
  gui_scene_camera.open();
}

function gui_setup_postFX_Controls() {
  // ssao
  gui_post_ssao.add(pass_ssao.uniforms.aoClamp, "value", 0, 10);
  gui_post_ssao.add(pass_ssao.uniforms.lumInfluence, "value", 0, 10);

  // bokeh
  gui_post_bokeh.add(pass_bokeh.uniforms.focus, "value", 0, 2);
  gui_post_bokeh.add(pass_bokeh.uniforms.aperture, "value", 0, 1);
  gui_post_bokeh.add(pass_bokeh.uniforms.maxblur, "value", 0, 3);
// gui_post_bokeh.add(pass_bokeh, "aperture", 0, 1);
// gui_post_bokeh.add(pass_bokeh, "maxBlur", 0, 3);
}

function handler_cameraChanged() {
  camera.updateProjectionMatrix();
  pass_ssao.uniforms.cameraNear.value = camera.near;
  pass_ssao.uniforms.cameraFar.value = camera.far;
}
