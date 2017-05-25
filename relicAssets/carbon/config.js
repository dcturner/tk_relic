console.log("CARBON CONFIG LOADED");
Relic.relicParams = {};
Relic.relicParams['orbitLines'] = {
  COUNT: 4,
  SCALE_MIN: 0.85,
  SCALE_MAX: 1.1,
  ANGLE_OFFSET: 0.1
};
Relic.relicParams['hexagons'] = {
  COL: new THREE.Color(0x000000),
  EMIT: new THREE.Color(6, 10, 13),
  EMIT_STRENGTH: 0.005
};


var colladaScene;

// MAIN RELIC
var hexagons = [];
var mat_hexagons;

var orbitLines = [];
var orbitLine_master,
  triangleGrid,
  core;

// FLOOR
var floor_rubble = [];
var floor_radiantLines = [];

Relic.RelicConfig = function(loadedCollada) {

  colladaScene = loadedCollada.scene;
  relicSetup_shadersAndMaterials();

  // setup orbitLine
  orbitLine_master = colladaScene.getObjectByName("ELLIPSE");
  orbitLines_setup();

  // setup triangleGrid
  triangleGrid = colladaScene.getObjectByName("TRIANGLE_GRID");
  scene.add(triangleGrid);
  // setup core
  core = colladaScene.getObjectByName("CENTRAL_GLOW_SUPPORT");
  //scene.add(core);

  for (var i = 3; i < 35; i++) {
    var hex = colladaScene.getObjectByName("MAIN_HEXAGON_" + i);
    hexagons.push(hex);
    hex.dynamic = true;
    hex.children[0].material = mat_hexagons;
    scene.add(hex);
  }
}

function orbitLines_setup() {

  for (var i = 0; i < 20; i++) {
    scene.remove(orbitLines[i]);
  }
  orbitLines = [];

  for (var i = 0; i < Relic.relicParams['orbitLines'].COUNT; i++) {

    var tempOrbitLine = orbitLine_master.clone();
    orbitLines.push(tempOrbitLine);
    scene.add(tempOrbitLine);
  }
  orbitLines_applyOffsets();
}

function orbitLines_applyOffsets() {
  var scaleDiv = (Relic.relicParams.orbitLines.SCALE_MAX - Relic.relicParams.orbitLines
    .SCALE_MIN) /
  Relic.relicParams.orbitLines.COUNT;

  for (var i = 0; i < Relic.relicParams.orbitLines.COUNT; i++) {
    var tempOrbitLine = orbitLines[i];
    var scl_offset = Relic.relicParams.orbitLines.SCALE_MIN + (i * scaleDiv);
    tempOrbitLine.scale.set(scl_offset, scl_offset, scl_offset);
  }

}

function updateRelic() {
}

// -- GUI for carbon element
// - - - - - - - - - - - - - - - - - - - - - - ORBIT_LINES
var gui_orbitLines = gui.addFolder("orbitLines");
var gui_orbitLines_layout = gui_orbitLines.addFolder("layout");
gui_orbitLines_layout.add(Relic.relicParams['orbitLines'], "COUNT", 0, 10, 1)
  .onChange(
    orbitLines_setup);
gui_orbitLines_layout.add(Relic.relicParams['orbitLines'], "SCALE_MIN", 0, 2)
  .onChange(
    orbitLines_applyOffsets);
gui_orbitLines_layout.add(Relic.relicParams['orbitLines'], "SCALE_MAX", 0, 2)
  .onChange(
    orbitLines_applyOffsets);
// - - - - - - - - - - - - - - - - - - - - - - POINTS
var gui_points = gui.addFolder("points");

// - - - - - - - - - - - - - - - - - - - - - - HEXAGONS
var gui_hexagons = gui.addFolder("hexagons");
gui_hexagons.addColor(Relic.relicParams['hexagons'], "COL").onChange(
  gui_hexagonsChanged);
gui_hexagons.addColor(Relic.relicParams['hexagons'], "EMIT").onChange(
  gui_hexagonsChanged);
gui_hexagons.add(Relic.relicParams['hexagons'], "EMIT_STRENGTH", 0, 1).onChange(
  gui_hexagonsChanged);
gui_hexagons.open();

// - - - - - - - - - - - - - - - - - - - - - - ENERGY_CORE
var gui_core = gui.addFolder("core");


function gui_orbitLines_changed() {
  //orbitLines_applyOffsets();
}

function gui_hexagonsChanged() {
  mat_hexagons.color = Relic.relicParams['hexagons']['COL'];
  mat_hexagons.emissive = Relic.relicParams['hexagons']['EMIT'];
  mat_hexagons.emissiveIntensity = Relic.relicParams['hexagons'][
    'EMIT_STRENGTH'
  ];

}

// - - - - - - - - - - - - - - - - - - - - - - SHADERS / MATERIALS
function relicSetup_shadersAndMaterials() {
  mat_hexagons = new THREE.MeshPhongMaterial();
  // mat_hexagons.roughness = 1;
  // mat_hexagons.metalness = 1;
  mat_hexagons.color = new THREE.Color(0x000000);
  mat_hexagons.emissive = new THREE.Color(6, 10, 13);
  mat_hexagons.emissiveIntensity = 0.0073;
}
