"use client";

import React from "react";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

const AboutSection = () => {
  return (
    <main
      id="about-section"
      className="max-w-4xl mx-auto px-4 py-16 sm:py-24"
    >
      <h2 className="text-3xl sm:text-4xl font-poppins text-black tracking-widest text-center mb-10 sm:mb-16 uppercase">
        ABOUT US
      </h2>

      <div className="mx-auto w-full max-w-4xl h-64 sm:h-72 rounded-lg mb-10 sm:mb-16 overflow-hidden shadow-lg">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1500&q=80"
          alt="Interior Design"
          width={1500}
          height={900}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
          Lorem ipsum dolor sit amet consectetur. Nam ante euiusmod eu semper
          neque. Tempor magna vitae auctor magna neque varius vitae donec. In
          dignissim molestie sed pharetra ac vulputate massa nisl et.
          Adipiscing pellentesque nec viverra gravida lectus non sit netus
          vitus. Aliquam ullamcorper felis nibh viverra id ut elementum quis.
          Vel iaculis vitae ornare ac pellentesque nec elementum. Duis pretium
          massa vel molestie auctor massa vel efficitur. Vitae ne porta
          faucibus ut. Non nec lacus vel tibulum morbi vestibulum massa.
        </p>

    
        <a
          href="https://www.instagram.com/kaashthkala?igsh=eXR3dzVodG14c3c0"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#E1306C] text-white text-sm font-medium rounded-full shadow-md hover:bg-[#c72b60] transition-all duration-200"
          aria-label="Visit our Instagram profile"
        >
          <FaInstagram className="text-lg" />
          Follow us on Instagram
        </a>
      </div>
    </main>
  );
};

export default AboutSection;
