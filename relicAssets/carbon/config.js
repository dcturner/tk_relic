console.log("CARBON CONFIG LOADED");
Relic.relicParams = {};
Relic.relicParams['orbitLines'] = {
  COUNT: 4,
  SCALE_MIN: 1,
  SCALE_MAX: 1.5,
  ANGLE_OFFSET_X: 0.67,
  ANGLE_OFFSET_Y: 0.1,
  ROT_SPEED_MIN: 0.0004,
  ROT_SPEED_MAX: 0.022
};
Relic.relicParams['hexagons'] = {
  COL: new THREE.Color(0x000000),
  EMIT: new THREE.Color(6, 10, 13),
  EMIT_STRENGTH: 0.005
};

// - - - - - - - - - - - - - - - - - - - - - - GENERAL MATERIALS
var mat_fresnel,
  mat_colouredNormals;

var colladaScene;

// MAIN RELIC
var hexagons = [];
var mat_hexagons;

var orbitLines = [];
var mat_orbitLine;
var orbitLine_master,
  triangleGrid,
  mat_triangleGrid,
  core,
  mat_core,
  pointRings_ceiling = [],
  pointRings_floor = [],
  mat_pointRing;

// FLOOR
var floor,
  mat_floor,
  floor_rubble = [],
  mat_floor_rubble;

Relic.RelicConfig = function(loadedCollada) {

  relic_setupEnvironment();

  colladaScene = loadedCollada.scene

  relicSetup_shadersAndMaterials();

  // setup orbitLine
  orbitLine_master = colladaScene.getObjectByName("ELLIPSE");
  orbitLines_setup();

  // setup triangleGrid
  triangleGrid = colladaScene.getObjectByName("TRIANGLE_GRID");
  //scene.add(triangleGrid);
  // setup core
  core = colladaScene.getObjectByName("CENTRAL_GLOW_SUPPORT");
  //scene.add(core);

  for (var i = 3; i < 35; i++) {
    var hex = colladaScene.getObjectByName("MAIN_HEXAGON_" + i);
    hexagons.push(hex);
    hex.dynamic = true;
    hex.children[0].material = mat_fresnel;
  //scene.add(hex);
  }


}

function orbitLines_setup() {

  for (var i = 0; i < 200; i++) {
    scene.remove(orbitLines[i]);
  }
  orbitLines = [];
  var p = Relic.relicParams['orbitLines'];
  var count = p.COUNT;
  var rotationDiv = (p.ROT_SPEED_MAX - p.ROT_SPEED_MIN) / count;
  for (var i = 0; i < count; i++) {

    var tempOrbitLine = orbitLine_master.clone();
    tempOrbitLine['offsetAngle_x'] = i * p.ANGLE_OFFSET_X;
    tempOrbitLine['offsetAngle_y'] = i * p.ANGLE_OFFSET_Y;
    tempOrbitLine['rotationSpeed'] = p.ROT_SPEED_MIN + (i * rotationDiv);
    orbitLines.push(tempOrbitLine);
  //scene.add(tempOrbitLine);
  }
  orbitLines_applyOffsets();
}

function orbitLines_applyOffsets() {
  var scaleDiv = (Relic.relicParams.orbitLines.SCALE_MAX - Relic.relicParams.orbitLines
    .SCALE_MIN) /
  Relic.relicParams.orbitLines.COUNT;

  for (var i = 0; i < Relic.relicParams.orbitLines.COUNT; i++) {
    var tempOrbitLine = orbitLines[i];
    tempOrbitLine.rotation.set(tempOrbitLine.offsetAngle_x, tempOrbitLine.offsetAngle_y,
      0);
    var scl_offset = Relic.relicParams.orbitLines.SCALE_MIN + (i * scaleDiv);
    tempOrbitLine.scale.set(scl_offset, scl_offset, scl_offset);
  }

}

function relic_update() {
  relic_update_orbitLines();
}

function relic_update_orbitLines() {
  var p = Relic.relicParams['orbitLines'];
  var count = p.COUNT;
  try {
    for (var i = 0; i < count; i++) {
      var ol = orbitLines[i];
      //orbitLines[i].rotateOnAxis(0, global_time_seed);

      var newZ = ol.rotation.z + ol.rotationSpeed;

      ol.rotation['z'] = newZ;
      //orbitLines[i].rotation.x += 1;

    }
  } catch (e) {}

}

