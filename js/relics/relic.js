Relic = {};

updateRelic = function() {};

Relic.RelicScene = function(name) {
  // collada
  _this = this;
  this.name = name;
  this.relicMesh = {};
  this.ready = false;
  this.relicLoader = new THREE.ColladaLoader();
  this.relicLoader.options.convertUpAxis = true;

  // load Relic config
  var imported = document.createElement('script');
  imported.src = "relicAssets/" + name + "/config.js";
  imported.onload = handler_relicConfigLoaded;
  //imported.async = false;
  document.head.appendChild(imported);
};

this.setup = function() {

  this.ready = true;
}

this.update = function() {

};

function handler_relicConfigLoaded() {
  relic.relicLoader.load("relicAssets/carbon/geo/main.dae", function(collada) {
    relicConfig = new Relic.RelicConfig(collada);
    console.log("relic >> " + name + " >> created");
  });
}
