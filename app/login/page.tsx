"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 1. Handle Email/Password Login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials. Try again.");
      setIsLoading(false);
    } else {
      router.push("/");
    }
  };

  // 2. Handle Google Login
  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div style={containerStyle}>
      <div style={glassCardStyle}>
        <h1 style={titleStyle}>
          LA <em style={{ color: "var(--gold)" }}>Restaurant</em>
        </h1>
        <p style={subtitleStyle}>Sign in to your account</p>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              placeholder="Enter your email"
              required
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password</label>
            <div style={passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...inputStyle, width: "100%" }}
                placeholder="Your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={eyeButtonStyle}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p style={errorTextStyle}>{error}</p>}

          <button type="submit" style={buttonStyle} disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div style={dividerContainer}>
          <div style={lineStyle}></div>
          <span style={dividerText}>OR</span>
          <div style={lineStyle}></div>
        </div>

        {/* Google Login Button */}
        <button onClick={handleGoogleLogin} style={googleButtonStyle}>
          <img
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google"
            style={{ width: "18px", marginRight: "10px" }}
          />
          Continue with Google
        </button>

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

// --- STYLES ---

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
  padding: "2.5rem",
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
  fontSize: "0.75rem",
  marginBottom: "1.5rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
  textAlign: "left",
};

const inputGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
};

const labelStyle: React.CSSProperties = {
  color: "var(--gold-dim)",
  fontSize: "0.65rem",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};

const inputStyle: React.CSSProperties = {
  backgroundColor: "rgba(255,255,255,0.03)",
  border: "1px solid var(--border)",
  padding: "0.7rem",
  color: "var(--cream)",
  outline: "none",
};

const buttonStyle: React.CSSProperties = {
  padding: "0.9rem",
  backgroundColor: "var(--gold)",
  color: "#0A0A0A",
  border: "none",
  textTransform: "uppercase",
  fontWeight: "bold",
  letterSpacing: "0.1em",
  cursor: "pointer",
  marginTop: "0.5rem",
};

const errorTextStyle: React.CSSProperties = {
  color: "#ff4d4d",
  fontSize: "0.75rem",
  textAlign: "center",
};

const googleButtonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "0.8rem",
  backgroundColor: "transparent",
  border: "1px solid var(--border)",
  color: "var(--cream)",
  cursor: "pointer",
  fontSize: "0.85rem",
  transition: "background 0.3s",
};

const dividerContainer: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  margin: "1.5rem 0",
};

const lineStyle: React.CSSProperties = {
  flex: 1,
  height: "1px",
  backgroundColor: "var(--border)",
};

const dividerText: React.CSSProperties = {
  padding: "0 10px",
  color: "var(--muted)",
  fontSize: "0.7rem",
};

const footerTextStyle: React.CSSProperties = {
  color: "var(--muted)",
  fontSize: "0.8rem",
  marginTop: "1.5rem",
};

const eyeButtonStyle: React.CSSProperties = {
  position: "absolute",
  right: "10px",
  background: "none",
  border: "none",
  color: "rgba(200, 169, 110, 0.6)",
  cursor: "pointer",
  padding: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const passwordWrapper: React.CSSProperties = {
  position: "relative",
  display: "flex",
  alignItems: "center",
};
