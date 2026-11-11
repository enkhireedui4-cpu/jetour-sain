# SAIN Motors brand navigation implementation plan

**Goal:** Give Jetour visitors a compact, accessible route to the company and all eleven brands without reducing the prominence of sales actions.

**Architecture:** Keep the existing Next.js/React navbar and its single open-menu state. Split the original logo cluster into independent links; reuse the same central brand config and brand-list component for a desktop disclosure and mobile accordion. Use the existing footer's typography and spacing.

**Spec:** The user's detailed Mongolian brief in this conversation. The user requests autonomous implementation in the Desktop repositories; work stays in the existing checkout and is left uncommitted for review.

**Tech stack:** Existing Next.js 16, React 19, TypeScript, Tailwind 4, lucide-react, CSS modules. No dependencies added. Browser tests use an available Playwright installation through PLAYWRIGHT_MODULE.

## Design and constraints

- Preserve JETOUR → SAIN logo order, official image proportions and existing 28/26px heights.
- Existing Inter typography; palette #FFFFFF surface, #17181B ink, #54585F secondary, #E7E7EA border, #F5F5F6 selected surface, #E20A17 focus/accent.
- Desktop navigation at 1280px, based on the logo cluster + five existing items + sales button fitting comfortably. Smaller widths use the hamburger.
- 400px overlay, two columns, compact original logos, no promotional imagery. 160ms opacity/transform transition and reduced-motion override.
- Original company brand order is JETOUR, SOUEAST, CHERY, BYD, RIDDARA, AITO, 212, FAW BESTUNE, CHERY RELY, MAXUS, FAW HONGQI.
- The current brand is a noninteractive row with a textual status; links use the same tab.
- Jetour currently supports Mongolian only. Use verified Mongolian destinations; do not invent language routing.

## Tasks

- [x] Browser regression first: test independent logo destinations, disclosure keyboard lifecycle, non-link current brand, mutual exclusion, mobile accordion, responsive header geometry.
- [x] Add `src/lib/brand-navigation.ts`, official assets in `public/logos/brands/`, and focused `brand-navigation.tsx` / CSS module. Integrate with `navbar.tsx` using `openMenu` so models and brands cannot stay open together. Escape returns focus; pointer/focus outside closes; hidden content is inert.
- [x] Add the compact distributor line before copyright in `contact.tsx` / `footer.module.css`, consuming the same company destinations.
- [x] Run browser checks on / and /models/t2 at360,390,768,1024,1280,1440; transparent and solid header, keyboard/click/tap, reduced motion, existing model navigation and lead form. Save desktop/mobile screenshots.
- [x] Run existing unit suite, lint, TypeScript and production build. Review the final diff, record evidence and limitations.

## Review focus

- Keyboard focus leaving an open disclosure must never reach hidden links.
- Switching desktop/mobile at a breakpoint must not leave a hidden menu active or trap focus.
- Opening brand navigation must close the existing model mega menu and vice versa.
- Short viewports need a scrollable panel, and mobile drawer scrolling must still reach the last brand.
- Both hero and solid headers must keep all logo and control colors readable.
