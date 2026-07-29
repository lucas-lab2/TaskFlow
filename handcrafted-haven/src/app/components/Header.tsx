"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav" id="main-nav">
      <div className="container nav-inner">
        <Link href="/" className="nav-logo" id="nav-logo">
          <div className="nav-logo-icon" aria-hidden="true">
            H
          </div>
          <span className="nav-logo-text">Handcrafted Haven</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="nav-links" id="nav-links">
          <Link href="/products" className="nav-link">
            Products
          </Link>
          <Link href="/#categories" className="nav-link">
            Categories
          </Link>
          <Link href="/#how-it-works" className="nav-link">
            How It Works
          </Link>
        </div>

        <div className="nav-actions">
          <Link href="/login" className="btn btn-ghost" id="nav-sign-in">
            Sign In
          </Link>
          <Link
            href="/register"
            className="btn btn-primary btn-small"
            id="nav-get-started"
          >
            Get Started
          </Link>

          {/* Mobile Hamburger */}
          <button
            className={`hamburger${menuOpen ? " hamburger-open" : ""}`}
            id="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="mobile-menu" id="mobile-menu">
          <div className="container">
            <Link
              href="/products"
              className="mobile-menu-link"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/#categories"
              className="mobile-menu-link"
              onClick={() => setMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/#how-it-works"
              className="mobile-menu-link"
              onClick={() => setMenuOpen(false)}
            >
              How It Works
            </Link>
            <hr className="mobile-menu-divider" />
            <Link
              href="/login"
              className="mobile-menu-link"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="btn btn-primary mobile-menu-cta"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
