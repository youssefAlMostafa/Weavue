# Handoff: Weavue — Weather App Redesign

## Overview
Weavue is a real-time weather tracking app built in Vue.js. This package contains the full redesign as a **high-fidelity HTML prototype**. Your task is to recreate this design in the existing Vue.js codebase using its established patterns and libraries — do not ship the HTML file directly.

## About the Design Files
`Weavue.html` is a **design reference** — a fully working prototype showing intended look, layout, and interactivity. Use it to understand:
- Exact visual appearance (open it in a browser)
- CSS custom properties / design tokens
- Component structure and hierarchy
- Interactions (city switching, hourly scroll)

---

## Fidelity
**High-fidelity.** Recreate pixel-precisely: exact colors, fonts, spacing, border-radius, and transitions. All values are listed below.

---

## Design Tokens

### Colors
```
--cream:       #f4ede2   (page background)
--cream-2:     #ebe2d3   (hover states)
--paper:       #fbf7ef   (card background)
--ink:         #1a1814   (primary text, dark cards)
--ink-2:       #3a352d   (secondary text)
--muted:       #7a7268   (labels, placeholders)
--line:        #d9cfbd   (borders, dividers)
--sun:         #e8642e   (accent orange — CTA, highlights)
--sun-soft:    #f4a07a   (accent orange soft)
--steel:       #4b6c8a   (accent blue — rain, night, wind)
--steel-soft:  #a8bccc   (accent blue soft)
--sage:        #cfd9c9   (overcast/cloud fill)
--leaf:        #5a7a55   (AQI good indicator)
```

### Typography
```
Display serif:  "Instrument Serif" (Google Fonts) — italic variant heavily used
UI sans:        "Geist" (Google Fonts) — weights 300/400/500/600/700
Monospace:      "Geist Mono" (Google Fonts) — weights 400/500 — used for ALL labels, timestamps, stats
```

### Type Scale
```
Hero city name:     84px  Instrument Serif regular
Hero temperature:   180px Instrument Serif regular
Hero condition:     34px  Instrument Serif italic
Section heading:    32px  Instrument Serif regular
City card name:     24px  Instrument Serif regular
City card temp:     48px  Instrument Serif regular
Metric value:       34px  Instrument Serif regular
Detail card value:  48px  Instrument Serif regular
Body / desc:        14–15px Geist regular
Labels / tags:      10.5–12px Geist Mono, letter-spacing 0.12–0.14em, UPPERCASE
Small sub-text:     12–13px Geist regular, color: --muted
```

### Spacing
```
Page padding:       28px top/bottom, 36px left/right
Card padding:       28–38px
Card border-radius: 24px (large cards), 20px (medium), 14px (hourly items), 999px (chips/pills)
Gap between cards:  24px (hero grid), 14px (cities/detail grid)
Section heading margin-top: 36px
```

### Borders & Shadows
```
All card borders:   1px solid var(--line) = #d9cfbd
Hover shadow (city cards): 0 8px 24px -16px rgba(26,24,20,.3)
No box-shadows on resting state — borders only
```

---

## Screens / Views

### 1. Top Bar (Header)
Three-column grid: Brand | Date | Social links

**Brand (left)**
- "Weavue" in Instrument Serif italic, 34px, with a small 8px orange dot (--sun) positioned top-right of the wordmark
- Tagline "Atmosphere, observed" in Geist Mono 11px, uppercase, letter-spacing 0.12em, color --muted

**Date (center)**
- Geist Mono, 12px, uppercase, letter-spacing 0.14em
- Format: `Tue · 12 May · 2026`
- Update live with JS `new Date()`

**Links (right)**
- LinkedIn, GitHub, Portfolio — 13px Geist, color --muted, SVG icons (16×16, stroke-width 1.6)
- Hover → color: --ink

Bottom border: 1px solid --line. Margin-bottom: 28px.

---

### 2. Search / Control Row
Flex row, gap 10px, margin-bottom 28px.

**Search bar** (max-width 520px, flex 1):
- Background: --paper, border: 1px solid --line, border-radius: 999px
- Padding: 10px 18px 10px 16px
- Left: search SVG icon (16px, color --muted)
- Input: 14.5px Geist, placeholder "Search a city, region, or airport code…"
- Right: keyboard shortcut badge "⌘ K" in Geist Mono 11px, bordered pill
- Focus state: border-color → --ink

