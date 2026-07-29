// ========================================
// Handcrafted Haven — Mock Data
// Centralized product and artisan data
// ========================================

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface Artisan {
  id: string;
  name: string;
  initials: string;
  bio: string;
  avatarColor: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  category: string;
  rating: number;
  reviewCount: number;
  artisan: Artisan;
  imageGradient: string;
  imageEmoji: string;
  reviews: Review[];
}

export const CATEGORIES = [
  "All",
  "Pottery & Ceramics",
  "Jewelry",
  "Textiles & Fiber",
  "Woodwork",
] as const;

export type Category = (typeof CATEGORIES)[number];

// ---- Artisans ----

const artisans: Record<string, Artisan> = {
  sarah: {
    id: "a1",
    name: "Sarah Mitchell",
    initials: "SM",
    bio: "A ceramic artist with over 15 years of experience, Sarah draws inspiration from natural landscapes to create functional pottery that brings warmth to everyday moments.",
    avatarColor: "var(--primary-600)",
  },
  james: {
    id: "a2",
    name: "James Thornton",
    initials: "JT",
    bio: "James is a master jeweler who specializes in handcrafted pieces using ethically sourced gemstones. Each piece tells a story of craftsmanship passed down through generations.",
    avatarColor: "var(--accent-500)",
  },
  elena: {
    id: "a3",
    name: "Elena Woodworth",
    initials: "EW",
    bio: "Elena creates beautiful furniture and decor from reclaimed wood. Her workshop in Vermont transforms salvaged timber into stunning, one-of-a-kind pieces.",
    avatarColor: "var(--secondary-500)",
  },
  maya: {
    id: "a4",
    name: "Maya Patel",
    initials: "MP",
    bio: "Maya is a textile artist who blends traditional Indian weaving techniques with contemporary design. Her scarves and tapestries are woven with organic cotton and natural dyes.",
    avatarColor: "var(--primary-500)",
  },
  carlos: {
    id: "a5",
    name: "Carlos Rivera",
    initials: "CR",
    bio: "Carlos crafts rustic pottery inspired by his Mexican heritage. Each piece is hand-thrown on a kick wheel and finished with traditional glazes.",
    avatarColor: "var(--secondary-600)",
  },
  anna: {
    id: "a6",
    name: "Anna Bergström",
    initials: "AB",
    bio: "Inspired by Scandinavian minimalism, Anna creates delicate silver and gold jewelry pieces that are both modern and timeless.",
    avatarColor: "var(--accent-600)",
  },
};

// ---- Products ----

