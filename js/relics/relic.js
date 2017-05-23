Relic = {};

updateRelic = function(){};

Relic.RelicScene = function(name){
  // collada
  _this = this;
this.name = name;

this.relicMesh = {};
this.ready = false;
  				this.relicLoader = new THREE.ColladaLoader();
  				this.relicLoader.options.convertUpAxis = true;

// load Relic config
var imported = document.createElement('script');
imported.src = "relicAssets/"+name+"/config.js";
document.head.appendChild(imported);



  				this.relicLoader.load( "relicAssets/carbon/geo/main.dae", function ( collada ) {
          console.log("relic >> "+name +" >> created");


this.relicConfig = new Relic.RelicConfig(collada);
          _this.setup();

  				} )

          this.setup = function(){
          this.ready = true;
          }

          this.update = function(){

          }
        };
