"use client";
import type { MenuItem } from "@/types";

export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="group flex flex-col h-full min-h-85 w-full overflow-hidden border border-(--border) bg-(--surface) hover:border-(--gold-dim) transition-all duration-300">
      {item.image_url && (
        <div className="w-full aspect-4/3 sm:aspect-video max-h-50 shrink-0 overflow-hidden relative bg-[#1a1a1a]">
          <img
            src={item.image_url}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {item.is_featured && (
            <span className="absolute top-2 right-2 bg-(--gold) text-[#0A0A0A] text-[10px] tracking-widest px-2 py-1 uppercase font-bold z-10">
              Chef's Pick
            </span>
          )}
        </div>
      )}

      {/* Content Area */}
      <div className="p-4 md:p-6 flex-1 flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col md:flex-row md:justify-between items-start gap-1 md:gap-2">
            <h3 className="text-[1.1rem] md:text-[1.2rem] font-(--font-serif) text-(--cream) leading-tight">
              {item.name}
            </h3>
            <span className="text-(--gold) text-[1rem] md:text-[1.15rem] font-(--font-serif) whitespace-nowrap">
              Rs.{item.price}
            </span>
          </div>
          <p className="text-(--muted) text-[0.8rem] md:text-[0.85rem] line-clamp-3 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
