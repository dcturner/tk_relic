Shader_ColouredNormals = {
  uniforms: {
    time: {
      type: "f",
      value: 1.0
    },
    fNormal: {
      type: "v3",
      value: new THREE.Vector3(0.0, 0.0, 0.0)
    },
    col1: {
      type: "v3",
      value: new THREE.Color(0.37, 0.411, 0.55)
    },
    col2: {
      type: "v3",
      value: new THREE.Color(0.6, 0.207, 0.317)
    },
    col3: {
      type: "v3",
      value: new THREE.Color(0.207, 0.34, 0.54)
    }
  },

  vertexShader: [
    "varying vec3 vNormal;",

    "void main() {",

    "vNormal = normal;",

    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
    "}"

  ].join("\n"),

  fragmentShader: [
    '   precision highp float;  ' +
    '   uniform float time;  ' +
    '   uniform vec2 resolution;  ' +
    '   varying vec3 fPosition;  ' +
    '		varying vec3 vNormal;' +
    '		uniform vec3 col1;' +
    '		uniform vec3 col2;' +
    '		uniform vec3 col3;' +
    '     ' +
    'vec3 luma = vec3(0.299, 0.587, 0.114);' +
    '   vec3 colorNormal()  ' +
    '   {  ' +
    '     vec3 n = normalize(vNormal);  ' +
    '     return clamp(col1*n.x + col2*n.y + col3*n.z,  ' +
    '                 vec3(0.0), vec3(1.0));  ' +
    '   }  ' +
    '     ' +
    '     ' +
    '   void main()  ' +
    '   {  ' +
    '     gl_FragColor = vec4(colorNormal(),1.0);  ' +
    '  }  '
  ].join("\n")
};


function getMaterial_colouredNormals() {
  var mat_result = new THREE.ShaderMaterial(Shader_ColouredNormals);
  //
  // mat_colouredNormals = new THREE.ShaderMaterial({
  //   name: "cnTest",
  //   uniforms: vor_uniforms,
  //   vertexShader: Shader_ColouredNormals.vertexShader,
  //   fragmentShader: Shader_ColouredNormals.fragmentShader
  // });
  return mat_result;
}
