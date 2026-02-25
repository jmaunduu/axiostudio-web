# The Axiostudio "Cinematic Masterpiece" One-Shot Prompt

*Copy and paste the exact text below into a fresh chat with a top-tier coding agent (like Gemini 3.1 Pro) alongside a fresh `npm create vite@latest` React/Tailwind project. This prompt encapsulates 30+ hours of design iterations, GSAP tuning, and aesthetic polishing into a single command.*

---

**Prompt Start:**

```markdown
# Role
Act as a World-Class Lead Creative Technologist. Your goal is to build a "1:1 Pixel Perfect" cinematic landing page for an elite Voice AI Agency called **Axiostudio**. Do not build a generic website; build a digital instrument where every scroll and animation feels weighted, premium, and flawless.

# Tech Stack
React 19, Tailwind CSS v3.4, GSAP 3 (Core + ScrollTrigger), Lucide React. 

# Global Aesthetic System (CRITICAL)
- **Palette:** Full-bleed `bg-[#0A0A0A]` everywhere. Text is white varying in opacity (`text-white/80`, `text-white/40`).
- **Typography:** Headings must be Serif (`font-serif font-light tracking-tight leading-[1.05]`). Body must be Sans (`font-sans font-light leading-relaxed`).
- **Texture:** The entire site MUST have a fixed, pointer-events-none noise overlay using `<feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />` at `opacity-[0.05] mix-blend-overlay`. No flat colors.
- **Micro-Interactions:** All buttons and cards must feel magnetic: use `transition-all duration-700 hover:scale-[1.02]`.

# Component Architecture required in `App.jsx`:

## 1. Liquid Glass Navbar
- Fixed to the top. When scrolled, it must not just have a background color—it must use extreme glassmorphism: `backdrop-blur-3xl backdrop-saturate-150 bg-white/[0.03]`. 
- Logo is a solid white circle (`w-6 h-6 bg-white rounded-full`) with a smaller black dot inside.

## 2. Pinned GSAP Hero
- Hero text left-aligned: "Axiostudio. Voice AI infrastructure for high-volume hospitality."
- The `ScrollTrigger` MUST pin a large `aspect-video` container showcasing an abstract AI/Restaurant video stream (`https://stream.mux.com/b5TsWTJIutPO8RGHDogt8k88qoirRPLo.m3u8`).
- Inside the pinned video container, animate overlapping "imessage-style" chat bubbles representing an AI handling a reservation with a user. Use GSAP staggers.

## 3. The Value Props (Three Cards)
- **Top Card (Full Width):** 600px tall, `rounded-[3rem]`, containing a dark luxury restaurant background image (Unsplash filter brightness-75). Float a responsive glassmorphism card over it demonstrating "Revenue Recovery." ON MOBILE: Ensure the internal elements use `flex-col` so they do not overflow the horizontal axis. 
- **Bottom Two Cards (50/50 Split):** Side-by-side cards featuring dark, high-fidelity operational images representing "Actionable Call Intelligence" and "Operational Efficiency."

## 4. Voice Expertise (The Horizontal Showcase)
- **Layout:** A massive `max-w-7xl` container (NEVER use `100vw` or it will bleed on mobile). Dark glass background.
- **Interaction:** On Desktop ONLY (`gsap.matchMedia("(min-width: 1024px)")`), pin the left column (which contains an interactive Audio Player playing an AI demo) while the right side (Technical Specs cards like "Sub-800ms Latency" and "RAG Context") scrolls past it.

# Execution Rules
1. **Zero Lag:** Do not use `setInterval` with unmounted `setTimeout` loops without a cleanup `isMounted` flag.
2. **Mobile First:** Ensure absolute positioning is only applied to elements on `md:` breakpoints to prevent mobile horizontal cutoff.
3. **No Placeholders:** Provide fully implemented code. Do not write "insert logic here."

Execute the full build.
```

---

### How to use this:
1. Start a fresh folder.
2. Run `npm create vite@latest . -- --template react`
3. Install dependencies: `npm i tailwindcss postcss autoprefixer gsap lucide-react react-router-dom`
4. Paste the prompt above.
5. The agent will immediately output the world-class `axiostudio-calm` aesthetic structure on its first try.
