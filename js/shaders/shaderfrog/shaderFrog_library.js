var clock;
var SFRT;

// MATERIAL LIST
var gui_materials = gui.addFolder("materials");
var mat_Diffuse_Specular_Emmisive, gui_Diffuse_Spec_Emissive = gui_materials.addFolder("Carbon");
var mat_Vignette, gui_mat_Vignette = gui_materials.addFolder("Vignette");

// Load Hexagons shaders



function setupShaderLibrary(cam){

clock  = new THREE.Clock();
SFRT = new ShaderRuntime();

    SFRT.registerCamera( cam );
    console.log(mat_Vignette);

    var path = 'js/shaders/shaderfrog/';
    SFRT.load( [
        path+'Diffuse_Spec_Emissive.json',
        path+'Vignette.json' ],

        function( materials) {
        mat_Diffuse_Specular_Emmisive_SETUP(SFRT.get( materials[0].name ));
        mat_Vignette_SETUP(SFRT.get( materials[1].name ));
    });
}
function mat_Diffuse_Specular_Emmisive_SETUP(m){
    mat_Diffuse_Specular_Emmisive = m;

}
function mat_Vignette_SETUP(m){
    mat_Vignette = m;
    mat_Vignette.alphaTest = 0.5;
    mat_Vignette.transparent = true;
    mat_Vignette.uniforms.u_vignetteColour.value = new THREE.Color( 1.0, 0.0, 0.0 );
    mat_Vignette.uniforms.u_vignetteSpread.value = new THREE.Vector2(0.0,1.0);
    mat_Vignette.uniforms.u_vignetteBias.value = new THREE.Vector2(0.5,0.5);

    // -----------------------------------------------  GUI
    gui.remember(mat_Vignette.uniforms);
    console.log(mat_Vignette.uniforms.u_vignetteSpread);
    gui_mat_Vignette.addThreeUniformColor(mat_Vignette,"u_vignetteColour", "Colour");
    gui_mat_Vignette.add(mat_Vignette.uniforms.u_vignetteSpread.value, "x", "spread_X").min(0).max(10);
    gui_mat_Vignette.add(mat_Vignette.uniforms.u_vignetteSpread.value, "y", "spread_Y").min(0).max(10);
    gui_mat_Vignette.add(mat_Vignette.uniforms.u_vignetteBias.value, "x", "bias_X").min(0).max(1);
    gui_mat_Vignette.add(mat_Vignette.uniforms.u_vignetteBias.value, "y", "bias_Y").min(0).max(1);
// gui_mat_Vignette.add(mat_Vignette.uniforms.u_vignetteSpread,"value", "bias");

    console.log(mat_Vignette);
}

function updateShaders(){
    SFRT.updateShaders( clock.getElapsedTime() );
}

/*
colour
"value": {
  "r": 0.0,
  "g": 0.0,
  "b": 0.0
},

vec2
"value": {
  "x": 0.0,
  "y": 0.0
},

float
"value":1.0,

*/
