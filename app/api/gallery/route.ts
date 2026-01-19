import { NextResponse } from "next/server";

export async function GET() {
  const TOTAL_IMAGES = 30;
  const UI_COUNT = 60;

 
  const gallery = Array.from({ length: UI_COUNT }, (_, i) => {
    const imageIndex = (i % TOTAL_IMAGES) + 1;

    return {
      id: String(i + 1),
      title: `Gallery Image ${i + 1}`,
      description: `Gallery image ${imageIndex}`,
      images: [`/gallery/${imageIndex}.jpg`],
    };
  });

 
  for (let i = gallery.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [gallery[i], gallery[j]] = [gallery[j], gallery[i]];
  }

  return NextResponse.json(gallery);
}
