"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import MenuCard from "@/components/MenuCard";
import { getAllMenuItems, getCategories } from "@/lib/api";
import type { MenuItem, Category } from "@/types";
import { Search } from "lucide-react";

// Fallback demo data so it looks good without DB
const DEMO_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "Seared Duck Breast",
    description:
      "Slow-roasted duck with cherry reduction, crispy shallots, and truffle-scented potato purée.",
    price: 2400,
    category: "mains",
    image_url:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    is_available: true,
    is_featured: true,
    created_at: "",
  },
  {
    id: "2",
    name: "Lobster Bisque",
    description:
      "Rich, velvety bisque with cognac-flambéed lobster, crème fraîche, and chive oil.",
    price: 1800,
    category: "starters",
    image_url:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
    is_available: true,
    is_featured: false,
    created_at: "",
  },
  {
    id: "3",
    name: "Wagyu Striploin 200g",
    description:
      "Grade A5 Wagyu with bone marrow butter, roasted garlic jus, and seasonal vegetables.",
    price: 7500,
    category: "mains",
    image_url:
      "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80",
    is_available: true,
    is_featured: true,
    created_at: "",
  },
  {
    id: "4",
    name: "Chocolate Fondant",
    description:
      "Warm dark chocolate heart with salted caramel ice cream and gold leaf.",
    price: 1200,
    category: "desserts",
    image_url:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
    is_available: true,
    is_featured: true,
    created_at: "",
  },
  {
    id: "5",
    name: "Burrata & Heritage Tomato",
    description:
      "Hand-pulled burrata with heritage tomatoes, basil oil, sea salt, and aged balsamic.",
    price: 1400,
    category: "starters",
    image_url:
      "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=600&q=80",
    is_available: true,
    is_featured: false,
    created_at: "",
  },
  {
    id: "6",
    name: "Rose Lychee Mocktail",
    description:
      "Fresh lychee juice with rose syrup, lime, and sparkling water. Refreshingly elegant.",
    price: 650,
    category: "drinks",
    image_url:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80",
    is_available: true,
    is_featured: false,
    created_at: "",
  },
];

const DEMO_CATEGORIES: Category[] = [
  { id: "all", name: "All Items", slug: "all", icon: "✦" },
  { id: "s", name: "Starters", slug: "starters", icon: "🌿" },
  { id: "m", name: "Mains", slug: "mains", icon: "🍽" },
  { id: "d", name: "Desserts", slug: "desserts", icon: "🍮" },
  { id: "dr", name: "Drinks", slug: "drinks", icon: "🥂" },
];

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>(DEMO_ITEMS);
  const [categories, setCategories] = useState<Category[]>(DEMO_CATEGORIES);
  const [active, setActive] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Menu Items Fetch
    getAllMenuItems()
      .then((data) => {
        if (data && data.length > 0) {
          setItems(data);
        } else {
          setItems(DEMO_ITEMS);
        }
      })
      .catch(() => setItems(DEMO_ITEMS));

    // Categories Fetch
    getCategories()
      .then((cats) => {
        if (cats && cats.length > 0) {
          setCategories([
            { id: "all", name: "All Items", slug: "all", icon: "✦" },
            ...cats,
          ]);
        } else {
          setCategories(DEMO_CATEGORIES);
        }
      })
      .catch(() => setCategories(DEMO_CATEGORIES));
  }, []);

  const filtered = items.filter((item) => {
    const matchCat = active === "all" || item.category === active;
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <Navbar />

      <div style={{ paddingTop: "72px", minHeight: "100vh" }}>
        {/* Page header */}
        <div
          style={{
            textAlign: "center",
            padding: "5rem 1.5rem 3rem",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <span
            style={{
              color: "var(--gold)",
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            Explore
          </span>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 300,
              color: "var(--cream)",
              marginTop: "0.3rem",
            }}
          >
            Our Menu
          </h1>
        </div>

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "3rem 1.5rem",
          }}
        >
          {/* Search */}
          <div
            style={{
              position: "relative",
              maxWidth: "420px",
              margin: "0 auto 3rem",
            }}
          >
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--muted)",
              }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dishes..."
              style={{
                width: "100%",
                padding: "0.75rem 1rem 0.75rem 2.6rem",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--cream)",
                fontSize: "0.85rem",
                outline: "none",
                letterSpacing: "0.02em",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--gold-dim)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          {/* Category Tabs */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: "3rem",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.slug)}
                style={{
                  padding: "0.5rem 1.4rem",
                  border: "1px solid",
                  borderColor:
                    active === cat.slug ? "var(--gold)" : "var(--border)",
                  background:
                    active === cat.slug
                      ? "rgba(200,169,110,0.1)"
                      : "transparent",
                  color: active === cat.slug ? "var(--gold)" : "var(--muted)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "var(--muted)",
                padding: "4rem 0",
              }}
            >
              <p>No items found.</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {filtered.map((item, i) => (
                <div
                  key={item.id}
                  className="fade-up"
                  style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}
                >
                  <MenuCard item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
