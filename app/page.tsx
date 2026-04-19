"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getFeaturedItems } from "@/lib/api";
import MenuCard from "@/components/MenuCard";
import { useEffect, useState } from "react";
import type { MenuItem } from "@/types";
export default function HomePage() {
  const [featured, setFeatured] = useState<MenuItem[]>([]);

  useEffect(() => {
    getFeaturedItems()
      .then(setFeatured)
      .catch(() => {});
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,169,110,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Top line */}
        <div
          className="fade-up"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              display: "block",
              width: "40px",
              height: "1px",
              background: "var(--gold-dim)",
            }}
          />
          <span
            style={{
              color: "var(--gold)",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            Est. 2024
          </span>
          <span
            style={{
              display: "block",
              width: "40px",
              height: "1px",
              background: "var(--gold-dim)",
            }}
          />
        </div>

        <h1
          className="fade-up fade-up-delay-1"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
            fontWeight: 300,
            lineHeight: 0.95,
            color: "var(--cream)",
            letterSpacing: "-0.01em",
            marginBottom: "1.5rem",
          }}
        >
          Lounge &amp;
          <br />
          <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
            Restaurant
          </em>
        </h1>

        <p
          className="fade-up fade-up-delay-2"
          style={{
            color: "var(--muted)",
            fontSize: "0.95rem",
            letterSpacing: "0.05em",
            maxWidth: "360px",
            lineHeight: 1.7,
            marginBottom: "2.8rem",
          }}
        >
          An exquisite culinary journey through refined flavours, crafted with
          passion and served with grace.
        </p>

        <div
          className="fade-up fade-up-delay-3"
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            href="/menu"
            style={{
              padding: "0.85rem 2.2rem",
              background: "var(--gold)",
              color: "#0A0A0A",
              textDecoration: "none",
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 500,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Explore Menu
          </Link>
          <Link
            href="#reservations"
            style={{
              padding: "0.85rem 2.2rem",
              border: "1px solid var(--border)",
              color: "var(--cream)",
              textDecoration: "none",
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "var(--gold-dim)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--border)")
            }
          >
            Reserve a Table
          </Link>
        </div>

        {/* Scroll hint */}
        {/* <div
          style={{
            position: "absolute",
            bottom: "0px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <span
            style={{
              color: "var(--muted)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background:
                "linear-gradient(to bottom, var(--gold-dim), transparent)",
            }}
          />
        </div> */}
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section
          style={{ padding: "6rem 2rem", maxWidth: "1200px", margin: "0 auto" }}
        >
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span
              style={{
                color: "var(--gold)",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              Recommended
            </span>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 300,
                color: "var(--cream)",
                marginTop: "0.5rem",
              }}
            >
              Chef's Selection
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {featured.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Info Bar */}
      <section
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "3rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            gap: "2rem",
            textAlign: "center",
          }}
        >
          {[
            { label: "Location", value: "Blue Area, Islamabad" },
            { label: "Hours", value: "12pm – 12am Daily" },
            { label: "Reservations", value: "+92 300 0000000" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p
                style={{
                  color: "var(--gold)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "0.4rem",
                }}
              >
                {label}
              </p>
              <p style={{ color: "var(--cream)", fontSize: "0.95rem" }}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "2.5rem", textAlign: "center" }}>
        <p
          style={{
            color: "var(--muted)",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
          }}
        >
          © 2026 LA-Restaurant. All rights reserved.
        </p>
      </footer>
    </>
  );
}
