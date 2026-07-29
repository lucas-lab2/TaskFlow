import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer" id="main-footer">
      <div className="container footer-content">
        <p className="footer-text">
          © 2026 Handcrafted Haven — Built for WDD 430 · Web Full-Stack
          Development · BYU-Idaho
        </p>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/products">Products</Link>
          <Link href="/#categories">Categories</Link>
          <Link href="/#how-it-works">How It Works</Link>
          <Link href="/#testimonials">Reviews</Link>
        </nav>
      </div>
    </footer>
  );
}
