# Original artwork and animation direction

Reference: https://www.pigeonsmission.com/ — studied for oversized playful typography, pixel game environments, contrasting section colors, hard offset shadows, and playful interaction. None of the reference’s illustrations, characters, logos, or game footage are used.

All five raster assets below were generated with the built-in `image_gen` tool. Original PNGs are retained in `design/source-art/`; the site uses optimized WebP versions in `public/art/`. The robot and run sheet retain genuine alpha transparency. The SVG cloud and pixel interface symbols are original code-native vector graphics.

## Adventure valley

- Source: `design/source-art/adventure-valley.png`
- Production: `public/art/adventure-valley.webp`
- Use: stationary full-bleed hero background with independent cloud layers and floating canvas particles. No scroll transform is applied to the landscape; scenery is clipped inside the hero.

Final generation prompt:

> Use case: stylized-concept. Asset type: original pixel-art landscape background for a software engineer's adventure-themed portfolio website. Create a stunning panoramic 16:9 pixel art landscape of a peaceful emerald forest valley in a classic 16-bit indie platformer game, bright muted teal and mint sky, distant desaturated turquoise mountains, large dramatic rocky cliffs framing the far left and far right, very tall lush deep forest green pine trees on the edges, warm golden cream sunlight, mossy grassy floating land islands and stepping platforms near the lower corners, little wildflowers, tiny warm orange mushrooms, a winding turquoise river in the middle distance. The upper 65% of the center must be very open pale mint sky and distant soft mountains providing NEGATIVE SPACE for large black webpage headline, no large objects in center. Bottom 25% is richly detailed layered grass platforms, ferns and a peaceful tiny wooden adventure camp at the far right. Center foreground open grassy path. Colors: pale mint #c0dfbc, teal #6da69a, dark forest green #143f38, olive #719953, warm cream #f2e8b2 and orange #ec733f. Crisp sophisticated authentic pixel artwork with visible square pixels, careful limited color ramps, dithered shading, evocative environment design, absolutely NOT smooth vector art or 3D rendering. No text, no letters, no logos, no UI, no characters, no watermark. Make it original, beautifully composed, production quality. Output wide landscape 1536x1024 or wide aspect.

## Byte the explorer

- Source: `design/source-art/byte-explorer.png`
- Production: `public/art/byte-explorer.webp`
- Use: animated player-card portrait in the biography section. An SVG rig reuses this one image: a mask isolates the far scarf tail for independent wind motion, the body breathes with its feet anchored, eyelids blink over the original screen, and the antenna glows. The SVG pauses offscreen, in hidden tabs, with global Pause, and for reduced motion. Three original code-native Byte face icons (happy, wink, curious) replace the marquee stars and extend the existing pixel brand mark. The hero uses the run sheet described below.

Final generation prompt (transparent background enabled):

> Use case: stylized-concept. Asset type: original transparent sprite character for an emerald pixel-art adventure portfolio website. One single adorable small explorer robot, full body, three quarter view facing right. Authentic 32-bit retro game pixel art, crisp square chunky pixels, deliberate block silhouettes, NO smooth outlines, NO vector, NO 3D render. Boxy ivory cream robot head with very dark green monitor face, two friendly mint green square eyes, a tiny orange antenna on top, deep teal scarf flowing to left, short cream and slate body, terracotta orange small backpack, stubby articulated arms and brown boots, carrying a little laptop tucked to side. Adventurous and friendly, standing with one foot slightly raised as if exploring. High quality hand crafted indie game character sprite. Full character occupies central 75% of a square image, visible pixel size fairly large, limited 16-color palette matching mint and dark forest environment. Absolutely transparent background with alpha, isolated character, NO ground, NO shadow ellipse, NO text, NO borders, NO extra poses or duplicate characters. Original design.

## Project worlds

- Source: `design/source-art/project-worlds.png`
- Production: `public/art/project-worlds.webp`
- Archived first version: three illustrations in a shared triptych. The live work and journey cards now use six independent illustrations; their prompts and saved paths are in [card-and-journey-art.md](card-and-journey-art.md). The original export is retained for design history.

Final generation prompt:

