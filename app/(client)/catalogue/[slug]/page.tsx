"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { sanityClient, urlFor } from "@/lib/sanity";
import InquiryModal from "@/components/InquiryModal";
import { PortableText } from "@portabletext/react";

interface Piece {
  _id: string;
  title: string;
  description: any;
  image?: any;
  gallery?: any[];
  category?: string;
  collection?: string;
  price?: number;
  slug: { current: string };
}

export default function ProductDetail() {
  const params = useParams();
  const slug = params?.slug;
  const [product, setProduct] = useState<Piece | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Piece[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      const query = `*[_type == "piece" && slug.current == $slug][0]{
        _id,
        title,
        description,
        image,
        "category": category->title,
        "collection": collection->title,
        price,
        slug,
        gallery[]
      }`;

      try {
        const data = await sanityClient.fetch(query, { slug });

        if (data) {
          const normalizedDescription = Array.isArray(data.description)
            ? data.description
            : data.description
              ? [
                  {
                    _type: "block",
                    children: [
                      { _type: "span", text: String(data.description) },
                    ],
                  },
                ]
              : [];

          setProduct({
            ...data,
            description: normalizedDescription,
          });

          if (data.category) {
            const relatedQuery = `*[_type == "piece" && category->title == $category && slug.current != $slug][0...4]{
              _id,
              title,
              image,
              price,
              slug
            }`;
            const related = await sanityClient.fetch(relatedQuery, {
              category: data.category,
              slug,
            });
            setRelatedProducts(related);
          }
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error("Sanity fetch error:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (!slug)
    return <p className="p-10 text-red-500 text-center">Slug missing</p>;
  if (loading) return <p className="p-10 text-center">Loading...</p>;
  if (!product) return <p className="p-10 text-center">Product not found</p>;

  return (
    <section className="bg-gray-50 font-['Inter'] text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        <div className="flex-1 rounded-lg overflow-hidden shadow-lg">
          {product.image && (
            <img
              src={urlFor(product.image).width(1200).height(800).url()}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-300"
            />
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-xl font-semibold text-gray-800 mb-4">
              {product.price ? `₹${product.price}` : "Price on request"}
            </p>

            <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-6">
              {product.category && (
                <span className="px-2 py-1 bg-gray-200 rounded">
                  {product.category}
                </span>
              )}
              {product.collection && (
                <span className="px-2 py-1 bg-gray-200 rounded">
                  {product.collection}
                </span>
              )}
            </div>

            <div className="text-gray-700 leading-relaxed">
              <PortableText value={product.description} />
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="mt-6 px-8 py-3 text-white font-semibold rounded-full shadow-md 
                       transform transition-all duration-300 ease-in-out
                       hover:shadow-xl hover:-translate-y-1 hover:scale-105 cursor-pointer"
            style={{ backgroundColor: "#E9C099", border: "1px solid #B8946E" }}
          >
            INQUIRE
          </button>
        </div>
      </div>

      {product.gallery && product.gallery.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
          <div className="flex gap-4 overflow-x-auto">
            {product.gallery.map((img, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 h-40 rounded-lg overflow-hidden shadow-sm cursor-pointer transform transition duration-300 ease-in-out hover:scale-110 hover:shadow-xl"
              >
                <img
                  src={urlFor(img).width(400).height(300).url()}
                  alt={`${product.title} - image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <a
                key={item._id}
                href={`/catalogue/${item.slug.current}`}
                className="block rounded-lg overflow-hidden shadow-sm transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
              >
                {item.image && (
                  <img
                    src={urlFor(item.image).width(400).height(300).url()}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-2">
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  {item.price && (
                    <p className="text-sm text-gray-700">₹{item.price}</p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productTitle={product.title}
      />
    </section>
  );
}
