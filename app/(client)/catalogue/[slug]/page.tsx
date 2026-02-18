"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { sanityClient, urlFor } from "@/lib/sanity";
import InquiryModal from "@/components/InquiryModal";
import { PortableText } from "@portabletext/react";

/* ----------- UNIVERSAL CLICK/TOUCH-ZOOM AND PAN COMPONENT ----------- */
function ClickPanZoomImage({
  src,
  alt,
  zoomScale = 3,
}: {
  src: string;
  alt: string;
  zoomScale?: number;
}) {
  const [zoomed, setZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 }); // px
  const [containerSize, setContainerSize] = useState({ width: 1, height: 1 });
  const [imgSize, setImgSize] = useState({ width: 1, height: 1 });
  const dragStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Set container/image sizes
  useEffect(() => {
    function updateSizes() {
      if (containerRef.current && imgRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
        setImgSize({
          width: imgRef.current.offsetWidth,
          height: imgRef.current.offsetHeight,
        });
      }
    }
    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  // Clamp pan so you can't scroll outside the image
  function clampPan(x: number, y: number) {
    const w = imgSize.width * zoomScale;
    const h = imgSize.height * zoomScale;
    const cw = containerSize.width;
    const ch = containerSize.height;
    // Only allow panning so the empty space is never visible
    const maxPanX = Math.max(0, (w - cw) / 2);
    const maxPanY = Math.max(0, (h - ch) / 2);
    return {
      x: Math.min(maxPanX, Math.max(-maxPanX, x)),
      y: Math.min(maxPanY, Math.max(-maxPanY, y)),
    };
  }

  // On click/tap: zoom in/out and center on click
  function handleClick(e: React.MouseEvent | React.TouchEvent) {
    if (!zoomed) {
      // Get click/tap point relative to image center to center zoom there
      let clientX = 0;
      let clientY = 0;
      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect && imgRef.current) {
        const imgW = imgRef.current.offsetWidth;
        const imgH = imgRef.current.offsetHeight;
        const offsetX = clientX - rect.left - imgW / 2;
        const offsetY = clientY - rect.top - imgH / 2;
        // Inverse zoom for pan so the clicked point stays at center
        setPan(clampPan(-offsetX * (zoomScale - 1), -offsetY * (zoomScale - 1)));
      } else {
        setPan({ x: 0, y: 0 });
      }
      setZoomed(true);
    } else {
      setZoomed(false);
      setPan({ x: 0, y: 0 });
    }
  }

  // Mouse drag to pan
  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    if (!zoomed) return;
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }
  function handleMouseMove(e: MouseEvent) {
    if (!dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    const { panX, panY } = dragStart.current;
    setPan(clampPan(panX + dx, panY + dy));
  }
  function handleMouseUp() {
    dragStart.current = null;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }

  // Touch drag to pan
  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    if (!zoomed) return;
    const t = e.touches[0];
    dragStart.current = { x: t.clientX, y: t.clientY, panX: pan.x, panY: pan.y };
  }
  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (!zoomed || !dragStart.current) return;
    const t = e.touches[0];
    const dx = t.clientX - dragStart.current.x;
    const dy = t.clientY - dragStart.current.y;
    const { panX, panY } = dragStart.current; // SAFE destructure
    setPan(clampPan(panX + dx, panY + dy));
  }
  function handleTouchEnd() {
    dragStart.current = null;
  }

  // Wheel scroll for panning (desktop)
  function handleWheel(e: React.WheelEvent) {
    if (!zoomed) return;
    e.preventDefault();
    setPan(p => clampPan(p.x - e.deltaX, p.y - e.deltaY));
  }

  // Zoom out (mobile: tap outside, desktop: click outside)
  useEffect(() => {
    if (!zoomed) return;
    function handleOutside(e: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as any)
      ) {
        setZoomed(false);
        setPan({ x: 0, y: 0 });
      }
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [zoomed]);

  // Show grab or zoom cursor
  const cursorStyle =
    zoomed && !dragStart.current
      ? "grab"
      : zoomed && dragStart.current
      ? "grabbing"
      : "zoom-in";

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden select-none"
      style={{ minHeight: 320, maxHeight: 560, touchAction: "none", cursor: cursorStyle }}
      onClick={handleClick}
      onDoubleClick={handleClick}
      onMouseDown={handleMouseDown}
      onTouchStart={e => {
        if (e.touches.length === 1) {
          if (!zoomed) handleClick(e);
          else handleTouchStart(e);
        }
      }}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      tabIndex={0}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        draggable={false}
        className="w-full h-full object-contain transition-transform duration-200 ease-out"
        style={{
          transform: zoomed
            ? `scale(${zoomScale}) translate(${pan.x / zoomScale}px, ${pan.y / zoomScale}px)`
            : "scale(1) translate(0,0)",
          userSelect: "none",
          background: "transparent",
          cursor: cursorStyle,
          touchAction: "none",
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
        className="relative w-[90vw] h-[85vh] rounded-lg overflow-hidden bg-transparent"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 text-white text-2xl font-bold"
        >
          ✕
        </button>
        <ClickPanZoomImage src={src} alt="Gallery zoom" zoomScale={3} />
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
        <div className="flex-1 rounded-lg overflow-hidden shadow-lg min-h-[320px] max-h-[560px] flex items-center justify-center">
          {product.image ? (
            <ClickPanZoomImage
              src={urlFor(product.image).width(1400).url()}
              alt={product.title}
              zoomScale={3}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image available
            </div>
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