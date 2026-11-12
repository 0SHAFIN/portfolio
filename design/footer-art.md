# Workshop meadow and underground footer

Generated with the built-in imagegen tool. These are original assets; the reference site's above/below-ground composition informed the layout, but its artwork was not copied.

The contact CTA and seated Byte occupy the surface. The footer starts immediately below the same ground boundary, inside the exposed earth. This scene has its own renderer and keeps its sunset lighting.

The dedicated Three.js shader in `src/components/workshop-renderer.ts` moves only traced leaf clusters, grass tips, and sky regions. Buildings, hills, soil, and the ground boundary stay anchored. Pixel smoke rises from the chimney, lanterns and workshop windows flicker, and CSS pollen drifts past. Underground crystals twinkle and occasional drops fall from roots.

Byte uses one stable pose from the existing atlas as a small character rig. Separate regions animate the trailing scarf, a breathing/nodding head, tapping fingers, blinking eyes, and the laptop glow. The crate, feet, and plant stay fixed, avoiding jumps between generated poses. The original four-frame CSS animation remains a WebGL fallback.

The renderer initializes within 200 pixels of the viewport, caps drawing at 24 fps and 1200 pixels wide, and uses one transparent canvas for both scenery and character. Desktop and mobile artwork bounds are measured separately so the character never inherits the mobile sky fade. Pause, reduced motion, offscreen detection, and hidden-tab state stop motion; observers, GPU resources, and animation frames are cleaned up on unmount.

## Surface

- Source: `design/source-art/footer-workshop-surface.png` (1536 × 1024).
- Production: `public/art/footer-workshop-surface.webp` (1536 × 930, trimmed at the grass/soil edge and encoded as WebP).

Final prompt:

> Use case: stylized-concept. Asset type: original high-detail 16-bit pixel-art landscape for the ABOVE-GROUND half of a software engineer portfolio footer, 1536x1024 landscape. Scene is a cozy inventor's hilltop at golden sunset, totally different from a mountainous forest valley. Straight-on 2D videogame side view, no perspective ground plane. Muted pale peach and butter-yellow sky occupies the upper 60 percent with lots of clean open negative space in the CENTER for overlaid website headline and text. Left edge: a beautiful large windswept old tree, mint and sage foliage, vines, tiny warm hanging lantern. Right edge: a little whimsical wooden coding workshop with a copper domed observatory roof, small antenna and telescope, glowing amber windows, chimney, a climbing plant. Rolling far-away lavender hills at very bottom of sky only, a couple of tiny pixel clouds. Foreground very bottom 13 percent: one CONTINUOUS perfectly HORIZONTAL grassy platform across FULL WIDTH, at exactly y=900px grass surface; mint/sage grass blades, little golden flowers, tiny mushrooms, dark plum earth under grass. No gaps, no cliffs, no river, no mountains, no pine forest, no robot or characters. The workshop/tree grow out of this SAME ground line. The scene must feel hand-crafted, rich detailed classic indie pixel game artwork with visible square pixels and crisp silhouettes, not a smooth vector illustration or 3D render. Palette: light apricot #f0cfad, butter cream, dusty lavender, sage green #8da875, dark plum #30233e, amber/copper. Foreground tree and workshop frame the edges and stay out of center 55 percent. No text, no typography, no labels, no logos, no watermark, no website UI. A polished production-ready original landscape asset.

## Underground

- Source: `design/source-art/footer-underground.png` (1536 × 1024).
- Production: `public/art/footer-underground.webp` (1536 × 1024).

Final prompt:

> Use case: stylized-concept. Asset type: original high-detail 16-bit pixel-art underground cross-section background for the BELOW-GROUND half of a software engineer portfolio footer, 1536x1024 landscape. Straight-on flat 2D videogame side view showing exposed earth beneath a horizontal meadow, like a beautiful Terraria cutaway. Entire image is UNDERGROUND, no sky, no surface buildings, no grass, no forest, no robot, no characters, no perspective tunnel. Topmost edge is a perfectly horizontal dark earthen boundary, then warm layered plum soil and rock strata with rich textural pixel detail. Thick twisting roots descend from TOP LEFT and TOP RIGHT edges, thin vines and dangling roots along edges. A few warm copper cables wind through soil, tiny amber circuit-like stones, little clusters of mint/teal and lavender crystals in LOWER corners, 2 or 3 amber buried lanterns near outer edges, tiny ancient stone ledges. Art direction has warm copper/terracotta bands near top 10 percent, fading to deep plum purple #241b34 toward center and bottom. IMPORTANT COMPOSITION: CENTRAL 75 percent is MOSTLY EMPTY, FLAT DEEP-PLUM rock and subtle pixel texture with generous uninterrupted quiet space for overlaid footer text and links. Elaborate illuminated crystal/root detail stays at FAR EDGES and bottom corners only; no center focal object. Keep it sophisticated, not busy or noisy. The roots and rock must feel like a physical cross-section of the ground above. Crisp square pixels, lovingly hand-crafted classic 16-bit indie platformer artwork; not smooth painting, not vector or 3D. Palette: deep eggplant #241b34, warm plum #3c2945, muted terracotta #875440, sage/mint #abcfa2, muted lavender #a19ac8, amber-gold #e6b15b. No text, no typography, no labels, no logos, no watermark, no website UI. A polished original production-ready background asset.

## Byte at the workshop

- Source: `design/source-art/byte-workshop-idle.png` (1254 × 1254, transparent).
- Production: `public/art/byte-workshop-idle.webp` (1254 × 1254, transparency preserved).
- Four equal 627 × 627 cells, two columns and two rows. The renderer rigs the first cell continuously; a five-second CSS sequence uses all four cells when WebGL is unavailable.
- Identity reference: the original `design/source-art/byte-explorer.png`, inspected before generation.

Final prompt:

> Use case: identity-preserve. Input image: reference image ONLY for identity and art style of Byte, the original cream monitor-head robot with dark green screen, mint eyes, orange antenna, teal scarf, brown boots and copper backpack. Asset type: NEW original 4-FRAME IDLE ANIMATION SPRITE SHEET for the footer, NOT the existing running pose. Exactly 2 columns by 2 rows, 4 equal square cells, overall square canvas, fully transparent background. Same character is SITTING ON A SMALL WOODEN CRATE using a warm glowing little laptop on its knees, facing slightly right, teal scarf trails a short way left. Cozy inventor resting at his workshop. Tiny green seedling growing out of a copper pot right beside the crate. Each cell full composition occupies 80% cell height, bottom of crate and boots aligned at 90% of cell height. Entire character/crate centered identically in all cells with absolutely consistent head/body position and baseline. Frame1 eyes open laptop glow, frame2 eyelids half closed scarf lifts slightly, frame3 eyes blink fully closed scarf ripple farther left, frame4 eyes open little square on laptop glows and scarf lowers. Scarf shape subtly different each cell but no geometric shift of body, no jump, no running. Distinct four poses for sequential animation, no additional characters. Flat 2D side view authentic 16-bit crisp pixel game art, dark pixel outlines, detailed square pixels matching reference. Very important: NO scenery or ground; every cell genuinely transparent behind the complete robot, laptop, crate, and seedling. No gridlines, no cell borders, no text, no numbers, no logos, no watermark. Exactly 2-by-2 aligned atlas, same scale each cell, isolated original sprite production asset.
