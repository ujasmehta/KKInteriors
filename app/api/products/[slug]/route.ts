import { NextResponse } from "next/server";
import { products } from "../../../../data/products";

export async function GET(_req: Request, ctx: any) {
  const slug = ctx?.params?.slug;
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const product = products.find((p) => p.slug === String(slug));
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}
