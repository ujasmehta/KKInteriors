import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, product } = await req.json();

    if (!name || !email || !message || !product) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

  
    const { error: supabaseError } = await supabase.from("inquiry").insert({
      name,
      email,
      message,
      product,
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
        <p>Thank you for reaching out regarding <strong>${product}</strong>.</p>
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
      subject: `Your Inquiry About "${product}"`,
      html: htmlMessage,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Inquiry API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
