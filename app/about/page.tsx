"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { MapPin, Clock, Phone } from "lucide-react";
import { FaFacebook,FaInstagram } from "react-icons/fa";


export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "72px", minHeight: "100vh", background: "var(--bg)" }}>

        {/* ── Hero ── */}
        <div style={{
          textAlign: "center", padding: "5rem 1.5rem 4rem",
          borderBottom: "1px solid var(--border)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(200,169,110,0.07) 0%, transparent 70%)",
          }} />
          <span style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>
            Our Story
          </span>
          <h1 style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 300, color: "var(--cream)", marginTop: "0.4rem",
          }}>
            About Us
          </h1>
        </div>

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 1.5rem" }}>

          {/* ── Story + Info Grid ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "4rem", alignItems: "start", marginBottom: "5rem",
          }}>
            {/* Left — Story */}
            <div>
              <span style={{ display: "block", width: "40px", height: "1px", background: "var(--gold)", marginBottom: "1.5rem" }} />
              <h2 style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 300, color: "var(--cream)", marginBottom: "1.5rem", lineHeight: 1.2,
              }}>
                Savor the Flavor,<br />
                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Feel the Vibe</em>
              </h2>
              <p style={{ color: "var(--muted)", fontSize: "0.92rem", lineHeight: 1.85, marginBottom: "1.2rem" }}>
                LA Lounge & Restaurant is Karachi's premier dining destination, nestled in the heart of Gulistan-e-Johar. We bring together the finest flavours, a vibrant atmosphere, and an experience that stays with you long after the last bite.
              </p>
              <p style={{ color: "var(--muted)", fontSize: "0.92rem", lineHeight: 1.85, marginBottom: "1.2rem" }}>
                From our expertly crafted breakfast selections to late-night indulgences, every dish is prepared with passion, precision, and the finest ingredients — because you deserve nothing less.
              </p>
              <p style={{ color: "var(--muted)", fontSize: "0.92rem", lineHeight: 1.85 }}>
                Whether you're here for a quiet breakfast, a business lunch, or a memorable evening out, LA Lounge is where moments become memories.
              </p>
            </div>

            {/* Right — Info Card */}
            <div style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.8rem",
            }}>
              {[
                { icon: <MapPin size={16} />, label: "Location", value: "B 159 Johar Hill Road, Gulistan-e-Johar, Karachi, Pakistan" },
                { icon: <Clock size={16} />, label: "Hours", value: "Open Daily · 12:00 PM – 3:00 AM" },
                { icon: <Phone size={16} />, label: "Phone", value: "+92 311 1147647" },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--gold)", marginTop: "2px", flexShrink: 0 }}>{icon}</span>
                  <div>
                    <p style={{ color: "var(--gold)", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.3rem" }}>
                      {label}
                    </p>
                    <p style={{ color: "var(--cream)", fontSize: "0.88rem", lineHeight: 1.5 }}>{value}</p>
                  </div>
                </div>
              ))}

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem", display: "flex", gap: "1rem" }}>
                <a href="https://www.instagram.com/laloungeandrestaurant" target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--muted)", textDecoration: "none", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                >
                  <FaInstagram size={14} /> Instagram
                </a>
                <a href="https://www.facebook.com/laloungeandrestaurant" target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--muted)", textDecoration: "none", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                >
                  <FaFacebook size={14} /> Facebook
                </a>
              </div>
            </div>
          </div>

          {/* ── Values ── */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>
              What We Stand For
            </span>
            <h2 style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 300, color: "var(--cream)", marginTop: "0.4rem",
            }}>
              The LA Experience
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "5rem" }}>
            {[
              { title: "Finest Ingredients", desc: "Every dish is crafted using hand-selected, fresh ingredients sourced for quality and flavour. We never compromise on what goes on your plate." },
              { title: "Vibrant Atmosphere", desc: "From the ambient lighting to the curated music — every detail of our space is designed to make you feel relaxed, welcomed, and at home." },
              { title: "Expert Craftsmanship", desc: "Our kitchen team brings years of culinary expertise, blending international techniques with local flavours to create unforgettable dishes." },
              { title: "Late Night Dining", desc: "Open until 3 AM — because great food and good company have no curfew. We're here whenever the craving strikes." },
            ].map(({ title, desc }) => (
              <div key={title} style={{
                background: "var(--surface)", border: "1px solid var(--border)",
                padding: "2rem", transition: "border-color 0.3s",
              }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--gold-dim)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
              >
                <span style={{ display: "block", width: "28px", height: "1px", background: "var(--gold)", marginBottom: "1.2rem" }} />
                <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--cream)", marginBottom: "0.8rem" }}>
                  {title}
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "0.83rem", lineHeight: 1.75 }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div style={{ textAlign: "center", padding: "3.5rem 2rem", border: "1px solid var(--border)", background: "var(--surface)" }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 300, color: "var(--cream)", marginBottom: "1rem" }}>
              Ready to Experience LA?
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "0.88rem", marginBottom: "2rem" }}>
              Come visit us or explore our full menu — we'd love to have you.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/menu" style={{
                padding: "0.85rem 2.2rem", background: "var(--gold)", color: "#0A0A0A",
                textDecoration: "none", fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500,
              }}>
                View Menu
              </Link>
              <Link href="/reservations" style={{
                padding: "0.85rem 2.2rem", border: "1px solid var(--border)", color: "var(--cream)",
                textDecoration: "none", fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase",
              }}>
                Reserve a Table
              </Link>
            </div>
          </div>
        </div>

        <footer style={{ padding: "2.5rem", textAlign: "center", borderTop: "1px solid var(--border)" }}>
          <p style={{ color: "var(--muted)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
            © 2026 LA — RESTAURANT. ALL RIGHTS RESERVED.
          </p>
        </footer>
      </div>
    </>
  );
}