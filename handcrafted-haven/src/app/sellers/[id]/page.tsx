import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import { formatPrice } from "@/app/lib/mock-data";
import "./sellers.css";

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const seller = await prisma.user.findUnique({
    where: { id, role: "SELLER" },
  });
  if (!seller) return { title: "Seller Not Found" };
  return {
    title: `${seller.name} — Handcrafted Haven Artisan`,
    description: seller.bio || `Browse handcrafted products by ${seller.name}`,
  };
}

export default async function SellerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const seller = await prisma.user.findUnique({
    where: { id, role: "SELLER" },
    include: {
      products: {
        include: {
          reviews: {
            select: { rating: true },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!seller) {
    notFound();
  }

  // Compute stats
  const totalProducts = seller.products.length;
  const allReviews = seller.products.flatMap((p) => p.reviews);
  const totalReviews = allReviews.length;
  const avgRating =
    totalReviews > 0
      ? Math.round(
          (allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews) * 10
        ) / 10
      : 0;

  // Generate initials
  const initials = seller.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="seller-profile-page">
      {/* Profile Header */}
      <section className="seller-profile-header" id="seller-header">
        <div className="container">
          <div className="seller-profile-header-content">
            <div className="seller-profile-avatar">{initials}</div>
            <div className="seller-profile-info">
              <h1 className="seller-profile-name">{seller.name}</h1>
              <p className="seller-profile-role">
                <span>🎨</span> Artisan &middot; Member since{" "}
                {new Date(seller.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
              {seller.bio && (
                <p className="seller-profile-bio">{seller.bio}</p>
              )}
              <div className="seller-stats">
                <div className="seller-stat">
                  <div className="seller-stat-number">{totalProducts}</div>
                  <div className="seller-stat-label">Products</div>
                </div>
                <div className="seller-stat">
                  <div className="seller-stat-number">
                    {avgRating > 0 ? avgRating.toFixed(1) : "—"}
                  </div>
                  <div className="seller-stat-label">Avg Rating</div>
                </div>
                <div className="seller-stat">
                  <div className="seller-stat-number">{totalReviews}</div>
                  <div className="seller-stat-label">Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="seller-products-section" id="seller-products">
        <div className="container">
          <div className="seller-products-header">
            <h2 className="heading-2">Products by {seller.name}</h2>
            <span className="seller-products-count">
              {totalProducts} {totalProducts === 1 ? "product" : "products"}
            </span>
          </div>

          {totalProducts > 0 ? (
            <div className="products-grid">
              {seller.products.map((product) => {
                const reviewCount = product.reviews.length;
                const rating =
                  reviewCount > 0
                    ? Math.round(
                        (product.reviews.reduce((s, r) => s + r.rating, 0) /
                          reviewCount) *
                          10
                      ) / 10
                    : 0;

                return (
                  <Link
                    href={`/products/${product.id}`}
                    key={product.id}
                    className="product-card"
                    id={`seller-product-${product.id}`}
                  >
                    <div
                      className="product-card-image"
                      style={{
                        background:
                          product.imageGradient ||
                          "linear-gradient(135deg, var(--stone-100), var(--stone-200))",
                      }}
                    >
                      <span className="product-card-emoji" aria-hidden="true">
                        {product.imageEmoji || "🛍️"}
                      </span>
                      <span className="product-card-category-badge">
                        {product.category}
                      </span>
                    </div>
                    <div className="product-card-body">
                      <h3 className="product-card-title">{product.name}</h3>
                      <p className="product-card-artisan">by {seller.name}</p>
                      <div className="product-card-footer">
                        <span className="product-card-price">
                          {formatPrice(product.price)}
                        </span>
                        <span
                          className="product-card-rating"
                          aria-label={`${rating} out of 5 stars`}
                        >
                          <span
                            className="product-card-star"
                            aria-hidden="true"
                          >
                            ★
                          </span>
                          {rating > 0 ? rating.toFixed(1) : "New"}
                          {reviewCount > 0 && (
                            <span className="product-card-review-count">
                              ({reviewCount})
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="seller-empty">
              <div className="seller-empty-icon">🎨</div>
              <h3 className="heading-3">No products yet</h3>
              <p className="body-large">
                This artisan hasn&apos;t listed any products yet. Check back
                soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
