var gui, guiParams;
guiParams = {
  osc_y:500,
  scaleX_osc_rate:500
  // scaleX_min:500,

};
function setupGUI(){


var gui = new dat.GUI();
gui.add(relic,"osc_y",1,2000,10).onChange(guiChanged);
// x
gui.add(relic,"scaleX_osc_rate",1,2000,10).onChange(guiChanged);
gui.add(relic,"scaleX_osc_min",0.0001,3,0.91).onChange(guiChanged);
gui.add(relic,"scaleX_osc_max",0.0001,3,1).onChange(guiChanged);
// y
gui.add(relic,"scaleY_osc_rate",1,2000,10).onChange(guiChanged);
gui.add(relic,"scaleY_osc_min",0.0001,3,0.91).onChange(guiChanged);
gui.add(relic,"scaleY_osc_max",0.0001,3,1).onChange(guiChanged);
// z
gui.add(relic,"scaleZ_osc_rate",1,2000,10).onChange(guiChanged);
gui.add(relic,"scaleZ_osc_min",0.0001,3,0.91).onChange(guiChanged);
gui.add(relic,"scaleZ_osc_max",0.0001,3,1).onChange(guiChanged);
}
function guiChanged(){

  // relic.oscillationRate = guiParams.oscRate;
  // relic.seed_scaleX = guiParams.osc_scaleX;
  // relic.seed_scaleY = guiParams.osc_scaleY;
  // relic.seed_scaleZ = guiParams.osc_scaleZ;
};
