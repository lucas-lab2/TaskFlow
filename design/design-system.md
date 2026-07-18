# TaskFlow — Design System

## Overview

This document defines the visual design language for the TaskFlow application. It serves as the single source of truth for all design decisions including colors, typography, spacing, and component styles.

---

## 🎨 Color Schema

### Primary Palette

| Color | Hex | HSL | Usage |
|-------|-----|-----|-------|
| **Indigo 50** | `#EEF2FF` | `226 100% 97%` | Backgrounds, hover states |
| **Indigo 100** | `#E0E7FF` | `226 100% 94%` | Light backgrounds |
| **Indigo 200** | `#C7D2FE` | `226 100% 89%` | Borders, dividers |
| **Indigo 400** | `#818CF8` | `235 82% 75%` | Secondary buttons, links |
| **Indigo 500** | `#6366F1` | `239 84% 67%` | Interactive elements |
| **Indigo 600** | `#4F46E5` | `245 58% 51%` | **Primary brand color** |
| **Indigo 700** | `#4338CA` | `243 55% 41%` | Primary hover states |
| **Indigo 800** | `#3730A3` | `244 47% 20%` | Dark accents |
| **Indigo 900** | `#312E81` | `242 47% 34%` | Deep backgrounds |

### Secondary Palette (Teal/Cyan)

| Color | Hex | Usage |
|-------|-----|-------|
| **Cyan 50** | `#ECFEFF` | Light backgrounds |
| **Cyan 100** | `#CFFAFE` | Subtle highlights |
| **Cyan 400** | `#22D3EE` | Secondary accents |
| **Cyan 500** | `#06B6D4` | **Secondary brand color** |
| **Cyan 600** | `#0891B2` | Secondary hover |
| **Cyan 700** | `#0E7490` | Deep secondary |

### Accent Palette (Amber)

| Color | Hex | Usage |
|-------|-----|-------|
| **Amber 50** | `#FFFBEB` | Warning backgrounds |
| **Amber 100** | `#FEF3C7` | Light warning |
| **Amber 400** | `#FBBF24` | Attention indicators |
| **Amber 500** | `#F59E0B` | **Accent/Warning color** |
| **Amber 600** | `#D97706` | Warning hover |

### Semantic Colors

| Purpose | Color | Hex | Usage |
|---------|-------|-----|-------|
| ✅ Success | Green | `#10B981` | Completed tasks, success messages |
| ⚠️ Warning | Amber | `#F59E0B` | Approaching deadlines, warnings |
| ❌ Error | Red | `#EF4444` | Overdue tasks, error messages |
| ℹ️ Info | Blue | `#3B82F6` | Information notices |

### Neutral Palette (Slate)

| Color | Hex | Usage |
|-------|-----|-------|
| **Slate 50** | `#F8FAFC` | Page background |
| **Slate 100** | `#F1F5F9` | Card backgrounds |
| **Slate 200** | `#E2E8F0` | Borders, dividers |
| **Slate 300** | `#CBD5E1` | Disabled states |
| **Slate 400** | `#94A3B8` | Placeholder text |
| **Slate 500** | `#64748B` | Secondary text |
| **Slate 700** | `#334155` | Body text |
| **Slate 800** | `#1E293B` | Headings |
| **Slate 900** | `#0F172A` | Primary text, dark backgrounds |

---

## 🔤 Typography

### Font Family

