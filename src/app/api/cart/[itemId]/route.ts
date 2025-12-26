import { NextRequest, NextResponse } from "next/server";
import { updateCartItem, removeFromCart, getCart } from "@/lib/data";
import { ApiResponse, Cart } from "@/types";

// PATCH - Update cart item quantity
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    const { itemId } = await params;
    const cartId = request.cookies.get("cartId")?.value;

    if (!cartId) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Cart not found",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const body = await request.json();
    const { quantity } = body;

    if (quantity === undefined) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Quantity is required",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const cart = updateCartItem(cartId, itemId, quantity);

    if (!cart) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Failed to update cart item",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const response: ApiResponse<Cart> = {
      success: true,
      data: cart,
      message: "Cart updated",
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to update cart",
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// DELETE - Remove item from cart
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    const { itemId } = await params;
    const cartId = request.cookies.get("cartId")?.value;

    if (!cartId) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Cart not found",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const cart = removeFromCart(cartId, itemId);

    if (!cart) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Failed to remove item from cart",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const response: ApiResponse<Cart> = {
      success: true,
      data: cart,
      message: "Item removed from cart",
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to remove item",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
