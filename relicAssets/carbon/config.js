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
    loadedScene = loaded;
    relic_setupEnvironment();
    relic_hexagons_setup();

    // var geo1 = new THREE.IcosahedronGeometry(1, 1)
    // var sphere1 = new THREE.Mesh( geo1, mat_Vignette );
    // scene.add(sphere1);
}

function relic_update() {
    relic_hexagons_update();
}

// -----------------------------------------------  < HEXAGONS
function relic_hexagons_setup(){
var childCount = loadedScene.scene.children.length;
    for (var i = 0; i < childCount; i++) {
        var hex = loadedScene.scene.children[i];
        hex.children[0].material = mat_Diffuse_Specular_Emmisive;
        obj_hexagons.push(hex);
    }
    scene.add(loadedScene.scene);
}
function relic_hexagons_update(){
}
function relic_hexagons_onChange(){
}
// -----------------------------------------------  HEXAGONS >

function relic_setupEnvironment() {
}
function handler_shaderChange() {
}
function testShaderLoop() {
}
