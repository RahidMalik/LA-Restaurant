"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      // Simulate account creation or call your API here
      console.log("Creating account for:", formData.email);
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={containerStyle}>
      <div style={glassCardStyle}>
        <h1 style={titleStyle}>
          LA{" "}
          <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
            Restaurant
          </em>
        </h1>
        <p style={subtitleStyle}>Create your guest account</p>

        {/* Google OAuth Button */}
        <button onClick={() => signIn("google")} style={googleButtonStyle}>
          <img
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google"
            style={{ width: "18px", marginRight: "10px" }}
          />
          Continue with Google
        </button>

        <div style={dividerContainer}>
          <div style={dividerLine}></div>
          <span style={dividerText}>or</span>
          <div style={dividerLine}></div>
        </div>

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Your name"
              required
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Email your email"
              required
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password</label>
            <div style={passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={{ ...inputStyle, width: "100%" }}
                placeholder="Enter your password"
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

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Confirm Password</label>
            <div style={passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{ ...inputStyle, width: "100%" }}
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={eyeButtonStyle}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p style={errorStyle}>{error}</p>}

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p style={footerTextStyle}>
          Already have an account?{" "}
          <Link
            href="/login"
            style={{ color: "var(--gold)", textDecoration: "none" }}
          >
            Login Here
          </Link>
        </p>

        {/* Skip option since dashboard is public */}
        <Link href="/" style={skipLinkStyle}>
          Continue as Guest
        </Link>
      </div>
    </div>
  );
}

// --- LUXURY STYLES ---

const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#0A0A0A", // Removed radial glow background
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem 1rem",
};

const glassCardStyle: React.CSSProperties = {
  backgroundColor: "#0F0F0F",
  border: "1px solid rgba(200, 169, 110, 0.2)",
  padding: "3rem 2.5rem",
  width: "100%",
  maxWidth: "450px",
  textAlign: "center",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
};

const titleStyle: React.CSSProperties = {
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "2.5rem",
  fontWeight: 300,
  color: "#f5f5f5",
  marginBottom: "0.5rem",
  letterSpacing: "1px",
};

const subtitleStyle: React.CSSProperties = {
  color: "rgba(255, 255, 255, 0.5)",
  fontSize: "0.7rem",
  marginBottom: "2rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
};

const googleButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.8rem",
  backgroundColor: "transparent",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  color: "#f5f5f5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.85rem",
  cursor: "pointer",
  transition: "background 0.3s",
  marginBottom: "1.5rem",
};

const dividerContainer: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  margin: "1rem 0",
  gap: "10px",
};

const dividerLine: React.CSSProperties = {
  flex: 1,
  height: "1px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
};

const dividerText: React.CSSProperties = {
  color: "rgba(255, 255, 255, 0.3)",
  fontSize: "0.7rem",
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

const passwordWrapper: React.CSSProperties = {
  position: "relative",
  display: "flex",
  alignItems: "center",
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

const labelStyle: React.CSSProperties = {
  color: "rgba(200, 169, 110, 0.8)",
  fontSize: "0.65rem",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
};

const inputStyle: React.CSSProperties = {
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  padding: "0.8rem",
  color: "#f5f5f5",
  fontSize: "0.9rem",
  outline: "none",
  borderRadius: "0",
};

const buttonStyle: React.CSSProperties = {
  padding: "1rem",
  backgroundColor: "#c8a96e",
  color: "#0A0A0A",
  border: "none",
  textTransform: "uppercase",
  fontWeight: "600",
  letterSpacing: "0.2em",
  fontSize: "0.8rem",
  cursor: "pointer",
  marginTop: "1rem",
};

const errorStyle: React.CSSProperties = {
  color: "#ff4d4d",
  fontSize: "0.8rem",
  textAlign: "center",
};

const footerTextStyle: React.CSSProperties = {
  color: "rgba(255, 255, 255, 0.4)",
  fontSize: "0.8rem",
  marginTop: "1.5rem",
};

const skipLinkStyle: React.CSSProperties = {
  display: "block",
  marginTop: "1rem",
  color: "rgba(255, 255, 255, 0.3)",
  fontSize: "0.75rem",
  textDecoration: "underline",
  letterSpacing: "0.05em",
};
