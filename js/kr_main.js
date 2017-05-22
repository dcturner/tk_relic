var stats, scene, renderer, composer;
var camera, cameraControls, relic, tunnel;

if( !init() )	animate();

// init the scene
function init(){

  if( Detector.webgl ){
    renderer = new THREE.WebGLRenderer({
      antialias		: true,	// to get smoother output
      preserveDrawingBuffer	: true	// to allow screenshot
    });
    renderer.setClearColor( 0xbbbbbb );
  }else{
    Detector.addGetWebGLMessage();
    return true;
  }
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.getElementById('container').appendChild(renderer.domElement);

  // add Stats.js - https://github.com/mrdoob/stats.js
  stats = new Stats();
  stats.domElement.style.position	= 'absolute';
  stats.domElement.style.bottom	= '0px';
  document.body.appendChild( stats.domElement );

  // create a scene
  scene = new THREE.Scene();

  // put a camera in the scene
  camera	= new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set(0, 0, 500);
  scene.add(camera);

  // create a camera contol
  cameraControls	= new THREE.TrackballControls( camera , renderer.domElement);


  // transparently support window resize
  THREEx.WindowResize.bind(renderer, camera);
  // allow 'p' to make screenshot
  THREEx.Screenshot.bindKey(renderer);
  // allow 'f' to go fullscreen where this feature is supported
  if( THREEx.FullScreen.available() ){
    THREEx.FullScreen.bindKey();
    document.getElementById('inlineDoc').innerHTML	+= "- <i>f</i> for fullscreen";
  }

  // here you add your objects
  // - you will most likely replace this part by your own
  var light	= new THREE.AmbientLight( Math.random() * 0xffffff );
  scene.add( light );
  var light	= new THREE.DirectionalLight( Math.random() * 0xffffff );
  light.position.set( Math.random(), Math.random(), Math.random() ).normalize();
  scene.add( light );
  var light	= new THREE.DirectionalLight( Math.random() * 0xffffff );
  light.position.set( Math.random(), Math.random(), Math.random() ).normalize();
  scene.add( light );
  var light	= new THREE.PointLight( Math.random() * 0xffffff );
  light.position.set( Math.random()-0.5, Math.random()-0.5, Math.random()-0.5 )
        .normalize().multiplyScalar(1.2);
  scene.add( light );
  var light	= new THREE.PointLight( Math.random() * 0xffffff );
  light.position.set( Math.random()-0.5, Math.random()-0.5, Math.random()-0.5 )
        .normalize().multiplyScalar(1.2);
  scene.add( light );
}

relic = new Relic.RelicScene(Relic.config_carbon);
setupGUI();

// animation loop
function animate() {

  // loop on request animation loop
  // - it has to be at the begining of the function
  // - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
  requestAnimationFrame( animate );

if(relic && relic.ready){
  relic.update();
}

  // do the render
  render();
  stats.update();
}
var PIseconds;
// render the scene
function render() {
  // variable which is increase by Math.PI every seconds - usefull for animation
  PIseconds	= Date.now() * Math.PI;
  // update camera controls
  cameraControls.update();
  // actually render the scene
  renderer.render( scene, camera );
}
