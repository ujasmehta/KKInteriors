"use client";

import React, { useState } from "react";

import { Mail, Smartphone, MapPin, MessageCircle } from "lucide-react";

import ContactModal from "@/components/ContactModal";
import ContactUs from "@/components/ContactUs";

const accentColor = "#C6A16B";

const primaryTextColor = "#2B3A5A";

const WaveAccent = () => (
  <div className="flex justify-center mb-10">
    <svg
      width="180"
      height="18"
      viewBox="0 0 180 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-800"
    >
      <path
        d="M3 9 C 30 2, 60 16, 90 9 C 120 2, 150 16, 177 9"
        stroke={accentColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const ContactPage = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <section
        id="contact-section"
        className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center"
      >
        <h2
          className="text-3xl sm:text-4xl font-normal tracking-widest uppercase mb-1 text-black"
          style={{ fontFamily: "serif" }}
        >
          CONTACT US
        </h2>

        <WaveAccent />

        <div className="mt-16 grid grid-cols-3 gap-8">
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setOpenModal(true)}
          >
            <Mail
              size={64}
              strokeWidth={1}
              style={{ color: accentColor }}
              className="mb-2"
            />

            <p
              className="mt-4 text-sm uppercase tracking-wider"
              style={{ color: primaryTextColor }}
            >
              Email
            </p>
          </div>

          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => window.open("https://wa.me/91999999999")}
          >
            <MessageCircle
              size={64}
              strokeWidth={1}
              style={{ color: accentColor }}
              className="mb-2"
            />

            <p
              className="mt-4 text-sm uppercase tracking-wider"
              style={{ color: primaryTextColor }}
            >
              WhatsApp
            </p>
          </div>

          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() =>
              window.open(
                "https://www.google.com/maps/place/Bangalore,+Karnataka",
                "_blank"
              )
            }
          >
            <MapPin
              size={64}
              strokeWidth={1}
              style={{ color: accentColor }}
              className="mb-2"
            />
            <p
              className="mt-4 text-sm uppercase tracking-wider"
              style={{ color: primaryTextColor }}
            >
              Locations
            </p>
          </div>
        </div>
      </section>

      <ContactModal open={openModal} onClose={() => setOpenModal(false)}>
        <ContactUs onSuccess={() => setOpenModal(false)} />
      </ContactModal>
    </>
  );
};

export default ContactPage;
