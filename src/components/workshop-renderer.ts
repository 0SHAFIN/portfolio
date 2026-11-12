import {
  CanvasTexture,
  Mesh,
  NearestFilter,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  TextureLoader,
  Vector4,
  WebGLRenderer,
} from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uSurface;
  uniform sampler2D uRegions;
  uniform sampler2D uByte;
  uniform vec4 uArtRect;
  uniform vec4 uByteRect;
  uniform float uTime;
  uniform float uMotion;
  uniform float uMobile;
  varying vec2 vUv;

  float box(vec2 p, vec2 a, vec2 b) {
    return step(a.x, p.x) * step(a.y, p.y) * step(p.x, b.x) * step(p.y, b.y);
  }
  float softBox(vec2 p, vec2 a, vec2 b, float edge) {
    vec2 inside = smoothstep(a, a + edge, p) * (1.0 - smoothstep(b - edge, b, p));
    return inside.x * inside.y;
  }
  vec4 surfaceAt(vec2 p) {
    return texture2D(uSurface, vec2(p.x, 1.0 - p.y));
  }
  vec4 byteAt(vec2 p) {
    // Animate one stable pose; the crate and seedling never jump between atlas cells.
    // Stay inside the first cell, even when scarf displacement approaches its edge.
    vec2 pixel = clamp(p, vec2(0.5), vec2(626.5));
    return texture2D(uByte, vec2(pixel.x / 1254.0, 1.0 - pixel.y / 1254.0));
  }
  void main() {
    vec2 screen = vec2(vUv.x, 1.0 - vUv.y);
    vec2 art = (screen - uArtRect.xy) / uArtRect.zw;
    float time = uTime;
    vec4 color = vec4(0.0);
    if (box(art, vec2(0.0), vec2(1.0)) > 0.5) {
      vec3 regions = texture2D(uRegions, vec2(art.x, 1.0 - art.y)).rgb;
      vec4 original = surfaceAt(art);
      // Color refines the traced regions: bark, soil, roof and hills never bend.
      float green = smoothstep(0.015, 0.085, original.g - original.r * 0.88);
      float canopy = regions.r * green;
      float grass = regions.g * green;
      float gust = 0.65 + 0.35 * sin(time * 0.67);
      vec2 wind = art;
      wind.x += uMotion * canopy * gust *
        (sin(time * 1.8 + art.y * 11.0) * 0.004 + sin(time * 4.0 - art.y * 45.0) * 0.0011);
      wind.y += uMotion * canopy * sin(time * 2.2 + art.x * 15.0) * 0.0011;
      wind.x += uMotion * grass * sin(time * 2.7 + art.x * 52.0) * 0.0012;
      // The cloud mask lies entirely in the sky, clear of tree and workshop silhouettes.
      wind.x += uMotion * regions.b * sin(time * 0.12) * 0.015;
      color = surfaceAt(clamp(wind, 0.001, 0.999));
      vec2 px = art * vec2(1536.0, 930.0);
      float lantern = exp(-length((px - vec2(218.0, 632.0)) / vec2(43.0, 49.0)) * 2.8);
      float windows = softBox(px, vec2(1280.0, 725.0), vec2(1372.0, 814.0), 13.0)
        + softBox(px, vec2(1302.0, 573.0), vec2(1356.0, 644.0), 9.0);
      color.rgb += uMotion * (lantern + windows * 0.18) *
        (0.1 + 0.06 * sin(time * 3.1) + 0.025 * sin(time * 7.7)) * vec3(1.0, 0.55, 0.12);
      // Quantized smoke rises from the actual chimney mouth, in artwork coordinates.
      for (int i = 0; i < 5; i++) {
        float age = fract(time / 5.7 + float(i) / 5.0);
        vec2 center = vec2(1507.0 - age * 42.0 + sin(age * 8.0 + float(i)) * 5.0,
                           442.0 - age * 115.0);
        vec2 smokePixel = floor(px / 4.0) * 4.0;
        float puff = 1.0 - smoothstep(7.0 + age * 12.0, 13.0 + age * 18.0,
                                     length(smokePixel - center));
        float alpha = puff * sin(age * 3.14159) * (1.0 - age) * 0.38 * uMotion;
        color.rgb = mix(color.rgb, vec3(1.0, 0.92, 0.79), alpha);
      }
      color.a = mix(1.0, smoothstep(0.0, 0.24, art.y), uMobile);
    }

    vec2 local = (screen - uByteRect.xy) / uByteRect.zw;
    if (box(local, vec2(0.0), vec2(1.0)) > 0.5) {
      vec2 p = local * 627.0;
      vec2 source = p;
      // A single stable frame forms a small rig: scarf, head and hands have separate motion.
      float scarf = softBox(p, vec2(25.0, 245.0), vec2(237.0, 372.0), 16.0);
      float scarfTail = 1.0 - smoothstep(60.0, 260.0, p.x);
      source.y += uMotion * scarf * scarfTail *
        (sin(time * 3.6 - p.x * 0.031) * 9.0 + sin(time * 1.5 - p.x * 0.02) * 3.0);
      source.x += uMotion * scarf * scarfTail * sin(time * 2.4) * 2.5;
      float head = softBox(p, vec2(175.0, 15.0), vec2(525.0, 342.0), 23.0);
      float breathing = sin(time * 1.65) * 2.3;
      source.y += uMotion * head * breathing;
      source.x += uMotion * head * sin(time * 0.85) * 1.1;
      float fingers = softBox(p, vec2(319.0, 387.0), vec2(388.0, 445.0), 9.0);
      source.y += uMotion * fingers * sin(time * 11.0) * 3.2;
      vec4 robot = byteAt(clamp(source, 1.0, 625.0));
      float phase = mod(time, 5.4);
      float blink = smoothstep(4.55, 4.65, phase) * (1.0 - smoothstep(4.77, 4.88, phase));
      float leftEye = box(source, vec2(356.0, 216.0), vec2(403.0, 282.0));
      float rightEye = box(source, vec2(427.0, 225.0), vec2(471.0, 290.0));
      float eyeGreen = smoothstep(0.14, 0.38, robot.g - robot.r * 0.7);
      float eyeLine = 1.0 - smoothstep(2.0, 4.0, abs(source.y - 258.0));
      robot.rgb = mix(robot.rgb, mix(vec3(0.025, 0.19, 0.14), vec3(0.35, 0.85, 0.5), eyeLine),
                       uMotion * blink * max(leftEye, rightEye) * eyeGreen);
      float laptop = softBox(source, vec2(441.0, 388.0), vec2(500.0, 432.0), 7.0);
      robot.rgb += uMotion * laptop * (0.5 + 0.5 * sin(time * 3.4)) * vec3(0.11, 0.055, 0.01);
      // Straight-alpha compositing keeps the transparent sprite clean over the mobile sky fade.
      float alpha = robot.a + color.a * (1.0 - robot.a);
      color.rgb = (robot.rgb * robot.a + color.rgb * color.a * (1.0 - robot.a)) / max(alpha, 0.001);
      color.a = alpha;
    }
    gl_FragColor = color;
  }
