"use client";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { sanityClient, urlFor } from "@/lib/sanity";
import InquiryModal from "@/components/InquiryModal";
import { PortableText } from "@portabletext/react";

/* ---------------- ZOOM IMAGE ---------------- */

function ZoomImage({
  src,
  alt,
  zoomScale = 3,
}: {
  src: string;
  alt: string;
  zoomScale?: number;
}) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [zoomed, setZoomed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  return (
    <div
      className="w-full h-full overflow-hidden cursor-zoom-in"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain transition-transform duration-200 ease-out"
        style={{
          transformOrigin: `${position.x}% ${position.y}%`,
          transform: zoomed ? `scale(${zoomScale})` : "scale(1)",
        }}
      />
    </div>
  );
}

/* ---------------- GALLERY MODAL ---------------- */

function GalleryModal({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-[90vw] h-[85vh] bg-black rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 text-white text-2xl font-bold"
        >
          ✕
        </button>

        <ZoomImage src={src} alt="Gallery zoom" zoomScale={3.5} />
      </div>
    </div>
  );
}

/* ---------------- TYPES ---------------- */

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

/* ---------------- PAGE ---------------- */

export default function ProductDetail() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Piece | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Piece[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeGalleryImage, setActiveGalleryImage] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      const query = `*[_type == "piece" &&
        (slug.current == $slug || _id == $slug)][0]{
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

      const data = await sanityClient.fetch(query, { slug });

      if (data) {
        const normalizedDescription = Array.isArray(data.description)
          ? data.description
          : data.description
          ? [
              {
                _type: "block",
                children: [{ _type: "span", text: String(data.description) }],
              },
            ]
          : [];

        setProduct({ ...data, description: normalizedDescription });

        if (data.category) {
          const related = await sanityClient.fetch(
            `*[_type=="piece" && category->title==$category && slug.current!=$slug][0...4]{
              _id, title, image, slug
            }`,
            { category: data.category, slug }
          );
          setRelatedProducts(related);
        }
      }

      setLoading(false);
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <p className="p-10 text-center">Loading...</p>;
  if (!product) return <p className="p-10 text-center">Product not found</p>;

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        {/* MAIN IMAGE */}
        <div className="flex-1 rounded-lg overflow-hidden shadow-lg">
          {product.image && (
            <ZoomImage
              src={urlFor(product.image).width(1400).url()}
              alt={product.title}
              zoomScale={3}
            />
          )}
        </div>

        {/* DETAILS */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <PortableText value={product.description} />
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="mt-6 px-8 py-3 text-white rounded-full"
            style={{ backgroundColor: "#2F6B54" }}
          >
            INQUIRE
          </button>
        </div>
      </div>

      {/* GALLERY */}
      {product.gallery && product.gallery.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
          <div className="flex gap-4 overflow-x-auto">
            {product.gallery.map((img, index) => {
              const src = urlFor(img).width(600).url();
              return (
                <div
                  key={index}
                  onClick={() => {
                    setActiveGalleryImage(src);
                    setGalleryOpen(true);
                  }}
                  className="flex-shrink-0 w-64 h-40 rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-105 transition"
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* GALLERY MODAL */}
      {galleryOpen && activeGalleryImage && (
        <GalleryModal
          src={activeGalleryImage}
          onClose={() => setGalleryOpen(false)}
        />
      )}

      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productTitle={product.title}
      />
    </section>
  );
}
