export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    // Accept both product_id and product_name
    const { name, email, message, phone, product_id, product_name } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, Email and Message are required." }, { status: 400 });
    }

    // Insert all possible fields
    const { error: supabaseError } = await supabase.from("inquiry").insert({
      name,
      email,
      phone: phone || null,
      message,
      product_id: product_id ?? null,
      product_name: product_name ?? null,
      created_at: new Date(),
    });

    if (supabaseError) throw new Error(supabaseError.message);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlMessage = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2c3e50;">Hello ${name},</h2>
        <p>
          Thank you for reaching out
          ${product_id ? ` regarding Product ID: ${product_id}` : ""}
          ${product_name ? ` regarding "${product_name}"` : ""}
        </p>
        <p>We have received your message and our team will review it shortly:</p>
        <blockquote style="background: #f9f9f9; border-left: 4px solid #f39c12; padding: 10px; margin: 15px 0;">
          ${message}
        </blockquote>
        <p>Our team will get back to you within 1-2 business days. In the meantime, feel free to reply to this email if you have any additional questions.</p>
        <p>Best regards,</p>
        <p><strong>The KK Interiors Team</strong></p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject:
        (product_id ? `Your Inquiry About Product ID ${product_id}` : "") +
        (product_name ? `Your Inquiry About "${product_name}"` : "") ||
        "Your Inquiry",
      html: htmlMessage,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Inquiry API error:", error?.message || error);
    return NextResponse.json({ error: error?.message || "Unexpected error." }, { status: 500 });
  }
}