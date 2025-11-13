import React from "react";

export default function Hero() {
  return (
    <section className="pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl lg:text-5xl font-heading leading-tight">
            Modern craft. Curated furniture & interiors.
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-prose">
            Handcrafted furniture with a focus on material, detail and
            timelessness. Explore the collection or book a consultation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#product"
              className="px-5 py-3 rounded-md bg-accent text-white"
            >
              Shop Collection
            </a>
            <a
              href="#contact"
              className="px-5 py-3 rounded-md border border-border"
            >
              Book Consultation
            </a>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="w-full h-72 bg-secondary rounded-lg border border-border flex items-center justify-center">
            <span className="text-primary/50">Hero image</span>
          </div>
        </div>
      </div>
    </section>
  );
}
