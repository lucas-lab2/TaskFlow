import Link from "next/link";
import { notFound } from "next/navigation";
import {
  products,
  getProductById,
  getRelatedProducts,
  formatPrice,
} from "../../lib/mock-data";
import "./product-detail.css";

// Generate static params for all products
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} — Handcrafted Haven`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, 3);

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
                {product.longDescription}
              </p>

              {/* Artisan Card */}
              <div className="artisan-card" id="artisan-card">
                <div
                  className="artisan-card-avatar"
                  style={{ background: product.artisan.avatarColor }}
                >
                  {product.artisan.initials}
                </div>
                <div className="artisan-card-info">
                  <div className="artisan-card-label">Handcrafted by</div>
                  <div className="artisan-card-name">
                    {product.artisan.name}
                  </div>
                  <p className="artisan-card-bio">{product.artisan.bio}</p>
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
          <div className="section-header" style={{ textAlign: "left", margin: "0 0 var(--space-8) 0", maxWidth: "none" }}>
            <h2 className="heading-2">
              Customer Reviews ({product.reviewCount})
            </h2>
          </div>

          <div className="reviews-list">
            {product.reviews.map((review) => (
              <div className="review-card" key={review.id} id={`review-${review.id}`}>
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
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section" id="related-products">
          <div className="container">
            <div className="section-header" style={{ textAlign: "left", margin: "0 0 var(--space-8) 0", maxWidth: "none" }}>
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
                      by {rp.artisan.name}
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
                        {rp.rating.toFixed(1)}
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