`;

function makeRegions() {
  const canvas = document.createElement("canvas");
  canvas.width = 1536;
  canvas.height = 930;
  const context = canvas.getContext("2d")!;
  const polygon = (color: string, points: number[][]) => {
    context.fillStyle = color;
    context.beginPath();
    points.forEach(([x, y], index) => index ? context.lineTo(x, y) : context.moveTo(x, y));
    context.closePath();
    context.fill();
  };
  // Three leaf clusters, excluding trunk, lantern, hanging vines and sky.
  polygon("#ff0000", [[0,155],[80,148],[148,195],[165,260],[216,296],[225,361],[195,410],[112,406],[41,352],[0,295]]);
  polygon("#ff0000", [[158,300],[248,316],[321,369],[322,422],[375,459],[357,511],[270,524],[206,477],[148,420]]);
  polygon("#ff0000", [[310,432],[376,424],[425,462],[483,486],[528,539],[513,576],[427,581],[364,543],[326,495]]);
  polygon("#0000ff", [[0,35],[280,30],[530,80],[530,210],[280,190],[170,143],[0,145]]);
  polygon("#0000ff", [[850,30],[1536,30],[1536,335],[1350,327],[1090,255],[850,180]]);
  context.fillStyle = "#00ff00";
  context.fillRect(0, 899, 1536, 18);
  const texture = new CanvasTexture(canvas);
  texture.minFilter = texture.magFilter = NearestFilter;
  return texture;
}

export async function createWorkshopRenderer(
  canvas: HTMLCanvasElement,
  paused: boolean,
  onUpdate: (time: number) => void,
) {
  const root = canvas.closest<HTMLElement>(".finale-world")!;
  const art = root.querySelector<HTMLElement>(".finale-surface-art")!;
  const player = root.querySelector<HTMLElement>(".finale-player")!;
  const loader = new TextureLoader();
  const loaded = await Promise.allSettled([
    loader.loadAsync("/art/footer-workshop-surface.webp"),
    loader.loadAsync("/art/byte-workshop-idle.webp"),
  ]);
  if (loaded[0].status !== "fulfilled" || loaded[1].status !== "fulfilled") {
    loaded.forEach((result) => { if (result.status === "fulfilled") result.value.dispose(); });
    throw new Error("Workshop artwork could not load");
  }
  const surface = loaded[0].value;
  const byte = loaded[1].value;
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
  } catch (error) {
    surface.dispose();
    byte.dispose();
    throw error;
  }
  surface.minFilter = surface.magFilter = byte.minFilter = byte.magFilter = NearestFilter;
  surface.generateMipmaps = byte.generateMipmaps = false;
  renderer.setPixelRatio(1);
  const regions = makeRegions();
  const uniforms = {
    uSurface: { value: surface },
    uRegions: { value: regions },
    uByte: { value: byte },
    uArtRect: { value: new Vector4() },
    uByteRect: { value: new Vector4() },
    uTime: { value: 0 },
    uMotion: { value: 1 },
    uMobile: { value: 0 },
  };
  const scene = new Scene();
  const geometry = new PlaneGeometry(2, 2);
  const material = new ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true });
  scene.add(new Mesh(geometry, material));
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const mobile = matchMedia("(max-width: 700px)");
  let stopped = paused;
  let visible = false;
  let disposed = false;
  let frame = 0;
  let elapsed = 0;
  let previous = performance.now();
  let lastDraw = 0;
  const moving = () => visible && !document.hidden && !stopped && !reduced.matches;
  const draw = () => {
    uniforms.uTime.value = elapsed;
    uniforms.uMotion.value = reduced.matches ? 0 : 1;
    renderer.render(scene, camera);
    onUpdate(elapsed);
  };
  const tick = (now: number) => {
    frame = 0;
    if (disposed || !moving()) return;
    elapsed += Math.min((now - previous) / 1000, 0.08);
    previous = now;
    if (now - lastDraw >= 1000 / 24) {
      lastDraw = now;
      draw();
    }
    frame = requestAnimationFrame(tick);
  };
  const sync = () => {
    if (disposed) return;
    cancelAnimationFrame(frame);
    frame = 0;
    previous = performance.now();
    if (visible && !document.hidden) draw();
    if (moving()) frame = requestAnimationFrame(tick);
  };
  const resize = () => {
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const scale = Math.min(1, 1200 / bounds.width);
    renderer.setSize(Math.round(bounds.width * scale), Math.round(bounds.height * scale), false);
    const rect = (element: HTMLElement, value: Vector4) => {
      const box = element.getBoundingClientRect();
      value.set((box.left - bounds.left) / bounds.width, (box.top - bounds.top) / bounds.height,
        box.width / bounds.width, box.height / bounds.height);
    };
    rect(art, uniforms.uArtRect.value);
    rect(player, uniforms.uByteRect.value);
    uniforms.uMobile.value = mobile.matches ? 1 : 0;
    draw();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resizeObserver.observe(art);
  resizeObserver.observe(player);
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  intersection.observe(canvas);
  reduced.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  resize();
  return {
    setPaused(value: boolean) { stopped = value; sync(); },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      geometry.dispose();
      material.dispose();
      regions.dispose();
      surface.dispose();
      byte.dispose();
      renderer.dispose();
    },
  };
}