> Use case: stylized-concept. Asset type: three original pixel art project card illustrations in a single wide triptych image. Make a WIDE landscape image divided into THREE EXACTLY EQUAL WIDTH vertical panels, no gutters and no border. Each panel an independent beautiful 16-bit indie platformer environment, all sharing crisp square pixels and sophisticated meticulous small pixel details. Left third: warm green emerald grassy floating island with a charming tiny terracotta-roof toy shop, little toy racecar parked outside, mushrooms and cream clouds, mint green sky, cozy and playful. Middle third: pastel warm orange and peach sky, glowing futuristic magical floating violet crystal tower with a little purple portal and floating islands with plants, a sense of invention, lavender and terracotta contrast. Right third: moody dark teal and navy coastal scene, luxurious contemporary white mediterranean villa on rocky island overlooking turquoise ocean, warm golden windows and small cypress trees, stars and crescent moon. Each panel's focal subject fits completely within its OWN third. Flat side view videogame perspective, layered parallax backgrounds, plenty of environmental detail and perfectly coherent handmade pixel game artwork. No text, no letters, no logos, no watermarks, no UI, no labels, no numbers. Original artwork.

## Motion behavior

GSAP contexts and ScrollTrigger instances are reverted on cleanup. Continuous CSS animations, run frames, and canvas particles stop when paused. The Three.js renderer freezes its animation clock and lighting transitions, respects system reduced motion, and stops drawing when the hero is offscreen or the tab is hidden. Its texture, geometry, material, observers, and renderer resources are disposed on unmount. System reduced motion disables automatic lighting changes, animation, smooth scrolling, and decorative particles; manual Day and Night selection stays available and updates immediately. Music is synthesized locally with Web Audio only after a visitor explicitly enables sound.

## Illustrated chapters and shared finale

The toolkit uses three original code-native pixel SVG illustrations: a CRT workstation, a server stack, and a toolbox. Mint, lavender, and peach cards sit on a dark purple grid with cream and gold headings, following the reference site's character lineup composition. The selected card opens its real skill inventory. Work and journey cards have separate original illustrations. The journey retains its rose background and cream postcard cards, with scroll-driven Byte travel, a filling trail, and subtle parallax in each card's image. Artwork and motion details are in [card-and-journey-art.md](card-and-journey-art.md).

The contact CTA and footer use a dedicated above/below-ground cross-section: an original sunset workshop meadow at the surface, a seated Byte using a laptop, and a separate exposed-earth illustration below the grass line. A dedicated shader animates traced foliage, grass tips, clouds, chimney smoke, workshop lights, and separate character regions for breathing, blinking, typing, and scarf motion. Underground crystals twinkle and root drops fall. It pauses globally, offscreen, and in hidden tabs and respects reduced motion. These three imagegen assets, their saved paths, complete prompts, and motion details are documented in [footer-art.md](footer-art.md).

## Byte run cycle — hero revision

- Source: `design/source-art/byte-run-cycle.png`
- Original export: `public/art/byte-run-cycle.webp` (1774 × 887).
- Production: `public/art/byte-run-cycle-isolated.webp` (2048 × 1024, four columns by two rows, eight 512px cells).
- Packing: `node scripts/pack-byte-sprites.mjs` isolates the eight connected characters from the original PNG and adds transparent gutters. Some generated poses extend past the original fractional 443.5px grid; cutting directly on that grid showed detached pieces of a neighboring character beside the scarf. The packed sheet preserves each full pose, removes neighboring fragments, and uses integer cell boundaries. Hero and journey sprites share it with repeating disabled. Their image layers compensate for the padding to preserve the visible size and body anchor. The original artwork stays unchanged.
- Use: eight discrete full-character running poses at ten frames per second. Each frame includes a different scarf silhouette and leg pose. The artwork is shifted left to place the robot’s body, approximately 70% across each sprite cell, at the viewport center. The character runs in place, including during hover and focus. Ground shadow and dust animate independently. Click, Enter, or Space makes the sprite jump while its hit area stays still. One speech bubble appears per click, cycling through eight lines and five combinations of position and animation before repeating.
- Reference: the original `byte-explorer.png`, inspected before editing.

Final generation prompt (built-in tool; transparent background enabled):