- **Primary Font**: [Inter](https://fonts.google.com/specimen/Inter) — A highly legible, modern sans-serif designed for screens
- **Monospace**: `JetBrains Mono` or system monospace — For code and technical content
- **Fallback Stack**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

### Type Scale

| Element | Size | Weight | Line Height | Letter Spacing | Tailwind Class |
|---------|------|--------|-------------|----------------|----------------|
| Display | 3rem (48px) | 800 (Extra Bold) | 1.1 | -0.02em | `text-5xl font-extrabold` |
| H1 | 2.25rem (36px) | 700 (Bold) | 1.2 | -0.02em | `text-4xl font-bold` |
| H2 | 1.875rem (30px) | 700 (Bold) | 1.3 | -0.01em | `text-3xl font-bold` |
| H3 | 1.5rem (24px) | 600 (Semibold) | 1.4 | 0 | `text-2xl font-semibold` |
| H4 | 1.25rem (20px) | 600 (Semibold) | 1.4 | 0 | `text-xl font-semibold` |
| Body Large | 1.125rem (18px) | 400 (Regular) | 1.6 | 0 | `text-lg` |
| Body | 1rem (16px) | 400 (Regular) | 1.6 | 0 | `text-base` |
| Body Small | 0.875rem (14px) | 400 (Regular) | 1.5 | 0 | `text-sm` |
| Caption | 0.75rem (12px) | 500 (Medium) | 1.5 | 0.01em | `text-xs font-medium` |

---

## 📐 Layout System

### Page Structure

```
┌──────────────────────────────────────────────────┐
│                    Top Nav Bar                    │
├──────────┬───────────────────────────────────────┤
│          │                                       │
│  Sidebar │          Main Content Area            │
│   Nav    │                                       │
│  (240px) │    ┌─────────────┬─────────────┐     │
│          │    │   Card      │   Card      │     │
│  • Dash  │    │             │             │     │
│  • Proj  │    └─────────────┴─────────────┘     │
│  • Tasks │                                       │
│  • Team  │    ┌───────────────────────────┐     │
│  • Sett  │    │      Content Area         │     │
│          │    │                           │     │
│          │    └───────────────────────────┘     │
│          │                                       │
└──────────┴───────────────────────────────────────┘
```

### Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | `< 640px` | Single column, hidden sidebar |
| Tablet | `640px - 1024px` | Collapsible sidebar |
| Desktop | `> 1024px` | Full sidebar + content |

### Spacing Scale (4px base unit)

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight spacing (icon gaps) |
| `space-2` | 8px | Small spacing (between related elements) |
| `space-3` | 12px | Medium-small spacing |
| `space-4` | 16px | Standard spacing (card padding) |
| `space-5` | 20px | Medium spacing |
| `space-6` | 24px | Section spacing |
| `space-8` | 32px | Large spacing |
| `space-10` | 40px | Section dividers |
| `space-12` | 48px | Page padding |
| `space-16` | 64px | Major section dividers |

---

## 🧩 Component Design

### Buttons

| Variant | Background | Text | Border | Usage |
|---------|-----------|------|--------|-------|
| **Primary** | Indigo 600 | White | None | Main actions (Create, Save) |
| **Secondary** | White | Indigo 600 | Indigo 200 | Secondary actions (Cancel) |
| **Danger** | Red 500 | White | None | Destructive actions (Delete) |
| **Ghost** | Transparent | Slate 700 | None | Tertiary actions |
| **Disabled** | Slate 200 | Slate 400 | None | Inactive state |

**Button Specs:**
- Border Radius: `8px` (`rounded-lg`)
- Padding: `10px 20px` (default), `8px 16px` (small), `12px 24px` (large)
- Font Weight: 600 (Semibold)
- Transition: `all 150ms ease`
- Hover: Darken background by one shade, slight scale (`scale-[1.02]`)
- Focus: Ring `2px` Indigo 400 with `2px` offset

### Cards

- Background: White (`#FFFFFF`)
- Border: `1px solid` Slate 200
- Border Radius: `12px` (`rounded-xl`)
- Padding: `24px`
- Shadow: `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)` (`shadow-md`)
- Hover Shadow: `0 4px 6px rgba(0,0,0,0.1)` (`shadow-lg`)
- Transition: `shadow 200ms ease`

### Task Priority Badges

| Priority | Background | Text | Icon |
|----------|-----------|------|------|
| 🔴 Urgent | Red 100 | Red 700 | Exclamation |
| 🟠 High | Amber 100 | Amber 700 | Arrow Up |
| 🔵 Medium | Blue 100 | Blue 700 | Minus |
| 🟢 Low | Green 100 | Green 700 | Arrow Down |

### Task Status Badges

| Status | Background | Text |
|--------|-----------|------|
| To Do | Slate 100 | Slate 600 |
| In Progress | Cyan 100 | Cyan 700 |
| In Review | Amber 100 | Amber 700 |
| Done | Green 100 | Green 700 |

### Form Inputs

- Border: `1px solid` Slate 300
- Border Radius: `8px`
- Padding: `10px 14px`
- Focus Border: Indigo 500
- Focus Ring: `3px` Indigo 100
- Error Border: Red 500
- Placeholder Color: Slate 400
- Font Size: 16px (prevents zoom on mobile)

---

## 🎯 Design Principles

1. **Clarity First**: Information hierarchy should be immediately obvious
2. **Consistent Spacing**: Use the 4px grid system for all spacing
3. **Accessible Contrast**: Maintain WCAG AA contrast ratios (4.5:1 minimum)
4. **Progressive Disclosure**: Show essential info first, details on demand
5. **Responsive Always**: Every component must work on mobile and desktop
6. **Subtle Animation**: Use micro-animations for state changes (150-300ms)

---

## 📎 Visual Reference

See [color-palette.html](./color-palette.html) for a live visual preview of the design system.
