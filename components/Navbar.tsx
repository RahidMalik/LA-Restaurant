"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isAdmin = useMemo(
    () => session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL,
    [session?.user?.email],
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-18 flex items-center justify-between px-4 md:px-8 border-b border-(--border) bg-[rgba(10,10,10,0.92)] backdrop-blur-md">
      {/* Logo */}
      <Link href="/" className="no-underline">
        <span
          className="font-light text-(--gold) tracking-[0.12em]"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "1.6rem",
          }}
        >
          Lounge &amp; Restaurant
        </span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-10">
        {["Menu", "About", "Reservations"].map((item) => (
          <Link
            key={item}
            href={item === "Menu" ? "/menu" : "#"}
            className="no-underline text-(--muted) text-[0.8rem] tracking-[0.15em] uppercase transition-colors duration-200 hover:text-(--cream)"
          >
            {item}
          </Link>
        ))}

        {/* Admin Dashboard Link - Restricted & Optimized */}
        {!isLoading && isAdmin && (
          <Link
            href="/admin"
            className="no-underline text-(--gold) text-[0.8rem] tracking-[0.15em] uppercase font-bold transition-opacity duration-200 hover:opacity-80"
          >
            Admin
          </Link>
        )}

        {/* Authentication Logic - Optimized with isLoading */}
        {!isLoading && (
          <>
            {session ? (
              <button
                onClick={() => signOut()}
                className="px-[1.4rem] py-2 border border-(--gold-dim) bg-transparent text-(--gold) text-[0.75rem] tracking-[0.15em] uppercase cursor-pointer transition-all duration-200 hover:bg-(--gold) hover:text-[#0A0A0A]"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                className="px-[1.4rem] py-2 border border-(--gold-dim) text-(--gold) no-underline text-[0.75rem] tracking-[0.15em] uppercase transition-all duration-200 hover:bg-(--gold) hover:text-[#0A0A0A]"
              >
                Login
              </Link>
            )}
          </>
        )}
      </div>

      {/* Mobile Toggle */}
      <button
        className="md:hidden bg-transparent border-none text-(--cream) cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="absolute top-18 left-0 right-0 bg-[#0F0F0F] border-b border-(--border) px-8 py-8 flex flex-col gap-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          {["Menu", "About", "Reservations"].map((item) => (
            <Link
              key={item}
              href={item === "Menu" ? "/menu" : "#"}
              onClick={() => setOpen(false)}
              className="text-(--cream) no-underline text-base tracking-widest uppercase"
            >
              {item}
            </Link>
          ))}

          {/* Admin link in mobile menu */}
          {!isLoading && isAdmin && (
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="text-(--gold) no-underline uppercase font-bold tracking-widest"
            >
              Admin Dashboard
            </Link>
          )}

          {/* Mobile Auth link */}
          {!isLoading &&
            (session ? (
              <button
                onClick={() => {
                  signOut();
                  setOpen(false);
                }}
                className="bg-transparent border-none text-(--muted) text-left uppercase tracking-widest text-[0.8rem] cursor-pointer p-0"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="text-(--gold) no-underline uppercase tracking-widest"
              >
                Login
              </Link>
            ))}
        </div>
      )}
    </nav>
  );
}