> Edit/reference task: use the attached original robot character as the character identity reference. Create a professionally aligned 8-FRAME RUN CYCLE SPRITE SHEET for this SAME robot, not a collage or concept sheet. Layout mandatory: exactly 4 columns by 2 rows, 8 equal-sized cells, a 2:1 wide overall canvas with square cells. Invisible grid, no cell borders. Character faces RIGHT in all 8 frames, always the same exact head, body size, palette and accessories. Cream box monitor head, dark forest green face, mint square eyes, orange antenna, dark teal scarf, terracotta backpack, little brown boots. Smaller simplified authentic crisp 16-bit pixel art version of reference, not blurry or smooth. Each character fills about 75% cell height and 75% cell width, same head location and fixed ground baseline at 90% down each cell. The 8 frames are a seamless run cycle read left-to-right, top row then bottom row: 1 right foot forward left foot back, 2 down/compression, 3 left leg passing under torso, 4 airborne left knee forward, 5 left foot forward right foot back, 6 down/compression opposite, 7 right leg passing under torso, 8 airborne right knee forward. Arms counter-swing with legs, torso leans forward, head stable with slight vertical bob. Most important: feet visibly move and legs change positions from frame to frame. His LONG TEAL SCARF must stream behind him to the LEFT and ripple in a different wave in every frame, cloth fluttering dynamically with a split tail. Show full scarf without clipping each cell. Transparent alpha background for every cell. No ground, no cast shadows, no text, no numbers, no labels, no extra objects. Exact same character every frame. 4-by-2 sheet. Original game-ready pixel animation asset.

## Moonlit valley — hero revision

- Source: `design/source-art/adventure-valley-night.png`
- Production: `public/art/adventure-valley-night.webp`
- Dimensions: 1536 × 1024, matching the day landscape.
- Use: night texture crossfades with the day texture over a 36-second repeating cycle. Automatic sunset lasts eight seconds, followed by night and a ten-second dawn. Manual lighting transitions take 4.8 seconds with smooth acceleration and deceleration. Warm peach and violet sky grading, a setting sun, a rising moon, progressively appearing stars, and campsite lights make the transition gradual. Both textures share the same original coordinates. Explicit canopy outlines in `src/components/world-motion-mask.ts` permit motion only in named foreground trees; mountains, cliffs, ground, and water geometry remain stationary. Water highlights are confined to a separately traced river channel. The headline and navigation switch contrast at dusk so their colors do not fade into the sky.

The campfire is rendered procedurally in source-image pixel coordinates at `(1395, 714)`. Three independently changing flame tongues, a yellow core, rising embers, and a localized flickering glow animate on the original logs. These effects use the same scene clock as the tree motion and stop with Pause or reduced motion. No original raster artwork was modified for this correction.

- Reference: the original `adventure-valley.png`, inspected before editing.

Final generation prompt (built-in tool):

> Use case: lighting-weather. Edit the attached original pixel-art landscape to create its EXACT MATCHING NIGHT-TIME version for a day-night animation crossfade. CRITICAL INVARIANTS: preserve every single tree, cliff, mountain, river, path, tent, flower, waterfall, shape, horizon, pixel location, framing, perspective and EXACT 1536x1024 canvas dimensions of the input. The geometry must align pixel-for-pixel with the original. Change ONLY LIGHTING AND COLORS to a beautiful deep blue-indigo moonlit night. Upper empty sky is deep navy #101b39 with subtle lighter blue glow toward the distant horizon, NO large new moon or sun (will be animated separately), very subtle tiny stars in the upper 40% only. Deep teal silhouetted pines, desaturated blue rocky cliffs, pale cyan moonlight on mountain peaks and flowing waterfalls, beautiful rich teal river reflections. The small existing camp/tent in far right lower corner glows warmly amber with its existing lantern lighting nearby grass; tiny orange mushrooms subtly glow. Keep enough detail in forest floor and rocky foreground to read the scene, not pitch black. Same original crisp pixel art medium, very visible square pixels, no smooth or 3D rendering. Night should be magical, peaceful and immersive. No changes to landscape layout, no added structures, no characters, no text, no watermark, no borders. Exactly match original composition and dimensions.
