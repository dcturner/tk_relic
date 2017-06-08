console.log("CARBON CONFIG LOADED");
Relic.relicParams = {};
Relic.relicParams['hexagons'] = {
  U_EMISSION_COLOUR: new THREE.Color(20,20,20)
};

// - - - - - - - - - - - - - - - - - - - - - - SCENE OBJ + MATERIALS
var loadedScene;
var obj_roomSphere, mat_roomSphere;
var obj_floor, mat_floor;
var obj_floorRubble = [], mat_floorRubble;
var obj_hexagons = [],mat_hexagons;
var obj_orbitLines = [], mat_orbitLines, orbitLine_master;
var obj_triangleGrid,mat_triangleGrid;

// - - - - - - - - - - - - - - - - - - - - - - COLLADA LOADED -->  SETUP SCENE
Relic.RelicConfig = function(loaded) {
    relic_setupEnvironment();
    relicSetup_shadersAndMaterials();
    // relic_hexagons_setup();

    var planeGeo1 = new THREE.PlaneGeometry( 1, 1, 100 );
var p1 = new THREE.Mesh( planeGeo1, mat_Vignette );
scene.add(p1);

var planeGeo2 = new THREE.PlaneGeometry( 1, 1, 100 );
var p2 = new THREE.Mesh( planeGeo2, mat_Vignette );
p2.position.set(1.0,1.0,1.0);
scene.add(p2);
}

function relic_update() {
    relic_hexagons_update();
}

// -----------------------------------------------  < HEXAGONS
function relic_hexagons_setup(){

var childCount = loadedScene.children.length;
    for (var i = 0; i < childCount; i++) {
      var hex = loadedScene.children[i].mesh;
      obj_hexagons.push(hex);
    scene.add(hex);
  }
  console.log(loadedScene);

}
function relic_hexagons_update(){
}
function relic_hexagons_onChange(){
}
// -----------------------------------------------  HEXAGONS >


function relicSetup_shadersAndMaterials() {
    mat_hexagons = new THREE.RawShaderMaterial( {
	uniforms: SHADER_vignette['uniforms'],
	vertexShader: SHADER_vignette['vertex'],
	fragmentShader: SHADER_vignette['fragment']
    } );
    // mat_hexagons = new THREE.MeshBasicMaterial({wireframe:true});
}
function relic_setupEnvironment() {
}
function handler_shaderChange() {
}
function testShaderLoop() {
}
