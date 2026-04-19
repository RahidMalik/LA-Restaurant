# 🍽 Maison Noir — Restaurant Menu Website

A luxury restaurant menu website built with **Next.js 16.2**, **Supabase**, and **Tailwind CSS**.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Setup Supabase (Free)
1. Go to [supabase.com](https://supabase.com) → Create a free project
2. Go to **SQL Editor** → paste everything from `supabase-setup.sql` → Run it
3. Go to **Project Settings → API** → copy your URL and keys

### 3. Add environment variables
```bash
cp .env.example .env.local
# Fill in your Supabase keys in .env.local
```

### 4. Run the project
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 File Structure

```
restaurant-menu/
├── app/
│   ├── page.tsx          → Homepage (hero + featured items)
│   ├── menu/page.tsx     → Full menu with search & filter
│   └── admin/page.tsx    → Admin panel (add/delete items)
├── components/
│   ├── Navbar.tsx        → Top navigation
│   └── MenuCard.tsx      → Menu item card
├── lib/
│   ├── api.ts            → ✅ All API calls (spread file)
│   └── supabase.ts       → Supabase client
├── types/
│   └── index.ts          → TypeScript types
├── supabase-setup.sql    → DB setup — run once in Supabase
└── .env.example          → Copy to .env.local
```

---

## 🔐 Admin Panel

Go to `/admin` → Login with your Supabase auth email/password

To create an admin user:
- Supabase Dashboard → **Authentication → Users → Invite User**

### Admin Features
- ✅ Add new menu items with image upload
- ✅ Delete items
- ✅ Toggle availability (show/hide from menu)
- ✅ Toggle Chef's Pick (featured on homepage)

---

## 🌐 Deploy to Vercel (Free)

```bash
npm install -g vercel
vercel
```

Add your `.env.local` variables in Vercel → Project Settings → Environment Variables

---

## 🎨 Customization

- **Restaurant name**: Search `Maison Noir` and replace throughout
- **Colors**: Edit CSS variables in `app/globals.css`
- **Fonts**: Change Google Fonts import in `globals.css`
