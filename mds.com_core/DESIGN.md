---
name: Mds.com Core
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#454652'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#767683'
  outline-variant: '#c6c5d4'
  surface-tint: '#4c56af'
  primary: '#000666'
  on-primary: '#ffffff'
  primary-container: '#1a237e'
  on-primary-container: '#8690ee'
  inverse-primary: '#bdc2ff'
  secondary: '#1c3fe7'
  on-secondary: '#ffffff'
  secondary-container: '#405cff'
  on-secondary-container: '#f5f3ff'
  tertiary: '#380b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#5c1800'
  on-tertiary-container: '#e17c5a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e0e0ff'
  primary-fixed-dim: '#bdc2ff'
  on-primary-fixed: '#000767'
  on-primary-fixed-variant: '#343d96'
  secondary-fixed: '#dee0ff'
  secondary-fixed-dim: '#bbc3ff'
  on-secondary-fixed: '#000f5d'
  on-secondary-fixed-variant: '#002ccd'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#ffb59d'
  on-tertiary-fixed: '#390c00'
  on-tertiary-fixed-variant: '#7b2e12'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
  pure-black: '#000000'
  surface-white: '#FFFFFF'
  vibrant-accent: '#3D5AFE'
  deep-navy: '#1A237E'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 48px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system for this e-commerce marketplace focuses on high-trust, frictionless commerce. The brand personality is "The Professional Facilitator"—reliable, efficient, and sophisticated. It targets a modern consumer who values clarity over clutter. 

The design style is **Corporate / Modern** with a lean toward **Minimalism**. It utilizes a systematic approach to whitespace, a rigorous grid, and subtle depth to guide the user from discovery to checkout. Visual interest is generated through high-quality product photography and vibrant, purposeful interaction states rather than decorative elements.

## Colors
This design system utilizes a high-contrast palette to establish authority. 
- **Primary (Deep Navy):** Used for navigation bars, primary headings, and heavy UI elements to instill trust.
- **Secondary (Vibrant Blue):** Reserved for Actionable UI elements (CTAs, links, and active states). 
- **Neutral:** A range of cool grays starting from `#F8F9FA` for backgrounds to provide a clean canvas for product imagery. 
- **Backgrounds:** Use pure white for cards and surface containers to differentiate them from the light gray app background.

## Typography
The system uses **Hanken Grotesk** for all levels to maintain a contemporary, geometric sans-serif feel that echoes the professional "Proxima Nova" aesthetic. 
- **Hierarchy:** Use bold weights for headlines to create a clear "scan-path" for users. 
- **Readability:** Body text is kept at a comfortable 16px base with generous line-height to ensure product descriptions are easily digestible. 
- **Labels:** Small caps or increased letter spacing are used for category tags and metadata to differentiate them from interactive labels.

## Layout & Spacing
This design system employs a **12-column Fixed Grid** for desktop (max-width 1280px) and a **Fluid Grid** for mobile devices. 
- **Rhythm:** An 8px linear scale governs all padding and margins.
- **Desktop:** 12 columns with 24px gutters. Use wide 48px margins to frame the content and emphasize the premium feel.
- **Mobile:** 4 columns with 16px margins.
- **Reflow:** Product grids should transition from 4 columns (Desktop) to 2 columns (Tablet) to 1 column (Mobile) to maintain image clarity.

## Elevation & Depth
Depth is conveyed using **Tonal Layers** and **Ambient Shadows**. 
- **Level 0 (Background):** Neutral Light Gray (`#F8F9FA`).
- **Level 1 (Cards/Surfaces):** Pure White with a very soft, diffused shadow (0px 4px 20px rgba(0,0,0,0.04)).
- **Level 2 (Modals/Dropdowns):** Pure White with a more defined shadow (0px 8px 32px rgba(0,0,0,0.08)).
- **Interactions:** On hover, product cards should slightly lift (move -4px on Y-axis) and the shadow intensity should increase to provide tactile feedback.

## Shapes
The shape language is **Soft**. A 0.25rem (4px) base radius is applied to small components like checkboxes and tags, while 0.5rem (8px) is the standard for buttons and input fields. Product cards utilize 0.75rem (12px) to feel modern and approachable without appearing too "bubbly" or informal. This maintains the professional character of the marketplace.

## Components
- **Buttons:** Primary buttons use a solid Secondary Blue background with white text. Ghost buttons use a 1px border of the same blue for secondary actions.
- **Product Cards:** Feature a full-bleed image at the top, followed by a 16px padded content area. Use `headline-sm` for product titles and `body-lg` (bold) for pricing.
- **Input Fields:** Use a 1px neutral border that turns into a 2px Secondary Blue border on focus. Include a subtle transition for the label or placeholder.
- **Chips/Tags:** Used for product categories or status (e.g., "In Stock"). Use low-saturation backgrounds (e.g., light blue tint) with high-saturation text.
- **Cart & Search:** These utility components should be permanently accessible in the top-navigation, using clean iconography with a stroke weight of 2px to match the font weight.