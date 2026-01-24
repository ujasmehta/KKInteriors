"use client";

import CatalogueProductCard from "@/components/CatalogueProductCard";
import { urlFor } from "@/lib/sanity";
import Link from "next/link";

interface Piece {
  _id: string;
  title: string;
  slug?: { current?: string };
  description: string;
  image: any;
  price: number;
  category?: { title: string };
  collection?: { title: string };
}

interface ProductsGridProps {
  pieces: Piece[];
}

export default function ProductsGrid({ pieces }: ProductsGridProps) {
  if (!pieces || pieces.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {pieces
        .filter((piece) => piece.slug?.current)
        .map((piece) => (
          <Link
            key={piece._id}
            href={`/catalogue/${piece.slug!.current}`}
          >
            <CatalogueProductCard
              title={piece.title}
              image={urlFor(piece.image)
                .width(400)
                .height(500)
                .url()}
              description={piece.description}
            />
          </Link>
        ))}
    </div>
  );
}
