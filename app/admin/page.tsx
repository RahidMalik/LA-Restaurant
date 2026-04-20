"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react"; // Replaced sessionStorage logic
import type { MenuItem } from "@/types";
import {
  getAllMenuItems,
  addMenuItem,
  deleteMenuItem,
  toggleItemAvailability,
  toggleFeatured,
  uploadItemImage,
} from "@/lib/api";
import { Plus, Trash2, Eye, EyeOff, Star, LogOut, ChefHat } from "lucide-react";

const EMPTY_FORM = {
  name: "",
  description: "",
  price: 0,
  category: "mains",
  image_url: "",
  is_available: true,
  is_featured: false,
};

export default function AdminPage() {
  const { data: session, status } = useSession(); // NextAuth Session
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [items, setItems] = useState<MenuItem[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Load items only when authenticated via NextAuth
  useEffect(() => {
    if (status === "authenticated") {
      loadItems();
    }
  }, [status]);

  async function loadItems() {
    try {
      setItems(await getAllMenuItems());
    } catch {}
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginErr("");

    // Call NextAuth Sign-In
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Keep them on the same page to show error if needed
    });

    if (res?.error) {
      setLoginErr("Invalid email or password.");
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      let imageUrl = form.image_url;
      if (imageFile) imageUrl = await uploadItemImage(imageFile, form.name);
      await addMenuItem({ ...form, image_url: imageUrl });
      setForm(EMPTY_FORM);
      setImageFile(null);
      setMsg("✓ Item added successfully");
      loadItems();
    } catch (err: any) {
      setMsg("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"?`)) return;
    await deleteMenuItem(id);
    loadItems();
  }

  // ── Login Screen (Design preserved exactly) ────────────────────────
  if (status === "unauthenticated" || status === "loading") {
    if (status === "loading")
      return <div style={{ background: "var(--bg)", minHeight: "100vh" }} />;

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "380px",
            border: "1px solid var(--border)",
            padding: "3rem 2.5rem",
            background: "var(--surface)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <ChefHat
              size={32}
              style={{ color: "var(--gold)", marginBottom: "1rem" }}
            />
            <h1
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.8rem",
                fontWeight: 300,
                color: "var(--cream)",
              }}
            >
              Admin Panel
            </h1>
            <p
              style={{
                color: "var(--muted)",
                fontSize: "0.8rem",
                marginTop: "0.3rem",
              }}
            >
              LA - Restaurant
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
            {loginErr && (
              <p style={{ color: "#C0392B", fontSize: "0.8rem" }}>{loginErr}</p>
            )}
            <button type="submit" style={goldBtnStyle}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard (Design preserved exactly) ─────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Top bar */}
      <div
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "1.3rem",
            color: "var(--gold)",
          }}
        >
          LA - Restaurant — Admin
        </span>
        <button
          onClick={() => signOut()}
          style={{
            background: "none",
            border: "1px solid var(--border)",
            color: "var(--muted)",
            cursor: "pointer",
            padding: "0.4rem 1rem",
            fontSize: "0.75rem",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          <LogOut size={14} /> Logout
        </button>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
        }}
      >
        {/* Add Item Form */}
        <div
          style={{
            border: "1px solid var(--border)",
            background: "var(--surface)",
            padding: "2rem",
          }}
        >
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.5rem",
              fontWeight: 300,
              color: "var(--cream)",
              marginBottom: "1.8rem",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <Plus size={18} style={{ color: "var(--gold)" }} /> Add New Item
          </h2>

          <form
            onSubmit={handleAdd}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            <input
              placeholder="Item Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              style={inputStyle}
            />
            <input
              placeholder="Price (Rs.) *"
              type="number"
              value={form.price || ""}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
              required
              style={inputStyle}
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              {["starters", "mains", "desserts", "drinks", "sides"].map((c) => (
                <option key={c} value={c}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
            <input
              placeholder="Image URL (optional)"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              style={inputStyle}
            />
            <textarea
              placeholder="Description *"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
              rows={3}
              style={{
                ...inputStyle,
                gridColumn: "1 / -1",
                resize: "vertical",
              }}
            />
            <div style={{ gridColumn: "1 / -1" }}>
              <label
                style={{
                  color: "var(--muted)",
                  fontSize: "0.78rem",
                  display: "block",
                  marginBottom: "0.4rem",
                }}
              >
                OR Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                style={{ color: "var(--muted)", fontSize: "0.8rem" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                alignItems: "center",
                gridColumn: "1 / -1",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  color: "var(--muted)",
                  fontSize: "0.82rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={form.is_available}
                  onChange={(e) =>
                    setForm({ ...form, is_available: e.target.checked })
                  }
                />
                Available
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  color: "var(--muted)",
                  fontSize: "0.82rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={form.is_featured}
                  onChange={(e) =>
                    setForm({ ...form, is_featured: e.target.checked })
                  }
                />
                Chef's Pick
              </label>
            </div>
            <div
              style={{
                gridColumn: "1 / -1",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <button type="submit" disabled={loading} style={goldBtnStyle}>
                {loading ? "Adding..." : "Add to Menu"}
              </button>
              {msg && (
                <span
                  style={{
                    color: msg.startsWith("Error") ? "#C0392B" : "var(--gold)",
                    fontSize: "0.82rem",
                  }}
                >
                  {msg}
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Items List */}
        <div>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.5rem",
              fontWeight: 300,
              color: "var(--cream)",
              marginBottom: "1.5rem",
            }}
          >
            Menu Items ({items.length})
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {items.length === 0 && (
              <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
                No items yet. Add one above!
              </p>
            )}
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "1.2rem 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1.2rem",
                  flexWrap: "wrap",
                }}
              >
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                )}
                <div style={{ flex: 1, minWidth: "160px" }}>
                  <p
                    style={{
                      color: "var(--cream)",
                      fontSize: "0.95rem",
                      fontFamily: "Cormorant Garamond, serif",
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: "0.75rem",
                      textTransform: "capitalize",
                    }}
                  >
                    {item.category} · Rs. {item.price.toLocaleString()}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.6rem" }}>
                  <button
                    onClick={() =>
                      toggleItemAvailability(item.id, !item.is_available).then(
                        () => loadItems(),
                      )
                    }
                    title={item.is_available ? "Hide" : "Show"}
                    style={iconBtnStyle(
                      item.is_available ? "var(--gold)" : "var(--muted)",
                    )}
                  >
                    {item.is_available ? (
                      <Eye size={15} />
                    ) : (
                      <EyeOff size={15} />
                    )}
                  </button>
                  <button
                    onClick={() =>
                      toggleFeatured(item.id, !item.is_featured).then(() =>
                        loadItems(),
                      )
                    }
                    title="Toggle Featured"
                    style={iconBtnStyle(
                      item.is_featured ? "var(--gold)" : "var(--muted)",
                    )}
                  >
                    <Star size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    style={iconBtnStyle("#C0392B")}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Styles (Preserved exactly) ────────────────────────
const inputStyle: React.CSSProperties = {
  background: "var(--bg)",
  border: "1px solid var(--border)",
  color: "var(--cream)",
  padding: "0.7rem 1rem",
  fontSize: "0.85rem",
  outline: "none",
  width: "100%",
  fontFamily: "DM Sans, sans-serif",
};

const goldBtnStyle: React.CSSProperties = {
  padding: "0.75rem 2rem",
  background: "var(--gold)",
  color: "#0A0A0A",
  border: "none",
  cursor: "pointer",
  fontSize: "0.78rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontWeight: 500,
};

const iconBtnStyle = (color: string): React.CSSProperties => ({
  background: "none",
  border: "1px solid var(--border)",
  color,
  cursor: "pointer",
  padding: "0.45rem",
  display: "flex",
  alignItems: "center",
});
