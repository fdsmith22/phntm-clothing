import { NextRequest, NextResponse } from "next/server";
import { getProductById, getProductBySlug } from "@/lib/data";
import { ApiResponse, Product } from "@/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Try to find by ID first, then by slug
    let product = getProductById(id);
    if (!product) {
      product = getProductBySlug(id);
    }

    if (!product) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Product not found",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<Product> = {
      success: true,
      data: product,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to fetch product",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
