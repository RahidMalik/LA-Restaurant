"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { MenuItem } from "@/types";
import { menuApi, categoryApi } from "@/services/api";
import { Plus, Trash2, Eye, EyeOff, Star, LogOut } from "lucide-react";

const EMPTY_FORM = {
  name: "",
  description: "",
  price: 0,
  categoryId: "",
  image: "",
  isAvailable: true,
  isFeatured: false,
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  // ── Auth guard ────────────────────────────────────────
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") router.replace("/login");
    if (status === "authenticated" && !isAdmin) router.replace("/");
  }, [status, isAdmin, router]);

  useEffect(() => {
    if (status === "authenticated" && isAdmin) {
      loadItems();
      loadCategories();
    }
  }, [status, isAdmin]);

  async function loadItems() {
    try {
      const data = await menuApi.getAll();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load items:", err);
      setItems([]);
    }
  }

  async function loadCategories() {
    try {
      const data = await categoryApi.getAll();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load categories:", err);
      setCategories([]);
    }
  }
  async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Image upload failed");
    const data = await response.json();
    return data.url;
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      let imageUrl = form.image;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      await menuApi.create({
        name: form.name,
        description: form.description || null,
        price: form.price,
        categoryId: form.categoryId,
        image: imageUrl || null,
        isAvailable: form.isAvailable,
        isFeatured: form.isFeatured,
      });

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
    try {
      await menuApi.delete(id);
      loadItems();
    } catch (err: any) {
      setMsg("Error: " + err.message);
    }
  }

  async function toggleAvailability(id: string, isAvailable: boolean) {
    try {
      await menuApi.update(id, { isAvailable });
      loadItems();
    } catch (err: any) {
      setMsg("Error: " + err.message);
    }
  }

  async function toggleFeatured(id: string, isFeatured: boolean) {
    try {
      await menuApi.update(id, { isFeatured });
      loadItems();
    } catch (err: any) {
      setMsg("Error: " + err.message);
    }
  }

  // ── Loading / redirecting ─────────────────────────────
  if (status === "loading" || !isAdmin) {
    return <div style={{ background: "var(--bg)", minHeight: "100vh" }} />;
  }

  // ── Dashboard ─────────────────────────────────────────
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
          onClick={() => signOut({ callbackUrl: "/" })}
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
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              required
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              <option value="">Select Category *</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <input
              placeholder="Image URL (optional)"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              style={inputStyle}
            />
            <textarea
              placeholder="Description *"
              value={form.description || ""}
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
                  checked={form.isAvailable}
                  onChange={(e) =>
                    setForm({ ...form, isAvailable: e.target.checked })
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
                  checked={form.isFeatured}
                  onChange={(e) =>
                    setForm({ ...form, isFeatured: e.target.checked })
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
                {item.image && (
                  <img
                    src={item.image}
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
                    }}
                  >
                    Rs. {item.price.toLocaleString()}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.6rem" }}>
                  <button
                    onClick={() =>
                      toggleAvailability(item.id, !item.isAvailable)
                    }
                    style={iconBtnStyle(
                      item.isAvailable ? "var(--gold)" : "var(--muted)",
                    )}
                  >
                    {item.isAvailable ? (
                      <Eye size={15} />
                    ) : (
                      <EyeOff size={15} />
                    )}
                  </button>
                  <button
                    onClick={() => toggleFeatured(item.id, !item.isFeatured)}
                    style={iconBtnStyle(
                      item.isFeatured ? "var(--gold)" : "var(--muted)",
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