**Chips** (pill buttons):
- Default: background --paper, border 1px --line, border-radius 999px, padding 10px 16px, 13.5px Geist
- Hover: border-color --ink
- `.solid` variant (Use my location): background --ink, color --cream

Chips in row: "Use my location" (solid), "°C / °F", "Reset all"

---

### 3. Hero Section
CSS Grid, 2 columns: `1.5fr 1fr`, gap 24px.

#### 3a. Hero Card (left — large featured city)
- min-height: 520px, border-radius 24px, overflow hidden
- Sky gradient variants (swap class based on active city):
  - `.sky` (clear/sunny): `linear-gradient(170deg, #f7c9a4 0%, #f4ede2 55%, #d8e3e8 100%)`
  - `.night`: `linear-gradient(170deg, #1a2538 0%, #2c3e5a 60%, #4b6c8a 100%)` — text color: --cream
  - `.overcast`: `linear-gradient(170deg, #c8cdd0 0%, #dfe0dc 55%, #e9e3d5 100%)`

**Decorative SVG art** (top-right, absolute, 340×340px):
- Sun: radial gradient circle + 8 rays in --sun orange
- For night: opacity 0.55; for clear: opacity 0.95

**Card content** (padding 36px 38px, flex column, full height):
- Top meta row (flex space-between): coordinates in Geist Mono 11.5px + live indicator with green dot
- City name: Instrument Serif 84px, line-height 0.96, letter-spacing -0.02em
- Region: Instrument Serif italic 24px, color --ink-2, opacity 0.85
- Temperature row (flex, gap 18px): 180px Instrument Serif number + `°C` superscript at 0.32em
- Condition: Instrument Serif italic 34px
- "Feels X° · H X° L X°" in Geist Mono 13px uppercase, opacity 0.7

#### 3b. Stats Stack (right column)
Grid, 3 rows: `auto 1fr auto`

**Metrics card** (`--paper` bg, border, radius 24px, padding 28px):
- Label row: "Right now" + timestamp (Geist Mono 11px uppercase, --muted)
- 2×2 metric grid, gap 22px 28px
- Each metric: top border (1px --line), label in Geist Mono 10.5px uppercase with icon, value in Instrument Serif 34px, sub-text 12px --muted
- Metrics: Humidity (%), Wind (km/h), UV Index, Pressure (hPa)

**Sun cycle card** (`--ink` background, --cream text, radius 24px, padding 24px 28px):
- Flex row: SVG arc animation + sunrise time + sunset time + "daylight left" value
- Arc: dashed path with animated progress in --sun orange, sun dot on arc
- Times in Geist Mono 12px; label in 10.5px uppercase, opacity 0.55
- Daylight value: Instrument Serif italic 22px

---

### 4. Hourly Forecast
- `--paper` bg, border, radius 20px, padding 6px, horizontal scroll (`overflow-x: auto`, hide scrollbar)
- Track: flex row, gap 2px, min-width: max-content

**Each hour item** (flex column, align center, padding 18px, min-width 84px, radius 14px):
- Time label: Geist Mono 11px, letter-spacing 0.08em, opacity 0.7
- Weather icon: 32×32px SVG (see Icons section)
- Temperature: Instrument Serif 24px
- Precipitation %: Geist Mono 10.5px, color --steel (or --steel-soft if on dark bg)
- Hover: background --cream-2
- **Active "Now" item**: background --ink, color --cream

---

### 5. Lower Grid
CSS Grid, 2 columns: `1.1fr 1fr`, gap 24px.

#### 5a. 7-Day Forecast (left)
`--paper` bg, border, radius 20px, padding 8px 24px.

Each day row: CSS grid `90px 36px 1fr 60px`, padding 16px 0, border-bottom 1px --line.

Columns:
1. **Day name**: Geist Mono 12.5px uppercase + date sub-label 10.5px --muted
2. **Icon**: 28×28px weather SVG
3. **Temperature range bar**: flex row with lo temp + gradient bar + hi temp
   - Bar: height 6px, radius 999px
   - Gradient: `linear-gradient(90deg, --steel-soft 0%, --steel-soft var(--low), #f4a07a var(--low), --sun var(--high), #eed8c2 var(--high), #eed8c2 100%)`
   - CSS custom props `--low` and `--high` control the gradient stops (percentages)
   - "Today" row has a small dot marker on the bar at the current temperature position
