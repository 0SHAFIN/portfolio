# Project journey artwork and motion

The journey presents university first, then an Upstal employment group (June 2025 to present) containing exactly three products, in order: Rovalty, Leadstal, and 10xProfit. Hattim, Velopage and MJ Properties remain in the separate Work cards. The rose background and alternating cream illustrations are retained. Rovalty is the current Upstal project; its description was checked against [Rovalty](https://rovalty.com/) on 2026-10-26. Personal responsibilities are drawn from the supplied portfolio and the user's update, not inferred from product features.

## Original artwork

Generated with the built-in image_gen tool (not the CLI). Each new illustration is distinct from the Work section. Original PNGs are retained; production images are resized to 1200px wide and encoded as quality-90 WebP. The active journey illustrations are journey-education.webp (university), journey-seller.webp (10xProfit), journey-current-quest.webp (Leadstal), and journey-rovalty.webp (Rovalty). The following five assets were generated during the earlier project-row design; property, builder and garage are retained source assets but are no longer loaded by the journey:

### journey-seller

- Source: `design/source-art/journey-seller.png`
- Production: `public/art/journey-seller.webp`
- Final prompt:

> Use case: stylized-concept. Original detailed 16-bit pixel-art environment illustration for a software engineer portfolio, landscape 3:2 composition. Forest green, warm cream, muted peach, amber and teal palette. Beautiful handcrafted game environment, crisp pixel clusters, layered lighting, rich details, no lettering, no logos, no watermark, no UI screenshot. A cozy elevated warehouse observatory at golden hour, shelves of parcels, a mechanical brass balance and glowing teal analytics crystals on a wooden console, conveyor carrying small boxes. Represents seller inventory and business analytics. Wide atmospheric scene, not an isolated icon.

### journey-property

- Source: `design/source-art/journey-property.png`
- Production: `public/art/journey-property.webp`
- Final prompt:

> Use case: stylized-concept. Original detailed 16-bit pixel-art environment illustration for a software engineer portfolio, landscape 3:2 composition. Forest green, warm cream, muted peach, amber and teal palette. Beautiful handcrafted game environment, crisp pixel clusters, layered lighting, rich details, no lettering, no logos, no watermark, no UI screenshot. An architect's open-air desert studio at dusk, large blueprint table and miniature towers, arched sandstone windows overlooking distant Dubai inspired skyline, terracotta pots, rolled blueprints, teal drafting lamp. Wide atmospheric scene, not an isolated icon.

### journey-builder

- Source: `design/source-art/journey-builder.png`
- Production: `public/art/journey-builder.webp`
- Final prompt:

> Use case: stylized-concept. Original detailed 16-bit pixel-art environment illustration for a software engineer portfolio, landscape 3:2 composition. Forest green, warm cream, muted peach, amber and teal palette. Beautiful handcrafted game environment, crisp pixel clusters, layered lighting, rich details, no lettering, no logos, no watermark, no UI screenshot. An imaginative creative workshop suspended among leafy branches, glowing modular website blocks being assembled on a large workbench, floating framed geometric panels, drafting tools and warm hanging lamps. Evening teal and violet forest, amber light. Wide atmospheric scene.

### journey-garage

- Source: `design/source-art/journey-garage.png`
- Production: `public/art/journey-garage.webp`
- Final prompt:

> Use case: stylized-concept. Original detailed 16-bit pixel-art environment illustration for a software engineer portfolio, landscape 3:2 composition. Forest green, warm cream, muted peach, amber and teal palette. Beautiful handcrafted game environment, crisp pixel clusters, layered lighting, rich details, no lettering, no logos, no watermark, no UI screenshot. A miniature toy racing pit lane at night with colorful tiny die-cast cars, toolboxes, winding toy race track around a cozy garage, warm glowing windows and teal moonlit pine woods. Polished playful detailed diorama, wide atmospheric scene.

### journey-rovalty

- Source: `design/source-art/journey-rovalty.png`
- Production: `public/art/journey-rovalty.webp`
- Final prompt:

> Use case: stylized-concept. Original detailed 16-bit pixel-art environment illustration for a software engineer portfolio, landscape 3:2 composition. Forest green, warm cream, muted peach, amber and teal palette. Beautiful handcrafted game environment, crisp pixel clusters, layered lighting, rich details, no lettering, no logos, no watermark, no UI screenshot. A creator broadcast atelier beside a small merchant market, glowing camera on tripod, a large softly glowing circular studio lamp, wooden product display shelves, parcels and a vine-covered outdoor stage. Welcoming sunrise in a lush green valley, peach sky and amber lights. A visual metaphor for creators connecting with brands. Wide atmospheric scene.


## Motion

- ResizeObserver measures the actual illustration bounds and builds a monotonic SVG spline from top-center through their centers to bottom-center. The entrance uses the same broad cubic curve as the lower trail, with no extra corner before the first illustration. Cubic segments share vertical tangents, removing the old tight outer corners. Artwork is a foreground layer above both path and runner, naturally hiding Byte behind its opaque frame and revealing him again below. Mobile uses a compact 29px side gutter alongside the copy before curving into each illustration.
- A binary search over the path's arc length finds the point at 55% of the viewport height. Byte follows that point, turns with the path and scroll direction, and stops running when scrolling stops. The existing isolated atlas prevents adjacent-frame bleed.
- Artwork shifts subtly inside fixed frames. Mobile layout stacks copy and artwork, retaining the continuous path in reserved side gutters.
- At the endpoint a fixed SVG portrait takes over. The scroll-scrubbed flight grows within 79% of viewport height and 92% of viewport width, centering the full portrait on phones, uses curious, happy and winking screen expressions, then shrinks and descends into the Projects section. Its backdrop fades in and out. All phases reverse on upward scrolling.
- Expressions are native SVG overlays on the original portrait. Their coordinate transform accounts for the 1254px source drawn into a 1280-unit SVG. No additional mascot bitmap was generated.
- Phone rows use tighter spacing, shorter artwork frames, and a 160svh finale instead of the desktop 230svh sequence. Global pause freezes progress and all ongoing CSS motion. Reduced-motion mode removes the running/flying overlays and extra scroll runway while retaining every project and link. Resize, font readiness, and cleanup are handled explicitly.

Implementation: `src/components/journey-section.tsx`, `src/app/journey.css`, and the optional expressive mode in `src/components/story-byte.tsx`.
