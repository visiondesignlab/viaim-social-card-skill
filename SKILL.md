---
name: viaim-social-card-skill
description: Generate viaim-branded social card sets, Xiaohongshu/Rednote carousels, WeChat cover pairs, article covers, and short Live Photo cards using the exact five-color viaim brand system. Use when the user asks for viaim brand social graphics or wants an existing social-card layout converted to viaim colors; use a generic social-card skill when viaim branding is not required.
---

# viaim Social Card Skill

Create social-image packages with purpose-built viaim layouts, a browser rendering pipeline, and the fixed five-color communication palette.

Generated work belongs under this skill's `local-tests/<slug>/` or an output folder explicitly requested by the user. Keep the reusable templates, references, and brand master free of task-specific output.

## Brand truth

Read [references/viaim-brand-system.md](references/viaim-brand-system.md) before changing templates, themes, colors, or logo treatment.

The only solid brand colors are:

- Signal Fog `#F2F1F1`: default page background.
- Blank State `#FFFFFF`: surfaces, cards, and text on orange.
- Vision Orange `#FF3B0F`: the only saturated accent.
- Neutral Ash `#666666`: secondary text and metadata.
- Silent Black `#000000`: primary text and dark surfaces.

Transparent derivatives of these colors are allowed for rules and overlays. Do not introduce a sixth solid color, substitute a nearby orange, or add an alternate palette.

Hard contrast rules:

- Orange surfaces use Blank State text, never black text.
- Orange text on Signal Fog is only for large numbers, short labels, and display accents; not body copy.
- Long copy belongs on Signal Fog, Blank State, or Silent Black.
- One card set uses Vision Orange as its only saturated accent.

## What to produce

- Xiaohongshu/Rednote 3:4 carousel cards (`1080 × 1440`).
- WeChat Official Account cover pairs (`2100 × 900` and `1080 × 1080`).
- X/social post cards, article covers, product-update cards, data explainers, screenshot evidence pages, and launch assets.
- Short layout-bound Live Photo packages when the user supplies video; read `references/live-photo-production.md`.

Do not use this skill for full slide decks, generic non-viaim social cards, pure photo retouching, or long-form video production.

## References

Read only what the current task needs:

- `references/viaim-brand-system.md`: mandatory for palette and logo decisions.
- `references/platform-specs.md`: ratios, dimensions, safe areas, naming.
- `references/style-system.md`: Editorial vs Swiss visual stance.
- `references/layout-recipes.md`: M01-M16 and S01-S12 page structures.
- `references/components.md`: type scale, spacing, image containers, screenshot components.
- `references/portrait-fill.md`: 3:4 density and vertical fill.
- `references/content-planning.md`: hooks, page planning, copy compression.
- `references/production-workflow.md`: project shape and rendering.
- `references/screenshot-treatment.md`: UI, dashboard, code, or product screenshots.
- `references/image-overlay.md`: text over photographs.
- `references/qa-checklist.md`: pre-delivery checks.
- `references/live-photo-production.md`: Live Photo only.
- `references/title-shortener.md`: WeChat 21:9 + 1:1 pairs.

## Workflow

### 1. Intake

Gather only missing information that changes the result:

- Target platform and ratio.
- Source text, article, product notes, or approved claims.
- Supplied photos, screenshots, or videos.
- Editorial magazine or Swiss-inspired layout preference.
- Required title, logo usage, attribution, and content constraints.

For current releases, prices, policies, or factual product claims, verify unstable facts before putting them on a card.

If the user supplies text but no visual evidence, ask once whether to use their screenshot/photo, source a web image, or generate an image. For a deliberate brand-system demo, pure type, rules, matrices, and diagrams may serve as the visual evidence; do not invent a stock-photo requirement.

### 2. Extract the story

Make an internal page plan before coding:

```text
Page 01 / role / hook / evidence / layout recipe
Page 02 / role / claim / evidence / layout recipe
...
```

For Rednote, use one idea per page. A compact demo may use 3-4 pages; ordinary posts usually use 5-9. Keep nuance in the caption/body rather than squeezing it into the poster.

### 3. Choose one structural mode

Both modes use the same fixed viaim palette:

- **Editorial Magazine**: serif display, restrained paper atmosphere, photography, pull quotes, ledgers, and marginalia.
- **Swiss-inspired**: sans-serif grid, straight modules, hairline rules, matrices, product screenshots, and data structures.

The mode changes layout and typography, not color. Do not select alternate themes. Always use `<html data-theme="viaim">`.

### 4. Copy the seed

Do not write the page from scratch:

- Editorial → copy `assets/template-editorial-card.html` to the task folder as `index.html`.
- Swiss-inspired → copy `assets/template-swiss-card.html` to the task folder as `index.html`.

The templates default to `data-theme="viaim"` and include the five semantic brand tokens. Replace the placeholder after `<!-- POSTERS_HERE -->` with layout-recipe sections.

If the official viaim logo appears, copy `assets/viaim-logo/viaim-logo-master.svg` into the task's `assets/` folder. Use it as a CSS mask with `currentColor`; never edit its paths, distort it, crop it, rotate it, or add effects. Keep `aspect-ratio:118 / 32` and at least half a logo-height of clear space.

### 5. Build and render

Recommended task shape:

```text
local-tests/<slug>/
  index.html
  assets/
  output/
```

Put task assets inside the task folder. Do not place loose generated images beside `SKILL.md`.

Install dependencies once in the skill root:

```bash
npm install
```

Render with:

```bash
node <SKILL_ROOT>/scripts/render.mjs <task-dir>
```

The renderer embeds used fonts, waits for images and effects, and writes one PNG per poster. Inspect every output at full size and phone-thumbnail size.

### 6. Image handling

- Use `.frame-shot` for UI, code, dashboards, and dense product screenshots.
- Use `.frame-img` for photos and product renders.
- Preserve screenshot text; use `object-fit:contain` when detail matters.
- Set `object-position` deliberately on every photo.
- Do not stretch, skew, or redraw evidence unless the user asks for a redesign.
- Record web image provenance in `assets/SOURCES.md` and disclose it.

### 7. QA and delivery

Before showing work, check file dimensions, title wrapping, visible overflow, image loading, logo geometry, and brand token usage. Run the deterministic brand check when templates or brand rules change:

```bash
node <SKILL_ROOT>/scripts/validate-viaim-brand.mjs
```

After rendering, show the images first. Run the slower layout validator only when the user asks for auto-check:

```bash
node <SKILL_ROOT>/validate-social-deck.mjs <task-dir>
```

Final delivery should include output paths, inline previews, dimensions, validation status, provenance, and unresolved limitations.

## Non-negotiables

- Five solid brand colors only; Vision Orange is the only saturated accent.
- Never put black text on Vision Orange.
- Never scatter raw colors through page markup; use semantic variables.
- Never mutate or redraw the logo master.
- One visual system and one accent per package.
- No fake claims, invented data, decorative blobs, meaningless badges, nested SaaS cards, or tiny mobile-unreadable copy.
- No text/image/footer collisions or accidental empty lower bands.
- 3:4 cards must occupy at least 75% of the canvas height.
- Compose 21:9 and 1:1 covers separately; never crop one into the other.
- Keep user evidence readable and do not crop faces, hardware, or key UI.
