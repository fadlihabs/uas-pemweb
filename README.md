<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

---

## Modern 3D Theme & Effects (upgrade)

What's added:

- 3D hero background using `@react-three/fiber` and `@react-three/drei` (`components/Hero3D.tsx`).
- Interactive particle background via `react-tsparticles` (`components/ParticlesBackground.tsx`).
- Subtle tilt and glass effects on cards with `react-parallax-tilt` (`components/AnimatedCard.tsx`).
- Page and component animations with `framer-motion`.
- Global styles for 3D/perspective and animations in `index.css`.

Quick notes:

- Keep `tailwind` via CDN or migrate to local Tailwind setup to fully customize utility classes.
- Start dev server: `npm run dev` then open `http://localhost:3000/`.

If you'd like, I can fully migrate Tailwind to a local build (recommended) and add design tokens and variants for consistent 3D styling. Let me know if you want that next.