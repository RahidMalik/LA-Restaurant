"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        {/* Decorative background gradient */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,169,110,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Est. 2024 Header */}
        <div className="fade-up flex items-center gap-4 mb-8">
          <span className="block w-10 h-px bg-(--gold-dim)" />
          <span className="text-(--gold) text-[0.7rem] tracking-[0.3em] uppercase font-medium">
            Est. 2024
          </span>
          <span className="block w-10 h-px bg-(--gold-dim)" />
        </div>

        {/* Main Title */}
        <h1
          className="fade-up fade-up-delay-1 text-[clamp(3.5rem,10vw,7.5rem)] font-light leading-[0.95] text-(--cream) tracking-tight mb-6"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Lounge & <br />
          <em className="text-(--gold) italic">Restaurant</em>
        </h1>

        {/* Subtitle */}
        <p className="fade-up fade-up-delay-2 text-(--muted) text-[0.95rem] tracking-wide max-w-90 leading-relaxed mb-10">
          An exquisite culinary journey through refined flavours, crafted with
          passion and served with grace.
        </p>

        {/* Action Buttons */}
        <div className="fade-up fade-up-delay-3 flex flex-wrap justify-center gap-4">
          <Link
            href="/menu"
            className="px-9 py-3.5 bg-(--gold) text-[#0A0A0A] text-[0.75rem] tracking-[0.18em] uppercase font-semibold transition-all hover:opacity-85"
          >
            Explore Menu
          </Link>
          <Link
            href="#reservations"
            className="px-9 py-3.5 border border-(--border) text-(--cream) text-[0.75rem] tracking-[0.18em] uppercase transition-all hover:border-(--gold-dim)"
          >
            Reserve a Table
          </Link>
        </div>
      </section>

      {/* --- INFO BAR --- */}
      <section className="border-y border-(--border) py-16 px-8 bg-[#0D0D0D]">
        <div className="max-w-250 mx-auto flex flex-wrap justify-around gap-10 text-center">
          {[
            {
              label: "Location",
              value: "B 159 Johar Hill Road, Karachi, Pakistan",
            },
            { label: "Hours", value: "12pm – 3am Daily" },
            { label: "Reservations", value: "+92 3111147647" },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-2 min-w-50">
              <p className="text-(--gold)text-[0.65rem] tracking-[0.2em] uppercase font-medium">
                {label}
              </p>
              <p className="text-(--cream) text-[0.95rem] leading-snug">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 text-center opacity-60">
        <p className="text-(--muted) text-[0.75rem] tracking-widest">
          © 2026 LA — RESTAURANT. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </>
  );
}
