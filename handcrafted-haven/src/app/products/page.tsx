"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { products, CATEGORIES, formatPrice, type Category } from "../lib/mock-data";
import "./products.css";

type SortOption = "featured" | "price-asc" | "price-desc" | "newest" | "rating";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.artisan.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result = [...result].reverse();
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div className="products-page">
      {/* ===== Products Hero ===== */}
      <section className="products-hero" id="products-hero">
        <div className="container">
          <div className="products-hero-content animate-fade-in-up">
            <h1 className="display products-hero-title">
              Browse <span className="highlight">Handcrafted</span> Products
            </h1>
            <p className="body-large products-hero-subtitle">
              Discover unique pieces made with love by talented artisans from
              around the world.
            </p>

            {/* Search Bar */}
            <div className="products-search" id="products-search">
              <span className="products-search-icon" aria-hidden="true">
                🔍
              </span>
              <input
                type="search"
                className="products-search-input"
                placeholder="Search products, artisans, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search products"
                id="products-search-input"
              />
              {searchQuery && (
                <button
                  className="products-search-clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Filters & Products Grid ===== */}
      <section className="section products-section" id="products-grid-section">
        <div className="container">
          {/* Toolbar: Category Pills + Sort */}
          <div className="products-toolbar animate-fade-in-up">
            <div
              className="products-categories"
              role="tablist"
              aria-label="Filter by category"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`category-pill${selectedCategory === cat ? " category-pill-active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  id={`filter-${cat.toLowerCase().replace(/[^a-z]/g, "-")}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="products-sort">
              <label htmlFor="sort-select" className="products-sort-label">
                Sort by:
              </label>
              <select
                id="sort-select"
                className="products-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="products-results-info animate-fade-in-up delay-100">
            <p>
              Showing{" "}
              <strong>{filteredProducts.length}</strong>{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
              {selectedCategory !== "All" && (
                <>
                  {" "}
                  in <strong>{selectedCategory}</strong>
                </>
              )}
              {searchQuery && (
                <>
                  {" "}
                  matching &ldquo;<strong>{searchQuery}</strong>&rdquo;
                </>
              )}
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid animate-fade-in-up delay-200">
              {filteredProducts.map((product) => (
                <Link
                  href={`/products/${product.id}`}
                  key={product.id}
                  className="product-card"
                  id={`product-card-${product.id}`}
                >
                  <div
                    className="product-card-image"
                    style={{ background: product.imageGradient }}
                  >
                    <span className="product-card-emoji" aria-hidden="true">
                      {product.imageEmoji}
                    </span>
                    <span className="product-card-category-badge">
                      {product.category}
                    </span>
                  </div>
                  <div className="product-card-body">
                    <h3 className="product-card-title">{product.name}</h3>
                    <p className="product-card-artisan">
                      by {product.artisan.name}
                    </p>
                    <div className="product-card-footer">
                      <span className="product-card-price">
                        {formatPrice(product.price)}
                      </span>
                      <span
                        className="product-card-rating"
                        aria-label={`${product.rating} out of 5 stars`}
                      >
                        <span className="product-card-star" aria-hidden="true">
                          ★
                        </span>
                        {product.rating.toFixed(1)}
                        <span className="product-card-review-count">
                          ({product.reviewCount})
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="products-empty animate-fade-in-up">
              <div className="products-empty-icon">🔍</div>
              <h3 className="heading-3">No products found</h3>
              <p className="body-large">
                Try adjusting your filters or search query to find what
                you&apos;re looking for.
              </p>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                id="clear-filters-btn"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
