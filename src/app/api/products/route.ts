import { NextRequest, NextResponse } from "next/server";
import { getProducts, searchProducts } from "@/lib/data";
import { ApiResponse, Product } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const featured = searchParams.get("featured");
    const query = searchParams.get("q");

    let products: Product[];

    if (query) {
      products = searchProducts(query);
    } else {
      products = getProducts(
        category,
        featured ? featured === "true" : undefined
      );
    }

    const response: ApiResponse<Product[]> = {
      success: true,
      data: products,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to fetch products",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
