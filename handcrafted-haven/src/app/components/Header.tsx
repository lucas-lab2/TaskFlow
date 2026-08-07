"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isSeller = session?.user?.role === "SELLER";

  // Generate initials for avatar
  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

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
          {isAuthenticated && isSeller && (
            <Link href="/dashboard" className="nav-link">
              Dashboard
            </Link>
          )}
        </div>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              {/* User Avatar & Menu */}
              <Link
                href={isSeller ? "/dashboard" : "/products"}
                className="nav-user-badge"
                id="nav-user-badge"
              >
                <div className="nav-user-avatar">{initials}</div>
                <span className="nav-user-name">{session.user.name}</span>
              </Link>
              <button
                className="btn btn-ghost btn-small"
                id="nav-sign-out"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
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
            </>
          )}

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
            {isAuthenticated && isSeller && (
              <Link
                href="/dashboard"
                className="mobile-menu-link"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <hr className="mobile-menu-divider" />
            {isAuthenticated ? (
              <>
                <div className="mobile-menu-user">
                  <div className="nav-user-avatar">{initials}</div>
                  <span>{session.user.name}</span>
                </div>
                <button
                  className="btn btn-secondary mobile-menu-cta"
                  onClick={() => {
                    setMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
