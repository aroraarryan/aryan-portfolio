import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import * as z from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(4),
  projectType: z.enum(["web", "ai", "fullstack", "landing", "other"]),
  message: z.string().min(20),
  honeypot: z.string().max(0),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    const { name, email, subject, projectType, message, honeypot } = result.data;

    if (honeypot) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_TO_EMAIL
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
      console.error("Missing environment variables for contact form");
      return NextResponse.json(
        { error: "Configuration Error", message: "Server is not properly configured to send emails." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        // Essential for some hosting providers like Netlify
        rejectUnauthorized: false,
      },
    });

    const firstName = name.split(" ")[0];

    // 1. Send e-mail to site owner
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #5c1a0f;">New Message from Portfolio</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px; border: 1px solid #eee;"><strong>Name</strong></td><td style="padding: 10px; border: 1px solid #eee;">${name}</td></tr>
            <tr><td style="padding: 10px; border: 1px solid #eee;"><strong>Email</strong></td><td style="padding: 10px; border: 1px solid #eee;">${email}</td></tr>
            <tr><td style="padding: 10px; border: 1px solid #eee;"><strong>Project Type</strong></td><td style="padding: 10px; border: 1px solid #eee;">${projectType}</td></tr>
            <tr><td style="padding: 10px; border: 1px solid #eee;"><strong>Message</strong></td><td style="padding: 10px; border: 1px solid #eee;">${message}</td></tr>
          </table>
        </div>
      `,
    });

    // 2. Clear auto-reply to user
    await transporter.sendMail({
      from: `"Aryan Arora" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Got your message, ${firstName}!`,
      html: `
        <div style="font-family: serif; color: #2a1a0e; padding: 40px; background-color: #f5f0e8; border-radius: 0;">
          <h1 style="font-size: 24px;">Hi ${firstName},</h1>
          <p style="font-size: 16px; line-height: 1.6;">Thanks for reaching out! I've received your request about <strong>${subject}</strong> and will get back to you within 24 hours.</p>
          <p style="font-size: 16px; line-height: 1.6;">Looking forward to potentially working together.</p>
          <br />
          <p style="margin-top: 20px;">Best,<br /><strong>Aryan Arora</strong><br /><span style="color: #5c1a0f; font-size: 14px;">Full-Stack Developer</span></p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Contact Form error:", error);

    // Log configuration state (safe for production debugging)
    console.log("Configuration Check:", {
      hasHost: !!process.env.SMTP_HOST,
      hasPort: !!process.env.SMTP_PORT,
      hasUser: !!process.env.SMTP_USER,
      hasPass: !!process.env.SMTP_PASS,
      hasToEmail: !!process.env.CONTACT_TO_EMAIL,
    });

    return NextResponse.json(
      {
        error: "Server Error",
        message: error?.message || "Unknown error occurred"
      },
      { status: 500 }
    );
  }
}
