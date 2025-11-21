"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";

interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
      const { error } = await supabase.from("inquiry").insert({
        ...data,
        product: productTitle,
        created_at: new Date(),
      });

      if (error) throw new Error(error.message);

      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, product: productTitle }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      toast.success("Inquiry submitted successfully!");
      setSuccess(true);
      reset();
    } catch (err: any) {
      toast.error(err.message || "Failed to submit inquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        ></div>
      )}

    
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 
        transform transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
       
        <div className="relative p-5 border-b">
          <h2 className="text-xl font-bold">Enquire About</h2>
          <p className="text-[15px] text-gray-700">{productTitle}</p>

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
                className="w-full bg-[#f3953d] text-white px-4 py-2 rounded-md 
                hover:bg-[#edb171] transition-colors cursor-pointer"
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
