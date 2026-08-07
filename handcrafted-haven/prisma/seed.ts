// ========================================
// Prisma Seed Script
// Populates the database with mock data
// ========================================

import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { hash } from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...\n");

  // ---- Create Seller Users ----
  const sellerPassword = await hash("seller123", 12);
  const buyerPassword = await hash("buyer123", 12);

  const sarah = await prisma.user.upsert({
    where: { email: "sarah@handcraftedhaven.com" },
    update: {},
    create: {
      name: "Sarah Mitchell",
      email: "sarah@handcraftedhaven.com",
      hashedPassword: sellerPassword,
      role: "SELLER",
      bio: "A ceramic artist with over 15 years of experience, Sarah draws inspiration from natural landscapes to create functional pottery that brings warmth to everyday moments.",
    },
  });

  const james = await prisma.user.upsert({
    where: { email: "james@handcraftedhaven.com" },
    update: {},
    create: {
      name: "James Thornton",
      email: "james@handcraftedhaven.com",
      hashedPassword: sellerPassword,
      role: "SELLER",
      bio: "James is a master jeweler who specializes in handcrafted pieces using ethically sourced gemstones. Each piece tells a story of craftsmanship passed down through generations.",
    },
  });

  const elena = await prisma.user.upsert({
    where: { email: "elena@handcraftedhaven.com" },
    update: {},
    create: {
      name: "Elena Woodworth",
      email: "elena@handcraftedhaven.com",
      hashedPassword: sellerPassword,
      role: "SELLER",
      bio: "Elena creates beautiful furniture and decor from reclaimed wood. Her workshop in Vermont transforms salvaged timber into stunning, one-of-a-kind pieces.",
    },
  });

  const maya = await prisma.user.upsert({
    where: { email: "maya@handcraftedhaven.com" },
    update: {},
    create: {
      name: "Maya Patel",
      email: "maya@handcraftedhaven.com",
      hashedPassword: sellerPassword,
      role: "SELLER",
      bio: "Maya is a textile artist who blends traditional Indian weaving techniques with contemporary design. Her scarves and tapestries are woven with organic cotton and natural dyes.",
    },
  });

  const carlos = await prisma.user.upsert({
    where: { email: "carlos@handcraftedhaven.com" },
    update: {},
    create: {
      name: "Carlos Rivera",
      email: "carlos@handcraftedhaven.com",
      hashedPassword: sellerPassword,
      role: "SELLER",
      bio: "Carlos crafts rustic pottery inspired by his Mexican heritage. Each piece is hand-thrown on a kick wheel and finished with traditional glazes.",
    },
  });

  const anna = await prisma.user.upsert({
    where: { email: "anna@handcraftedhaven.com" },
    update: {},
    create: {
      name: "Anna Bergström",
      email: "anna@handcraftedhaven.com",
      hashedPassword: sellerPassword,
      role: "SELLER",
      bio: "Inspired by Scandinavian minimalism, Anna creates delicate silver and gold jewelry pieces that are both modern and timeless.",
    },
  });

  console.log("✅ Created 6 seller accounts");

  // ---- Create Buyer Users ----
  const buyer1 = await prisma.user.upsert({
    where: { email: "michelle@email.com" },
    update: {},
    create: {
      name: "Michelle K.",
      email: "michelle@email.com",
      hashedPassword: buyerPassword,
      role: "BUYER",
    },
  });

  const buyer2 = await prisma.user.upsert({
    where: { email: "david@email.com" },
    update: {},
    create: {
      name: "David L.",
      email: "david@email.com",
      hashedPassword: buyerPassword,
      role: "BUYER",
    },
  });

  const buyer3 = await prisma.user.upsert({
    where: { email: "jennifer@email.com" },
    update: {},
    create: {
      name: "Jennifer W.",
      email: "jennifer@email.com",
      hashedPassword: buyerPassword,
      role: "BUYER",
    },
  });

  const buyer4 = await prisma.user.upsert({
    where: { email: "emma@email.com" },
    update: {},
    create: {
      name: "Emma C.",
      email: "emma@email.com",
      hashedPassword: buyerPassword,
      role: "BUYER",
    },
  });

  console.log("✅ Created 4 buyer accounts");

  // ---- Create Products ----
  const products = [
    {
      name: "Rustic Earth Vase",
      description: "Handcrafted ceramic vase with a natural earth-tone glaze. Perfect for dried flowers or as a standalone statement piece.",
      longDescription: "This stunning vase is hand-thrown on a pottery wheel using locally sourced clay. The earth-tone glaze is achieved through a unique wood-firing process that gives each piece its distinctive character. Standing at 12 inches tall, this vase makes a beautiful centerpiece for any room.",
      price: 89.0,
      category: "Pottery & Ceramics",
      imageGradient: "linear-gradient(135deg, var(--secondary-100), var(--secondary-200))",
      imageEmoji: "🏺",
      sellerId: sarah.id,
    },
    {
      name: "Silver Leaf Pendant",
      description: "Delicate sterling silver pendant inspired by autumn leaves. Comes with an 18-inch chain.",
      longDescription: "This exquisite pendant captures the delicate beauty of a falling leaf in sterling silver. Each leaf is individually cast from a real leaf mold, ensuring unique vein patterns in every piece.",
      price: 145.0,
      category: "Jewelry",
      imageGradient: "linear-gradient(135deg, var(--accent-100), var(--accent-200))",
      imageEmoji: "🍃",
      sellerId: james.id,
    },
    {
      name: "Handwoven Alpaca Scarf",
      description: "Luxuriously soft scarf woven from 100% alpaca wool in rich jewel tones.",
      longDescription: "This gorgeous scarf is handwoven on a traditional loom using premium 100% alpaca wool sourced from small farms in Peru. At 72 inches long and 12 inches wide, it's the perfect size for wrapping, draping, or knotting.",
      price: 125.0,
      category: "Textiles & Fiber",
      imageGradient: "linear-gradient(135deg, var(--primary-100), var(--primary-200))",
      imageEmoji: "🧣",
      sellerId: maya.id,
    },
    {
      name: "Walnut Serving Board",
      description: "Live-edge walnut cutting and serving board, finished with food-safe mineral oil.",
      longDescription: "This stunning serving board is crafted from a single piece of American black walnut, preserving the tree's natural live edge for a rustic, organic look. Perfect for charcuterie, cheese boards, or as a decorative piece.",
      price: 78.0,
      category: "Woodwork",
      imageGradient: "linear-gradient(135deg, var(--stone-100), var(--stone-200))",
      imageEmoji: "🪵",
      sellerId: elena.id,
    },
    {
      name: "Glazed Stoneware Mug Set",
      description: "Set of 4 handmade stoneware mugs with a speckled glaze finish. Microwave and dishwasher safe.",
      longDescription: "This set of four mugs is hand-thrown from high-fire stoneware clay, ensuring durability and heat retention. The speckled glaze is achieved through a reduction firing process that creates unique patterns on each mug.",
      price: 64.0,
      category: "Pottery & Ceramics",
      imageGradient: "linear-gradient(135deg, var(--secondary-50), var(--secondary-100))",
      imageEmoji: "☕",
      sellerId: carlos.id,
    },
    {
      name: "Turquoise Drop Earrings",
      description: "Hand-set natural turquoise stones in a brushed gold setting. Lightweight and elegant.",
      longDescription: "These stunning drop earrings feature genuine turquoise stones, each uniquely patterned by nature, set in a brushed gold vermeil setting.",
      price: 185.0,
      category: "Jewelry",
      imageGradient: "linear-gradient(135deg, #3b82f6, rgba(59, 130, 246, 0.2))",
      imageEmoji: "💎",
      sellerId: anna.id,
    },
    {
      name: "Hand-Dyed Silk Tapestry",
      description: "Abstract landscape tapestry created with botanical dyes on raw silk. Ready to hang.",
      longDescription: "This one-of-a-kind tapestry is created using a shibori dyeing technique on raw silk fabric. The botanical dyes create a stunning abstract landscape effect.",
      price: 220.0,
      category: "Textiles & Fiber",
      imageGradient: "linear-gradient(135deg, #4338ca, #7c3aed, #db2777)",
      imageEmoji: "🎨",
      sellerId: maya.id,
    },
    {
      name: "Cherry Wood Jewelry Box",
      description: "Hand-carved cherry wood box with velvet-lined interior. Features dovetail joints.",
      longDescription: "This elegant jewelry box is crafted from premium cherry wood, hand-selected for its rich, warm grain. Features traditional dovetail joints — a hallmark of fine woodworking.",
      price: 165.0,
      category: "Woodwork",
      imageGradient: "linear-gradient(135deg, var(--accent-100), var(--secondary-100))",
      imageEmoji: "📦",
      sellerId: elena.id,
    },
    {
      name: "Raku-Fired Tea Bowl",
      description: "Traditional Japanese-style tea bowl with a unique crackle glaze from the raku firing process.",
      longDescription: "This tea bowl is created using the traditional raku firing technique, where the piece is pulled from the kiln at peak temperature and placed in combustible materials.",
      price: 52.0,
      category: "Pottery & Ceramics",
      imageGradient: "linear-gradient(135deg, var(--stone-200), var(--primary-100))",
      imageEmoji: "🍵",
      sellerId: sarah.id,
    },
    {
      name: "Hammered Copper Cuff",
      description: "Wide copper cuff bracelet with a hand-hammered texture. Adjustable fit.",
      longDescription: "This bold cuff bracelet is forged from a single sheet of solid copper, hand-hammered to create a beautiful textured surface that catches the light from every angle.",
      price: 72.0,
      category: "Jewelry",
      imageGradient: "linear-gradient(135deg, #f97316, #ea580c)",
      imageEmoji: "⚒️",
      sellerId: james.id,
    },
    {
      name: "Macramé Wall Hanging",
      description: "Large bohemian macramé wall hanging made from natural cotton cord. 36 inches wide.",
      longDescription: "This stunning macramé wall hanging is handknotted from 100% natural cotton cord, featuring an intricate pattern of square knots, spiral knots, and fringe.",
      price: 155.0,
      category: "Textiles & Fiber",
      imageGradient: "linear-gradient(135deg, var(--stone-50), var(--accent-50))",
      imageEmoji: "🪢",
      sellerId: maya.id,
    },
    {
      name: "Oak & Leather Stool",
      description: "Handcrafted white oak stool with a hand-stitched leather seat. Bar height.",
      longDescription: "This bar-height stool combines the warmth of white oak with the richness of full-grain leather for a piece that's both beautiful and built to last.",
      price: 320.0,
      category: "Woodwork",
      imageGradient: "linear-gradient(135deg, var(--accent-200), var(--secondary-100))",
      imageEmoji: "🪑",
      sellerId: elena.id,
    },
  ];

  for (const productData of products) {
    await prisma.product.upsert({
      where: {
        id: productData.name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-"),
      },
      update: {},
      create: {
        id: productData.name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-"),
        ...productData,
      },
    });
  }

  console.log("✅ Created 12 products");

  // ---- Create Sample Reviews ----
  const productIds = products.map((p) =>
    p.name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-")
  );

  const reviewData = [
    { productId: productIds[0], authorId: buyer1.id, rating: 5, text: "Absolutely gorgeous vase! The texture and color are even more beautiful in person." },
    { productId: productIds[0], authorId: buyer2.id, rating: 5, text: "Bought this as a gift and the recipient loved it. The craftsmanship is outstanding." },
    { productId: productIds[0], authorId: buyer3.id, rating: 4, text: "Beautiful piece! Slightly smaller than I expected but the quality is exceptional." },
    { productId: productIds[1], authorId: buyer1.id, rating: 5, text: "This pendant is stunning! The detail on the leaf is incredible." },
    { productId: productIds[1], authorId: buyer4.id, rating: 5, text: "Bought this for my wife's birthday and she hasn't taken it off since." },
    { productId: productIds[2], authorId: buyer4.id, rating: 5, text: "The softest scarf I've ever owned! The colors are rich and vibrant." },
    { productId: productIds[2], authorId: buyer2.id, rating: 4, text: "Great quality and beautiful pattern. Colors slightly different from photo but gorgeous." },
    { productId: productIds[3], authorId: buyer1.id, rating: 5, text: "This board is a work of art! The live edge is beautiful." },
    { productId: productIds[3], authorId: buyer3.id, rating: 5, text: "Perfect quality. The finish is smooth and the wood grain is gorgeous." },
    { productId: productIds[4], authorId: buyer4.id, rating: 5, text: "These mugs are perfect! Great size, beautiful glaze, and they keep coffee warm." },
    { productId: productIds[5], authorId: buyer1.id, rating: 5, text: "These earrings are absolutely beautiful! The turquoise color is vivid." },
    { productId: productIds[6], authorId: buyer2.id, rating: 5, text: "This tapestry transformed my living room! The colors are breathtaking." },
    { productId: productIds[7], authorId: buyer3.id, rating: 5, text: "The dovetail joints are flawless and the velvet interior is a lovely touch." },
    { productId: productIds[8], authorId: buyer4.id, rating: 5, text: "The crackle glaze is mesmerizing! A functional work of art." },
    { productId: productIds[9], authorId: buyer1.id, rating: 5, text: "Love the weight and feel of this cuff! Gets compliments every time." },
  ];

  for (const review of reviewData) {
    try {
      await prisma.review.upsert({
        where: {
          productId_authorId: {
            productId: review.productId,
            authorId: review.authorId,
          },
        },
        update: {},
        create: review,
      });
    } catch {
      // Skip if review already exists
    }
  }

  console.log("✅ Created 15 sample reviews");
  console.log("\n🎉 Seed completed successfully!");
  console.log("\n📝 Test accounts:");
  console.log("   Sellers: sarah@handcraftedhaven.com / seller123");
  console.log("   Buyers:  michelle@email.com / buyer123");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
