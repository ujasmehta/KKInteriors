"use client";

import CatalogueProductCard from "@/components/CatalogueProductCard";
import { urlFor } from "@/lib/sanity";
import Link from "next/link";

interface Piece {
  _id: string;
  title: string;
  slug: { current: string };
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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {pieces.map((piece) => (
        <Link key={piece._id} href={`/catalogue/${piece.slug.current}`}>
          <CatalogueProductCard
            key={piece._id}
            title={piece.title}
            image={urlFor(piece.image).width(400).height(300).url()}
            price={piece.price}
            description={piece.description}
          />
        </Link>
      ))}
    </div>
  );
}
