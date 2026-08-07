"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "../lib/mock-data";
import "./dashboard.css";

interface DashboardProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  imageGradient: string | null;
  imageEmoji: string | null;
  createdAt: string;
  rating: number;
  reviewCount: number;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<DashboardProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const isSeller = session?.user?.role === "SELLER";

  useEffect(() => {
    if (status === "authenticated" && isSeller) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [status, isSeller]);

  async function fetchProducts() {
    try {
      const res = await fetch(`/api/products?sellerId=${session?.user?.id}`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteProduct(productId: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  // Loading state
  if (status === "loading" || loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-access-denied">
          <div className="dashboard-access-denied-icon">⏳</div>
          <h1 className="heading-2">Loading...</h1>
          <p className="body-large">Setting up your dashboard</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (status === "unauthenticated") {
    return (
      <div className="dashboard-page">
        <div className="dashboard-access-denied">
          <div className="dashboard-access-denied-icon">🔒</div>
          <h1 className="heading-2">Sign In Required</h1>
          <p className="body-large">
            You need to be signed in to access the dashboard.
          </p>
          <Link href="/login" className="btn btn-primary btn-large">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  // Not a seller
  if (!isSeller) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-access-denied">
          <div className="dashboard-access-denied-icon">🎨</div>
          <h1 className="heading-2">Seller Access Only</h1>
          <p className="body-large">
            The dashboard is available for seller accounts. Browse products as a
            buyer or upgrade your account.
          </p>
          <Link href="/products" className="btn btn-primary btn-large">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  // Compute stats
  const totalProducts = products.length;
  const totalReviews = products.reduce((sum, p) => sum + p.reviewCount, 0);
  const avgRating =
    totalReviews > 0
      ? Math.round(
          (products.reduce((sum, p) => sum + p.rating * p.reviewCount, 0) /
            totalReviews) *
            10
        ) / 10
      : 0;
  const totalRevenue = products.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="dashboard-page">
      {/* Header */}
      <section className="dashboard-header" id="dashboard-header">
        <div className="container">
          <div className="dashboard-header-content">
            <div className="dashboard-greeting">
              <h1 className="heading-2">
                Welcome back, {session.user.name?.split(" ")[0]}!
              </h1>
              <p>Manage your artisan shop and products</p>
            </div>
            <Link
              href="/dashboard/products/new"
              className="btn btn-primary"
              id="add-product-btn"
            >
              + Add Product
            </Link>
          </div>
        </div>
      </section>

      <div className="dashboard-content">
        <div className="container">
          {/* Stats */}
          <div className="dashboard-stats" id="dashboard-stats">
            <div className="dashboard-stat-card">
              <div className="dashboard-stat-icon dashboard-stat-icon-green">
                📦
              </div>
              <div>
                <div className="dashboard-stat-value">{totalProducts}</div>
                <div className="dashboard-stat-label">Products</div>
              </div>
            </div>
            <div className="dashboard-stat-card">
              <div className="dashboard-stat-icon dashboard-stat-icon-amber">
                ⭐
              </div>
              <div>
                <div className="dashboard-stat-value">
                  {avgRating > 0 ? avgRating.toFixed(1) : "—"}
                </div>
                <div className="dashboard-stat-label">Avg Rating</div>
              </div>
            </div>
            <div className="dashboard-stat-card">
              <div className="dashboard-stat-icon dashboard-stat-icon-terra">
                💬
              </div>
              <div>
                <div className="dashboard-stat-value">{totalReviews}</div>
                <div className="dashboard-stat-label">Reviews</div>
              </div>
            </div>
            <div className="dashboard-stat-card">
              <div className="dashboard-stat-icon dashboard-stat-icon-blue">
                💰
              </div>
              <div>
                <div className="dashboard-stat-value">
                  {formatPrice(totalRevenue)}
                </div>
                <div className="dashboard-stat-label">Total Value</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h2 className="heading-3">Quick Actions</h2>
            </div>
            <div className="dashboard-actions">
              <Link
                href="/dashboard/products/new"
                className="dashboard-action-card"
                id="action-add-product"
              >
                <span className="dashboard-action-icon">➕</span>
                <span className="dashboard-action-label">Add Product</span>
                <span className="dashboard-action-desc">
                  List a new handcrafted item
                </span>
              </Link>
              <Link
                href={`/sellers/${session.user.id}`}
                className="dashboard-action-card"
                id="action-view-shop"
              >
                <span className="dashboard-action-icon">🏪</span>
                <span className="dashboard-action-label">View My Shop</span>
                <span className="dashboard-action-desc">
                  See your public profile
                </span>
              </Link>
              <Link
                href="/products"
                className="dashboard-action-card"
                id="action-browse"
              >
                <span className="dashboard-action-icon">🔍</span>
                <span className="dashboard-action-label">Browse Marketplace</span>
                <span className="dashboard-action-desc">
                  See what others are selling
                </span>
              </Link>
            </div>
          </div>

          {/* Products List */}
          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h2 className="heading-3">Your Products</h2>
              <span className="products-results-info">
                {totalProducts} {totalProducts === 1 ? "product" : "products"}
              </span>
            </div>

            {products.length > 0 ? (
              <div className="dashboard-product-list" id="product-list">
                {products.map((product) => (
                  <div
                    className="dashboard-product-item"
                    key={product.id}
                    id={`dashboard-product-${product.id}`}
                  >
                    <div
                      className="dashboard-product-image"
                      style={{
                        background:
                          product.imageGradient ||
                          "linear-gradient(135deg, var(--stone-100), var(--stone-200))",
                      }}
                    >
                      {product.imageEmoji || "🛍️"}
                    </div>
                    <div className="dashboard-product-info">
                      <div className="dashboard-product-name">
                        {product.name}
                      </div>
                      <div className="dashboard-product-meta">
                        <span>{formatPrice(product.price)}</span>
                        <span>{product.category}</span>
                        <span>
                          ★ {product.rating > 0 ? product.rating.toFixed(1) : "—"}{" "}
                          ({product.reviewCount})
                        </span>
                      </div>
                    </div>
                    <div className="dashboard-product-actions">
                      <Link
                        href={`/products/${product.id}`}
                        className="btn btn-ghost"
                      >
                        View
                      </Link>
                      <button
                        className="btn btn-ghost"
                        style={{ color: "var(--error)" }}
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="dashboard-empty">
                <div className="dashboard-empty-icon">📦</div>
                <h3 className="heading-3">No products yet</h3>
                <p className="body-large">
                  Start listing your handcrafted items to reach buyers worldwide.
                </p>
                <Link
                  href="/dashboard/products/new"
                  className="btn btn-primary"
                >
                  Add Your First Product
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
