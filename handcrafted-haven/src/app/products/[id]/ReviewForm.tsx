"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface ReviewFormProps {
  productId: string;
  sellerId: string;
}

export default function ReviewForm({ productId, sellerId }: ReviewFormProps) {
  const { data: session, status } = useSession();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Don't show form for unauthenticated users
  if (status === "unauthenticated") {
    return (
      <div className="review-form-prompt" id="review-form-prompt">
        <Link href="/login" className="form-link" style={{ fontWeight: 600 }}>
          Sign in
        </Link>{" "}
        to leave a review
      </div>
    );
  }

  // Don't show form for the product seller
  if (session?.user?.id === sellerId) {
    return null;
  }

  // Don't show if already submitted
  if (success) {
    return (
      <div className="review-form-success" id="review-form-success">
        <span>✅</span> Your review has been submitted! Refresh the page to see it.
      </div>
    );
  }

  if (status === "loading") {
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      setError("Please select a star rating");
      return;
    }

    if (!text.trim()) {
      setError("Please write a review");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, text }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to submit review");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="review-form"
      id="review-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <h3 className="heading-3" style={{ marginBottom: "var(--space-4)" }}>
        Write a Review
      </h3>

      {error && (
        <div className="auth-server-error" role="alert" style={{ marginBottom: "var(--space-4)" }}>
          <span className="auth-error-icon">⚠️</span>
          {error}
        </div>
      )}

      {/* Star Rating Selector */}
      <div className="review-star-selector" id="review-star-selector">
        <label className="form-label" style={{ marginBottom: "var(--space-2)", display: "block" }}>
          Your Rating
        </label>
        <div className="review-stars-input">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`review-star-btn${
                star <= (hoverRating || rating) ? " review-star-active" : ""
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={`${star} star${star !== 1 ? "s" : ""}`}
            >
              ★
            </button>
          ))}
          {rating > 0 && (
            <span className="review-star-text">
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </span>
          )}
        </div>
      </div>

      {/* Review Text */}
      <div className="form-group" style={{ marginTop: "var(--space-4)" }}>
        <label htmlFor="review-text" className="form-label">
          Your Review
        </label>
        <textarea
          id="review-text"
          className="form-input"
          placeholder="Share your experience with this product..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          style={{ resize: "vertical", fontFamily: "var(--font-sans)" }}
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        id="submit-review-btn"
        disabled={isSubmitting}
        style={{ marginTop: "var(--space-4)" }}
      >
        {isSubmitting ? (
          <span className="btn-loading">
            <span className="btn-spinner" />
            Submitting...
          </span>
        ) : (
          "Submit Review"
        )}
      </button>
    </form>
  );
}
