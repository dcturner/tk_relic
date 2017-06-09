var clock;
var SFRT;

var lightHelper;


// MATERIAL LIST
var textureLoader = new THREE.TextureLoader();
var gui_materials = gui.addFolder("materials");
var mat_Diffuse_Specular_Emmisive,
    mat_Diffuse_Specular_Emmisive_tex_reflection,
    mat_Diffuse_Specular_Emmisive_tex_emission,
    mat_Diffuse_Specular_Emmisive_tex_matte,
    gui_Diffuse_Spec_Emissive = gui_materials.addFolder("Carbon"),
    gui_Diffuse_Spec_Emissive_DIFFUSE = gui_Diffuse_Spec_Emissive.addFolder("Diffuse"),
    gui_Diffuse_Spec_Emissive_AMBIENT = gui_Diffuse_Spec_Emissive.addFolder("Ambient"),
    gui_Diffuse_Spec_Emissive_SPECULAR = gui_Diffuse_Spec_Emissive.addFolder("Specular"),
    gui_Diffuse_Spec_Emissive_EMISSIVE = gui_Diffuse_Spec_Emissive.addFolder("Emissive"),
    gui_Diffuse_Spec_Emissive_MATTE = gui_Diffuse_Spec_Emissive.addFolder("Matte"),
    loadedTextures = 0;

var mat_Vignette, gui_mat_Vignette = gui_materials.addFolder("Vignette");

// Load Hexagons shaders

// LOAD TEXTURES
mat_Diffuse_Specular_Emmisive_tex_reflection = textureLoader.load("relicAssets/carbon/img/Kaboo_Carbon_SphereMap3.jpg");
mat_Diffuse_Specular_Emmisive_tex_emission = textureLoader.load("relicAssets/carbon/img/k_carbon_emission.jpg");
mat_Diffuse_Specular_Emmisive_tex_matte = textureLoader.load("relicAssets/carbon/img/k_carbon_matte.jpg");


