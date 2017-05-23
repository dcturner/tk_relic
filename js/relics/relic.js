Relic = {};

Relic.Config = function(name){
  this.name = name;
  this.folder = "geo/"+name+"/";
  this.mesh_main_url = this.folder + "main.dae";
  this.mesh_support1_url = this.folder + "support1.dae";
  this.mesh_support2_url = this.folder + "support2.dae";
  //return this;
};

Relic.config_carbon = new Relic.Config("carbon");
Relic.config_chaos = new Relic.Config("chaos");

Relic.RelicScene = function(config){
  // collada
  _this = this;
this.name = config.name;
this.meshURL = config.mesh_main_url;
this.osc_y = 500;
this.scaleX_osc_rate = 500;
this.scaleY_osc_rate = 400;
this.scaleZ_osc_rate = 300;
// scale oscillator
this.scaleX_osc_min = 0.92;
this.scaleX_osc_max = 1;
this.scaleY_osc_min = 0.92;
this.scaleY_osc_max = 1;
this.scaleZ_osc_min = 0.92;
this.scaleZ_osc_max = 1;

this.relicMesh = {};
this.ready = false;
  				this.relicLoader = new THREE.ColladaLoader();
  				this.relicLoader.options.convertUpAxis = true;
  				this.relicLoader.load( this.meshURL, function ( collada ) {
          console.log("relic >> "+name +" >> created");
  				this.relicMesh = collada.scene;

  				relicMesh.scale.set( 1, 1,1);
  				relicMesh.position.set( 0, 0, 0 );

  				scene.add( this.relicMesh );
          _this.setup();
          oscillationRate = 500;
  				} )
          this.setup = function(){
          this.ready = true;
          }

          this.update = function(){

          }
        };
