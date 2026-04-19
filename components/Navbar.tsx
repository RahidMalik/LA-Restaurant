"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  // Your specific admin email check
  const isAdmin = session?.user?.email === "malikrahid011@gmail.com";

  return (
    <>
      <style jsx>{`
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }
        .mobile-btn {
          display: none;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          .mobile-btn {
            display: block;
          }
          .nav-container {
            padding: 0 1rem !important;
          }
        }
      `}</style>

      <nav
        className="nav-container"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          borderBottom: "1px solid var(--border)",
          background: "rgba(10,10,10,0.92)",
          backdropFilter: "blur(12px)",
          padding: "0 2rem",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.6rem",
              fontWeight: 300,
              color: "var(--gold)",
              letterSpacing: "0.12em",
            }}
          >
            LA - Restaurant
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links">
          {["Menu", "About", "Reservations"].map((item) => (
            <Link
              key={item}
              href={item === "Menu" ? "/menu" : "#"}
              style={linkStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--cream)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--muted)")
              }
            >
              {item}
            </Link>
          ))}

          {/* Admin Dashboard Link - Restricted to your email */}
          {isAdmin && (
            <Link
              href="/admin"
              style={{ ...linkStyle, color: "var(--gold)", fontWeight: "bold" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Admin
            </Link>
          )}

          {/* Authentication Logic */}
          {session ? (
            <button
              onClick={() => signOut()}
              style={outlineBtnStyle}
              onMouseEnter={btnHover}
              onMouseLeave={btnLeave}
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/login"
              style={outlineBtnStyle}
              onMouseEnter={btnHover}
              onMouseLeave={btnLeave}
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="mobile-btn"
          onClick={() => setOpen(!open)}
          style={{
            color: "var(--cream)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Dropdown */}
        {open && (
          <div
            style={{
              position: "absolute",
              top: "72px",
              left: 0,
              right: 0,
              background: "#0F0F0F",
              borderBottom: "1px solid var(--border)",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            {["Menu", "About", "Reservations"].map((item) => (
              <Link
                key={item}
                href={item === "Menu" ? "/menu" : "#"}
                onClick={() => setOpen(false)}
                style={{
                  color: "var(--cream)",
                  textDecoration: "none",
                  fontSize: "1rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {item}
              </Link>
            ))}

            {/* Admin link in mobile menu */}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                style={{
                  color: "var(--gold)",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Admin Dashboard
              </Link>
            )}

            {/* Mobile Auth link */}
            {session ? (
              <button
                onClick={() => {
                  signOut();
                  setOpen(false);
                }}
                style={{
                  ...linkStyle,
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                style={{
                  color: "var(--gold)",
                  textDecoration: "none",
                  textTransform: "uppercase",
                }}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

// --- Reusable Styles ---

const linkStyle: React.CSSProperties = {
  color: "var(--muted)",
  textDecoration: "none",
  fontSize: "0.8rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  transition: "color 0.2s",
};

const outlineBtnStyle: React.CSSProperties = {
  padding: "0.5rem 1.4rem",
  border: "1px solid var(--gold-dim)",
  background: "transparent",
  color: "var(--gold)",
  textDecoration: "none",
  fontSize: "0.75rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  transition: "all 0.2s",
  cursor: "pointer",
};

const btnHover = (e: any) => {
  e.currentTarget.style.background = "var(--gold)";
  e.currentTarget.style.color = "#0A0A0A";
};

const btnLeave = (e: any) => {
  e.currentTarget.style.background = "transparent";
  e.currentTarget.style.color = "var(--gold)";
};
