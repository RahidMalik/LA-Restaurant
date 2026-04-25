# Maison Noir — Luxury Theme & Demo Data

Guidelines for maintaining the luxury aesthetic and using demo data fallbacks.

## 🎨 Luxury Theme Colors

Always use these CSS variables from `app/globals.css` for a cohesive luxury experience:

```css
--bg:       #0A0A0A;      /* Deep black background */
--surface:  #141414;      /* Slightly lighter surfaces (cards, modals) */
--border:   #222222;      /* Subtle borders */
--gold:     #C8A96E;      /* Primary luxury accent */
--gold-dim: #8A7148;      /* Muted gold (hover, secondary) */
--cream:    #F2EAD8;      /* Primary text (high contrast on black) */
--muted:    #6B6B6B;      /* Secondary text, placeholders */
--danger:   #C0392B;      /* Red for destructive actions */
```

### Usage Rules

- **Text**: Use `--cream` for primary, `--muted` for secondary (timestamps, captions)
- **Accents**: Use `--gold` for interactive elements (hover states, icons, dividers)
- **Backgrounds**: Cards and modals use `--surface`, outer page uses `--bg`
- **Shadows**: Use `rgba(200, 169, 110, 0.08)` (gold with low opacity) instead of black shadows
- **Hover states**: Dim gold (`--gold-dim`) for button/link hover, add subtle `shimmer` animation

### Typography

- **Headings**: `Cormorant Garamond` serif (elegant, luxury feel)
- **Body text**: `DM Sans` sans-serif (clean, readable)
- **Font weights**: Headings 300–600, body 300–500 (lightweight for luxury aesthetic)

---

## 📋 DEMO_ITEMS Fallbacks

When database queries fail or no real data exists, always provide `DEMO_ITEMS` as a graceful fallback to show UI functionality.

### Pattern

```typescript
// In API routes and page components
const items = data?.length > 0 ? data : DEMO_ITEMS;
```

### Example DEMO_ITEMS Structure

```typescript
const DEMO_ITEMS: MenuItem[] = [
  {
    id: 'demo-1',
    name: 'Foie Gras Terrine',
    description: 'Classic French preparation with brioche and truffle oil',
    price: 28,
    category: 'starters',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
    is_available: true,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  // ... more items
];
```

### When to Use

- Supabase connection fails or times out
- Initial page load (before data hydration)
- Test/preview environments without database access
- Development mode for UI testing

### Guidelines

- Keep DEMO_ITEMS in `lib/constants.ts` or a dedicated `lib/demo-data.ts`
- Use realistic restaurant data (luxury dining context)
- Include variety (appetizers, mains, desserts, drinks)
- Mark as demo in item names or descriptions: `[DEMO]` prefix is optional
- Always fetch real data in production and replace DEMO_ITEMS on success

---

## 🛠 Implementation Checklist

- [ ] All text colors use `--cream` or `--muted`
- [ ] All accent elements use `--gold` or `--gold-dim`
- [ ] Backgrounds use `--bg` or `--surface` (never hardcoded colors)
- [ ] Shadows use gold-based rgba instead of black
- [ ] Card hover states include `shimmer` animation or opacity change
- [ ] DEMO_ITEMS are defined and exported in `lib/` folder
- [ ] API routes/pages check `data?.length > 0` before using real data
- [ ] Fallback to DEMO_ITEMS gracefully when queries fail
- [ ] No hardcoded hex colors in component files (use CSS variables)
