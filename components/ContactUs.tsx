"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, Variants } from "framer-motion";
import { toast } from "sonner";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, when: "beforeChildren" },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const ContactUs = ({ onSuccess }: any) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  const { error } = await supabase.from("contact").insert([form]);
  if (error) {
    toast.error("Failed to send message!");
    setLoading(false);
    return;
  }

  await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  toast.success("Message sent successfully!");
  setForm({ name: "", email: "", phone: "", message: "" });
  setLoading(false);

  if (onSuccess) onSuccess();
};


  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-5"
    >
      <motion.input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded-md px-4 py-3"
        variants={item}
      />

      <motion.input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded-md px-4 py-3"
        variants={item}
      />

      <motion.input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded-md px-4 py-3"
        variants={item}
      />

      <motion.textarea
        name="message"
        placeholder="Your Message"
        value={form.message}
        onChange={handleChange}
        required
        rows={5}
        className="border border-gray-300 rounded-md px-4 py-3"
        variants={item}
      />

      <motion.button
        type="submit"
        disabled={loading}
        className="w-full px-5 py-3 rounded-md border border-gray-400 bg-transparent text-[#D5AD3C] cursor-pointer"
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        variants={item}
      >
        {loading ? "Sending..." : "Send Message"}
      </motion.button>
    </motion.form>
  );
};

export default ContactUs;
