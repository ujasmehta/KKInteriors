"use client";

import { useState, useEffect } from "react";
import { sanityClient } from "@/lib/sanity";
import Filters from "@/components/Filters";
import ProductsGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";

interface Piece {
  _id: string;
  title: string;
  description: string;
  image: any;
  price: number;
  category?: { title: string };
  collection?: { title: string };
}

export default function Catalogue() {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [filteredPieces, setFilteredPieces] = useState<Piece[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [collections, setCollections] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchPieces = async () => {
      const query = `*[_type == "piece"]{
        _id,
        title,
        description,
        image,
        price,
        category->{title},
        collection->{title}
      }`;
      const data: Piece[] = await sanityClient.fetch(query);
      setPieces(data);
      setFilteredPieces(data);

      setCategories([...new Set(data.map((p) => p.category?.title).filter(Boolean))] as string[]);
      setCollections([...new Set(data.map((p) => p.collection?.title).filter(Boolean))] as string[]);
    };
    fetchPieces();
  }, []);

  useEffect(() => {
    let updated = [...pieces];
    if (selectedCategory) updated = updated.filter((p) => p.category?.title === selectedCategory);
    if (selectedCollection) updated = updated.filter((p) => p.collection?.title === selectedCollection);
    if (search) updated = updated.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPieces(updated);
    setCurrentPage(1);
  }, [selectedCategory, selectedCollection, search, pieces]);

  const totalPages = Math.ceil(filteredPieces.length / itemsPerPage);
  const paginatedPieces = filteredPieces.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-5xl font-bold mb-10 text-center text-gray-900 tracking-wide">
        Catalogue
      </h1>

      <Filters
        categories={categories}
        collections={collections}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
        search={search}
        setSearch={setSearch}
      />

      <ProductsGrid pieces={paginatedPieces} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
