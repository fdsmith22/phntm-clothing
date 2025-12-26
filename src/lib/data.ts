import { Product, Cart, CartItem } from "@/types";

// Mock product data - replace with database calls
export const products: Product[] = [
  {
    id: "1",
    name: "Shadow Hoodie",
    slug: "shadow-hoodie",
    description: "Premium heavyweight hoodie with minimalist PHNTM branding. Made from 100% organic cotton.",
    price: 89.99,
    compareAtPrice: 110.00,
    category: "hoodies",
    images: ["/images/shadow-hoodie-1.jpg", "/images/shadow-hoodie-2.jpg"],
    sizes: [
      { name: "Extra Small", code: "XS", inStock: true },
      { name: "Small", code: "S", inStock: true },
      { name: "Medium", code: "M", inStock: true },
      { name: "Large", code: "L", inStock: true },
      { name: "Extra Large", code: "XL", inStock: false },
    ],
    colors: [
      { name: "Black", hex: "#000000", inStock: true },
      { name: "White", hex: "#FFFFFF", inStock: true },
    ],
    stock: 50,
    featured: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Phantom Tee",
    slug: "phantom-tee",
    description: "Classic fit t-shirt with subtle ghost print. Breathable premium cotton.",
    price: 45.99,
    category: "tees",
    images: ["/images/phantom-tee-1.jpg"],
    sizes: [
      { name: "Small", code: "S", inStock: true },
      { name: "Medium", code: "M", inStock: true },
      { name: "Large", code: "L", inStock: true },
      { name: "Extra Large", code: "XL", inStock: true },
    ],
    colors: [
      { name: "Black", hex: "#000000", inStock: true },
      { name: "White", hex: "#FFFFFF", inStock: true },
    ],
    stock: 100,
    featured: true,
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    id: "3",
    name: "Noir Jacket",
    slug: "noir-jacket",
    description: "Water-resistant bomber jacket with hidden pockets. Sleek matte finish.",
    price: 149.99,
    compareAtPrice: 189.99,
    category: "jackets",
    images: ["/images/noir-jacket-1.jpg"],
    sizes: [
      { name: "Small", code: "S", inStock: true },
      { name: "Medium", code: "M", inStock: true },
      { name: "Large", code: "L", inStock: false },
    ],
    colors: [
      { name: "Black", hex: "#000000", inStock: true },
    ],
    stock: 25,
    featured: true,
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
  },
  {
    id: "4",
    name: "Ghost Hoodie",
    slug: "ghost-hoodie",
    description: "Oversized fit hoodie with reflective PHNTM logo. Appears in low light.",
    price: 95.99,
    category: "hoodies",
    images: ["/images/ghost-hoodie-1.jpg"],
    sizes: [
      { name: "Small", code: "S", inStock: true },
      { name: "Medium", code: "M", inStock: true },
      { name: "Large", code: "L", inStock: true },
      { name: "Extra Large", code: "XL", inStock: true },
    ],
    colors: [
      { name: "Black", hex: "#000000", inStock: true },
      { name: "Charcoal", hex: "#333333", inStock: true },
    ],
    stock: 75,
    featured: false,
    createdAt: new Date("2024-01-04"),
    updatedAt: new Date("2024-01-04"),
  },
  {
    id: "5",
    name: "Void Tee",
    slug: "void-tee",
    description: "Relaxed fit tee with all-over subtle pattern. Ultra-soft fabric blend.",
    price: 39.99,
    category: "tees",
    images: ["/images/void-tee-1.jpg"],
    sizes: [
      { name: "Extra Small", code: "XS", inStock: true },
      { name: "Small", code: "S", inStock: true },
      { name: "Medium", code: "M", inStock: true },
      { name: "Large", code: "L", inStock: true },
    ],
    colors: [
      { name: "Black", hex: "#000000", inStock: true },
      { name: "White", hex: "#FFFFFF", inStock: true },
    ],
    stock: 120,
    featured: false,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    id: "6",
    name: "Eclipse Jacket",
    slug: "eclipse-jacket",
    description: "Technical windbreaker with adjustable hood. Packable design for travel.",
    price: 179.99,
    category: "jackets",
    images: ["/images/eclipse-jacket-1.jpg"],
    sizes: [
      { name: "Small", code: "S", inStock: true },
      { name: "Medium", code: "M", inStock: true },
      { name: "Large", code: "L", inStock: true },
      { name: "Extra Large", code: "XL", inStock: true },
    ],
    colors: [
      { name: "Black", hex: "#000000", inStock: true },
      { name: "White", hex: "#FFFFFF", inStock: false },
    ],
    stock: 40,
    featured: true,
    createdAt: new Date("2024-01-06"),
    updatedAt: new Date("2024-01-06"),
  },
  {
    id: "7",
    name: "Specter Hoodie",
    slug: "specter-hoodie",
    description: "Zip-up hoodie with thumb holes. Perfect for layering in any season.",
    price: 99.99,
    category: "hoodies",
    images: ["/images/specter-hoodie-1.jpg"],
    sizes: [
      { name: "Small", code: "S", inStock: true },
      { name: "Medium", code: "M", inStock: true },
      { name: "Large", code: "L", inStock: true },
    ],
    colors: [
      { name: "Black", hex: "#000000", inStock: true },
    ],
    stock: 60,
    featured: false,
    createdAt: new Date("2024-01-07"),
    updatedAt: new Date("2024-01-07"),
  },
  {
    id: "8",
    name: "Shade Tee",
    slug: "shade-tee",
    description: "Long sleeve tee with gradient shadow print. Unique dye process.",
    price: 42.99,
    category: "tees",
    images: ["/images/shade-tee-1.jpg"],
    sizes: [
      { name: "Small", code: "S", inStock: true },
      { name: "Medium", code: "M", inStock: true },
      { name: "Large", code: "L", inStock: true },
      { name: "Extra Large", code: "XL", inStock: true },
    ],
    colors: [
      { name: "Black", hex: "#000000", inStock: true },
      { name: "Gray", hex: "#888888", inStock: true },
    ],
    stock: 90,
    featured: false,
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-08"),
  },
  {
    id: "9",
    name: "Obsidian Jacket",
    slug: "obsidian-jacket",
    description: "Premium leather jacket with quilted lining. Statement piece for any wardrobe.",
    price: 289.99,
    compareAtPrice: 349.99,
    category: "jackets",
    images: ["/images/obsidian-jacket-1.jpg"],
    sizes: [
      { name: "Small", code: "S", inStock: true },
      { name: "Medium", code: "M", inStock: true },
      { name: "Large", code: "L", inStock: true },
    ],
    colors: [
      { name: "Black", hex: "#000000", inStock: true },
    ],
    stock: 15,
    featured: true,
    createdAt: new Date("2024-01-09"),
    updatedAt: new Date("2024-01-09"),
  },
];

