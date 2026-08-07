"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../login/login.css";
import "./register.css";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!acceptTerms) {
      newErrors.terms = "You must accept the terms and conditions";
    }
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        // Register the user
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fullName,
            email,
            password,
            role,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setServerError(data.error || "Registration failed");
          setIsSubmitting(false);
          return;
        }

        // Auto sign-in after successful registration
        const signInResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (signInResult?.error) {
          // Registration succeeded but auto-login failed — redirect to login
          router.push("/login");
        } else {
          router.push("/");
          router.refresh();
        }
      } catch {
        setServerError("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <div className="auth-page">
      {/* Decorative Branding Panel */}
      <div className="auth-brand-panel" aria-hidden="true">
        <div className="auth-brand-content">
          <div className="auth-brand-icon">H</div>
          <h2 className="auth-brand-title">Join the Community</h2>
          <p className="auth-brand-subtitle">
            Create your account to start discovering unique handcrafted items or
            set up your artisan shop and share your creations with the world.
          </p>
          <div className="auth-brand-features">
            <div className="auth-brand-feature">
              <span className="auth-brand-feature-icon">🎨</span>
              <span>Showcase your unique creations</span>
            </div>
            <div className="auth-brand-feature">
              <span className="auth-brand-feature-icon">🌍</span>
              <span>Reach a global audience</span>
            </div>
            <div className="auth-brand-feature">
              <span className="auth-brand-feature-icon">💚</span>
              <span>Support sustainable craftsmanship</span>
            </div>
          </div>
        </div>
        <div className="auth-brand-decoration auth-brand-decoration-1" />
        <div className="auth-brand-decoration auth-brand-decoration-2" />
      </div>

      {/* Registration Form */}
      <div className="auth-form-panel">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h1 className="heading-2">Create Account</h1>
            <p className="body-large">
              Start your handcrafted journey today
            </p>
          </div>

          {serverError && (
            <div className="auth-server-error" role="alert">
              <span className="auth-error-icon">⚠️</span>
              {serverError}
            </div>
          )}

          <form
            className="auth-form"
            id="register-form"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Full Name */}
            <div
              className={`form-group${errors.fullName ? " form-group-error" : ""}`}
            >
              <label htmlFor="register-name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="register-name"
                className="form-input"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
                required
              />
              {errors.fullName && (
                <span className="form-error" role="alert">
                  {errors.fullName}
                </span>
              )}
            </div>

            {/* Email */}
            <div
              className={`form-group${errors.email ? " form-group-error" : ""}`}
            >
              <label htmlFor="register-email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="register-email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
              {errors.email && (
                <span className="form-error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Role Selector */}
            <div className="form-group">
              <label className="form-label">I want to...</label>
              <div className="role-selector">
                <button
                  type="button"
                  className={`role-option${role === "buyer" ? " role-selected" : ""}`}
                  onClick={() => setRole("buyer")}
                  id="role-buyer"
                >
                  <span className="role-option-icon">🛍️</span>
                  <span className="role-option-label">Buy</span>
                  <span className="role-option-desc">
                    Discover unique handcrafted items
                  </span>
                </button>
                <button
                  type="button"
                  className={`role-option${role === "seller" ? " role-selected" : ""}`}
                  onClick={() => setRole("seller")}
                  id="role-seller"
                >
                  <span className="role-option-icon">🎨</span>
                  <span className="role-option-label">Sell</span>
                  <span className="role-option-desc">
                    Share your craft with the world
                  </span>
                </button>
              </div>
            </div>

            {/* Password */}
            <div
              className={`form-group${errors.password ? " form-group-error" : ""}`}
            >
              <label htmlFor="register-password" className="form-label">
                Password
              </label>
              <div className="form-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="register-password"
                  className="form-input"
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="form-input-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <span className="form-error" role="alert">
                  {errors.password}
                </span>
              )}
              {password && !errors.password && (
                <div className="password-strength">
                  <div
                    className={`password-strength-bar${
                      password.length >= 12
                        ? " strength-strong"
                        : password.length >= 8
                          ? " strength-medium"
                          : " strength-weak"
                    }`}
                  />
                  <span className="password-strength-label">
                    {password.length >= 12
                      ? "Strong"
                      : password.length >= 8
                        ? "Medium"
                        : "Weak"}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div
              className={`form-group${errors.confirmPassword ? " form-group-error" : ""}`}
            >
              <label htmlFor="register-confirm-password" className="form-label">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="register-confirm-password"
                className="form-input"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              {errors.confirmPassword && (
                <span className="form-error" role="alert">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            {/* Terms */}
            <div className="form-group">
              <label
                className="form-checkbox-label"
                htmlFor="register-terms"
              >
                <input
                  type="checkbox"
                  id="register-terms"
                  className="form-checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
                <span className="form-checkbox-custom" />
                I agree to the{" "}
                <a href="#" className="form-link">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="form-link">
                  Privacy Policy
                </a>
              </label>
              {errors.terms && (
                <span className="form-error" role="alert">
                  {errors.terms}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-large auth-submit-btn"
              id="register-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="btn-loading">
                  <span className="btn-spinner" />
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link href="/login" className="auth-switch-link" id="register-to-login">
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
