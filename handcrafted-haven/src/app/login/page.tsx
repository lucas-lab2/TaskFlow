"use client";

import { useState } from "react";
import Link from "next/link";
import "./login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate submission — will connect to backend in future sprint
      setTimeout(() => {
        setIsSubmitting(false);
        alert("Login functionality will be connected to the backend in a future sprint.");
      }, 1000);
    }
  }

  return (
    <div className="auth-page">
      {/* Decorative Branding Panel */}
      <div className="auth-brand-panel" aria-hidden="true">
        <div className="auth-brand-content">
          <div className="auth-brand-icon">H</div>
          <h2 className="auth-brand-title">Welcome Back</h2>
          <p className="auth-brand-subtitle">
            Sign in to access your artisan dashboard, manage your shop, and
            connect with the handcrafted community.
          </p>
          <div className="auth-brand-features">
            <div className="auth-brand-feature">
              <span className="auth-brand-feature-icon">🏪</span>
              <span>Manage your artisan shop</span>
            </div>
            <div className="auth-brand-feature">
              <span className="auth-brand-feature-icon">📦</span>
              <span>Track your orders</span>
            </div>
            <div className="auth-brand-feature">
              <span className="auth-brand-feature-icon">⭐</span>
              <span>View ratings &amp; reviews</span>
            </div>
          </div>
        </div>
        <div className="auth-brand-decoration auth-brand-decoration-1" />
        <div className="auth-brand-decoration auth-brand-decoration-2" />
      </div>

      {/* Login Form */}
      <div className="auth-form-panel">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h1 className="heading-2">Sign In</h1>
            <p className="body-large">
              Enter your credentials to access your account
            </p>
          </div>

          <form
            className="auth-form"
            id="login-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className={`form-group${errors.email ? " form-group-error" : ""}`}>
              <label htmlFor="login-email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="login-email"
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

            <div className={`form-group${errors.password ? " form-group-error" : ""}`}>
              <label htmlFor="login-password" className="form-label">
                Password
              </label>
              <div className="form-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="login-password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
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
            </div>

            <div className="form-row">
              <label className="form-checkbox-label" htmlFor="login-remember">
                <input
                  type="checkbox"
                  id="login-remember"
                  className="form-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="form-checkbox-custom" />
                Remember me
              </label>
              <a href="#" className="form-link" id="forgot-password-link">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-large auth-submit-btn"
              id="login-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="btn-loading">
                  <span className="btn-spinner" />
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <p className="auth-switch">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="auth-switch-link" id="login-to-register">
              Create one now →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
