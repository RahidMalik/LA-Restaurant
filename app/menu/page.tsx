"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import MenuCard from "@/components/MenuCard";
import type { MenuItem, Category } from "@/types";
import {
  Search,
  Grid2X2,
  Sun,
  Leaf,
  Utensils,
  Cookie,
  Coffee,
  Droplets,
  FlaskConical,
  X,
  type LucideIcon,
} from "lucide-react";

import { DEMO_ITEMS, DEMO_CATEGORIES } from "@/data/Menuitems";

interface MenuPageProps {
  name: string;
  slug?: string;
  size?: number;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Grid2X2,
  Sun,
  Leaf,
  Utensils,
  Cookie,
  Coffee,
  Droplets,
  FlaskConical,
};

const SLUG_ICON: Record<string, string> = {
  all: "Grid2X2",
  breakfast: "Sun",
  starters: "Leaf",
  mains: "Utensils",
  desserts: "Cookie",
  drinks: "Coffee",
  soft: "Droplets",
  lassi: "FlaskConical",
};

function CategoryIcon({ name, slug, size = 13 }: Readonly<MenuPageProps>) {
  const iconName = ICON_MAP[name] ? name : slug ? SLUG_ICON[slug] : undefined;
  const Icon = iconName ? ICON_MAP[iconName] : undefined;
  return Icon ? <Icon size={size} strokeWidth={1.5} /> : null;
}

export default function MenuPage() {
  const [items] = useState<MenuItem[]>(DEMO_ITEMS);
  const [categories] = useState<Category[]>(DEMO_CATEGORIES);
  const [active, setActive] = useState("all");

  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchCat = active === "all" || item.categoryId === active;
      const matchSearch =
        item.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        item.description?.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [items, active, debouncedSearch]);

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
          <p
            style={{
              color: "var(--muted)",
              fontSize: "0.85rem",
              marginTop: "0.8rem",
            }}
          >
            All prices are subject to tax · 10% service charge applies
          </p>
        </div>

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "3rem 1.5rem",
          }}
        >
          {/* Search with Clear Button */}
          <div
            style={{
              position: "relative",
              maxWidth: "420px",
              margin: "0 auto 2.5rem",
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
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search dishes..."
              style={{
                width: "100%",
                padding: "0.75rem 2.6rem",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--cream)",
                fontSize: "0.85rem",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--gold-dim)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
            {/* Clear Button logic */}
            {searchInput && (
              <X
                size={16}
                onClick={() => setSearchInput("")}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--muted)",
                  cursor: "pointer",
                }}
              />
            )}
          </div>

          {/* Category Tabs */}
          <div
            style={{
              display: "flex",
              gap: "0.8rem",
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
                  padding: "0.5rem 1.2rem",
                  border: "1px solid",
                  minWidth: "140px",
                  justifyContent: "center",
                  borderColor:
                    active === cat.slug ? "var(--gold)" : "var(--border)",
                  background:
                    active === cat.slug
                      ? "rgba(200,169,110,0.1)"
                      : "transparent",
                  color: active === cat.slug ? "var(--gold)" : "var(--muted)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <CategoryIcon name={cat.icon} slug={cat.slug} />
                {cat.name}
              </button>
            ))}
          </div>

          {/* Result count */}
          <p
            style={{
              color: "var(--muted)",
              fontSize: "0.78rem",
              letterSpacing: "0.08em",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            {filtered.length} {filtered.length === 1 ? "item" : "items"}
            {active !== "all"
              ? ` in ${categories.find((c) => c.slug === active)?.name}`
              : ""}
          </p>

          {/* Items Grid with Animation */}
          <motion.div
            layout // Smooth transition for items moving
            className="grid grid-cols-1 min-[600px]:grid-cols-2 md:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    gridColumn: "1 / -1",
                    textAlign: "center",
                    color: "var(--muted)",
                    padding: "4rem 0",
                  }}
                >
                  <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>✦</p>
                  <p>No items found.</p>
                </motion.div>
              ) : (
                filtered.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MenuCard item={item} />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
}
