console.log("CARBON CONFIG LOADED");

var hexArray = [];
var orbitLine, triangleGrid, core;

Relic.RelicConfig = function(loadedCollada){
    console.log(loadedCollada);
    this.scene = loadedCollada.scene;

// setup orbitLine
orbitLine = this.scene.getObjectByName( "ELLIPSE" );
scene.add(orbitLine);
// setup triangleGrid
triangleGrid = this.scene.getObjectByName( "TRIANGLE_GRID" );
scene.add(triangleGrid);
// setup core
core = this.scene.getObjectByName( "CENTRAL_GLOW_SUPPORT");
scene.add(core);

for (var i = 3; i < 35; i++) {
  var hex = this.scene.getObjectByName("MAIN_HEXAGON_"+i);
  hexArray.push(hex);
  scene.add(hex);
}

    // scene.add( this.scene );
}
