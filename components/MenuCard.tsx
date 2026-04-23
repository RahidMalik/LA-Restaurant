"use client";
import type { MenuItem } from "@/types";

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  return (
    <div
      className="shimmer"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        overflow: "hidden",
        transition: "border-color 0.3s, transform 0.3s",
        cursor: "default",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--gold-dim)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {/* Image Section */}
      {item.image && (
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            overflow: "hidden",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.4s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
          {item.isFeatured && (
            <span
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "var(--gold)",
                color: "#0A0A0A",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                padding: "3px 10px",
                textTransform: "uppercase",
                fontWeight: 500,
                zIndex: 10,
              }}
            >
              Chef's Pick
            </span>
          )}
        </div>
      )}

      {/* Content Section*/}
      <div
        style={{
          padding: "0.5rem",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "0.6rem",
            gap: "1rem",
          }}
        >
          <h3
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.2rem",
              fontWeight: 400,
              color: "var(--cream)",
              lineHeight: 1.2,
            }}
          >
            {item.name}
          </h3>
          <span
            style={{
              color: "var(--gold)",
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.15rem",
              fontWeight: 300,
              whiteSpace: "nowrap",
            }}
          >
            Rs. {item.price.toLocaleString()}
          </span>
        </div>

        <p
          style={{
            color: "var(--muted)",
            fontSize: "0.82rem",
            lineHeight: 1.65,
            letterSpacing: "0.01em",
          }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}