4. **Precipitation %**: Geist Mono 11px, color --steel, with drop icon

#### 5b. Saved Cities Grid (right)
2×3 CSS grid (2 cols), gap 14px.

**Each city card** (button element):
- `--paper` bg, border 1px --line, radius 20px, padding 20px, `text-align: left`
- Top: city name (Instrument Serif 24px) + region (Geist Mono 10.5px uppercase, --muted) + local time (absolute top-right)
- Bottom row (flex space-between): temperature (Instrument Serif 48px) + condition italic + weather icon (46×46px)
- Hover: `transform: translateY(-2px)`, border-color → --ink-2, shadow
- **Active city**: background --ink, color --cream, border --ink

**Add city card**: dashed border, centered "+" icon + text, hover fills --paper

**Interaction**: clicking a city card swaps the hero (gradient class, all data fields) and re-renders cities with new active state.

---

### 6. Detail Cards Row
CSS grid, 4 columns equal, gap 14px.

Each card: `--paper` bg, border, radius 20px, padding 22px, min-height 170px.

1. **Air Quality**: Light green tint gradient, AQI value in Instrument Serif 48px, sub-text description
2. **UV Index**: Value + a colored gradient bar (green→yellow→orange→red) with a dot marker at current UV position
3. **Wind**: Value + a circular compass (absolute top-right, 54px, border) with N marker and rotation needle
4. **Visibility**: Value in km + description text

All card labels: Geist Mono 10.5px uppercase, letter-spacing 0.14em, color --muted, with small SVG icon.

---

## Weather Icons (SVG — line style)

All icons are 32×32 viewBox, geometric/editorial line style. Define as `<symbol>` in an SVG sprite and reference with `<use href="#id">`.

| ID | Description |
|---|---|
| `i-sun` | Filled orange circle (r=6) + 8 stroke rays |
| `i-pcloud` | Orange sun (top-left) + grey cloud path overlapping |
| `i-cloud` | Simple grey cloud path, stroke outline |
| `i-rain` | Blue-grey cloud + 3 diagonal rain lines below |
| `i-moon` | Crescent moon in --steel + 2 small star dots |
| `i-snow` | Grey cloud + 3 snowflake crosses below |
| `i-wind` | 3 wind lines (wavy paths) in --ink |

See the HTML file for exact SVG path data.

---

## Interactions & Behavior

### City switching
- Click any city card → update hero gradient class, city name, region, coords, temperature, condition, feels/hi/lo, all metrics, sunrise/sunset/daylight
- Re-render city grid with new `active` state
- No animation needed on first pass — simple state swap is fine

### Hourly scroll
- Horizontal overflow scroll, native momentum on mobile
- "Now" pill always visible on load (first item)

### Search bar
- Focus state: border-color → --ink
- Functionality: filter/search cities (connect to your existing API logic)

### Responsive
- Below ~1180px: hero becomes single column, lower grid becomes single column, detail grid becomes 2 columns

---

## Data Sources
Your existing project uses **Open-Meteo API** — connect all displayed values to live API responses. The prototype uses static mock data for:
- Current temperature, condition, feels-like, hi/lo
- Humidity, wind, UV, pressure
- Sunrise/sunset
- Hourly forecast (24 hours)
- 7-day forecast

---

## Files in This Package
- `Weavue.html` — full hi-fi prototype, open in browser to see the design. Contains all SVG icons, CSS variables, and interaction logic.
- `README.md` — this file

---

## Notes for Claude Code
1. Open `Weavue.html` in a browser first — it's fully interactive.
2. The CSS custom properties at the top of the `<style>` block are your design tokens — map them to your Vue/CSS setup.
3. All SVG icons are defined inline as `<symbol>` elements — copy them to a shared component or sprite file.
4. The city-switching logic in the `<script>` block shows the exact state mutations needed — adapt to your Vue component/store pattern.
5. Google Fonts import: `Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500` — or self-host if preferred.
