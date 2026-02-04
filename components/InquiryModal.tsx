"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  product_name: string;
  message: string;
}

export default function InquiryDrawer({
  isOpen,
  onClose,
  productTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset } = useForm<InquiryFormData>();

  const onSubmit = async (data: InquiryFormData) => {
    setLoading(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_njfihvu",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_qw0etep",
        {
          from_name: data.name,
          from_email: data.email,
          phone: data.phone,
          product_name: data.product_name,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "bUInX_lQLBGG-5Q8F"
      );

      toast.success("Inquiry submitted successfully!");
      setSuccess(true);
      reset();
    } catch (err: any) {
      const errorMsg =
        err?.text || err?.message || "Failed to submit inquiry via EmailJS.";
      toast.error(errorMsg);
      console.error("Inquiry EmailJS Error:", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose}></div>
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50
        transform transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="relative p-5 border-b">
          <h2 className="text-xl font-bold">Enquiry Form</h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-5 text-gray-500 hover:text-black text-2xl cursor-pointer"
          >
            ×
          </button>
        </div>
        <div className="p-6">
          {success ? (
            <p className="text-green-600 text-lg font-semibold">
              Inquiry submitted successfully!
            </p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                defaultValue={productTitle}
                {...register("product_name", { required: true })}
                className="w-full border px-3 py-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Your Name"
                {...register("name", { required: true })}
                className="w-full border px-3 py-2 rounded-md"
              />
              <input
                type="email"
                placeholder="Your Email"
                {...register("email", { required: true })}
                className="w-full border px-3 py-2 rounded-md"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                {...register("phone", { required: true })}
                className="w-full border px-3 py-2 rounded-md"
              />
              <textarea
                placeholder="Message"
                {...register("message", { required: true })}
                className="w-full border px-3 py-2 rounded-md h-28"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2F6B54] text-white px-4 py-2 rounded-md
                  hover:bg-[#0a2219] transition-colors cursor-pointer"
              >
                {loading ? "Submitting..." : "Submit Inquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}