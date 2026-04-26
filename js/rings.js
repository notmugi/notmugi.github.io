(function() {
  // Random spin speeds for the name model
  var nameSpeedY = (Math.random() * (0.008 - 0.00075) + 0.005) * 4;
  var nameSpeedX = (Math.random() * (0.005 - 0.00075) + 0.005) * 4;

  // Randomize name rotation type:
  // 1 in 10 chance: rotates on both Y and X
  // Otherwise: 50/50 chance of Y-only or X-only
  var spinType = Math.random() < 0.1 ? 'both' : (Math.random() < 0.5 ? 'y' : 'x');

  // Renderer setup
  var renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
  renderer.setClearColor(0x000000, 0);
  // Pixel ratio scales from 0.5 (large screens) to 1.0 (small screens)
  function getPixelRatio() {
    var w = window.innerWidth;
    if (w >= 1200) return 0.5;
    if (w <= 480) return 1.0;
    return 0.5 + 0.5 * (1 - (w - 480) / (1200 - 480));
  }
  renderer.setPixelRatio(getPixelRatio());
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = 'fixed';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.pointerEvents = 'none';
  renderer.domElement.style.opacity = '0';
  renderer.domElement.style.transition = 'opacity 1.5s ease-in';
  document.body.appendChild(renderer.domElement);

  // Fade in the canvas after a brief delay
  setTimeout(function() {
    renderer.domElement.style.opacity = '1';
  }, 100);

  var scene = new THREE.Scene();

  // Dynamic FOV — wider on portrait/mobile screens
  function getFOV() {
    var aspect = window.innerWidth / window.innerHeight;
    return aspect < 1 ? 50 / aspect : 50;
  }

  var camera = new THREE.PerspectiveCamera(getFOV(), window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);

  //ambient light
  scene.add(new THREE.AmbientLight(0xffffff, 0.96));

  // shadows
  var shadowLight = new THREE.DirectionalLight(0xffffff, 0.04);
  shadowLight.position.set(2, 3, 5);
  shadowLight.castShadow = true;
  shadowLight.shadow.mapSize.width = 1024;
  shadowLight.shadow.mapSize.height = 1024;
  shadowLight.shadow.camera.near = 0.1;
  shadowLight.shadow.camera.far = 20;
  shadowLight.shadow.camera.left = -4;
  shadowLight.shadow.camera.right = 4;
  shadowLight.shadow.camera.top = 4;
  shadowLight.shadow.camera.bottom = -4;
  scene.add(shadowLight);

  // Directional lights for metallic name reflections
  var frontLight = new THREE.DirectionalLight(0xffffff, 0.015);
  frontLight.position.set(0, 0, 5);
  scene.add(frontLight);

  var topLight = new THREE.DirectionalLight(0xffffff, 0.01);
  topLight.position.set(0, 5, 2);
  scene.add(topLight);

  var loader = new THREE.GLTFLoader();

  // === RINGS ===
  var rings = [];
  var ringScales = [0.7, 0.86, 1.02, 1.17, 1.33];

  function randRingSpeed() {
    return (Math.random() - 0.5) * 0.016; // adjusted for 15fps
  }

  for (var i = 0; i < 5; i++) {
    (function(index) {
      var ringGroup = new THREE.Group();
      var s = ringScales[index];
      ringGroup.scale.set(s, s, s);
      ringGroup.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      var loaded = 0;

      // Solid white fill — casts & receives ring shadows
      loader.load("js/ring.gltf", function(gltf) {
        gltf.scene.traverse(function(node) {
          if (!node.isMesh) return;
          node.material = new THREE.MeshLambertMaterial({ color: 0xffffff });
          node.castShadow = true;
          node.receiveShadow = true;
        });
        ringGroup.add(gltf.scene);
        if (++loaded === 2) finishRing();
      });

      // Wireframe outline
      loader.load("js/ringoutline.gltf", function(gltf) {
        gltf.scene.traverse(function(node) {
          if (!node.isMesh) return;
          node.material = new THREE.MeshBasicMaterial({ color: 0xdddddd, wireframe: true });
        });
        ringGroup.add(gltf.scene);
        if (++loaded === 2) finishRing();
      });

      function finishRing() {
        scene.add(ringGroup);
        rings.push({
          mesh: ringGroup,
          speedX: randRingSpeed(),
          speedY: randRingSpeed(),
          speedZ: randRingSpeed()
        });
      }
    })(i);
  }

  // === NAME MODEL ===
  var nameGroupY = new THREE.Group();
  var nameGroupX = new THREE.Group();
  nameGroupY.add(nameGroupX);
  scene.add(nameGroupY);

  loader.load("js/new.gltf", function(gltf) {
    gltf.scene.traverse(function(node) {
      if (!node.isMesh) return;
      // Metallic gold wireframe
      node.material = new THREE.MeshStandardMaterial({
        color: 0xFFD700,
        metalness: 1.0,
        roughness: 0.2,
        wireframe: true
      });
    });
    gltf.scene.scale.set(0.81, 0.81, 0.81);
    nameGroupX.add(gltf.scene);
  });

  // Animation loop at 15fps
  var lastUpdate = 0;
  var frameInterval = 1000 / 15;

  function animate(now) {
    requestAnimationFrame(animate);
    if (now - lastUpdate < frameInterval) return;
    lastUpdate = now;

    for (var i = 0; i < rings.length; i++) {
      rings[i].mesh.rotation.x += rings[i].speedX;
      rings[i].mesh.rotation.y += rings[i].speedY;
      rings[i].mesh.rotation.z += rings[i].speedZ;
    }

    if (spinType === 'y' || spinType === 'both') nameGroupY.rotation.y -= nameSpeedY;
    if (spinType === 'x' || spinType === 'both') nameGroupX.rotation.x -= nameSpeedX;

    renderer.render(scene, camera);
  }
  requestAnimationFrame(animate);

  // Resize handler
  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.fov = getFOV();
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(getPixelRatio());
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();
