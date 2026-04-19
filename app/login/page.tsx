"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials. Try again.");
    } else {
      router.push("/admin"); // Redirect to your admin dashboard
    }
  };

  return (
    <div style={containerStyle}>
      <div style={glassCardStyle}>
        <h1 style={titleStyle}>
          Maison <em style={{ color: "var(--gold)" }}>Noir</em>
        </h1>
        <p style={subtitleStyle}>Sign in to your account</p>

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              placeholder="name@example.com"
              required
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p
              style={{
                color: "#ff4d4d",
                fontSize: "0.8rem",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          <button type="submit" style={buttonStyle}>
            Sign In
          </button>
        </form>

        <p style={footerTextStyle}>
          Don't have an account?{" "}
          <Link href="/signup" style={{ color: "var(--gold)" }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

// STYLES (Matching your Dashboard Theme)
const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#0A0A0A",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
};

const glassCardStyle: React.CSSProperties = {
  backgroundColor: "rgba(20, 20, 20, 0.8)",
  border: "1px solid var(--border)",
  padding: "3rem",
  width: "100%",
  maxWidth: "400px",
  textAlign: "center",
  boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
};

const titleStyle: React.CSSProperties = {
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "2.5rem",
  color: "var(--cream)",
  marginBottom: "0.5rem",
};

const subtitleStyle: React.CSSProperties = {
  color: "var(--muted)",
  fontSize: "0.85rem",
  marginBottom: "2rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  textAlign: "left",
};

const inputGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const labelStyle: React.CSSProperties = {
  color: "var(--gold-dim)",
  fontSize: "0.7rem",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};

const inputStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  border: "1px solid var(--border)",
  padding: "0.8rem",
  color: "var(--cream)",
  outline: "none",
  transition: "border-color 0.3s",
};

const buttonStyle: React.CSSProperties = {
  padding: "1rem",
  backgroundColor: "var(--gold)",
  color: "#0A0A0A",
  border: "none",
  textTransform: "uppercase",
  fontWeight: "bold",
  letterSpacing: "0.1em",
  cursor: "pointer",
  marginTop: "1rem",
};

const footerTextStyle: React.CSSProperties = {
  color: "var(--muted)",
  fontSize: "0.8rem",
  marginTop: "1.5rem",
};
