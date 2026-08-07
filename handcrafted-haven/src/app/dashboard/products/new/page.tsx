"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CATEGORIES } from "@/app/lib/mock-data";
import "../../dashboard.css";

const EMOJI_OPTIONS = [
  "🏺", "🍵", "☕", "💎", "🍃", "⚒️", "🧣", "🎨",
  "🪵", "📦", "🪑", "🪢", "🛍️", "✨", "🎭", "🧶",
];

const GRADIENT_OPTIONS = [
  { label: "Forest", value: "linear-gradient(135deg, var(--primary-100), var(--primary-200))" },
  { label: "Terracotta", value: "linear-gradient(135deg, var(--secondary-100), var(--secondary-200))" },
  { label: "Amber", value: "linear-gradient(135deg, var(--accent-100), var(--accent-200))" },
  { label: "Stone", value: "linear-gradient(135deg, var(--stone-100), var(--stone-200))" },
  { label: "Ocean", value: "linear-gradient(135deg, var(--info), rgba(59, 130, 246, 0.2))" },
  { label: "Sunset", value: "linear-gradient(135deg, #f97316, #ea580c)" },
  { label: "Berry", value: "linear-gradient(135deg, #4338ca, #7c3aed, #db2777)" },
];

export default function NewProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageEmoji, setImageEmoji] = useState("🛍️");
  const [imageGradient, setImageGradient] = useState(GRADIENT_OPTIONS[0].value);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Product name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!price || parseFloat(price) <= 0) newErrors.price = "Valid price is required";
    if (!category) newErrors.category = "Category is required";
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            description,
            longDescription: longDescription || null,
            price,
            category,
            imageEmoji,
            imageGradient,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setServerError(data.error || "Failed to create product");
          return;
        }

        router.push("/dashboard");
      } catch {
        setServerError("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  // Auth guards
  if (status === "loading") {
    return (
      <div className="dashboard-page">
        <div className="dashboard-access-denied">
          <div className="dashboard-access-denied-icon">⏳</div>
          <h1 className="heading-2">Loading...</h1>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || session?.user?.role !== "SELLER") {
    return (
      <div className="dashboard-page">
        <div className="dashboard-access-denied">
          <div className="dashboard-access-denied-icon">🔒</div>
          <h1 className="heading-2">Seller Access Only</h1>
          <p className="body-large">
            You need a seller account to create products.
          </p>
          <Link href="/login" className="btn btn-primary btn-large">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const filteredCategories = CATEGORIES.filter((c) => c !== "All");

  return (
    <div className="dashboard-page">
      {/* Header */}
      <section className="dashboard-header">
        <div className="container">
          <div className="dashboard-header-content">
            <div className="dashboard-greeting">
              <h1 className="heading-2">Add New Product</h1>
              <p>List a new handcrafted item in your shop</p>
            </div>
            <Link href="/dashboard" className="btn btn-secondary">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </section>

      <div className="dashboard-content">
        <div className="container" style={{ maxWidth: "720px" }}>
          {serverError && (
            <div className="auth-server-error" role="alert" style={{ marginBottom: "var(--space-6)" }}>
              <span className="auth-error-icon">⚠️</span>
              {serverError}
            </div>
          )}

          <form
            className="new-product-form"
            id="new-product-form"
            onSubmit={handleSubmit}
            noValidate
            style={{
              background: "var(--surface)",
              border: "1px solid var(--stone-200)",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-8)",
            }}
          >
            {/* Product Name */}
            <div className={`form-group${errors.name ? " form-group-error" : ""}`} style={{ marginBottom: "var(--space-5)" }}>
              <label htmlFor="product-name" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                id="product-name"
                className="form-input"
                placeholder="e.g., Rustic Earth Vase"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {errors.name && <span className="form-error" role="alert">{errors.name}</span>}
            </div>

            {/* Short Description */}
            <div className={`form-group${errors.description ? " form-group-error" : ""}`} style={{ marginBottom: "var(--space-5)" }}>
              <label htmlFor="product-description" className="form-label">
                Short Description
              </label>
              <textarea
                id="product-description"
                className="form-input"
                placeholder="A brief description of your product..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                style={{ resize: "vertical", fontFamily: "var(--font-sans)" }}
                required
              />
              {errors.description && <span className="form-error" role="alert">{errors.description}</span>}
            </div>

            {/* Long Description */}
            <div className="form-group" style={{ marginBottom: "var(--space-5)" }}>
              <label htmlFor="product-long-description" className="form-label">
                Detailed Description <span style={{ color: "var(--stone-400)", fontWeight: 400 }}>(optional)</span>
              </label>
              <textarea
                id="product-long-description"
                className="form-input"
                placeholder="A more detailed description including materials, dimensions, care instructions..."
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                rows={5}
                style={{ resize: "vertical", fontFamily: "var(--font-sans)" }}
              />
            </div>

            {/* Price and Category */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-5)", marginBottom: "var(--space-5)" }}>
              <div className={`form-group${errors.price ? " form-group-error" : ""}`}>
                <label htmlFor="product-price" className="form-label">
                  Price ($)
                </label>
                <input
                  type="number"
                  id="product-price"
                  className="form-input"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0.01"
                  step="0.01"
                  required
                />
                {errors.price && <span className="form-error" role="alert">{errors.price}</span>}
              </div>
              <div className={`form-group${errors.category ? " form-group-error" : ""}`}>
                <label htmlFor="product-category" className="form-label">
                  Category
                </label>
                <select
                  id="product-category"
                  className="form-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  style={{ cursor: "pointer" }}
                >
                  <option value="">Select a category</option>
                  {filteredCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && <span className="form-error" role="alert">{errors.category}</span>}
              </div>
            </div>

            {/* Image Emoji */}
            <div className="form-group" style={{ marginBottom: "var(--space-5)" }}>
              <label className="form-label">Product Emoji</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
                {EMOJI_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setImageEmoji(emoji)}
                    style={{
                      width: "44px",
                      height: "44px",
                      fontSize: "1.5rem",
                      border: imageEmoji === emoji ? "2px solid var(--primary-500)" : "1px solid var(--stone-200)",
                      borderRadius: "var(--radius-md)",
                      background: imageEmoji === emoji ? "var(--primary-50)" : "var(--stone-50)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all var(--transition-fast)",
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Gradient */}
            <div className="form-group" style={{ marginBottom: "var(--space-8)" }}>
              <label className="form-label">Card Color</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
                {GRADIENT_OPTIONS.map((gradient) => (
                  <button
                    key={gradient.label}
                    type="button"
                    onClick={() => setImageGradient(gradient.value)}
                    title={gradient.label}
                    style={{
                      width: "44px",
                      height: "44px",
                      border: imageGradient === gradient.value ? "3px solid var(--primary-500)" : "1px solid var(--stone-200)",
                      borderRadius: "var(--radius-md)",
                      background: gradient.value,
                      cursor: "pointer",
                      transition: "all var(--transition-fast)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Preview */}
            <div style={{ marginBottom: "var(--space-8)" }}>
              <label className="form-label" style={{ marginBottom: "var(--space-3)", display: "block" }}>Preview</label>
              <div
                style={{
                  width: "200px",
                  height: "160px",
                  borderRadius: "var(--radius-lg)",
                  background: imageGradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "3rem",
                  border: "1px solid var(--stone-200)",
                }}
              >
                {imageEmoji}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary btn-large"
              id="submit-product-btn"
              disabled={isSubmitting}
              style={{ width: "100%" }}
            >
              {isSubmitting ? (
                <span className="btn-loading">
                  <span className="btn-spinner" />
                  Creating Product...
                </span>
              ) : (
                "Create Product"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
