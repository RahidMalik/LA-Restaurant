"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  UtensilsCrossed,
  Info,
  CalendarDays,
  LayoutDashboard,
  LogIn,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const { theme, toggle } = useTheme();

  const isLoading = status === "loading";
  const isAdmin = session?.user?.email
    ? session.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
    : false;

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (open && (e.target as HTMLElement).id === "menu-backdrop") {
        closeMenu();
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [open]);

  const navLinks = [
    { name: "Menu", href: "/menu", icon: <UtensilsCrossed size={16} /> },
    { name: "About", href: "/about", icon: <Info size={16} /> },
    {
      name: "Reservations",
      href: "/reservations",
      icon: <CalendarDays size={16} />,
    },
  ];

  const desktopButtonStyle = {
    padding: "0.5rem 1.4rem",
    border: "1px solid var(--gold-dim)",
    color: "var(--gold)",
    textDecoration: "none",
    fontSize: "0.75rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    transition: "all 0.2s",
    background: "transparent",
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          borderBottom: "1px solid var(--border)",
          background: "var(--nav-bg)",
          backdropFilter: "blur(12px)",
          padding: "0 2rem",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          style={{ textDecoration: "none", flexShrink: 0 }}
        >
          <span
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.5rem",
              fontWeight: 300,
              color: "var(--gold)",
              letterSpacing: "0.12em",
            }}
          >
            Lounge & Restaurant
          </span>
        </Link>

        {/* --- DESKTOP MENU --- */}
        <div
          className="hidden lg:flex"
          style={{ alignItems: "center", gap: "2rem" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              style={{
                color: "var(--muted)",
                textDecoration: "none",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--cream)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--muted)")
              }
            >
              {link.icon}
              {link.name}
            </Link>
          ))}

          {!isLoading && isAdmin && (
            <Link
              href="/admin"
              style={{
                color: "var(--gold)",
                textDecoration: "none",
                fontSize: "0.75rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <LayoutDashboard size={16} /> Admin
            </Link>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            style={{
              background: "none",
              border: "1px solid var(--border)",
              color: "var(--muted)",
              cursor: "pointer",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color 0.2s, color 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "var(--gold-dim)";
              (e.currentTarget as HTMLElement).style.color = "var(--gold)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--muted)";
            }}
          >
            {theme === "dark" ? (
              <Sun size={15} strokeWidth={1.5} />
            ) : (
              <Moon size={15} strokeWidth={1.5} />
            )}
          </button>

          {!isLoading &&
            (session ? (
              <button onClick={() => signOut()} style={desktopButtonStyle}>
                <LogOut size={16} /> Sign Out
              </button>
            ) : (
              <Link href="/login" style={desktopButtonStyle}>
                <LogIn size={16} /> Login
              </Link>
            ))}
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <button
          className="flex lg:hidden"
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            color: "var(--gold)",
            cursor: "pointer",
          }}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      {open && (
        <>
          <div
            id="menu-backdrop"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.8)",
              zIndex: 90,
            }}
          />

          <div
            style={{
              position: "fixed",
              top: "72px",
              left: 0,
              right: 0,
              background: "var(--mobile-bg)",
              borderBottom: "1px solid var(--border)",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.8rem",
              zIndex: 95,
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                style={{
                  color: "var(--cream)",
                  textDecoration: "none",
                  fontSize: "1.1rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span style={{ color: "var(--gold)" }}>{link.icon}</span>
                {link.name}
              </Link>
            ))}

            <div
              style={{
                height: "1px",
                background: "var(--border)",
                margin: "0.5rem 0",
              }}
            />

            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={toggle}
                aria-label="Toggle theme"
                style={{
                  background: "none",
                  border: "1px solid var(--border)",
                  color: "var(--muted)",
                  cursor: "pointer",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>

            {!isLoading && isAdmin && (
              <Link
                href="/admin"
                onClick={closeMenu}
                style={{
                  color: "var(--gold)",
                  textDecoration: "none",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "1.1rem",
                }}
              >
                <LayoutDashboard size={20} /> ADMIN PANEL
              </Link>
            )}

            {!isLoading &&
              (session ? (
                <button
                  onClick={() => {
                    signOut();
                    closeMenu();
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--gold)",
                    textAlign: "left",
                    padding: 0,
                    fontSize: "1.1rem",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <LogOut size={20} /> Sign Out
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMenu}
                  style={{
                    color: "var(--gold)",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    fontSize: "1.1rem",
                  }}
                >
                  <LogIn size={20} /> Login
                </Link>
              ))}
          </div>
        </>
      )}
    </>
  );
}
