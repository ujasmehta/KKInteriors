"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersProps {
  categories: string[];
  collections: string[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedCollection: string;
  setSelectedCollection: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
}

export default function Filters({
  categories,
  collections,
  selectedCategory,
  setSelectedCategory,
  selectedCollection,
  setSelectedCollection,
  search,
  setSearch,
}: FiltersProps) {
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(localSearch);
    }, 300);
    return () => clearTimeout(handler);
  }, [localSearch, setSearch]);

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedCollection("");
    setLocalSearch("");
    setSearch("");
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-10 items-center">
      <Select
        value={selectedCategory || "all"}
        onValueChange={(val) => setSelectedCategory(val === "all" ? "" : val)}
      >
        <SelectTrigger className="w-52 bg-white border border-gray-300 rounded-md shadow-sm">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedCollection || "all"}
        onValueChange={(val) => setSelectedCollection(val === "all" ? "" : val)}
      >
        <SelectTrigger className="w-52 bg-white border border-gray-300 rounded-md shadow-sm">
          <SelectValue placeholder="All Collections" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="all">All Collections</SelectItem>
          {collections.map((col) => (
            <SelectItem key={col} value={col}>
              {col}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        placeholder="Search by title..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="w-64 bg-white border border-gray-300 rounded-md shadow-sm"
      />

      <Button
  variant="outline"
  onClick={clearFilters}
  className="transition-all duration-300 border-gray-400 hover:bg-[#d18a42] hover:text-white hover:border-[#d18a42] hover:scale-105 active:scale-95 cursor-pointer"
>
  Clear Filters
</Button>

    </div>
  );
}
