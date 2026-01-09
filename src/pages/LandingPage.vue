<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import Navbar from '../components/Navbar.vue';
import { onMounted, ref, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const { t } = useI18n();
const canvasRef = ref<HTMLCanvasElement | null>(null);

// Three.js variables
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let sphere: THREE.Mesh;
let atmosphere: THREE.Mesh;
let stars: THREE.Points;
let ring1: THREE.Mesh;
let ring2: THREE.Mesh;
let ring3: THREE.Mesh;
let animationId: number;
let controls: OrbitControls;

const initThree = () => {
  if (!canvasRef.value) return;

  // Scene
  scene = new THREE.Scene();
  // Add subtle fog for depth
  scene.fog = new THREE.FogExp2(0x000000, 0.002);

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 2.2;
  camera.position.x = 0.5;

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;

  // Load Textures
  const textureLoader = new THREE.TextureLoader();
  // Using imported local assets would be better if configured, but for now we use the paths we downloaded to
  // Note: Vite requires assets to be in public folder or imported. Since we downloaded to src/assets, we should import them or move to public.
  // Let's try importing them first if they are in src/assets
  // However, dynamic import in TextureLoader with path string might fail in build if not handled by Vite assets.
  // Safest way for runtime loading is moving to public, OR importing them at top level.
  
  // Let's rely on Vite's URL handling by using explicit imports
  const mapTexture = textureLoader.load(new URL('../assets/earth_map.jpg', import.meta.url).href);
  const specularTexture = textureLoader.load(new URL('../assets/earth_specular.jpg', import.meta.url).href);
  const normalTexture = textureLoader.load(new URL('../assets/earth_normal.jpg', import.meta.url).href);
  const starTexture = textureLoader.load(new URL('../assets/star.png', import.meta.url).href);

  // Earth Geometry
  const geometry = new THREE.SphereGeometry(1, 64, 64);
  
  // Earth Material - Tech Style
  // We mix the realistic textures with a techy color scheme
  const material = new THREE.MeshPhongMaterial({
    map: mapTexture,
    specularMap: specularTexture,
    normalMap: normalTexture,
    color: 0xaaaaaa, // Tint it slightly to match the theme
    specular: 0x333333,
    shininess: 15,
    emissive: 0x112244, // Add deep blue emissive glow
    emissiveIntensity: 0.2 // Control the glow strength
  });

  sphere = new THREE.Mesh(geometry, material);
  
  // Adjust initial rotation to face China
  // Longitude of China is roughly 104° E.
  // In Three.js sphere UV mapping, 0 rotation usually faces the Prime Meridian (0°).
  // 104° E is roughly -1.8 radians (negative because texture wraps right-to-left or coordinate system direction)
  // Let's approximate: PI/2 is 90 deg.
  // We want to rotate Y axis.
  // Trial and error suggests roughly 4.5 - 5.0 radians for East Asia.
  sphere.rotation.y = 4.7; // Approx facing China
  sphere.rotation.x = 0.3; // Slight tilt
  
  // 1. Atmosphere Glow (Outer Glow)
  // Create a slightly larger sphere with a custom shader or simple transparent material
  const atmosphereGeo = new THREE.SphereGeometry(1.2, 64, 64);
  const atmosphereMat = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.5 - dot(vNormal, vec3(0, 0, 1.0)), 3.0);
        gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity * 2.0;
      }
    `,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true
  });
  
  atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
  scene.add(atmosphere);

  // 2. Tech Wireframe Overlay (Subtle)
  // const wireframeGeo = new THREE.WireframeGeometry(geometry);
  // ... (keep commented out)

  // 3. Rotating Tech Rings (Orbits)
  // Made subtler and closer to the planet
  const ringGeo = new THREE.TorusGeometry(1.35, 0.002, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.15 });
  
  ring1 = new THREE.Mesh(ringGeo, ringMat);
  ring1.rotation.x = Math.PI / 2;
  scene.add(ring1);

  ring2 = new THREE.Mesh(ringGeo, ringMat);
  ring2.rotation.x = Math.PI / 2;
  ring2.rotation.y = Math.PI / 8;
  ring2.scale.set(1.05, 1.05, 1.05); // Reduced scale spread
  scene.add(ring2);

  ring3 = new THREE.Mesh(ringGeo, ringMat);
  ring3.rotation.x = Math.PI / 2;
  ring3.rotation.y = -Math.PI / 8;
  ring3.scale.set(1.02, 1.02, 1.02);
  scene.add(ring3);

  scene.add(sphere);

  // Lights
  const ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
  sunLight.position.set(5, 3, 5);
  scene.add(sunLight);

  // Rim Light (Blue) for tech feel
  const rimLight = new THREE.SpotLight(0x0088ff, 5);
  rimLight.position.set(-5, 0, 2);
  rimLight.lookAt(sphere.position);
  scene.add(rimLight);

  // Stars background
  const starsGeometry = new THREE.BufferGeometry();
  const starsCount = 2000;
  const posArray = new Float32Array(starsCount * 3);
  const colorArray = new Float32Array(starsCount * 3);

  for(let i = 0; i < starsCount * 3; i+=3) {
    // Generate random position
    let x = (Math.random() - 0.5) * 25;
    let y = (Math.random() - 0.5) * 25;
    let z = (Math.random() - 0.5) * 25;

    // Check distance from center (Earth is at 0,0,0)
    // We want to avoid putting stars inside or too close to the Earth/Atmosphere
    // Earth radius is 1, Atmosphere is 1.2. Let's keep a safe zone of 3.0
    const distance = Math.sqrt(x*x + y*y + z*z);
    
    // If star is too close, push it out
    if (distance < 3.0) {
      // Normalize vector and scale to safe distance + random offset
      const scale = 3.0 + Math.random() * 10;
      x = (x / distance) * scale;
      y = (y / distance) * scale;
      z = (z / distance) * scale;
    }

    posArray[i] = x;
    posArray[i+1] = y;
    posArray[i+2] = z;
    
    // Random star colors (white to slight blue)
    // Make them slightly dimmer to be less distracting
    const brightness = 0.5 + Math.random() * 0.5;
    colorArray[i] = brightness;
    colorArray[i+1] = brightness;
    colorArray[i+2] = brightness;
  }

  starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  starsGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
  
  const starsMaterial = new THREE.PointsMaterial({
    size: 0.1, // Increased size slightly because texture makes it look smaller visually
    map: starTexture, // Use the round disc texture
    sizeAttenuation: true,
    alphaTest: 0.5, // Discard transparent pixels
    transparent: true,
    vertexColors: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);

  // Resize handler
  window.addEventListener('resize', onWindowResize);

  animate();
};

const onWindowResize = () => {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const onClick = (event: MouseEvent) => {
  // Check if click target is interactable (button/link), if so, don't ripple
  if ((event.target as HTMLElement).closest('a, button')) return;
  
  // Create a ripple effect at click position (projected to 3D space or screen space overlay)
  // For simplicity and performance, we'll use a DOM-based ripple or a screen-space sprite in Three.js
  // Let's use a DOM element for the ripple effect on the overlay div, it's easier to manage z-index
  
  const ripple = document.createElement('div');
  ripple.className = 'absolute rounded-full border border-blue-400/50 bg-blue-400/20 pointer-events-none animate-ripple';
  ripple.style.left = `${event.clientX}px`;
  ripple.style.top = `${event.clientY}px`;
  
  // Append to a container (e.g., body or the app wrapper)
  document.body.appendChild(ripple);
  
  // Remove after animation
  setTimeout(() => {
    ripple.remove();
  }, 1000);
};

const animate = () => {
  animationId = requestAnimationFrame(animate);

  if (controls) {
    controls.update();
  }
  
  if (stars) {
    stars.rotation.y -= 0.0001;
  }
  
  // Rotate rings
  // We need to access rings. Since I defined them locally in initThree, I should move them to outer scope or just query scene, 
  // but for simplicity let's make them accessible or just animate scene children if specific names? 
  // Better: define variables at top level.
  if (ring1) {
    ring1.rotation.z += 0.002;
    ring1.rotation.x = Math.PI / 2 + Math.sin(Date.now() * 0.001) * 0.1;
  }
  if (ring2) {
    ring2.rotation.z -= 0.0015;
  }
  if (ring3) {
    ring3.rotation.z += 0.001;
  }

  renderer.render(scene, camera);
};

onMounted(() => {
  initThree();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize);
  cancelAnimationFrame(animationId);
  if (renderer) {
    renderer.dispose();
  }
  if (controls) {
    controls.dispose();
  }
  window.removeEventListener('click', onClick);
});

</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white overflow-hidden flex flex-col relative">
    <!-- 3D Background -->
    <canvas ref="canvasRef" class="absolute inset-0 z-0 w-full h-full cursor-grab active:cursor-grabbing"></canvas>
    
    <!-- Gradient Overlay to ensure text readability -->
    <div class="absolute inset-0 z-0 bg-gradient-to-b from-gray-900/60 via-gray-900/30 to-gray-900/90 pointer-events-none"></div>

    <!-- Navbar -->
    <div class="relative z-10 pointer-events-none">
        <div class="pointer-events-auto">
            <Navbar />
        </div>
    </div>

    <!-- Hero Section -->
    <header class="flex-1 flex flex-col justify-center items-center relative px-8 text-center max-w-5xl mx-auto z-10 pointer-events-none">
      
      <h1 class="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 animate-fade-in-up drop-shadow-lg filter shadow-blue-500/50">
        {{ t('home.title') }}
      </h1>
      <p class="text-2xl md:text-3xl font-light text-gray-100 mb-8 animate-fade-in-up delay-100 drop-shadow-md">
        {{ t('home.subtitle') }}
      </p>
      <p class="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200 drop-shadow-sm">
        {{ t('home.description') }}
      </p>
      <div class="animate-fade-in-up delay-300 pointer-events-auto">
        <router-link to="/gallery" class="inline-block px-10 py-4 bg-blue-600 hover:bg-blue-500 rounded-full font-bold text-lg text-white transition-all transform hover:scale-105 shadow-lg shadow-blue-900/50">
          {{ t('home.getStarted') }}
        </router-link>
      </div>
    </header>

    <!-- Footer -->
    <footer class="py-8 text-center text-gray-500 text-sm relative z-10 pointer-events-none">
      <span class="pointer-events-auto">&copy; {{ new Date().getFullYear() }} Terra-GL. All rights reserved.</span>
    </footer>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
