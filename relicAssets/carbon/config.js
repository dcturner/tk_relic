console.log("CARBON CONFIG LOADED");
var relicParams = {
  ORBIT_LINE_COUNT:4,
  ORBIT_LINE_SCALE_MIN:0.8,
  ORBIT_LINE_SCALE_MAX:1,
  ORBIT_LINE_ANGLE_OFFSET:0.1
};

var colladaScene;
var hexArray = [];
var orbitLines = [];
var orbitLine_master, triangleGrid, core;

Relic.RelicConfig = function(loadedCollada){

    colladaScene = loadedCollada.scene;


// setup orbitLine
orbitLine_master = colladaScene.getObjectByName( "ELLIPSE" );
orbitLines_setup();

// setup triangleGrid
triangleGrid = colladaScene.getObjectByName( "TRIANGLE_GRID" );
scene.add(triangleGrid);
// setup core
core = colladaScene.getObjectByName( "CENTRAL_GLOW_SUPPORT");
scene.add(core);

for (var i = 3; i < 35; i++) {
  var hex = colladaScene.getObjectByName("MAIN_HEXAGON_"+i);
  hexArray.push(hex);
  scene.add(hex);
}

    // scene.add( this.scene );
}
function orbitLines_setup(){

for (var i = 0; i < 10; i++) {
  scene.remove(orbitLines[i]);
}
orbitLines = []
  for (var i = 0; i < relicParams.ORBIT_LINE_COUNT; i++) {

    var tempOrbitLine = orbitLine_master.clone();
    orbitLines.push(tempOrbitLine);
    scene.add(tempOrbitLine);
  }
  orbitLines_applyOffsets();
}
function orbitLines_applyOffsets(){
var scaleDiv = (relicParams.ORBIT_LINE_SCALE_MAX - relicParams.ORBIT_LINE_SCALE_MIN) / relicParams.ORBIT_LINE_COUNT;

  for (var i = 0; i < relicParams.ORBIT_LINE_COUNT; i++) {
    var tempOrbitLine = orbitLines[i];
    var scl_offset = relicParams.ORBIT_LINE_SCALE_MIN + (i*scaleDiv);
    tempOrbitLine.scale.set(scl_offset,scl_offset,scl_offset);
  }

}

function updateRelic(){

}
var gui = new dat.GUI();
// -- GUI for carbon element
// - - - - - - - - - - - - - - - - - - - - - - ORBIT_LINES
var gui_orbitLines = gui.addFolder("orbitLines");
gui_orbitLines.add(relicParams,"ORBIT_LINE_COUNT", 0,10,1 ).onChange(orbitLines_setup);
gui_orbitLines.add(relicParams, "ORBIT_LINE_SCALE_MIN",0,2).onChange(orbitLines_applyOffsets);
gui_orbitLines.add(relicParams, "ORBIT_LINE_SCALE_MAX",0,2).onChange(orbitLines_applyOffsets);
// - - - - - - - - - - - - - - - - - - - - - - POINTS
var gui_points = gui.addFolder("points");

// - - - - - - - - - - - - - - - - - - - - - - HEXAGONS
var gui_hexagons = gui.addFolder("hexagons");

// - - - - - - - - - - - - - - - - - - - - - - ENERGY_CORE
var gui_core = gui.addFolder("core");

function rebuildOrbitLines(){

}
function gui_orbitLines_changed(){
orbitLines_applyOffsets();
}
