"use client";

import { useState, useEffect, useRef } from "react";
import { sanityClient } from "@/lib/sanity";
import Filters from "@/components/Filters";
import ProductsGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";
import { motion, useInView } from "framer-motion";

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

  const titleRef = useRef(null);
  const filtersRef = useRef(null);
  const productsRef = useRef(null);

  const titleInView = useInView(titleRef, { once: true, margin: "-50px" });
  const filtersInView = useInView(filtersRef, { once: true, margin: "-50px" });
  const productsInView = useInView(productsRef, {
    once: true,
    margin: "-50px",
  });

  useEffect(() => {
    const fetchPieces = async () => {
      const query = `*[_type == "piece"]{
        _id,
        title,
        slug,
        description,
        image,
        price,
        category->{ title },
        collection->{ title }
      }`;

      const data: Piece[] = await sanityClient.fetch(query);

      setPieces(data);
      setFilteredPieces(data);

      setCategories([
        ...new Set(data.map((p) => p.category?.title).filter(Boolean)),
      ] as string[]);

      setCollections([
        ...new Set(data.map((p) => p.collection?.title).filter(Boolean)),
      ] as string[]);
    };

    fetchPieces();
  }, []);

  useEffect(() => {
    let updated = [...pieces];

    if (selectedCategory)
      updated = updated.filter((p) => p.category?.title === selectedCategory);

    if (selectedCollection)
      updated = updated.filter(
        (p) => p.collection?.title === selectedCollection
      );

    if (search)
      updated = updated.filter((p) =>
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
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8">
      <motion.h1
        ref={titleRef}
        initial={{ opacity: 0, y: 40 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl sm:text-5xl font-bold mb-10 pt-10 text-center text-gray-900 tracking-wide"
      >
        Catalogue
      </motion.h1>

      <motion.div
        ref={filtersRef}
        initial={{ opacity: 0, y: 40 }}
        animate={filtersInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
      >
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
      </motion.div>

      <motion.div
        ref={productsRef}
        initial={{ opacity: 0, y: 40 }}
        animate={productsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
      >
        <ProductsGrid pieces={paginatedPieces} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </motion.div>
    </div>
  );
}
