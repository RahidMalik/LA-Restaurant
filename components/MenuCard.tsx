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
      {/* Image */}
      {item.image_url && (
        <div
          style={{ height: "200px", overflow: "hidden", position: "relative" }}
        >
          <img
            src={item.image_url}
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
          {item.is_featured && (
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
              }}
            >
              Chef's Pick
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div style={{ padding: "1.4rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "0.6rem",
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
              marginLeft: "1rem",
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
