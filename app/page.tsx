"use client"; 

import React from "react";
import { ChevronRight } from "lucide-react";

const Page = () => {
  return (
    <div className="min-h-screen bg-white font-['Inter'] text-gray-800">
     
      <section className="w-full overflow-hidden">
        <img
          src="/header.png"
          alt="Elegant Furniture by KK Interiors"
          className="w-full h-[70vh] sm:h-[80vh] object-cover"
        />
      </section>

      
      <main className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
      
        <h2 className="text-3xl sm:text-4xl font-poppins text-black tracking-widest text-center mb-10 sm:mb-16 uppercase">
          ABOUT US
        </h2>

        
        <div className="mx-auto w-full max-w-4xl h-64 sm:h-70 border border-gray-300 rounded-lg mb-10 sm:mb-16 shadow-inner bg-gray-300 flex items-center justify-center">
          <span className="text-gray-400 text-lg font-light">
            Content / Image Placeholder
          </span>
        </div>

      
        <div className="text-center">
          <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Nam ante euiusmod eu semper
            neque. Tempor magna vitae auctor magna neque varius vitae donec. In
            dignissim molestie sed pharetra ac vulputate massa nisl et.
            Adipiscing pellentesque nec viverra gravida lectus non sit netus
            vitus. Aliquam ullamcorper felis nibh viverra id ut elementum quis.
            Vel iaculis vitae ornare ac pellentesque nec elementum. Duis pretium
            massa vel molestie auctor massa vel efficitur. Vitae ne porta
            faucibus ut. Non nec lacus vel tibulum morbi vestibulum massa.
          </p>

        
          <button
            onClick={() => console.log("Know More clicked")}
            className="mt-8 px-6 py-3 text-xs font-bold tracking-wider  text-black border border-[#d18a42] rounded-full hover:bg-[#d18a42] hover:text-white transition-all duration-300 ease-in-out flex items-center justify-center mx-auto cursor-pointer"
          >
            Know More <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </main>

     
    </div>
  );
};

export default Page;
