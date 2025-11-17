"use client";

import React from "react";
import { Heart } from "lucide-react";

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
    main: "/main.png",
    sketch: "/sketch.png",
    detail1: "/placeholder.png",
    detail2: "/detail2.png",
    sideView: "/side-view.png",
  },
};

export default function ProductDetail() {
  const accentColor = "#B8946E";
  const buttonColor = "#E9C099";

  return (
    <section id="product-section" className="bg-white font-['Inter'] text-gray-800">
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

      <div className="max-w-6xl mx-auto px-4 mt-8 sm:mt-12 grid md:grid-cols-2 gap-10">
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
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-16 sm:mt-24 grid md:grid-cols-2 gap-10">
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
                  <span className="font-medium mr-2">{spec.label}:</span>{" "}
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
              className="w-full h-full object-contain"
            />
          </div>

          <div className="col-span-2 mt-4">
            <button
              className="relative px-8 py-3 ml-105 text-sm font-semibold tracking-wider text-white rounded-full shadow-md transition-all duration-300 w-full md:w-auto cursor-pointer overflow-hidden hover:shadow-lg hover:-translate-y-1"
              style={{
                backgroundColor: buttonColor,
                border: `1px solid ${accentColor}`,
              }}
            >
              <span className="transition-all duration-300 group-hover:text-black">
                INQUIRE
              </span>

              <span className="absolute inset-0 opacity-0 bg-gradient-to-r from-[#d18a42]/20 to-[#D5AD3C]/40 blur-xl rounded-full transition-opacity duration-300 hover:opacity-100" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-20 sm:pt-32 pb-16">
        <h2 className="text-xl font-medium uppercase text-gray-800 mb-2">
          PRODUCTS THIS CAN PAIR WITH
        </h2>
        <WaveAccent />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="w-full h-64 border border-gray-300 rounded-sm bg-gray-50 flex items-center justify-center hover:shadow-lg transition-shadow"
            >
              <span className="text-gray-400 text-lg">
                Product {num} Placeholder
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
