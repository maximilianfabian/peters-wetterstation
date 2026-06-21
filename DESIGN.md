# Biscuit — Design principles for older adults (65+)

This is the "why" behind how Biscuit looks and behaves. It distills
evidence-based guidance (WCAG 2.2, GOV.UK / GDS "Designing for older users",
Nielsen Norman Group, Apple HIG, Material 3, W3C/WAI older-users) into rules we
actually follow in this codebase. When in doubt, favour the simplest, biggest,
most obvious option.

## The 10 hard rules

1. **Body text ≥ 18px, aim 20–22px.** Headings larger. Never thin/light weights.
2. **Line-height ≥ 1.5**; short line lengths; no ALL-CAPS, no italics for body.
3. **Touch targets ≥ 48px, aim 56–68px**, with ≥ 8–12px spacing.
4. **Contrast ≥ 4.5:1** for text, ≥ 3:1 for large text/UI. Aim higher.
5. **Never rely on colour alone** — pair every colour/icon with words.
6. **One clear primary action per screen.** Limit choices (3–5).
7. **No horizontal scrolling, no carousels, no off-screen/hidden content.**
   Older adults frequently don't discover swipeable items. Everything visible.
8. **No icon-only controls.** "Back" says "Back"; "Send" says "Send".
9. **Plain language** (~6th-grade reading level). Calm, blameless error tone:
   "I had a little trouble — let's try that again."
10. **Respect `prefers-reduced-motion`; no autoplay; no timeouts.**

## Patterns we deliberately AVOID

- Horizontal chip rows / carousels (content off the edge goes unseen).
- Hamburger or hidden menus; hover-only affordances; swipe gestures.
- Low-contrast "ghost"/outline buttons that don't look tappable.
- Tiny tap targets; cramped multi-column tiles that truncate labels.
- Implying features we don't have (e.g. "Tap to talk" before voice exists).

## Why the colours are what they are

Aging eyes yellow, which reduces blue/violet discrimination and overall
contrast. So:

- Background is **warm off-white (`#FAF4E8`)**, not pure white (cuts glare).
- Primary is a **deep teal** — teal/amber sit where aging vision stays sharpest.
- Text on cream uses the **dark teal `#134E4A`** (passes AA); bright teal is used
  only for large fills like the round button.
- Action buttons use **soft backgrounds with dark, same-hue labels** plus a
  border, so they're friendly *and* readable (light text on pastel fails AA).

## Design tokens (see `tailwind.config.ts`)

| Token | Hex | Use |
|---|---|---|
| `cream` | `#FAF4E8` | Page background |
| `surface` | `#FFFFFF` | Cards, bubbles, input |
| `ink` | `#1C1A22` | Body text (15:1 on cream) |
| `subtitle` | `#5C5866` | Secondary text |
| `brand.DEFAULT` | `#0F766E` | Primary teal |
| `brand.dark` | `#134E4A` | Text/labels on cream (AA-safe) |
| `brand.bright` | `#14B8A6` | Top of the button gradient |
| `brand.soft` | `#D5EFEA` | Read-aloud / focus wash |
| `green/amber/coral .soft/.deep/.line` | — | Action-button fill / label / border |

Fonts: **Fraunces** (display serif, greeting) + **Inter** (everything else),
loaded with `next/font` for no layout shift.

## Component sizes we build to

| Component | Min-height | Text | Notes |
|---|---|---|---|
| Home action button | 68px | 20px | Full-width, icon + words, wraps (no truncation) |
| Round "start" button | 176px | 24px label | Hero affordance |
| Suggestion button (chat) | 60px | 18px | Vertical stack, shown before the chat starts |
| Text input | 60px | 20px | Full width of its row |
| Send button | 60px | 20px | Says "Send" + icon, never icon-only |
| Back control | 48px | 18px | Says "Back" + chevron |
| Read aloud | 48px | 16px | Speaker icon + the words |

## Safety in the UI (non-negotiable)

- The **"I'm not feeling well"** button never assesses symptoms. It sends to
  Biscuit, whose system prompt calmly offers to reach a doctor, family member,
  or emergency services. See `lib/system-prompt.ts`.
- Biscuit never asks for passwords, bank details, or money, and warns the
  person if anything else does.
