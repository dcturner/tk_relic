Relic = {};
Relic['shaders'] = [];

relic_update = function() {};

Relic.RelicScene = function(name) {
	// collada
	_this = this;
	this.name = name;
	this.ready = false;

	// COLLADA
	this.relicLoader = new THREE.ColladaLoader();
	this.relicLoader.load("relicAssets/carbon/geo/monster.dae", function(geo) {
		_this.relicConfig = new Relic.RelicConfig(geo);
		console.log("relic >> " + name + " >> created");
		_this.ready = true;
	});

	// this.relicLoader = new THREE.OBJLoader();
	//
	// 	this.relicLoader.load(
	// 		'relicAssets/carbon/geo/blend.obj',
	// 		function ( object ) {
	// 			_this.relicConfig = new Relic.RelicConfig(object);
	// 		}
	// 	);

	this.update = function() {}
}