function setupShaderLibrary(cam){

clock  = new THREE.Clock();
SFRT = new ShaderRuntime();
 lightHelper = new THREE.AxisHelper(1);
 // scene.add(lightHelper);

    SFRT.registerCamera( cam );
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

    // Colours
    mat_Diffuse_Specular_Emmisive.uniforms.u_diffuseColour.value = new THREE.Color( 0.1, 0.2, 0.235 );
    mat_Diffuse_Specular_Emmisive.uniforms.u_emissionColour.value = new THREE.Color( 0.1,1.0,1.0);
    mat_Diffuse_Specular_Emmisive.uniforms.u_ambientColor.value = new THREE.Color( 25, 38, 38 );
    mat_Diffuse_Specular_Emmisive.uniforms.u_lightColor.value = new THREE.Color( 0, 0, 0);

    // Textures
    mat_Diffuse_Specular_Emmisive.uniforms.u_emissionTexture.value = mat_Diffuse_Specular_Emmisive_tex_emission;
    mat_Diffuse_Specular_Emmisive.uniforms.u_matteTexture.value = mat_Diffuse_Specular_Emmisive_tex_matte;
    mat_Diffuse_Specular_Emmisive.uniforms.u_reflectionTexture.value = mat_Diffuse_Specular_Emmisive_tex_reflection;

    // vec3
    mat_Diffuse_Specular_Emmisive.uniforms.u_lightPosition.value = new THREE.Vector3( 0.0, 0.9, 1.5 );
    mat_Diffuse_Specular_Emmisive.uniforms.u_lightStrength.value = 6.89;

    // Ambient
    mat_Diffuse_Specular_Emmisive.uniforms.u_ambientStrength.value = 0;
    mat_Diffuse_Specular_Emmisive.uniforms.u_ambientAffectedBySpec.value = 0;
    // Emission
    mat_Diffuse_Specular_Emmisive.uniforms.u_emissionStrength.value = 0.771;
    mat_Diffuse_Specular_Emmisive.uniforms.u_emissionPulseStrength.value = 0.104;
    mat_Diffuse_Specular_Emmisive.uniforms.u_emissionPulseRate.value = 17.91;
    // Specular
    mat_Diffuse_Specular_Emmisive.uniforms.u_specularPower.value = 0.11;
    mat_Diffuse_Specular_Emmisive.uniforms.u_specularFalloff.value = 1;
    mat_Diffuse_Specular_Emmisive.uniforms.u_reflectionStrength.value = 0.3;
    // Matte
    mat_Diffuse_Specular_Emmisive.uniforms.u_matteStrength.value = 0.27;

    // -----------------------------------------------  GUI

    // DIFFUSE
    gui_Diffuse_Spec_Emissive_DIFFUSE.addThreeUniformColor(mat_Diffuse_Specular_Emmisive,"u_diffuseColour", "Colour");
    // EMISSIVE
    gui_Diffuse_Spec_Emissive_EMISSIVE.addThreeUniformColor(mat_Diffuse_Specular_Emmisive,"u_emissionColour", "Colour");
    gui_Diffuse_Spec_Emissive_EMISSIVE.add(mat_Diffuse_Specular_Emmisive.uniforms.u_emissionStrength, "value").min(-1).max(3).name("Strength");
    gui_Diffuse_Spec_Emissive_EMISSIVE.add(mat_Diffuse_Specular_Emmisive.uniforms.u_emissionPulseStrength,"value").min(-1).max(1).name("PulseStrength");
    gui_Diffuse_Spec_Emissive_EMISSIVE.add(mat_Diffuse_Specular_Emmisive.uniforms.u_emissionPulseRate,"value").min(0).max(100).name("Pulse Rate");
    // AMBIENT
    gui_Diffuse_Spec_Emissive_AMBIENT.addThreeUniformColor(mat_Diffuse_Specular_Emmisive,"u_ambientColor", "Colour");
    gui_Diffuse_Spec_Emissive_AMBIENT.add(mat_Diffuse_Specular_Emmisive.uniforms.u_ambientStrength,"value").min(0).max(1).name("Strength");
    gui_Diffuse_Spec_Emissive_AMBIENT.add(mat_Diffuse_Specular_Emmisive.uniforms.u_ambientAffectedBySpec,"value").min(0).max(1).name("SpecularMute");
    // SPECULAR
    gui_Diffuse_Spec_Emissive_SPECULAR.add(mat_Diffuse_Specular_Emmisive.uniforms.u_specularPower,"value").min(0).max(1).name("Strength");
    gui_Diffuse_Spec_Emissive_SPECULAR.add(mat_Diffuse_Specular_Emmisive.uniforms.u_specularFalloff,"value").min(0).max(1).name("Falloff");
    gui_Diffuse_Spec_Emissive_SPECULAR.add(mat_Diffuse_Specular_Emmisive.uniforms.u_reflectionStrength,"value").min(0).max(1).name("ReflectStrength");
    // MATTE
    gui_Diffuse_Spec_Emissive_MATTE.add(mat_Diffuse_Specular_Emmisive.uniforms.u_matteStrength,"value").min(0).max(1).name("MatteStrength");
    // LIGHT
    gui_Diffuse_Spec_Emissive.addThreeUniformColor(mat_Diffuse_Specular_Emmisive,"u_lightColor", "LightCol");
    gui_Diffuse_Spec_Emissive.add(mat_Diffuse_Specular_Emmisive.uniforms.u_lightStrength,"value").min(0).max(10).name("lightStrength");
    gui_Diffuse_Spec_Emissive.add(mat_Diffuse_Specular_Emmisive.uniforms.u_lightPosition.value, "x").min(-3).max(3);
    gui_Diffuse_Spec_Emissive.add(mat_Diffuse_Specular_Emmisive.uniforms.u_lightPosition.value, "y").min(-3).max(3);
    gui_Diffuse_Spec_Emissive.add(mat_Diffuse_Specular_Emmisive.uniforms.u_lightPosition.value, "z").min(-3).max(3);
    gui.remember(mat_Diffuse_Specular_Emmisive.uniforms);
}
function mat_Vignette_SETUP(m){

    mat_Vignette = m;
    mat_Vignette.alphaTest = 0.5;
    mat_Vignette.transparent = true;
    mat_Vignette.side = THREE.FrontSide;
    mat_Vignette.uniforms.u_vignetteColour.value = new THREE.Color( 1.0, 0.0, 0.0 );
    mat_Vignette.uniforms.u_vignetteSpread.value = new THREE.Vector2(0.0,1.0);
    mat_Vignette.uniforms.u_vignetteBias.value = new THREE.Vector2(0.5,0.5);
    // -----------------------------------------------  GUI
    gui.remember(mat_Vignette.uniforms);
    gui_mat_Vignette.addThreeUniformColor(mat_Vignette,"u_vignetteColour", "Colour");
    gui_mat_Vignette.add(mat_Vignette.uniforms.u_vignetteSpread.value, "x", "spread_X").min(0).max(10);
    gui_mat_Vignette.add(mat_Vignette.uniforms.u_vignetteSpread.value, "y", "spread_Y").min(0).max(10);
    gui_mat_Vignette.add(mat_Vignette.uniforms.u_vignetteBias.value, "x", "bias_X").min(0).max(1);
    gui_mat_Vignette.add(mat_Vignette.uniforms.u_vignetteBias.value, "y", "bias_Y").min(0).max(1);
}

function updateShaders(){
    SFRT.updateShaders( clock.getElapsedTime() );
    if(mat_Diffuse_Specular_Emmisive){
    var scl = mat_Diffuse_Specular_Emmisive.uniforms.u_lightStrength.value;
    lightHelper.scale.set(scl,scl,scl);
    var lpos = mat_Diffuse_Specular_Emmisive.uniforms.u_lightPosition.value;
    lightHelper.position.x = lpos.x;
    lightHelper.position.y = lpos.y;
    lightHelper.position.z = lpos.z;
    }
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
