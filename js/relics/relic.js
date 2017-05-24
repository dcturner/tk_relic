Relic = {};

updateRelic = function() {};

Relic.RelicScene = function(name) {
	// collada
	_this = this;
	this.name = name;
	this.ready = false;
	this.relicLoader = new THREE.ColladaLoader();
	this.relicLoader.options.convertUpAxis = true;
	this.relicLoader.load("relicAssets/carbon/geo/main.dae", function(collada) {
		_this.relicConfig = new Relic.RelicConfig(collada);
		console.log("relic >> " + name + " >> created");
		_this.ready = true;
	});

    this.update = function(){}
}
