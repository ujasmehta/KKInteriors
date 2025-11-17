import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, message, phone } = body;

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const FROM_EMAIL = process.env.FROM_EMAIL;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || FROM_EMAIL;

    if (!SENDGRID_API_KEY || !FROM_EMAIL || !ADMIN_EMAIL) {
      throw new Error("Missing SendGrid env variables");
    }

    const sendEmail = async (to: string, subject: string, html: string) => {
      return fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: to }] }],
          from: { email: FROM_EMAIL },
          subject,
          content: [{ type: "text/html", value: html }],
        }),
      });
    };

    await sendEmail(
      email!,
      "Thank You for Contacting Us!",
      `<h3>Hello ${name}</h3><p>We received your message:</p><blockquote>${message}</blockquote><p>We will contact you shortly.</p>`
    );

    await sendEmail(
      ADMIN_EMAIL!,
      "New Contact Form Submission",
      `<h3>New Contact Message</h3><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone}</p><p><b>Message:</b> ${message}</p>`
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Function Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
