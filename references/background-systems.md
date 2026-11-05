# Background Systems

The viaim Editorial mode uses restrained ink-flow, contour, and paper atmosphere. Static Rednote and WeChat images should preserve that feeling without introducing extra solid colors.

Do not reduce this mode to a flat beige page with a faint grid. Do not add visible grid, dot-matrix, or drafting-paper patterns to the background.

## Layer Model

Use 3-4 layers:

1. Paper base from `theme-presets.md`.
2. Procedural paper grain.
3. Token-driven ink wash or contour field.
4. Optional hairline structure as content dividers only, not as a page-wide background grid.
5. Content layer.

Recommended CSS order:

```html
<section class="poster magazine hero">
  <div class="grain"></div>
  <div class="paper-wash"></div>
  <div class="ink-vignette"></div>
  <div class="content">...</div>
</section>
```

```css
.poster { position: relative; overflow: hidden; background: var(--paper); }
.grain {
  position:absolute; inset:0; z-index:1; pointer-events:none;
  opacity:.12; mix-blend-mode:multiply;
  background:
    linear-gradient(112deg, rgba(0,0,0,.035), transparent 26%, rgba(255,255,255,.16) 52%, transparent 82%),
    radial-gradient(circle at 18% 22%, rgba(var(--ink-rgb),.05), transparent 38%),
    radial-gradient(circle at 78% 84%, rgba(var(--accent-rgb),.045), transparent 42%);
}
.ink-vignette {
  position:absolute; inset:0; z-index:2; pointer-events:none;
  background:
    radial-gradient(circle at 18% 12%, rgba(var(--ink-rgb),.10), transparent 34%),
    radial-gradient(circle at 82% 80%, rgba(var(--accent-rgb),.10), transparent 38%);
}
.content { position:relative; z-index:3; }
```

## When To Increase Atmosphere

Use stronger visible atmosphere for:

- Cover.
- Chapter/divider.
- Pull quote.
- Sparse thesis page.
- Closing page.

Use subtle atmosphere for:

- Screenshot pages.
- Dense ledgers.
- Checklists.
- Product evidence pages.

If screenshots are the main evidence, the background should support them rather than compete with them.

## Token-driven atmosphere

The Editorial seed already includes `.grain`, `.paper-wash`, and `.ink-vignette`. Adjust their opacity locally when a cover or pull quote needs more atmosphere. All colors must continue to derive from `--ink-rgb`, `--paper-rgb`, and `--accent-rgb`; do not add embedded artwork or another palette.

## Do Not

- Do not use bright gradients.
- Do not use page-wide grid, dot-matrix, graph-paper, or drafting-paper backgrounds.
- Do not use decorative blobs or circles with no relationship to the layout.
- Do not place strong background marks behind body text.
- Do not let atmosphere layers obscure screenshots or small captions.
- Do not animate the final image sequence unless the task is video.
