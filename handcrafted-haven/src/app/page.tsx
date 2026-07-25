export default function Home() {
  return (
    <div>
      {/* ===== Navigation ===== */}
      <nav className="nav" id="main-nav">
        <div className="container nav-inner">
          <a href="/" className="nav-logo" id="nav-logo">
            <div className="nav-logo-icon" aria-hidden="true">H</div>
            <span className="nav-logo-text">Handcrafted Haven</span>
          </a>
          <div className="nav-actions">
            <a href="/login" className="btn btn-ghost" id="nav-sign-in">
              Sign In
            </a>
            <a href="/register" className="btn btn-primary btn-small" id="nav-get-started">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* ===== Hero Section ===== */}
      <section className="hero" id="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge animate-fade-in-up" id="hero-badge">
              <span className="hero-badge-dot" aria-hidden="true"></span>
              Now Accepting Artisans
            </div>

            <h1 className="display hero-title animate-fade-in-up delay-100">
              Discover the beauty of{" "}
              <span className="highlight">handcrafted</span> treasures
            </h1>

            <p className="body-large hero-subtitle animate-fade-in-up delay-200">
              A curated marketplace connecting talented artisans with people who
              appreciate the beauty and quality of handmade products. Every piece
              tells a story.
            </p>

            <div className="hero-cta animate-fade-in-up delay-300">
              <a href="/register" className="btn btn-primary btn-large" id="hero-cta-primary">
                Start Selling →
              </a>
              <a href="#categories" className="btn btn-secondary btn-large" id="hero-cta-secondary">
                Browse Products
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="section" id="stats" style={{ paddingTop: "48px", paddingBottom: "48px", background: "white" }}>
        <div className="container">
          <div className="stats-row animate-fade-in-up">
            <div className="stat">
              <div className="stat-number">250+</div>
              <div className="stat-label">Artisans</div>
            </div>
            <div className="stat">
              <div className="stat-number">1,200+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat">
              <div className="stat-number">4.9</div>
              <div className="stat-label">Avg. Rating</div>
            </div>
            <div className="stat">
              <div className="stat-number">15k+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Categories ===== */}
      <section className="section" id="categories">
        <div className="container">
          <div className="section-header animate-fade-in-up">
            <span className="section-label">Browse by Craft</span>
            <h2 className="heading-2 section-title">
              Explore our curated categories
            </h2>
            <p className="section-subtitle">
              From delicate jewelry to rustic woodwork, find handmade pieces
              crafted with passion and expertise.
            </p>
          </div>

          <div className="grid grid-4 animate-fade-in-up delay-200">
            <div className="category-card" id="category-pottery">
              <div className="category-icon category-icon-terra">🏺</div>
              <div className="category-name">Pottery &amp; Ceramics</div>
              <div className="category-count">180+ items</div>
            </div>

            <div className="category-card" id="category-jewelry">
              <div className="category-icon category-icon-amber">💍</div>
              <div className="category-name">Jewelry</div>
              <div className="category-count">320+ items</div>
            </div>

            <div className="category-card" id="category-textiles">
              <div className="category-icon category-icon-green">🧶</div>
              <div className="category-name">Textiles &amp; Fiber</div>
              <div className="category-count">240+ items</div>
            </div>

            <div className="category-card" id="category-woodwork">
              <div className="category-icon category-icon-stone">🪵</div>
              <div className="category-name">Woodwork</div>
              <div className="category-count">160+ items</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section className="section" id="how-it-works" style={{ background: "var(--stone-50)" }}>
        <div className="container">
          <div className="section-header animate-fade-in-up">
            <span className="section-label">How It Works</span>
            <h2 className="heading-2 section-title">
              Three steps to handcrafted happiness
            </h2>
            <p className="section-subtitle">
              Whether you&apos;re an artisan looking to share your craft or a
              buyer seeking something truly special.
            </p>
          </div>

          <div className="steps animate-fade-in-up delay-200">
            <div className="step">
              <div className="step-number step-number-1">1</div>
              <div className="step-title">Browse &amp; Discover</div>
              <p className="step-desc">
                Explore thousands of unique, handmade items across dozens of
                categories. Filter by price, style, or craft type.
              </p>
            </div>

            <div className="step">
              <div className="step-number step-number-2">2</div>
              <div className="step-title">Connect with Artisans</div>
              <p className="step-desc">
                Read artisan stories, view their portfolios, and learn about the
                craft behind every product.
              </p>
            </div>

            <div className="step">
              <div className="step-number step-number-3">3</div>
              <div className="step-title">Support &amp; Enjoy</div>
              <p className="step-desc">
                Purchase directly from creators, leave reviews, and become part
                of a community that values handmade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="section" id="testimonials">
        <div className="container">
          <div className="section-header animate-fade-in-up">
            <span className="section-label">What People Say</span>
            <h2 className="heading-2 section-title">
              Loved by artisans and buyers alike
            </h2>
          </div>

          <div className="grid grid-3 animate-fade-in-up delay-200">
            <div className="testimonial-card" id="testimonial-1">
              <div className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <p className="testimonial-text">
                &ldquo;Handcrafted Haven gave me a platform to share my pottery
                with the world. Sales have doubled since I joined!&rdquo;
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" style={{ background: "var(--primary-500)" }}>
                  SM
                </div>
                <div>
                  <div className="testimonial-name">Sarah Mitchell</div>
                  <div className="testimonial-role">Ceramic Artist</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card" id="testimonial-2">
              <div className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <p className="testimonial-text">
                &ldquo;I found the most beautiful handwoven scarf for my mother.
                The quality is incredible, and I love knowing the story behind
                it.&rdquo;
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" style={{ background: "var(--secondary-400)" }}>
                  JR
                </div>
                <div>
                  <div className="testimonial-name">James Rodriguez</div>
                  <div className="testimonial-role">Loyal Customer</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card" id="testimonial-3">
              <div className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <p className="testimonial-text">
                &ldquo;The community here truly values craftsmanship. My wooden
                furniture pieces have found homes across the country.&rdquo;
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" style={{ background: "var(--accent-400)" }}>
                  EW
                </div>
                <div>
                  <div className="testimonial-name">Elena Woodworth</div>
                  <div className="testimonial-role">Woodworker</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA Banner ===== */}
      <section className="section" id="cta" style={{ paddingBottom: "var(--space-24)" }}>
        <div className="container">
          <div className="cta-banner animate-fade-in-up">
            <div className="cta-banner-content">
              <h2 className="heading-2">Ready to share your craft?</h2>
              <p>
                Join our growing community of artisans and reach thousands of
                customers who appreciate the art of handmade.
              </p>
              <a href="/register" className="btn btn-white" id="cta-join-btn">
                Create Your Shop — It&apos;s Free
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="footer" id="main-footer">
        <div className="container footer-content">
          <p className="footer-text">
            © 2026 Handcrafted Haven — Built for WDD 430 · Web Full-Stack
            Development · BYU-Idaho
          </p>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#categories">Categories</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#testimonials">Reviews</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
