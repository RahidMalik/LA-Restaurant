"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  return (
    <>
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          textAlign: "center",
          padding: "0 1.5rem",
          position: "relative",
          overflow: "hidden",
          background: "var(--bg)", // Added variable background
        }}
      >
        {/* Decorative background gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(200,169,110,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
            opacity: 0.6,
          }}
        />

        {/* --- CONTENT WRAPPER --- */}
        <div
          style={{
            marginTop: "clamp(100px, 15vh, 160px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Est. 2026 Header */}
          <motion.div
            {...{
              ...fadeInUp,
              transition: {
                ...fadeInUp.transition,
                ease: [0.4, 0, 0.2, 1],
              },
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.2rem",
              marginBottom: "2.5rem",
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
                fontWeight: 500,
              }}
            >
              Est. 2026
            </span>
            <span
              style={{
                display: "block",
                width: "40px",
                height: "1px",
                background: "var(--gold-dim)",
              }}
            />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(3rem, 9vw, 6.5rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              color: "var(--cream)",
              letterSpacing: "-0.01em",
              marginBottom: "1.5rem",
            }}
          >
            Lounge & <br />
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
              Restaurant
            </em>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{
              color: "var(--muted)",
              fontSize: "clamp(0.9rem, 2vw, 1rem)",
              letterSpacing: "0.05em",
              maxWidth: "400px",
              lineHeight: 1.7,
              marginBottom: "3.5rem",
            }}
          >
            An exquisite culinary journey through refined flavours, crafted with
            passion and served with grace.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              display: "flex",
              gap: "1.2rem",
              flexWrap: "wrap",
              justifyContent: "center",
              paddingBottom: "4rem",
            }}
          >
            <Link
              href="/menu"
              style={{
                padding: "1rem 2.6rem",
                background: "var(--gold)",
                color: "var(--bg)", // Changed from #0A0A0A to adapt
                textDecoration: "none",
                fontSize: "0.75rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 600,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Explore Menu
            </Link>
            <Link
              href="/reservations"
              style={{
                padding: "1rem 2.6rem",
                border: "1px solid var(--border)",
                color: "var(--cream)",
                textDecoration: "none",
                fontSize: "0.75rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--gold-dim)";
                e.currentTarget.style.background = "var(--surface)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Reserve a Table
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- INFO BAR --- */}
      <section
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "5rem 2rem",
          background: "var(--surface)", // Changed from #0D0D0D
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            gap: "3rem",
            textAlign: "center",
          }}
        >
          {[
            { label: "Location", value: "B 159 Johar Hill Road, Karachi" },
            { label: "Hours", value: "12pm – 3am Daily" },
            { label: "Reservations", value: "+92 3111147647" },
          ].map(({ label, value }) => (
            <div key={label} style={{ minWidth: "250px" }}>
              <p
                style={{
                  color: "var(--gold)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  marginBottom: "0.8rem",
                  fontWeight: 600,
                }}
              >
                {label}
              </p>
              <p
                style={{
                  color: "var(--cream)",
                  fontSize: "1rem",
                  lineHeight: 1.5,
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer style={{ padding: "4rem", textAlign: "center" }}>
        <p
          style={{
            color: "var(--muted)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.5,
          }}
        >
          © 2026 LA — RESTAURANT. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </>
  );
}
