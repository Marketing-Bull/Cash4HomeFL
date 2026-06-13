# Loop Log — Cash4HomeFL Front-End Fix Iterations

---

## Iteration 1 — ISSUE 1: Header Dropdown

**Issue:** Dropdown closes before cursor reaches menu items (0.5rem CSS gap between trigger and panel). No keyboard support.

**Root cause:** `.dropdown-panel { top: calc(100% + 0.5rem) }` created a physical gap. Pure CSS `:hover` had no keyboard (Tab/Esc) support.

**What changed:**
- Created `components/NavDropdown.tsx` — client component controlling open state via JS:
  - `onMouseEnter/Leave` for hover
  - `onFocus/onBlur` for keyboard (with `suppressNextFocus` ref to prevent Esc re-opening)
  - `onKeyDown` Esc closes and returns focus to trigger
- Updated `components/SiteFrame.tsx` to import and use `NavDropdown`
- Updated `app/globals.css`:
  - Removed CSS `:hover` show/hide rules
  - `dropdown-panel` now `top: 100%` + `padding-top: 0.5rem` (transparent bridge, no gap)
  - Visual card styles moved to `.dropdown-section`
  - Added `.dropdown-arrow--open` class for rotation

**Test run:** `npx playwright test tests/e2e/issue1-dropdown.spec.ts`  
**Result:** PASS — 4/4 (hover + click at 1024px, hover + click at 1440px; Tab/Esc at both widths)

**Files touched:** `components/NavDropdown.tsx` (new), `components/SiteFrame.tsx`, `app/globals.css`

---

## Iteration 2 — ISSUE 2: Form Validation

**Issue:** Phone shows error text but doesn't block submission. Email uses HTML5 `type="email"` which accepts `abc@x` (single-char domain). No `onSubmit` guard.

**Root cause:** No `onSubmit` handler; email had no custom regex; phone `validatePhone` was called on blur but not on submit.

**What changed:**
- `components/LeadForm.tsx`: added `email` state + `emailError` state; custom regex `EMAIL_RE` (`/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`) rejects single-char domains; `onSubmit` handler validates both fields, calls `e.preventDefault()` if either is invalid; `noValidate` on form disables browser native popups; `role="alert"` on error spans; `aria-invalid` + `aria-describedby` on inputs.

**Test run:** `npx playwright test tests/e2e/issue2-validation.spec.ts`  
**Result:** PASS — 10/10 (phone reject ×2, phone accept ×1, email reject ×4, email accept ×1, submit blocked ×2)

**Files touched:** `components/LeadForm.tsx`

---

## Iteration 3 — ISSUE 3: Mobile Nav Hamburger

**Issue:** No hamburger menu on mobile (≤768px). Nav links wrap and overflow on narrow screens — inaccessible.

**Root cause:** No hamburger/drawer implementation existed; `.nav` shown at all widths.

**What changed:**
- Created `components/MobileNav.tsx` — client component: hamburger button toggles a fixed full-screen drawer; Esc closes + returns focus to button; body scroll locked while open.
- Updated `components/SiteFrame.tsx` to include `<MobileNav>` passing `primaryLinks` and `situationLinks`.
- Updated `app/globals.css`: `.mobile-nav-btn` (flex, hidden by default), `.mobile-nav-drawer` (position fixed, below topbar), link styles; `@media (max-width: 768px)` shows button and hides desktop `.nav`.

**Test run:** `npx playwright test tests/e2e/issue3-mobile-nav.spec.ts`  
**Result:** PASS — 5/5 (hamburger visible, drawer opens, all links reachable, link click closes, Esc closes, desktop shows desktop nav)

**Files touched:** `components/MobileNav.tsx` (new), `components/SiteFrame.tsx`, `app/globals.css`

---

## Iteration 4 — ISSUE 4: Hero CTA Scroll-to-Form

**Issue:** "Get My Cash Offer" buttons in `SocialProofSection` and the bottom CTA linked to `/contact` instead of scrolling to and focusing the form.

**Root cause:** CTA buttons used `<Link href="/contact">` — no scroll/focus logic. The form lacked an `id` to target.

**What changed:**
- Created `components/ScrollToFormLink.tsx` — client component: on click, `scrollIntoView({ behavior: 'smooth', block: 'center' })` then after 400ms delay focuses first visible input via `#lead-form`.
- Updated `components/PageTemplate.tsx`: wrapped `<LeadForm>` in `<div id="lead-form">`, replaced `<Link href="/contact">Get My Cash Offer</Link>` buttons in `SocialProofSection` and bottom CTA with `<ScrollToFormLink>`.
- `scroll-behavior: smooth` already present on `html`.

**Test run:** `npx playwright test tests/e2e/issue4-hero-cta.spec.ts`  
**Result:** PASS — 2/2 (desktop-1440 and mobile-375: CTA scrolls and focuses address input)

**Files touched:** `components/ScrollToFormLink.tsx` (new), `components/PageTemplate.tsx`

---

## Final Summary

All 4 issues: **PASS**

| # | Issue | Tests | Status |
|---|-------|-------|--------|
| 1 | Header dropdown hover gap + keyboard | 4/4 | ✅ PASS |
| 2 | Form email + phone validation + submit guard | 10/10 | ✅ PASS |
| 3 | Mobile hamburger nav | 5/5 | ✅ PASS |
| 4 | Hero CTA scroll-to-form + focus | 2/2 | ✅ PASS |

**Total: 21/21 Playwright tests green.**
