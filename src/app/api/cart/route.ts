import { NextRequest, NextResponse } from "next/server";
import { getCart, createCart, addToCart } from "@/lib/data";
import { ApiResponse, Cart } from "@/types";

// GET cart by ID (from cookie or query param)
export async function GET(request: NextRequest) {
  try {
    const cartId = request.cookies.get("cartId")?.value;

    if (!cartId) {
      // Create new cart if none exists
      const newCart = createCart();
      const response: ApiResponse<Cart> = {
        success: true,
        data: newCart,
      };

      const res = NextResponse.json(response);
      res.cookies.set("cartId", newCart.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return res;
    }

    let cart = getCart(cartId);

    if (!cart) {
      cart = createCart();
    }

    const response: ApiResponse<Cart> = {
      success: true,
      data: cart,
    };

    const res = NextResponse.json(response);
    res.cookies.set("cartId", cart.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to fetch cart",
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// POST - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, quantity, size, color } = body;

    if (!productId || !quantity || !size || !color) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Missing required fields: productId, quantity, size, color",
      };
      return NextResponse.json(response, { status: 400 });
    }

    let cartId = request.cookies.get("cartId")?.value;

    if (!cartId) {
      const newCart = createCart();
      cartId = newCart.id;
    }

    const cart = addToCart(cartId, productId, quantity, size, color);

    if (!cart) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Failed to add item to cart",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const response: ApiResponse<Cart> = {
      success: true,
      data: cart,
      message: "Item added to cart",
    };

    const res = NextResponse.json(response);
    res.cookies.set("cartId", cart.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to add item to cart",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
