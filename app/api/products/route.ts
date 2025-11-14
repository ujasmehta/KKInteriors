import { NextResponse } from "next/server";
import { products } from "../../../data/products";

export async function GET() {
  // return full product list
  return NextResponse.json(products);
}
