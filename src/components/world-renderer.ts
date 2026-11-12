import {
  Mesh,
  NearestFilter,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from "three";
import { createWorldMotionMask } from "./world-motion-mask";

export type LightingMode = "auto" | "day" | "night";
export type WorldOptions = { paused: boolean; mode: LightingMode };
const LIGHTING_TRANSITION_SECONDS = 4.8;

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uDay;
  uniform sampler2D uNight;
  uniform sampler2D uMotionMask;
  uniform vec2 uResolution;
  uniform vec2 uCover;
  uniform float uVisibleWidth;
  uniform float uTime;
  uniform float uNightMix;
  uniform float uMoving;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float flameTongue(vec2 p, float center, float width, float height, float phase, float time) {
    float tip = clamp(p.y / height, 0.0, 1.0);
    float bend = sin(time * 7.0 - p.y * 0.22 + phase) * tip * 1.6;
    return step(0.0, p.y) * (1.0 - step(height, p.y))
      * (1.0 - step(width * (1.0 - tip) + 0.5, abs(p.x - center - bend)));
  }

  void main() {
    // Match object-fit: cover. All movement masks use original artwork coordinates.
    vec2 originalUv = (vUv - 0.5) * uCover + 0.5;
    vec3 original = texture2D(uDay, originalUv).rgb;
    float time = uTime * uMoving;
    vec2 regions = texture2D(uMotionMask, originalUv).rg;
    // Color can remove gaps between needles, but can NEVER select outside the outlines.
    float needles = smoothstep(0.012, 0.055, original.g - original.r);
    float canopy = regions.r * needles;
    float gust = 0.75 + 0.25 * sin(time * 0.65 - originalUv.x * 4.0);
    float sway = sin(time * 1.65 + originalUv.y * 5.0);
    float flutter = sin(time * 3.8 - originalUv.y * 26.0);
    // Sampling exactly on a nearest-filter texel boundary can alternate between
    // columns at fractional viewport scales. Anchor static terrain at texel
    // centers; only the explicitly masked canopies use animated coordinates.
    vec2 artSize = vec2(1536.0, 1024.0);
    vec2 windUv = (floor(originalUv * artSize + 0.001) + 0.5) / artSize;
    if (canopy > 0.001) {
      windUv = originalUv;
      windUv.x += uMoving * canopy * gust * (sway * 0.0022 + flutter * 0.0007);
      windUv.y += uMoving * canopy * sin(time * 2.1) * 0.0004;
    }
    // Water changes brightness inside its traced channel; its UVs never move.
    float water = regions.g * smoothstep(0.03, 0.18, original.b - original.r * 0.75);

    vec3 day = texture2D(uDay, clamp(windUv, 0.002, 0.998)).rgb;
    vec3 night = texture2D(uNight, clamp(windUv, 0.002, 0.998)).rgb;
    float nightBlend = smoothstep(0.12, 0.94, uNightMix);
    vec3 color = mix(day, night, nightBlend);
    float twilight = sin(uNightMix * 3.14159265);
    float openSky = smoothstep(0.52, 0.76, originalUv.y)
      * smoothstep(0.10, 0.25, originalUv.x)
      * (1.0 - smoothstep(0.78, 0.92, originalUv.x));
    // Golden-hour light gives way to a peach horizon and violet upper sky before blue night.
    vec3 duskSky = mix(vec3(0.65, 0.23, 0.095), vec3(0.10, 0.055, 0.23),
      smoothstep(0.48, 1.0, originalUv.y));
    color = mix(color, color * vec3(1.14, 0.84, 0.78), twilight * 0.45);
    color = mix(color, duskSky, twilight * openSky * 0.62);
    float horizonGlow = exp(-pow((originalUv.y - 0.61) / 0.19, 2.0));
    color += vec3(0.12, 0.035, 0.005) * horizonGlow * openSky * twilight;

    // Pixel-quantized celestial bodies, placed in the open sky beside the headline.
    vec2 skyUv = floor(vUv * uResolution / 3.0) * 3.0 / uResolution;
    float aspect = uResolution.x / uResolution.y;
    float moonVisibility = smoothstep(0.57, 0.96, uNightMix);
    float moonAltitude = mix(0.63, 0.83, smoothstep(0.35, 1.0, uNightMix));
    vec2 moonPoint = (skyUv - vec2(0.5 + 0.34 * uVisibleWidth, moonAltitude)) * vec2(aspect, 1.0);
    float moonDisc = 1.0 - step(0.021, length(moonPoint));
    float moonCut = 1.0 - step(0.019, length(moonPoint - vec2(0.012, 0.007)));
    float moon = max(0.0, moonDisc - moonCut) * moonVisibility;
    color = mix(color, vec3(0.89, 0.92, 0.70), moon);
    float moonGlow = exp(-length(moonPoint) * 44.0) * moonVisibility * 0.035;
    color += vec3(0.28, 0.42, 0.73) * moonGlow;
    float sunAltitude = mix(0.82, 0.49, smoothstep(0.0, 0.65, uNightMix));
    vec2 sunPoint = (skyUv - vec2(0.5 - 0.35 * uVisibleWidth, sunAltitude)) * vec2(aspect, 1.0);
    float sun = (1.0 - step(0.018, length(sunPoint))) * (1.0 - smoothstep(0.28, 0.65, uNightMix));
    color = mix(color, vec3(1.0, 0.79, 0.36), sun * 0.85);

    // Stars only show above the mountain skyline. Their brightness gently twinkles.
    vec2 starGrid = vec2(92.0 * aspect, 92.0);
    vec2 starCell = floor(vUv * starGrid);
    float random = hash(starCell);
    vec2 cellUv = fract(vUv * starGrid);
    float star = step(0.982, random) * step(0.8, cellUv.x) * step(0.8, cellUv.y);
    float starSky = smoothstep(0.66, 0.76, originalUv.y)
      * smoothstep(0.16, 0.30, originalUv.x)
      * (1.0 - smoothstep(0.74, 0.86, originalUv.x));
    color += vec3(0.68, 0.81, 0.93) * star * starSky * smoothstep(0.65, 0.98, uNightMix)
      * (0.4 + 0.6 * sin(time * 1.7 + random * 42.0) * sin(time * 1.7 + random * 42.0));

    // Water reflections and the campsite lantern respond to the time of day.
    float sparkle = pow(max(0.0, sin(originalUv.y * 300.0 + time * 2.4)), 16.0);
    color += vec3(0.15, 0.25, 0.27) * sparkle * water * uMoving * 0.055;
    vec2 lampPoint = (originalUv - vec2(1356.0 / 1536.0, 1.0 - 653.0 / 1024.0)) * vec2(1.5, 1.0);
    float lampGlow = pow(max(0.0, 1.0 - length(lampPoint) * 60.0), 2.0)
      * smoothstep(0.4, 0.92, uNightMix);
    color += vec3(0.75, 0.23, 0.035) * lampGlow * (0.15 + 0.025 * sin(time * 9.0));

    // Source-pixel coordinates keep flames attached to the actual logs at every aspect ratio.
    vec2 artPixel = floor(vec2(originalUv.x * 1536.0, (1.0 - originalUv.y) * 1024.0)) + 0.5;
    vec2 firePoint = (artPixel - vec2(1395.0, 714.0)) * vec2(1.0, -1.0);
    if (length(firePoint) < 78.0) {
      float burnTime = floor(time * 14.0) / 14.0;
      float flicker = 0.82 + 0.12 * sin(burnTime * 11.0) + 0.06 * sin(burnTime * 19.0);
      float glow = pow(max(0.0, 1.0 - length(firePoint / vec2(35.0, 29.0))), 2.0);
      color += vec3(0.68, 0.16, 0.012) * glow * flicker * mix(0.09, 0.24, uNightMix);
      float tall = 32.0 + sin(burnTime * 8.0) * 3.0;
      float outer = max(flameTongue(firePoint, 0.0, 4.5, tall, 0.0, burnTime),
        max(flameTongue(firePoint, -4.0, 3.2, 19.0 + sin(burnTime * 9.0) * 3.0, 1.0, burnTime),
            flameTongue(firePoint, 4.0, 3.0, 22.0 + sin(burnTime * 7.0) * 3.0, 3.0, burnTime)));
      float yellow = max(flameTongue(firePoint, 0.0, 3.0, tall * 0.76, 0.5, burnTime),
        flameTongue(firePoint, -3.0, 2.0, 15.0, 2.0, burnTime));
      float core = flameTongue(firePoint, 0.5, 2.0, 12.0 + sin(burnTime * 10.0) * 2.0, 1.0, burnTime);
      vec3 flameColor = mix(vec3(1.0, 0.15, 0.006), vec3(1.0, 0.65, 0.06), yellow);
      flameColor = mix(flameColor, vec3(1.0, 0.96, 0.53), core);
      color = mix(color, flameColor, outer);
      for (int i = 0; i < 6; i++) {
        float seed = float(i);
        float life = fract(burnTime * (0.25 + seed * 0.023) + seed * 0.173);
        vec2 ember = vec2(sin(seed * 2.1 + life * 5.0) * (3.0 + life * 7.0), 18.0 + life * 44.0);
        float spark = (1.0 - step(0.85, abs(firePoint.x - ember.x)))
          * (1.0 - step(1.1, abs(firePoint.y - ember.y))) * (1.0 - life);
        color += vec3(0.95, 0.32, 0.035) * spark;
      }
    }
    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`;

export async function createWorldRenderer(
  canvas: HTMLCanvasElement,
  initialOptions: WorldOptions,
  onUpdate: (night: number, time: number) => void,
) {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(1);
  renderer.outputColorSpace = SRGBColorSpace;
  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const loader = new TextureLoader();
  let day;
  let night;
  try {
    [day, night] = await Promise.all([
      loader.loadAsync("/art/adventure-valley.webp"),
      loader.loadAsync("/art/adventure-valley-night.webp"),
    ]);
  } catch (error) {
    renderer.dispose();
    throw error;
  }
  for (const texture of [day, night]) {
    texture.colorSpace = SRGBColorSpace;
    texture.minFilter = NearestFilter;
    texture.magFilter = NearestFilter;
    texture.generateMipmaps = false;
  }
  const uniforms = {
    uMotionMask: { value: createWorldMotionMask() },
    uDay: { value: day },
    uNight: { value: night },
    uResolution: { value: new Vector2(1, 1) },
    uCover: { value: new Vector2(1, 1) },
    uVisibleWidth: { value: 1 },
    uTime: { value: 0 },
    uNightMix: { value: initialOptions.mode === "night" ? 1 : 0 },
    uMoving: { value: 1 },
  };
  const geometry = new PlaneGeometry(2, 2);
  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
  });
  scene.add(new Mesh(geometry, material));
  let options = initialOptions;
  let frame = 0;
  let disposed = false;
  let visible = true;
  let elapsed = 0;
  let previous = performance.now();
  let lastRender = 0;
  let lighting = uniforms.uNightMix.value;
  let autoOffset = 0;
  let manualTransition = false;
  let transitionFrom = lighting;
  let transitionElapsed = 0;
  let allowPausedTransition = false;
  let forceRender = true;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const motionChanged = () => {
    forceRender = true;
  };
  reducedMotion.addEventListener("change", motionChanged);

  const resize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;
    // The pixel artwork stays crisp at a modest render resolution, including on mobile.
    const scale = Math.min(0.75, 1100 / width);
    renderer.setSize(
      Math.round(width * scale),
      Math.round(height * scale),
      false,
    );
    uniforms.uResolution.value.set(width, height);
    uniforms.uVisibleWidth.value = Math.min(1, window.innerWidth / width);
    const imageAspect = day.image.width / day.image.height;
    const screenAspect = width / height;
    uniforms.uCover.value.set(
      Math.min(1, screenAspect / imageAspect),
      Math.min(1, imageAspect / screenAspect),
    );
    renderer.render(scene, camera);
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();

  const render = (now: number) => {
    if (disposed) return;
    const delta = Math.min((now - previous) / 1000, 0.08);
    previous = now;
    const moving =
      !options.paused && !reducedMotion.matches && visible && !document.hidden;
    const changingLighting =
      manualTransition && (!options.paused || allowPausedTransition);
    if (moving) elapsed += delta;
    if (
      now - lastRender >= 42 &&
      visible &&
      !document.hidden &&
      (moving || changingLighting || forceRender)
    ) {
      const renderDelta = Math.min((now - lastRender) / 1000, 0.25);
      lastRender = now;
      // 36 seconds: daylight, golden hour, night, dawn, and daylight again.
      const cycle = (elapsed + autoOffset) % 36;
      const smooth = (value: number) => {
        const x = Math.max(0, Math.min(1, value));
        return x * x * x * (x * (x * 6 - 15) + 10);
      };
      let target = options.mode === "night" ? 1 : 0;
      if (options.mode === "auto" && !reducedMotion.matches)
        target = smooth((cycle - 5) / 8) * (1 - smooth((cycle - 23) / 10));
      // Explicit lighting controls remain usable with reduced motion and while paused.
      if (changingLighting) {
        transitionElapsed += renderDelta;
        const progress = reducedMotion.matches
          ? 1
          : Math.min(1, transitionElapsed / LIGHTING_TRANSITION_SECONDS);
        lighting =
          transitionFrom + (target - transitionFrom) * smooth(progress);
        if (progress === 1) {
          lighting = target;
          manualTransition = false;
        }
      } else if (moving) {
        lighting = target;
      }
      uniforms.uTime.value = elapsed;
      uniforms.uNightMix.value = lighting;
      uniforms.uMoving.value = reducedMotion.matches ? 0 : 1;
      renderer.render(scene, camera);
      onUpdate(lighting, elapsed);
      forceRender = false;
    }
    frame = requestAnimationFrame(render);
  };
  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
    },
    { rootMargin: "50px" },
  );
  observer.observe(canvas);
  frame = requestAnimationFrame(render);

  return {
    setOptions(next: WorldOptions) {
      if (next.paused && !options.paused) allowPausedTransition = false;
      if (next.mode !== options.mode) {
        manualTransition = true;
        transitionFrom = lighting;
        transitionElapsed = 0;
        allowPausedTransition = next.paused;
      }
      if (next.mode === "auto" && options.mode !== "auto")
        autoOffset = lighting > 0.5 ? 15 - elapsed : -elapsed;
      options = next;
      forceRender = true;
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      reducedMotion.removeEventListener("change", motionChanged);
      geometry.dispose();
      material.dispose();
      day.dispose();
      night.dispose();
      uniforms.uMotionMask.value.dispose();
      renderer.dispose();
    },
  };
}
