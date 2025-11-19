import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";

export async function GET() {
  try {
    // Fetch all products from Sanity
    const query = `*[_type == "piece"]{
      _id,
      title,
      description,
      price,
      "images": image.asset->url
    }`;

    const products = await sanityClient.fetch(query);

    // Return as JSON
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products from Sanity" }, { status: 500 });
  }
}
