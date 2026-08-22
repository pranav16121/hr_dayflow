# Dayflow HRMS — Design Tokens & UI Specs

This document serves as the official reference for the Dayflow HRMS design system. All styling rules, semantic tokens, and component specifications are configured in [tailwind.config.js](file:///D:/dayflow-frontend/tailwind.config.js) and [src/index.css](file:///D:/dayflow-frontend/src/index.css).

---

## 1. Color System (Zinc & Indigo)

We use a modern, warm neutral foundation (**Zinc**) paired with a deep, energetic **Indigo** primary accent.

### Neutral Colors (Zinc Scale)
- **Background**: `#fafafa` (Zinc-50) — Used for default page viewport background.
- **Surface**: `#ffffff` (White) — Used for card panels, inputs, selectors, and modals.
- **Border**: `rgba(228, 228, 231, 0.8)` (Zinc-200 / 80%) — Thin, translucent dividers.
- **Text (Primary)**: `#18181b` (Zinc-900) — Used for headings, strong tags, and dark text.
- **Text (Secondary)**: `#52525b` (Zinc-600) — Used for sub-labels, paragraph body, and details.
- **Text (Muted)**: `#a1a1aa` (Zinc-400) — Used for input placeholders and table headers.

### Primary Accents (Indigo Scale)
- **Primary Action (Default)**: `#4f46e5` (Indigo-600) — Main action fill for buttons.
- **Primary Hover**: `#4338ca` (Indigo-700)
- **Primary Active**: `#3730a3` (Indigo-800)
- **Primary Light**: `#f5f3ff` (Indigo-50) — Pastel fill background for alerts or badge indicators.
- **Primary Outline**: `rgba(79, 70, 229, 0.1)` — Tinted rings and focus highlights.

### Alert Colors (Success, Warning, Danger, Info)

Each alert state uses a low-intensity, high-diffusion background coupled with high-contrast text:

| Semantic State | Fill Background | Foreground Text | Usage Example |
| :--- | :--- | :--- | :--- |
| **Success** | `#f0fdf4` (Success-50) | `#047857` (Success-700) | `present` / `approved` badges |
| **Warning** | `#fffbeb` (Warning-50) | `#b45309` (Warning-700) | `half_day` / `pending` badges |
| **Danger** | `#fef2f2` (Danger-50) | `#b91c1c` (Danger-700) | `absent` / `rejected` badges |
| **Info** | `#f0f9ff` (Info-50) | `#0369a1` (Info-700) | `leave` status badges |

---

## 2. Typography

- **Font Family**: Inter, system-ui, -apple-system, sans-serif.
- **Letter Spacing**: Heading tags (`h1` through `h6`) have tightening enabled (`tracking-tight` / `-0.025em`) for modern visual aesthetics.

### Typography Hierarchy

| Style Role | Font Size | Font Weight | Color Mapping |
| :--- | :--- | :--- | :--- |
| **Page Title** | `text-2xl` (`1.5rem` / `24px`) | `font-bold` | `text-text-primary` |
| **Section Title** | `text-lg` (`1.125rem` / `18px`) | `font-semibold` | `text-text-primary` |
| **Card Title** | `text-base` (`1rem` / `16px`) | `font-semibold` | `text-text-primary` |
| **Body Text** | `text-sm` (`0.875rem` / `14px`) | `font-normal` | `text-text-secondary` |
| **Form Labels** | `text-[11px]` (`11px`) | `font-semibold` (Uppercase) | `text-text-secondary` |
| **Helper & Muted** | `text-xs` (`0.75rem` / `12px`) | `font-normal` | `text-text-muted` |

---

## 3. Border Radii & Shadows

Corner radii are proportional to outer elements to maintain visual balance:

- **Buttons & Input Controls**: `rounded-button` (`0.5rem` / `8px`)
- **Card Containers**: `rounded-card` (`0.75rem` / `12px`)
- **Modals & Overlays**: `rounded-modal` (`1rem` / `16px`)
- **Avatars & Badge Fills**: `rounded-full`

### Diffused Shadows
- **Card Shadow**: `0 1px 3px rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.02)` (Flat, modern card elevation).
- **Modal Shadow**: `0 25px 50px -12px rgba(0,0,0,0.07)` (Deep shadow highlight).
- **Subtle Outline**: `0 1px 2px rgba(0,0,0,0.02)`.

---

## 4. Spacing Rules

Spacing is standardized globally using Tailwind unit multipliers:

- **Global Page Margins**: `p-4 md:p-6 lg:p-8` — Inner content padding for viewport screen layers.
- **Card Inner Margins**: `p-6` (Content body area).
- **Table Cell Spacing**: `px-5 py-4` — Wide cell layout for grid logs.
- **Form Row Gaps**: `space-y-4` or `space-y-5` (Gaps between separate form labels).

---

## 5. Layout Dimensions (Sidebar & Navbar)

- **Sidebar Width**: `w-64` (`16rem` / `256px`) — Persistent left pane on desktop viewports.
- **Navbar Height**: `h-16` (`4rem` / `64px`) — Sticky header navigation bar.
- **Mobile Navigation Drawer**: Sidebar translates offscreen (`-translate-x-full`) and slides in over content via a menu toggle.
- **Desktop Grid Offset**: Padded via `md:pl-64` to offset page content correctly.

---

## 6. Shared Component Specifications

All UI assets are located under `src/components/` and are importable by other developers:

### Shared UI Component Files
1. **`Button`** ([`Button.tsx`](file:///D:/dayflow-frontend/src/components/ui/Button.tsx))
   - Variants: `primary`, `secondary`, `success`, `danger`, `outline`, `ghost`
   - Props: `size` (`sm`\|`md`\|`lg`), `loading` (shows rotating spinner, disables action), `icon`, `iconPosition`, `fullWidth`
2. **`Input`** ([`Input.tsx`](file:///D:/dayflow-frontend/src/components/ui/Input.tsx))
   - Features: Standard form labels, inline warning/error outline glows, support for search/mail Lucide icons.
3. **`Select`** ([`Select.tsx`](file:///D:/dayflow-frontend/src/components/ui/Select.tsx))
   - Dropdown options list wrapper.
4. **`Textarea`** ([`Textarea.tsx`](file:///D:/dayflow-frontend/src/components/ui/Textarea.tsx))
   - Multiline description text boxes.
5. **`Card`** ([`Card.tsx`](file:///D:/dayflow-frontend/src/components/ui/Card.tsx))
   - Modular blocks: `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`. Card component uses lift translation on hover state (`hover:-translate-y-0.5 hover:shadow-md`).
6. **`Badge`** ([`Badge.tsx`](file:///D:/dayflow-frontend/src/components/ui/Badge.tsx))
   - Pill-shaped category status chips.
7. **`StatusBadge`** ([`StatusBadge.tsx`](file:///D:/dayflow-frontend/src/components/ui/StatusBadge.tsx))
   - Maps employee states (`present`, `absent`, `half_day`, `leave`) and leave request states (`pending`, `approved`, `rejected`) directly.
8. **`Table`** ([`Table.tsx`](file:///D:/dayflow-frontend/src/components/ui/Table.tsx))
   - Flex grid layout elements: `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`.
9. **`Modal`** ([`Modal.tsx`](file:///D:/dayflow-frontend/src/components/ui/Modal.tsx))
   - Responsive overlay sheet with Backdrop click toggle, Esc close listeners, and dynamic footer actions.
10. **`Avatar`** ([`Avatar.tsx`](file:///D:/dayflow-frontend/src/components/ui/Avatar.tsx))
    - Image profile container with dynamic name-to-initials fallback generator (e.g. Sriram Prasad -> "SP").

### Feedback State Component Files
- **`LoadingState`** ([`LoadingState.tsx`](file:///D:/dayflow-frontend/src/components/feedback/LoadingState.tsx)) — Rotational spinning indicator.
- **`EmptyState`** ([`EmptyState.tsx`](file:///D:/dayflow-frontend/src/components/feedback/EmptyState.tsx)) — Dashed outline panel with call-to-actions.
- **`ErrorState`** ([`ErrorState.tsx`](file:///D:/dayflow-frontend/src/components/feedback/ErrorState.tsx)) — Red warning block with a Retry trigger.

