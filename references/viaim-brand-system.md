# viaim Social Card Brand System

This file is the color and logo source of truth for viaim social cards.

## Five-color palette

| Token | Value | Social-card role |
| --- | --- | --- |
| Signal Fog | `#F2F1F1` | default board background and quiet sections |
| Blank State | `#FFFFFF` | cards, image stages, and text on orange |
| Vision Orange | `#FF3B0F` | the only saturated accent |
| Neutral Ash | `#666666` | metadata, secondary copy, captions |
| Silent Black | `#000000` | main copy and dark surfaces |

Use these semantic variables:

```css
--brand-signal-fog:#F2F1F1;
--brand-blank-state:#FFFFFF;
--brand-vision-orange:#FF3B0F;
--brand-neutral-ash:#666666;
--brand-silent-black:#000000;

--paper:var(--brand-signal-fog);
--paper-2:var(--brand-blank-state);
--ink:var(--brand-silent-black);
--muted:var(--brand-neutral-ash);
--accent:var(--brand-vision-orange);
--accent-on:var(--brand-blank-state);
```

Transparent derivatives of the five colors may be used for hairlines, overlays, and disabled states. Do not add another solid grey or a near-orange.

## Contrast and area

- Vision Orange is the only high-saturation area.
- Orange background always uses Blank State text. Black-on-orange is forbidden.
- White on Vision Orange is approximately `3.57:1`; use it for large display titles and short labels, not long body copy.
- Vision Orange text on Signal Fog is approximately `3.12:1`; use it for large numbers, short labels, and diagram marks only.
- Neutral Ash is safe for ordinary secondary copy on Signal Fog or Blank State.
- Long text belongs on Signal Fog, Blank State, or Silent Black.

## Light and dark rhythm

Light cards use Signal Fog as the board and Blank State as the raised surface. Dark cards use Silent Black as the board, Blank State for primary text, Neutral Ash for secondary text when contrast remains readable, and Vision Orange for one signal.

Do not invent a separate dark orange or dark-grey palette. Rhythm comes from the five colors and their transparent derivatives.

## Logo

The geometry source is `assets/viaim-logo/viaim-logo-master.svg`.

- Preserve the SVG bytes and paths.
- Keep `aspect-ratio:118 / 32`.
- Allow only proportional scaling and one of the five brand colors.
- Keep at least half a logo-height of clear space.
- Do not crop, rotate, skew, outline, shadow, or redraw the logo.

Recommended task-folder usage:

```css
.brand-logo{
  display:block;
  width:118px;
  aspect-ratio:118 / 32;
  color:var(--brand-vision-orange);
  background:currentColor;
  -webkit-mask:url("assets/viaim-logo-master.svg") center / contain no-repeat;
  mask:url("assets/viaim-logo-master.svg") center / contain no-repeat;
}
```

## Layout modes

The five-color system is fixed across both modes:

- Editorial: Signal Fog replaces warm paper; Blank State supports photo wells; Vision Orange marks issue labels, pull-quote rules, and one focal phrase.
- Swiss-inspired: Signal Fog is the board; Blank State is the surface; Silent Black and Neutral Ash form the text hierarchy; Vision Orange is the single accent block or data signal.

Do not select alternate blue, yellow, green, orange, indigo, forest, kraft, dune, or midnight themes in viaim-branded work.
