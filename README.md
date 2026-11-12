# Shafin — Code. Create. Explore.

A complete Next.js portfolio for Tafsirul Shafin, inspired by the pixel artwork, bold type, contrasting colors, and playful movement of Pigeon’s Mission. The landscape, robot character, and project worlds are original artwork created for this project; no reference-site imagery was copied.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. For production, run `npm run build` followed by `npm start`.

## What’s included

- Next.js App Router, React, TypeScript, GSAP ScrollTrigger, and a lazily loaded Three.js environment renderer.
- A 36-second day–night–day cycle with an eight-second sunset, a warm peach and violet sky, a setting sun, a rising moon, progressively appearing stars, and campsite lights. Manual lighting changes ease over 4.8 seconds; automatic dawn eases over ten seconds. Only explicitly traced pine canopies sway in the wind. Mountains, cliffs, and ground remain still. The river shimmers without geometric distortion; the campfire has animated pixel flames, rising embers, and flickering light.
- Byte’s body stays horizontally centered in the hero, with the artwork offset to account for the trailing scarf. He runs in place using eight original frames. Click or press Enter/Space to jump and cycle through eight messages, one at a time; the sequence repeats after the last line. Bubbles rotate through five positions and five entrance animations, dismiss after 2.8 seconds, and replace the previous message on rapid clicks. The click target stays still while the sprite jumps.
- Auto, Day, and Night controls let visitors choose lighting. Global pause freezes the world, sprite animation, and any ongoing lighting transition, which resumes from the same point. Reduced motion keeps the scene static while allowing immediate manual lighting changes. Offscreen and hidden-tab scenes stop rendering; unsupported WebGL browsers retain the artwork and a CSS lighting fallback.
- A stationary landscape, drifting pixel clouds, section reveals, and a scrolling marquee. The hero clips its scenery at a continuous bottom edge above the solid status bar. Three collectible gems update a counter and unlock a greeting.
- An illustrated toolkit with selectable pixel hardware cards. The rose-colored journey features a university chapter followed by an Upstal employment group with current project Rovalty, Leadstal, and 10xProfit. Personal projects remain in the separate Work cards. Byte follows a smooth curved trail that passes behind the illustrations and emerges again with scroll, then grows to fit within 79% of viewport height and 92% of viewport width, changes expressions, and shrinks into the Projects section. The flight reverses with scrolling, respects pause, and has a static reduced-motion layout.
- The story portrait has independent scarf motion, breathing, blinking eyes, and a glowing antenna, using the original artwork in a small SVG rig. It pauses offscreen, in hidden tabs, and with the animation controls. The scrolling banner uses happy, winking, and curious Byte faces between phrases.
- An original above/below-ground finale: a sunset workshop meadow behind the CTA, a seated Byte coding beside a seedling at the grass edge, and a separate underground footer with roots, crystals, and buried lanterns. A dedicated Three.js shader animates leaves, grass tips, clouds, chimney smoke, workshop lighting, and a stable character pose with breathing, blinking, typing, and a waving scarf. Underground sparkles and root drips complete the scene. Global pause, reduced motion, offscreen detection, and tab visibility control the motion; the original artwork and four-frame character remain a WebGL fallback.
- Working project filters, accessible native project dialogs, keyboard-operable skill tabs, responsive navigation, and resume download.
- Opt-in synthesized ambient music, an animation pause control, and support for the system’s reduced-motion preference.
- Real biography, projects, employment, education, skills, contact details, social profiles, and resume imported from https://www.tafsirulshafin.me/.
- Locally hosted fonts, optimized WebP artwork, original PNG source artwork, social metadata, and a custom pixel favicon.

## Responsive layout

The final stylesheet, `src/app/responsive.css`, coordinates compact phone layouts, tablet navigation, landscape phones, and desktop sizing. Phones use shorter hero/story artwork, tighter project and journey rows, smaller toolkit cards, and a content-sized skills panel. Decorative labels, duplicate footer details, and some ornaments are hidden; project descriptions, skills, contact links, resume links, and animation controls remain available. Common controls keep 44px tap targets. The menu supports Escape and outside dismissal, dialogs keep their close control visible while scrolling, and phone controls respect safe-area insets.

The journey close-up fits the whole character on narrow screens and uses a shorter scroll sequence. Its path still passes behind each illustration, and reduced-motion mode removes the extra animation runway.

Static terrain samples texel centers to avoid one-column shimmer at fractional viewport scales; masked trees and fire retain their motion.

Browser checks cover 320px to 2560px widths, including 568x320 and 844x390 landscape screens, clipped text, overlapping hero controls, all skill categories, menu navigation, and scrolling project dialogs.

## Personalize

Edit `src/lib/portfolio.ts` to update your profile, projects, project artwork paths, and skill categories. Byte’s phrases and bubble variants are in `src/lib/byte-dialogue.ts`. The toolkit, contact, and footer are in `src/components/portfolio-chapters.tsx`, styled by `src/app/chapters.css`. Career content and scroll behavior are in `src/components/journey-section.tsx`, styled by `src/app/journey.css`. Design tokens and the other layouts are in `src/app/globals.css`; world motion and speech styles are in `src/app/hero-world.css`. Rebuild the running character's isolated, padded sprite atlas with `node scripts/pack-byte-sprites.mjs` after replacing its source artwork.

The contact button opens an email client. Copy email writes the address to the clipboard. Project buttons open descriptions; each description includes the real live project link. No contact backend or credentials are required.

The canonical site URL defaults to your current portfolio domain. Set `NEXT_PUBLIC_SITE_URL` before building if deploying to a different domain.

## Artwork

The built-in image generation tool created twenty original raster assets, including the matching night landscape, eight-frame run sheet, dedicated workshop/underground footer assets, six independent project/career illustrations, and a journey horizon. Their full final prompts, saved paths, and implementation details are in [design/art-direction.md](design/art-direction.md), [design/footer-art.md](design/footer-art.md), [design/card-and-journey-art.md](design/card-and-journey-art.md), and [design/project-journey.md](design/project-journey.md).

## Verify

```sh
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

The 58 Playwright checks run across desktop and mobile Chrome and cover rendering, overflow, real links, filters, dialogs, skill-tab keyboard controls, collectibles, sound, animation controls, reduced motion, navigation, email copying, resume access, running animation, lighting transitions, and scenery pausing. Character checks cover message cycling, single-popup replacement, varied animations and positions, keyboard activation, and timer resets. Pixel regression checks compare mountain and cliff crops between animation frames and require them to stay identical while tree and campfire crops change. Scrolled boundary checks verify the background stays clipped above the solid status bar. Chapter checks cover narrow-screen headings, journey content, dedicated surface/underground artwork, a continuous ground boundary, and footer pause/resume and offscreen stopping. Journey checks verify seven unique work/journey illustrations, university followed by three Upstal products, personal projects remaining in Work, Rovalty content, pixel-verified character occlusion and reappearance, accurate travel along the winding path, a bottom-center endpoint, reverse scrolling, pause/resume, viewport-sized flight and facial expressions, departure into Projects, reduced motion, and widths from 320px to 1440px. Story checks cover scarf movement, pause/resume, reduced motion, and the three marquee expressions. Workshop pixel checks require leaves, clouds, scarf, and hands to change while the roof, hills, and crate stay identical. Two workers avoid overloading headless software WebGL contexts. Tests use an existing local server when available and otherwise start one. The configuration uses installed Chrome; change `channel` in `playwright.config.ts` to use another installed browser.

Fonts: Climate Crisis, Jost, and Space Mono, distributed under the SIL Open Font License. License files are in `public/fonts`.
