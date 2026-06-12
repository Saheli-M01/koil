# KOIL — Fueling a Sustainable Future

A cinematic, scroll-driven reimagining of the Kanchan Oil Industries website.
Built to position KOIL as a circular-energy pioneer rather than a traditional
petrochemical company.

> **Energy is not consumed. It is transformed.**

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

Deploy to Vercel: push to a Git repo and import — zero config required.
(`next/font` fetches Google Fonts at build time, which needs network access.)

---

## Stack

| Layer            | Choice                                          |
| ---------------- | ----------------------------------------------- |
| Framework        | Next.js 15 (App Router) + TypeScript            |
| Styling          | Tailwind CSS + custom token system              |
| Scroll engine    | Lenis smooth scroll, wired into the GSAP ticker |
| Scroll animation | GSAP + ScrollTrigger (pinning, scrub, parallax) |
| Micro-interaction| Framer Motion                                   |
| 3D               | React Three Fiber + Three.js (custom GLSL)      |

---

## The strategic spine

The entire brand rests on one physics truth: **energy is never destroyed,
only changed in form.** That reframes KOIL from "waste processor" to
"the company that completes the cycle."

- **Palette — molten, not neon.** Oil-black warming into refined amber,
  ignition gold, and a regeneration green. Combustion caught mid-transformation,
  deliberately avoiding the near-black + acid-accent AI default.
- **Signature element.** A single 3D oil droplet is born in Chapter 1, its
  custom shader morphing from a calm droplet toward turbulent energy as you
  scroll. The same liquid energy returns in Chapter 8. Continuity is the
  memorable device.

---

## Eight-chapter scroll journey

| #  | Chapter                     | Motion technique                                   |
| -- | --------------------------- | -------------------------------------------------- |
| 01 | Energy Never Disappears     | Pinned hero; shader droplet morphs on scroll       |
| 02 | From Waste to Fuel          | Scrubbed transformation bars, word-mask reveals    |
| 03 | Future of Sustainable Energy| Apple-style full-screen solution reveals           |
| 04 | Powering Industries         | Horizontal pinned scroll across 3 sectors          |
| 05 | Circular Energy Systems     | SVG ring draws itself; nodes pop around the loop   |
| 06 | Manufacturing Excellence    | Alternating slide-in editorial rows                |
| 07 | Sustainability Commitment   | Staggered impact metrics                           |
| 08 | Vision for Tomorrow         | Returning liquid orb + final statement + CTA       |

---

## Architecture

```
src/
  app/            layout (fonts, metadata), page (chapter orchestration), globals.css
  components/
    sections/     one file per chapter
    three/        DropletScene — the signature GLSL droplet + particles
    ui/           Nav, ScrollProgress, RevealText
  hooks/          useSmoothScroll (Lenis↔GSAP), useCanRender3D (perf/a11y gate)
  lib/            content.ts (all copy), utils.ts
```

All narrative copy lives in `src/lib/content.ts` — edit there, never in markup.

---

## Performance & accessibility

- **3D is gated** by `useCanRender3D`: skipped on small viewports, when WebGL
  is unavailable, or when the user prefers reduced motion. A CSS-gradient
  droplet stands in as a graceful fallback.
- `prefers-reduced-motion` disables Lenis smoothing and collapses animations.
- Fully responsive; the page is statically prerendered (≈207 kB first load JS).
- Keyboard-focusable navigation and semantic landmarks throughout.

---

© Kanchan Oil Industries. ISCC-aligned circular fuel.
