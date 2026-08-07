import Link from "next/link";
import { notFound } from "next/navigation";
import {
  products as mockProducts,
  getProductById as getMockProductById,
  getRelatedProducts as getMockRelatedProducts,
  formatPrice,
} from "../../lib/mock-data";
import { prisma } from "../../lib/prisma";
import ReviewForm from "./ReviewForm";
import "./product-detail.css";

// Generate static params for all mock products (fallback)
export function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}

// Helper to get product data (try DB first, fall back to mock)
async function getProduct(id: string) {
  try {
    const dbProduct = await prisma.product.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true,
          },
        },
        reviews: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (dbProduct) {
      const reviewCount = dbProduct.reviews.length;
      const avgRating =
        reviewCount > 0
          ? dbProduct.reviews.reduce((sum, r) => sum + r.rating, 0) /
            reviewCount
          : 0;

      return {
        source: "db" as const,
        product: {
          id: dbProduct.id,
          name: dbProduct.name,
          description: dbProduct.description,
          longDescription: dbProduct.longDescription || dbProduct.description,
          price: dbProduct.price,
          category: dbProduct.category,
          rating: Math.round(avgRating * 10) / 10,
          reviewCount,
          imageGradient:
            dbProduct.imageGradient ||
            "linear-gradient(135deg, var(--stone-100), var(--stone-200))",
          imageEmoji: dbProduct.imageEmoji || "🛍️",
          artisan: {
            id: dbProduct.seller.id,
            name: dbProduct.seller.name,
            initials: dbProduct.seller.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2),
            bio: dbProduct.seller.bio || "",
            avatarColor: "var(--primary-600)",
          },
          reviews: dbProduct.reviews.map((r) => ({
            id: r.id,
            author: r.author.name || "Anonymous",
            rating: r.rating,
            date: new Date(r.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
            text: r.text,
          })),
          sellerId: dbProduct.sellerId,
        },
      };
    }
  } catch {
    // DB connection failed — fall through to mock data
  }

  // Fall back to mock data
  const mockProduct = getMockProductById(id);
  if (mockProduct) {
    return {
      source: "mock" as const,
      product: mockProduct,
    };
  }

  return null;
}

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getProduct(id);
  if (!result) return { title: "Product Not Found" };
  return {
    title: `${result.product.name} — Handcrafted Haven`,
    description: result.product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getProduct(id);

  if (!result) {
    notFound();
  }

  const { product, source } = result;

  // Get related products
  let relatedProducts: any[] = [];
  if (source === "db") {
    try {
      const dbRelated = await prisma.product.findMany({
        where: {
          category: product.category,
          id: { not: product.id },
        },
        take: 3,
        include: {
          seller: { select: { name: true } },
          reviews: { select: { rating: true } },
        },
      });
      relatedProducts = dbRelated.map((rp) => {
        const rc = rp.reviews.length;
        const ar =
          rc > 0
            ? rp.reviews.reduce((s, r) => s + r.rating, 0) / rc
            : 0;
        return {
          id: rp.id,
          name: rp.name,
          category: rp.category,
          price: rp.price,
          rating: Math.round(ar * 10) / 10,
          imageGradient:
            rp.imageGradient ||
            "linear-gradient(135deg, var(--stone-100), var(--stone-200))",
          imageEmoji: rp.imageEmoji || "🛍️",
          artisanName: rp.seller.name,
        };
      });
    } catch {
      relatedProducts = [];
    }
  } else {
    const mockRelated = getMockRelatedProducts(id, 3);
    relatedProducts = mockRelated.map((rp) => ({
      id: rp.id,
      name: rp.name,
      category: rp.category,
      price: rp.price,
      rating: rp.rating,
      imageGradient: rp.imageGradient,
      imageEmoji: rp.imageEmoji,
      artisanName: rp.artisan.name,
    }));
  }

  // Generate star display
  const fullStars = Math.floor(product.rating);
  const hasHalf = product.rating - fullStars >= 0.5;

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb" aria-label="Breadcrumb" id="breadcrumb">
        <div className="container">
          <ol className="breadcrumb-list">
            <li>
              <Link href="/" className="breadcrumb-link">
                Home
              </Link>
            </li>
            <li className="breadcrumb-separator" aria-hidden="true">
              /
            </li>
            <li>
              <Link href="/products" className="breadcrumb-link">
                Products
              </Link>
            </li>
            <li className="breadcrumb-separator" aria-hidden="true">
              /
            </li>
            <li>
              <span className="breadcrumb-current" aria-current="page">
                {product.name}
              </span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Product Detail */}
      <section className="section product-detail-section" id="product-detail">
        <div className="container">
          <div className="product-detail-layout">
            {/* Image */}
            <div className="product-detail-image-area">
              <div
                className="product-detail-image"
                style={{ background: product.imageGradient }}
              >
                <span className="product-detail-emoji" aria-hidden="true">
                  {product.imageEmoji}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="product-detail-info">
              <span className="product-detail-category">
                {product.category}
              </span>

              <h1 className="heading-1 product-detail-title">
                {product.name}
              </h1>

              <div
                className="product-detail-rating"
                aria-label={`${product.rating} out of 5 stars, ${product.reviewCount} reviews`}
              >
                <span className="product-detail-stars" aria-hidden="true">
                  {"★".repeat(fullStars)}
                  {hasHalf && "½"}
                  {"☆".repeat(5 - fullStars - (hasHalf ? 1 : 0))}
                </span>
                <span className="product-detail-rating-num">
                  {product.rating.toFixed(1)}
                </span>
                <span className="product-detail-review-count">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              <div className="product-detail-price">
                {formatPrice(product.price)}
              </div>

              <p className="product-detail-description">
                {product.longDescription || product.description}
              </p>

              {/* Artisan Card */}
              <div className="artisan-card" id="artisan-card">
                <div
                  className="artisan-card-avatar"
                  style={{
                    background: (product as any).artisan?.avatarColor || "var(--primary-600)",
                  }}
                >
                  {(product as any).artisan?.initials || (product as any).artisan?.name?.charAt(0) || "U"}
                </div>
                <div className="artisan-card-info">
                  <div className="artisan-card-label">Handcrafted by</div>
                  <div className="artisan-card-name">
                    {(product as any).artisan?.name || "Unknown Artisan"}
                  </div>
                  {(product as any).artisan?.bio && (
                    <p className="artisan-card-bio">{(product as any).artisan.bio}</p>
                  )}
                  {source === "db" && (product as any).artisan?.id && (
                    <Link
                      href={`/sellers/${(product as any).artisan.id}`}
                      className="form-link"
                      style={{ fontSize: "0.8125rem", marginTop: "4px", display: "inline-block" }}
                    >
                      View Profile →
                    </Link>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="product-detail-actions">
                <button
                  className="btn btn-primary btn-large product-detail-add-cart"
                  id="add-to-cart-btn"
                >
                  Add to Cart — {formatPrice(product.price)}
                </button>
                <button
                  className="btn btn-secondary btn-large"
                  id="contact-artisan-btn"
                >
                  Contact Artisan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section
        className="section product-reviews-section"
        id="product-reviews"
        style={{ background: "var(--stone-50)" }}
      >
        <div className="container">
          <div
            className="section-header"
            style={{
              textAlign: "left",
              margin: "0 0 var(--space-8) 0",
              maxWidth: "none",
            }}
          >
            <h2 className="heading-2">
              Customer Reviews ({product.reviewCount})
            </h2>
          </div>

          {/* Review Form (client component) */}
          {source === "db" && (
            <ReviewForm
              productId={product.id}
              sellerId={"sellerId" in product ? (product.sellerId as string) : ""}
            />
          )}

          <div className="reviews-list">
            {product.reviews.map((review) => (
              <div
                className="review-card"
                key={review.id}
                id={`review-${review.id}`}
              >
                <div className="review-card-header">
                  <div className="review-card-author-info">
                    <div className="review-card-avatar">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <div className="review-card-author">{review.author}</div>
                      <div className="review-card-date">{review.date}</div>
                    </div>
                  </div>
                  <div
                    className="review-card-stars"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                </div>
                <p className="review-card-text">{review.text}</p>
              </div>
            ))}

            {product.reviews.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "var(--space-10)",
                  color: "var(--stone-500)",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "var(--space-3)" }}>💬</div>
                <p>No reviews yet. Be the first to share your experience!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section" id="related-products">
          <div className="container">
            <div
              className="section-header"
              style={{
                textAlign: "left",
                margin: "0 0 var(--space-8) 0",
                maxWidth: "none",
              }}
            >
              <h2 className="heading-2">You Might Also Like</h2>
            </div>

            <div className="related-products-grid">
              {relatedProducts.map((rp) => (
                <Link
                  href={`/products/${rp.id}`}
                  key={rp.id}
                  className="product-card"
                  id={`related-product-${rp.id}`}
                >
                  <div
                    className="product-card-image"
                    style={{ background: rp.imageGradient }}
                  >
                    <span className="product-card-emoji" aria-hidden="true">
                      {rp.imageEmoji}
                    </span>
                    <span className="product-card-category-badge">
                      {rp.category}
                    </span>
                  </div>
                  <div className="product-card-body">
                    <h3 className="product-card-title">{rp.name}</h3>
                    <p className="product-card-artisan">
                      by {rp.artisanName}
                    </p>
                    <div className="product-card-footer">
                      <span className="product-card-price">
                        {formatPrice(rp.price)}
                      </span>
                      <span
                        className="product-card-rating"
                        aria-label={`${rp.rating} out of 5 stars`}
                      >
                        <span className="product-card-star" aria-hidden="true">
                          ★
                        </span>
                        {rp.rating > 0 ? rp.rating.toFixed(1) : "New"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