// In-memory cart storage (replace with database/session storage)
const carts: Map<string, Cart> = new Map();

export function getProducts(category?: string, featured?: boolean): Product[] {
  let filtered = [...products];

  if (category && category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  if (featured !== undefined) {
    filtered = filtered.filter(p => p.featured === featured);
  }

  return filtered;
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery) ||
    p.category.toLowerCase().includes(lowercaseQuery)
  );
}

export function getCart(cartId: string): Cart | undefined {
  return carts.get(cartId);
}

export function createCart(): Cart {
  const cart: Cart = {
    id: crypto.randomUUID(),
    items: [],
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  carts.set(cart.id, cart);
  return cart;
}

export function addToCart(
  cartId: string,
  productId: string,
  quantity: number,
  size: string,
  color: string
): Cart | undefined {
  const cart = carts.get(cartId);
  const product = getProductById(productId);

  if (!cart || !product) return undefined;

  const existingItem = cart.items.find(
    item => item.productId === productId && item.size === size && item.color === color
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    const newItem: CartItem = {
      id: crypto.randomUUID(),
      productId,
      product,
      quantity,
      size,
      color,
    };
    cart.items.push(newItem);
  }

  updateCartTotals(cart);
  return cart;
}

export function updateCartItem(
  cartId: string,
  itemId: string,
  quantity: number
): Cart | undefined {
  const cart = carts.get(cartId);
  if (!cart) return undefined;

  const item = cart.items.find(i => i.id === itemId);
  if (!item) return undefined;

  if (quantity <= 0) {
    cart.items = cart.items.filter(i => i.id !== itemId);
  } else {
    item.quantity = quantity;
  }

  updateCartTotals(cart);
  return cart;
}

export function removeFromCart(cartId: string, itemId: string): Cart | undefined {
  const cart = carts.get(cartId);
  if (!cart) return undefined;

  cart.items = cart.items.filter(i => i.id !== itemId);
  updateCartTotals(cart);
  return cart;
}

function updateCartTotals(cart: Cart): void {
  cart.subtotal = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  cart.tax = cart.subtotal * 0.08; // 8% tax
  cart.shipping = cart.subtotal > 100 ? 0 : 9.99; // Free shipping over $100
  cart.total = cart.subtotal + cart.tax + cart.shipping;
  cart.updatedAt = new Date();
}
