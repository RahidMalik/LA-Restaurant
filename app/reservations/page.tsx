"use client";

import Navbar from "@/components/Navbar";
import { Phone, Clock, MapPin, PhoneCall } from "lucide-react";

export default function ReservationsPage() {
  return (
    <>
      <Navbar />
      <div
        style={{
          paddingTop: "72px",
          minHeight: "100vh",
          background: "var(--bg)",
        }}
      >
        {/* ── Hero ── */}
        <div
          style={{
            textAlign: "center",
            padding: "5rem 1.5rem 4rem",
            borderBottom: "1px solid var(--border)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(200,169,110,0.07) 0%, transparent 70%)",
            }}
          />
          <span
            style={{
              color: "var(--gold)",
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            Book Your Table
          </span>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 300,
              color: "var(--cream)",
              marginTop: "0.4rem",
            }}
          >
            Reservations
          </h1>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "0.9rem",
              marginTop: "1rem",
              maxWidth: "440px",
              margin: "1rem auto 0",
              lineHeight: 1.7,
            }}
          >
            Call us directly to reserve your table. Our team is ready to assist
            you every day from 12 PM to 3 AM.
          </p>
        </div>

        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "5rem 1.5rem",
          }}
        >
          {/* ── Main Call Card ── */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              padding: "3.5rem 2.5rem",
              textAlign: "center",
              marginBottom: "2rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative corner lines */}
            <span
              style={{
                position: "absolute",
                top: "1.2rem",
                left: "1.2rem",
                display: "block",
                width: "24px",
                height: "1px",
                background: "var(--gold-dim)",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: "1.2rem",
                left: "1.2rem",
                display: "block",
                width: "1px",
                height: "24px",
                background: "var(--gold-dim)",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: "1.2rem",
                right: "1.2rem",
                display: "block",
                width: "24px",
                height: "1px",
                background: "var(--gold-dim)",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: "1.2rem",
                right: "1.2rem",
                display: "block",
                width: "1px",
                height: "24px",
                background: "var(--gold-dim)",
              }}
            />

            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                border: "1px solid var(--gold-dim)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.8rem",
                color: "var(--gold)",
              }}
            >
              <PhoneCall size={24} strokeWidth={1.5} />
            </div>

            <span
              style={{
                color: "var(--gold)",
                fontSize: "0.68rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              Call to Reserve
            </span>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                fontWeight: 300,
                color: "var(--cream)",
                margin: "0.5rem 0 0.5rem",
              }}
            >
              +92 311 1147647
            </h2>
            <p
              style={{
                color: "var(--muted)",
                fontSize: "0.85rem",
                marginBottom: "2.5rem",
              }}
            >
              Speak directly with our team — we'll confirm your table right
              away.
            </p>

            {/* Big Call Button */}
            <a
              href="tel:+923111147647"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.7rem",
                padding: "1rem 3rem",
                background: "var(--gold)",
                color: "#0A0A0A",
                textDecoration: "none",
                fontSize: "0.82rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 600,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.opacity = "0.85")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.opacity = "1")
              }
            >
              <Phone size={16} />
              Call Now
            </a>
          </div>

          {/* ── Info Cards ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem",
              marginBottom: "3rem",
            }}
          >
            {[
              {
                icon: <Clock size={18} strokeWidth={1.5} />,
                label: "Opening Hours",
                lines: ["Open Every Day", "12:00 PM – 3:00 AM"],
              },
              {
                icon: <MapPin size={18} strokeWidth={1.5} />,
                label: "Our Location",
                lines: ["B 159 Johar Hill Road", "Gulistan-e-Johar, Karachi"],
              },
              {
                icon: <Phone size={18} strokeWidth={1.5} />,
                label: "Contact",
                lines: ["+92 311 1147647", "Call or WhatsApp"],
              },
            ].map(({ icon, label, lines }) => (
              <div
                key={label}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "1.8rem 1.5rem",
                  textAlign: "center",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor =
                    "var(--gold-dim)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor =
                    "var(--border)")
                }
              >
                <div style={{ color: "var(--gold)", marginBottom: "1rem" }}>
                  {icon}
                </div>
                <p
                  style={{
                    color: "var(--gold)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    marginBottom: "0.6rem",
                  }}
                >
                  {label}
                </p>
                {lines.map((line, i) => (
                  <p
                    key={i}
                    style={{
                      color: i === 0 ? "var(--cream)" : "var(--muted)",
                      fontSize: "0.85rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* ── WhatsApp ── */}
          <div
            style={{
              border: "1px solid var(--border)",
              padding: "2rem 2.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
              background: "var(--surface)",
            }}
          >
            <div>
              <p
                style={{
                  color: "var(--cream)",
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.15rem",
                  marginBottom: "0.3rem",
                }}
              >
                Prefer WhatsApp?
              </p>
              <p style={{ color: "var(--muted)", fontSize: "0.83rem" }}>
                Send us a message and we'll get back to you shortly.
              </p>
            </div>
            <a
              href="https://wa.me/923111147647"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "0.75rem 1.8rem",
                border: "1px solid var(--gold-dim)",
                color: "var(--gold)",
                textDecoration: "none",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--gold)";
                (e.currentTarget as HTMLElement).style.color = "#0A0A0A";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "transparent";
                (e.currentTarget as HTMLElement).style.color = "var(--gold)";
              }}
            >
              Message on WhatsApp
            </a>
          </div>
        </div>

        <footer
          style={{
            padding: "2.5rem",
            textAlign: "center",
            borderTop: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              color: "var(--muted)",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
            }}
          >
            © 2026 LA — RESTAURANT. ALL RIGHTS RESERVED.
          </p>
        </footer>
      </div>
    </>
  );
}
