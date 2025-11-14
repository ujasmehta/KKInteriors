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

const ContactUs = () => {
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("contact").insert([form]);

    setLoading(false);

    if (error) {
      console.error(error);
      toast.error("Failed to send message!");
      return;
    }

    toast.success("Message sent successfully!");

    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-20">
      <motion.div
        className="max-w-xl mx-auto px-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-heading text-center tracking-widest uppercase mb-10"
          variants={item}
        >
          Contact Us
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 border border-border bg-white p-8 rounded-2xl shadow-sm"
          variants={item}
        >
          <motion.input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border border-border rounded-md px-4 py-3 bg-secondary/20 focus:ring-2 focus:ring-accent outline-none"
            variants={item}
          />

          <motion.input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border border-border rounded-md px-4 py-3 bg-secondary/20 focus:ring-2 focus:ring-accent outline-none"
            variants={item}
          />

          <motion.input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="border border-border rounded-md px-4 py-3 bg-secondary/20 focus:ring-2 focus:ring-accent outline-none"
            variants={item}
          />

          <motion.textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="border border-border rounded-md px-4 py-3 bg-secondary/20 focus:ring-2 focus:ring-accent outline-none"
            variants={item}
          />

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full px-5 py-3 rounded-md border border-border bg-transparent text-[#D5AD3C]"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18 }}
            variants={item}
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default ContactUs;