// // -- GUI for carbon element
// var gui_relic = gui.addFolder('relic');
// // - - - - - - - - - - - - - - - - - - - - - - ORBIT_LINES
// var gui_orbitLines = gui_relic.addFolder("orbitLines");
// var gui_orbitLines_layout = gui_orbitLines.addFolder("layout");
// gui_orbitLines_layout.add(Relic.relicParams['orbitLines'], "COUNT", 0, 100, 1)
//   .onChange(
//     orbitLines_setup);
// gui_orbitLines_layout.add(Relic.relicParams['orbitLines'], "SCALE_MIN", -1, 2)
//   .onChange(
//     orbitLines_setup);
// gui_orbitLines_layout.add(Relic.relicParams['orbitLines'], "SCALE_MAX", 0, 10)
//   .onChange(
//     orbitLines_setup);
// gui_orbitLines_layout.add(Relic.relicParams['orbitLines'], "ANGLE_OFFSET_X", 0,
//   1)
//   .onChange(
//     orbitLines_setup);
// gui_orbitLines_layout.add(Relic.relicParams['orbitLines'], "ANGLE_OFFSET_Y", 0,
//   1)
//   .onChange(
//     orbitLines_setup);
// gui_orbitLines_layout.add(Relic.relicParams['orbitLines'], "ROT_SPEED_MIN", 0,
//   0.1)
//   .onChange(
//     orbitLines_setup);
// gui_orbitLines_layout.add(Relic.relicParams['orbitLines'], "ROT_SPEED_MAX", 0,
//   0.2)
//   .onChange(
//     orbitLines_setup);
// //ROT_SPEED_MIN
// // - - - - - - - - - - - - - - - - - - - - - - POINTS
// var gui_points = gui_relic.addFolder("points");
//
// // - - - - - - - - - - - - - - - - - - - - - - HEXAGONS
// var gui_hexagons = gui_relic.addFolder("hexagons");
// gui_hexagons.addColor(Relic.relicParams['hexagons'], "COL").onChange(
//   gui_hexagonsChanged);
// gui_hexagons.addColor(Relic.relicParams['hexagons'], "EMIT").onChange(
//   gui_hexagonsChanged);
// gui_hexagons.add(Relic.relicParams['hexagons'], "EMIT_STRENGTH", 0, 1).onChange(
//   gui_hexagonsChanged);
//
// // - - - - - - - - - - - - - - - - - - - - - - ENERGY_CORE
// var gui_core = gui_relic.addFolder("core");
//
//
// function gui_orbitLines_changed() {
//   //orbitLines_applyOffsets();
// }
//
// function gui_hexagonsChanged() {
//   mat_hexagons.color = Relic.relicParams['hexagons']['COL'];
//   mat_hexagons.emissive = Relic.relicParams['hexagons']['EMIT'];
//   mat_hexagons.emissiveIntensity = Relic.relicParams['hexagons'][
//     'EMIT_STRENGTH'
//   ];
//
// }

// - - - - - - - - - - - - - - - - - - - - - - SHADERS / MATERIALS
function relicSetup_shadersAndMaterials() {
  mat_hexagons = new THREE.MeshPhongMaterial();
  // mat_hexagons.roughness = 1;
  // mat_hexagons.metalness = 1;
  mat_hexagons.color = new THREE.Color(0x000000);
  mat_hexagons.emissive = new THREE.Color(6, 10, 13);
  mat_hexagons.emissiveIntensity = 0.0073;
}


function relic_setupEnvironment() {
  // var path = "images/cube/Park2/";
  // var format = '.jpg';
  // var urls = [
  //   path + 'posx' + format, path + 'negx' + format,
  //   path + 'posy' + format, path + 'negy' + format,
  //   path + 'posz' + format, path + 'negz' + format
  // ];
  // var textureCube = new THREE.CubeTextureLoader().load(urls);
  // textureCube.format = THREE.RGBFormat;
  // textureCube.mapping = THREE.CubeRefractionMapping;
  // scene.background = textureCube;
  //
  // var geometry = new THREE.SphereGeometry(2, 40, 40);
  // var shader = THREE.FresnelShader;
  // var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
  // uniforms["tCube"].value = textureCube;
  mat_fresnel = getMaterial_colouredNormals();

  // mat_colouredNormals = getMaterial_colouredNormals();
  // var shell = new THREE.Mesh(geometry, mat_colouredNormals);

  //scene.add(shell);

  // gui_relic.addThreeUniformColor(mat_colouredNormals, 'col1', 'colour1');
  // gui_relic.addThreeUniformColor(mat_colouredNormals, 'col2', 'colour2');
  // gui_relic.addThreeUniformColor(mat_colouredNormals, 'col3', 'colour3');

// gui_relic.add(mat_fresnel.uniforms.mFresnelBias, "value", 0, 1);
// gui_relic.add(mat_fresnel.uniforms.mFresnelPower, "value", -1, 4);
// gui_relic.add(mat_fresnel.uniforms.mFresnelScale, "value", 0, 1);
// gui_relic.add(mat_fresnel.uniforms.mRefractionRatio, "value", -1, 3);
// gui_relic.add(mat_fresnel, "wireframe");
// gui_relic.add(mat_fresnel, "wireframeLinewidth", 0, 100);
}

function handler_shaderChange() {
  // mat_colouredNormals.uniforms.col1.value = Shader_ColouredNormals_params.col1;
  // mat_colouredNormals.uniforms.col2.value = Shader_ColouredNormals_params.col2;
  // mat_colouredNormals.uniforms.col3.value = Shader_ColouredNormals_params.col3;
  // console.log(mat_colouredNormals.uniforms);
}

function testShaderLoop() {
}
