"use client";

import React, { useEffect } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

const WaveAccent = () => (
  <svg
    className="w-full h-2 my-1"
    viewBox="0 0 100 8"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 4C10 8 20 0 30 4C40 8 50 0 60 4C70 8 80 0 90 4C95 6 100 4"
      stroke="#B8946E"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const productDetails = {
  name: "Signature Low-Seating Bench",
  sku: "KK-SB-2024",
  description:
    "Lorem ipsum dolor sit amet consectetur. Tempor magna vitae auctor magna neque varius vitae donec. In dignissim molestie sed pharetra ac vulputate massa nisl et. Adipiscing pellentesque nec viverra gravida lectus non sit netus vitus. Aliquam ullamcorper felis nibh viverra id ut elementum quis. Vel iaculis vitae ornare ac pellentesque nec elementum. Duis pretium massa vel molestie auctor massa vel efficitur.",
  specs: [
    { label: "SIZE", value: "150cm x 60cm x 75cm" },
    { label: "COLOUR", value: "Forest Green / Mustard" },
    { label: "MATERIAL", value: "Oak Wood, Velvet Fabric" },
  ],
  images: {
    main: "/products/color-1.png",
    sketch: "/products/bw-1.png",
    detail1: "/products/color-3.png",
    detail2: "/products/color-2.png",
    sideView: "/products/bw-2.png",
  },
};

export default function Page() {
  const router = useRouter();
  const accentColor = "#B8946E";

  useEffect(() => {
    router.push("/#product");
  }, [router]);

  return (
    <div className="min-h-screen bg-white font-['Inter'] text-gray-800">
      <header className="max-w-6xl mx-auto px-4 pt-8 sm:pt-12 flex justify-between items-start">
        <h1 className="text-sm text-gray-700 font-medium">
          {productDetails.name}{" "}
          <span className="text-gray-400">({productDetails.sku})</span>
        </h1>
        <Heart
          size={20}
          strokeWidth={1}
          className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
        />
      </header>

      <section className="max-w-6xl mx-auto px-4 mt-8 sm:mt-12 grid md:grid-cols-2 gap-10">
        <div className="flex flex-col items-center md:items-start">
          <div className="w-full aspect-[16/10] border border-gray-200 rounded-sm overflow-hidden shadow-md">
            <img
              src={productDetails.images.main}
              alt={productDetails.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex space-x-2 mt-4">
            {["#D5AD3C", "#59508C", "#3A7C5C", "#ADD8E6"].map(
              (color, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-sm border-2 cursor-pointer ${
                    index === 0
                      ? "border-gray-800"
                      : "border-transparent hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: color }}
                />
              )
            )}
          </div>
        </div>

        <div className="hidden md:block">
          <div className="w-full aspect-[16/10] border-b border-gray-300">
            <img
              src={productDetails.images.sketch}
              alt="Product Sketch"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 mt-16 sm:mt-24 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-medium uppercase text-gray-800 mb-2">
            PRODUCT INFO
          </h2>
          <WaveAccent />

          <p className="mt-6 text-sm text-gray-600 leading-relaxed max-w-sm">
            {productDetails.description}
          </p>

          <div className="mt-8">
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">
              SPECIFICATIONS
            </h3>
            <ul className="space-y-1">
              {productDetails.specs.map((spec, index) => (
                <li key={index} className="text-xs text-gray-700">
                  <span className="font-medium mr-2">{spec.label}:</span>
                  {spec.value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 h-full">
          <div className="col-span-1 h-40 sm:h-52 border border-gray-200 rounded-sm overflow-hidden">
            <img
              src={productDetails.images.detail1}
              alt="Detail 1"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="col-span-1 row-span-2 h-full border border-gray-200 rounded-sm overflow-hidden">
            <img
              src={productDetails.images.detail2}
              alt="Detail 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-1 h-40 sm:h-52 border border-gray-200 rounded-sm overflow-hidden">
            <img
              src={productDetails.images.sideView}
              alt="Side View"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
