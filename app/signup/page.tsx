"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import axios from "axios";
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

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        router.push("/");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data || "Something went wrong. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  // 3. Google Login Function
  const handleGoogleLogin = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/" });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={glassCardStyle}
        >
          <h1 style={titleStyle}>
            LA{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
              Restaurant
            </em>
          </h1>
          <p style={subtitleStyle}>Create your guest account</p>

          {/* Google OAuth Button */}
          <motion.button
            whileHover={{ background: "rgba(255,255,255,0.05)" }}
            onClick={handleGoogleLogin}
            style={googleButtonStyle}
          >
            <img
              src="https://authjs.dev/img/providers/google.svg"
              alt="Google"
              style={{ width: "18px", marginRight: "10px" }}
            />
            Continue with Google
          </motion.button>

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
                placeholder="Enter your email"
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
                  style={{ ...inputStyle, width: "100%", paddingRight: "40px" }}
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
                  style={{ ...inputStyle, width: "100%", paddingRight: "40px" }}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={eyeButtonStyle}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {error && <p style={errorStyle}>{error}</p>}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              style={buttonStyle}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </motion.button>
          </form>

          <p style={footerTextStyle}>
            Already have an account?{" "}
            <Link
              href="/login"
              style={{
                color: "var(--gold)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Login Here
            </Link>
          </p>

          <Link href="/" style={skipLinkStyle}>
            Continue as Guest
          </Link>
        </motion.div>
      </div>
    </>
  );
}

const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "var(--bg)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "4rem 1rem",
};
const glassCardStyle: React.CSSProperties = {
  backgroundColor: "var(--surface)",
  border: "1px solid var(--border)",
  padding: "3rem 2.5rem",
  width: "100%",
  maxWidth: "450px",
  textAlign: "center",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  borderRadius: "4px",
};
const titleStyle: React.CSSProperties = {
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "2.5rem",
  fontWeight: 300,
  color: "var(--cream)",
  marginBottom: "0.5rem",
  letterSpacing: "1px",
};
const subtitleStyle: React.CSSProperties = {
  color: "var(--muted)",
  fontSize: "0.7rem",
  marginBottom: "2rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
};
const googleButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.8rem",
  backgroundColor: "transparent",
  border: "1px solid var(--border)",
  color: "var(--cream)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.85rem",
  cursor: "pointer",
  transition: "all 0.3s",
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
  backgroundColor: "var(--border)",
};
const dividerText: React.CSSProperties = {
  color: "var(--muted)",
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
  color: "var(--gold-dim)",
  cursor: "pointer",
  padding: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const labelStyle: React.CSSProperties = {
  color: "var(--gold-dim)",
  fontSize: "0.65rem",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  fontWeight: 600,
};
const inputStyle: React.CSSProperties = {
  backgroundColor: "rgba(255, 255, 255, 0.02)",
  border: "1px solid var(--border)",
  padding: "0.8rem",
  color: "var(--cream)",
  fontSize: "0.9rem",
  outline: "none",
  borderRadius: "0",
};
const buttonStyle: React.CSSProperties = {
  padding: "1rem",
  backgroundColor: "var(--gold)",
  color: "var(--bg)",
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
  background: "rgba(255, 77, 77, 0.1)",
  padding: "0.5rem",
};
const footerTextStyle: React.CSSProperties = {
  color: "var(--muted)",
  fontSize: "0.8rem",
  marginTop: "1.5rem",
};
const skipLinkStyle: React.CSSProperties = {
  display: "block",
  marginTop: "1.2rem",
  color: "var(--muted)",
  fontSize: "0.75rem",
  textDecoration: "underline",
  letterSpacing: "0.05em",
  opacity: 0.6,
};