export const products: Product[] = [
  {
    id: "1",
    name: "Rustic Earth Vase",
    description:
      "Handcrafted ceramic vase with a natural earth-tone glaze. Perfect for dried flowers or as a standalone statement piece.",
    longDescription:
      "This stunning vase is hand-thrown on a pottery wheel using locally sourced clay. The earth-tone glaze is achieved through a unique wood-firing process that gives each piece its distinctive character. Standing at 12 inches tall, this vase makes a beautiful centerpiece for any room. The organic texture and warm tones bring a touch of nature indoors. Each vase is truly one-of-a-kind — no two pieces are exactly alike due to the handcrafted nature of the process.",
    price: 89.0,
    category: "Pottery & Ceramics",
    rating: 4.8,
    reviewCount: 24,
    artisan: artisans.sarah,
    imageGradient:
      "linear-gradient(135deg, var(--secondary-100), var(--secondary-200))",
    imageEmoji: "🏺",
    reviews: [
      {
        id: "r1",
        author: "Michelle K.",
        rating: 5,
        date: "July 15, 2026",
        text: "Absolutely gorgeous vase! The texture and color are even more beautiful in person. It's the perfect accent for my living room mantel.",
      },
      {
        id: "r2",
        author: "David L.",
        rating: 5,
        date: "July 10, 2026",
        text: "Bought this as a gift and the recipient loved it. The craftsmanship is outstanding — you can really feel the artisan's touch.",
      },
      {
        id: "r3",
        author: "Jennifer W.",
        rating: 4,
        date: "June 28, 2026",
        text: "Beautiful piece! Slightly smaller than I expected but the quality is exceptional. Would definitely buy from this artisan again.",
      },
    ],
  },
  {
    id: "2",
    name: "Silver Leaf Pendant",
    description:
      "Delicate sterling silver pendant inspired by autumn leaves. Comes with an 18-inch chain.",
    longDescription:
      "This exquisite pendant captures the delicate beauty of a falling leaf in sterling silver. Each leaf is individually cast from a real leaf mold, ensuring unique vein patterns in every piece. The pendant hangs on a fine 18-inch sterling silver chain with a lobster clasp. The subtle hammered texture catches the light beautifully, making it a versatile piece that transitions effortlessly from day to evening wear.",
    price: 145.0,
    category: "Jewelry",
    rating: 4.9,
    reviewCount: 38,
    artisan: artisans.james,
    imageGradient:
      "linear-gradient(135deg, var(--accent-100), var(--accent-200))",
    imageEmoji: "🍃",
    reviews: [
      {
        id: "r4",
        author: "Sarah M.",
        rating: 5,
        date: "July 20, 2026",
        text: "This pendant is stunning! The detail on the leaf is incredible — you can see every tiny vein. I wear it every day.",
      },
      {
        id: "r5",
        author: "Robert H.",
        rating: 5,
        date: "July 5, 2026",
        text: "Bought this for my wife's birthday and she hasn't taken it off since. Beautiful craftsmanship.",
      },
      {
        id: "r6",
        author: "Lisa T.",
        rating: 5,
        date: "June 22, 2026",
        text: "The quality is amazing for the price. It came in a lovely gift box too. Highly recommend!",
      },
    ],
  },
  {
    id: "3",
    name: "Handwoven Alpaca Scarf",
    description:
      "Luxuriously soft scarf woven from 100% alpaca wool in rich jewel tones.",
    longDescription:
      "This gorgeous scarf is handwoven on a traditional loom using premium 100% alpaca wool sourced from small farms in Peru. The rich jewel-tone color palette was inspired by autumn sunsets, blending deep burgundy, gold, and forest green. At 72 inches long and 12 inches wide, it's the perfect size for wrapping, draping, or knotting. Alpaca wool is naturally hypoallergenic, incredibly warm, and softer than cashmere.",
    price: 125.0,
    category: "Textiles & Fiber",
    rating: 4.7,
    reviewCount: 19,
    artisan: artisans.maya,
    imageGradient:
      "linear-gradient(135deg, var(--primary-100), var(--primary-200))",
    imageEmoji: "🧣",
    reviews: [
      {
        id: "r7",
        author: "Emma C.",
        rating: 5,
        date: "July 18, 2026",
        text: "The softest scarf I've ever owned! The colors are rich and vibrant. You can tell so much care went into weaving this.",
      },
      {
        id: "r8",
        author: "Mark S.",
        rating: 4,
        date: "July 1, 2026",
        text: "Great quality and beautiful pattern. My only note is that the colors are slightly different from the photo, but still gorgeous.",
      },
    ],
  },
  {
    id: "4",
    name: "Walnut Serving Board",
    description:
      "Live-edge walnut cutting and serving board, finished with food-safe mineral oil.",
    longDescription:
      "This stunning serving board is crafted from a single piece of American black walnut, preserving the tree's natural live edge for a rustic, organic look. Each board is hand-sanded to a silky smooth finish and sealed with food-safe mineral oil that enhances the wood's rich, dark grain. Perfect for charcuterie, cheese boards, or as a decorative piece in your kitchen. Measures approximately 18 x 10 inches, though dimensions vary slightly due to the natural shape of each piece.",
    price: 78.0,
    category: "Woodwork",
    rating: 4.9,
    reviewCount: 31,
    artisan: artisans.elena,
    imageGradient:
      "linear-gradient(135deg, var(--stone-100), var(--stone-200))",
    imageEmoji: "🪵",
    reviews: [
      {
        id: "r9",
        author: "Patricia N.",
        rating: 5,
        date: "July 22, 2026",
        text: "This board is a work of art! The live edge is beautiful and the walnut grain is stunning. Using it for every dinner party.",
      },
      {
        id: "r10",
        author: "Tom B.",
        rating: 5,
        date: "July 12, 2026",
        text: "Perfect quality. The finish is smooth and the wood grain is gorgeous. Makes a great housewarming gift!",
      },
    ],
  },
  {
    id: "5",
    name: "Glazed Stoneware Mug Set",
    description:
      "Set of 4 handmade stoneware mugs with a speckled glaze finish. Microwave and dishwasher safe.",
    longDescription:
      "This set of four mugs is hand-thrown from high-fire stoneware clay, ensuring durability and heat retention. The speckled glaze is achieved through a reduction firing process that creates unique patterns on each mug. Each mug holds approximately 12 oz and features a comfortable handle designed for a secure grip. The neutral, earthy tones complement any kitchen decor. Microwave and dishwasher safe for everyday convenience.",
    price: 64.0,
    category: "Pottery & Ceramics",
    rating: 4.6,
    reviewCount: 42,
    artisan: artisans.carlos,
    imageGradient:
      "linear-gradient(135deg, var(--secondary-50), var(--secondary-100))",
    imageEmoji: "☕",
    reviews: [
      {
        id: "r11",
        author: "Karen D.",
        rating: 5,
        date: "July 25, 2026",
        text: "These mugs are perfect! Great size, beautiful glaze, and they keep my coffee warm longer than regular mugs.",
      },
      {
        id: "r12",
        author: "Brian F.",
        rating: 4,
        date: "July 8, 2026",
        text: "Love the look and feel. One mug had a slightly uneven bottom but overall great quality for handmade ceramics.",
      },
    ],
  },
  {
    id: "6",
    name: "Turquoise Drop Earrings",
    description:
      "Hand-set natural turquoise stones in a brushed gold setting. Lightweight and elegant.",
    longDescription:
      "These stunning drop earrings feature genuine turquoise stones, each uniquely patterned by nature, set in a brushed gold vermeil setting. The earrings are designed to be lightweight for all-day comfort while making a bold statement. The french hook ear wires allow for graceful movement. Each pair is handcrafted in Anna's studio, where she carefully selects and sets each stone to showcase its natural beauty.",
    price: 185.0,
    category: "Jewelry",
    rating: 4.8,
    reviewCount: 15,
    artisan: artisans.anna,
    imageGradient:
      "linear-gradient(135deg, var(--info), rgba(59, 130, 246, 0.2))",
    imageEmoji: "💎",
    reviews: [
      {
        id: "r13",
        author: "Rachel V.",
        rating: 5,
        date: "July 19, 2026",
        text: "These earrings are absolutely beautiful! The turquoise color is vivid and the gold setting is elegant. Worth every penny.",
      },
      {
        id: "r14",
        author: "Amanda K.",
        rating: 5,
        date: "June 30, 2026",
        text: "So lightweight and comfortable. I forget I'm wearing them! The craftsmanship is impeccable.",
      },
    ],
  },
  {
    id: "7",
    name: "Hand-Dyed Silk Tapestry",
    description:
      "Abstract landscape tapestry created with botanical dyes on raw silk. Ready to hang.",
    longDescription:
      "This one-of-a-kind tapestry is created using a shibori dyeing technique on raw silk fabric. The botanical dyes — made from indigo, madder root, and turmeric — create a stunning abstract landscape effect in deep blues, warm reds, and golden yellows. The piece measures 36 x 24 inches and comes with a bamboo hanging rod and cord, ready to display. Each tapestry is unique due to the unpredictable nature of the dyeing process.",
    price: 220.0,
    category: "Textiles & Fiber",
    rating: 5.0,
    reviewCount: 8,
    artisan: artisans.maya,
    imageGradient:
      "linear-gradient(135deg, #4338ca, #7c3aed, #db2777)",
    imageEmoji: "🎨",
    reviews: [
      {
        id: "r15",
        author: "Sophia L.",
        rating: 5,
        date: "July 14, 2026",
        text: "This tapestry transformed my living room! The colors are breathtaking and the silk has a beautiful sheen.",
      },
      {
        id: "r16",
        author: "Daniel M.",
        rating: 5,
        date: "June 25, 2026",
        text: "A true piece of art. The botanical dyes give it such depth and warmth. Maya is incredibly talented.",
      },
    ],
  },
  {
    id: "8",
    name: "Cherry Wood Jewelry Box",
    description:
      "Hand-carved cherry wood box with velvet-lined interior. Features dovetail joints.",
    longDescription:
      "This elegant jewelry box is crafted from premium cherry wood, hand-selected for its rich, warm grain. The box features traditional dovetail joints — a hallmark of fine woodworking — and a hand-rubbed tung oil finish that deepens the wood's natural color over time. The interior is lined with dark green velvet and includes a removable tray with compartments for rings, earrings, and necklaces. A handmade brass hinge completes the piece. Measures 10 x 7 x 4 inches.",
    price: 165.0,
    category: "Woodwork",
    rating: 4.9,
    reviewCount: 22,
    artisan: artisans.elena,
    imageGradient:
      "linear-gradient(135deg, var(--accent-100), var(--secondary-100))",
    imageEmoji: "📦",
    reviews: [
      {
        id: "r17",
        author: "Catherine H.",
        rating: 5,
        date: "July 21, 2026",
        text: "The dovetail joints are flawless and the velvet interior is a lovely touch. This is a keepsake quality piece.",
      },
      {
        id: "r18",
        author: "Andrew P.",
        rating: 5,
        date: "July 3, 2026",
        text: "Bought this as an anniversary gift. My wife was speechless! The craftsmanship is museum quality.",
      },
    ],
  },
  {
    id: "9",
    name: "Raku-Fired Tea Bowl",
    description:
      "Traditional Japanese-style tea bowl with a unique crackle glaze from the raku firing process.",
    longDescription:
      "This tea bowl (chawan) is created using the traditional raku firing technique, where the piece is pulled from the kiln at peak temperature and placed in combustible materials. This dramatic process creates the distinctive crackle glaze pattern and metallic luster that makes each bowl truly unique. The bowl measures approximately 4.5 inches in diameter and 3 inches tall — the perfect size for matcha or a small serving of soup. Not recommended for dishwasher use.",
    price: 52.0,
    category: "Pottery & Ceramics",
    rating: 4.7,
    reviewCount: 16,
    artisan: artisans.sarah,
    imageGradient:
      "linear-gradient(135deg, var(--stone-200), var(--primary-100))",
    imageEmoji: "🍵",
    reviews: [
      {
        id: "r19",
        author: "Kevin Y.",
        rating: 5,
        date: "July 16, 2026",
        text: "The crackle glaze is mesmerizing! Each time I use it for tea, I notice new patterns. A functional work of art.",
      },
      {
        id: "r20",
        author: "Yuki T.",
        rating: 4,
        date: "June 29, 2026",
        text: "Beautiful raku piece. The metallic sheen is lovely. Slightly delicate but that's the nature of raku ware.",
      },
    ],
  },
  {
    id: "10",
    name: "Hammered Copper Cuff",
    description:
      "Wide copper cuff bracelet with a hand-hammered texture. Adjustable fit.",
    longDescription:
      "This bold cuff bracelet is forged from a single sheet of solid copper, hand-hammered to create a beautiful textured surface that catches the light from every angle. The 1.5-inch wide cuff is gently curved to fit most wrists and can be carefully adjusted for a custom fit. Over time, the copper will develop a unique patina that adds character, though it can be polished back to a bright shine. This piece makes a striking statement on its own or stacked with other bracelets.",
    price: 72.0,
    category: "Jewelry",
    rating: 4.6,
    reviewCount: 27,
    artisan: artisans.james,
    imageGradient:
      "linear-gradient(135deg, #f97316, #ea580c)",
    imageEmoji: "⚒️",
    reviews: [
      {
        id: "r21",
        author: "Nicole R.",
        rating: 5,
        date: "July 17, 2026",
        text: "Love the weight and feel of this cuff! The hammered texture is gorgeous. Gets compliments every time I wear it.",
      },
      {
        id: "r22",
        author: "George M.",
        rating: 4,
        date: "July 2, 2026",
        text: "Great quality and beautiful craftsmanship. The adjustable fit is a nice touch. Developing a nice patina already.",
      },
    ],
  },
  {
    id: "11",
    name: "Macramé Wall Hanging",
    description:
      "Large bohemian macramé wall hanging made from natural cotton cord. 36 inches wide.",
    longDescription:
      "This stunning macramé wall hanging is handknotted from 100% natural cotton cord, featuring an intricate pattern of square knots, spiral knots, and fringe. The piece hangs from a driftwood branch collected from the shores of Lake Michigan, adding a natural, organic element. At 36 inches wide and 48 inches long (including fringe), it makes a dramatic focal point for any wall. The neutral, undyed cotton complements any decor style from bohemian to modern minimalist.",
    price: 155.0,
    category: "Textiles & Fiber",
    rating: 4.8,
    reviewCount: 13,
    artisan: artisans.maya,
    imageGradient:
      "linear-gradient(135deg, var(--stone-50), var(--accent-50))",
    imageEmoji: "🪢",
    reviews: [
      {
        id: "r23",
        author: "Jessica B.",
        rating: 5,
        date: "July 23, 2026",
        text: "This wall hanging is the centerpiece of my bedroom! The knotwork is incredibly detailed and the driftwood rod is a beautiful touch.",
      },
      {
        id: "r24",
        author: "Ryan K.",
        rating: 5,
        date: "July 9, 2026",
        text: "Bought this for our new apartment and it immediately made the space feel like home. Beautiful craftsmanship!",
      },
    ],
  },
  {
    id: "12",
    name: "Oak & Leather Stool",
    description:
      "Handcrafted white oak stool with a hand-stitched leather seat. Bar height.",
    longDescription:
      "This bar-height stool combines the warmth of white oak with the richness of full-grain leather for a piece that's both beautiful and built to last. The oak frame is joined with traditional mortise-and-tenon joinery — no nails or screws — and finished with a hand-rubbed Danish oil that highlights the wood's natural grain. The seat is upholstered in vegetable-tanned leather that develops a rich patina with use. Seat height is 30 inches, making it perfect for kitchen islands and bar counters.",
    price: 320.0,
    category: "Woodwork",
    rating: 5.0,
    reviewCount: 9,
    artisan: artisans.elena,
    imageGradient:
      "linear-gradient(135deg, var(--accent-200), var(--secondary-100))",
    imageEmoji: "🪑",
    reviews: [
      {
        id: "r25",
        author: "Margaret W.",
        rating: 5,
        date: "July 24, 2026",
        text: "These stools are absolutely stunning. The joinery is flawless and the leather seat is incredibly comfortable. Worth every penny.",
      },
      {
        id: "r26",
        author: "Steven C.",
        rating: 5,
        date: "July 6, 2026",
        text: "Elena is a true master. The quality of these stools rivals furniture I've seen at 3x the price. The leather is already developing a beautiful patina.",
      },
    ],
  },
];

// ---- Helper Functions ----

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(
  productId: string,
  limit: number = 3
): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  return products
    .filter((p) => p.id !== productId && p.category === product.category)
    .slice(0, limit);
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function renderStars(rating: number): string {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  let stars = "★".repeat(fullStars);
  if (hasHalf) stars += "½";
  return stars;
}
