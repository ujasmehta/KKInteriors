export interface Product {
  id: number;
  slug: string;
  title: string;
  price: number;
  description: string;
  images: string[];
}

export const products: Product[] = [
  {
    id: 1,
    slug: "signature-low-seating-bench",
    title: "Signature Low-Seating Bench",
    price: 35000,
    description:
      "Handcrafted bench in oak with upholstered seat. Finishes available on request.",
    images: ["/placeholder.png", "/sketch.png", "/detail2.png"],
  },
  {
    id: 2,
    slug: "atelier-dining-chair",
    title: "Atelier Dining Chair",
    price: 12000,
    description:
      "Curved-back dining chair with solid wood legs and fabric upholstery.",
    images: ["/sketch.png"],
  },
  {
    id: 3,
    slug: "masonry-side-table",
    title: "Masonry Side Table",
    price: 8000,
    description: "Compact side table with stone top and brass inlay.",
    images: ["/detail2.png"],
  },
  {
    id: 4,
    slug: "studio-console",
    title: "Studio Console",
    price: 22000,
    description: "Slim console with metal frame and walnut top.",
    images: ["/main.png"],
  },
  {
    id: 5,
    slug: "artisan-lamp",
    title: "Artisan Lamp",
    price: 4500,
    description: "Hand-blown glass lamp with brass fittings.",
    images: ["/placeholder.png"],
  },
  {
    id: 6,
    slug: "hearth-rug",
    title: "Hearth Rug",
    price: 6000,
    description: "Handwoven rug in natural tones and textured weave.",
    images: ["/placeholder.png"],
  },
];
