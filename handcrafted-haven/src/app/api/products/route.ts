// ========================================
// Products API Route
// GET /api/products — List products
// POST /api/products — Create product
// ========================================

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";

// GET — List all products (with optional filters)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "featured";
    const sellerId = searchParams.get("sellerId");

    // Build where clause
    const where: Record<string, unknown> = {};

    if (category && category !== "All") {
      where.category = category;
    }

    if (sellerId) {
      where.sellerId = sellerId;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
      ];
    }

    // Build orderBy
    let orderBy: Record<string, string> = {};
    switch (sort) {
      case "price-asc":
        orderBy = { price: "asc" };
        break;
      case "price-desc":
        orderBy = { price: "desc" };
        break;
      case "newest":
        orderBy = { createdAt: "desc" };
        break;
      case "rating":
        // Will sort in JS after fetching (need aggregate)
        orderBy = { createdAt: "desc" };
        break;
      default:
        orderBy = { createdAt: "desc" };
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
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
          select: {
            rating: true,
          },
        },
      },
    });

    // Transform to include computed fields
    const transformed = products.map((product) => {
      const reviewCount = product.reviews.length;
      const avgRating =
        reviewCount > 0
          ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
          : 0;

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        longDescription: product.longDescription,
        price: product.price,
        category: product.category,
        imageUrl: product.imageUrl,
        imageGradient: product.imageGradient,
        imageEmoji: product.imageEmoji,
        createdAt: product.createdAt,
        seller: product.seller,
        sellerId: product.sellerId,
        rating: Math.round(avgRating * 10) / 10,
        reviewCount,
      };
    });

    // Sort by rating if needed
    if (sort === "rating") {
      transformed.sort((a, b) => b.rating - a.rating);
    }

    return NextResponse.json({ products: transformed });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST — Create a new product (sellers only)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be signed in to create a product" },
        { status: 401 }
      );
    }

    if (session.user.role !== "SELLER") {
      return NextResponse.json(
        { error: "Only sellers can create products" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, description, longDescription, price, category, imageUrl, imageGradient, imageEmoji } = body;

    // Validation
    if (!name || !description || !price || !category) {
      return NextResponse.json(
        { error: "Name, description, price, and category are required" },
        { status: 400 }
      );
    }

    if (price <= 0) {
      return NextResponse.json(
        { error: "Price must be greater than zero" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        longDescription: longDescription || null,
        price: parseFloat(price),
        category,
        imageUrl: imageUrl || null,
        imageGradient: imageGradient || null,
        imageEmoji: imageEmoji || null,
        sellerId: session.user.id,
      },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
