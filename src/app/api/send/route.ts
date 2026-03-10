import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

import { contactSchema } from '@/lib/validations';

const MY_EMAIL = 'aryanarora28march@gmail.com';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
       host: process.env.SMTP_HOST,
       port: parseInt(process.env.SMTP_PORT || '587'),
       secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
       auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
       },
});

export async function POST(request: Request) {
       try {
              const body = await request.json();

              // Validate input
              const validatedData = contactSchema.safeParse(body);

              if (!validatedData.success) {
                     return NextResponse.json({
                            error: 'Validation failed',
                            details: validatedData.error.flatten().fieldErrors
                     }, { status: 400 });
              }

              const { name, email, subject, message } = validatedData.data;

              // Check if SMTP is configured
              if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
                     console.error('SMTP credentials missing in .env');
                     return NextResponse.json({ error: 'Mail server not configured. Please check .env file.' }, { status: 500 });
              }

              // 1. Send email to Admin (You)
              console.log('Sending SMTP email to admin:', MY_EMAIL);
              const adminMailOptions = {
                     from: `"Portfolio Form" <${process.env.SMTP_USER}>`,
                     to: MY_EMAIL,
                     replyTo: email,
                     subject: `New Contact Form Submission: ${subject}`,
                     html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #FF4500;">New Message from Portfolio</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="white-space: pre-wrap;">${message}</p>
                    <p style="font-size: 10px; color: #888; margin-top: 20px;">Sent via SMTP from Portfolio Contact Form</p>
                </div>
            `,
              };

              const adminInfo = await transporter.sendMail(adminMailOptions);
              console.log('Admin email sent:', adminInfo.messageId);

              // 2. Send confirmation email to User
              console.log('Sending SMTP confirmation to user:', email);
              const userMailOptions = {
                     from: `"Aryan Arora" <${process.env.SMTP_USER}>`,
                     to: email,
                     subject: 'I have received your message',
                     html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #FF4500;">Thanks for reaching out, ${name}!</h2>
                    <p>I wanted to let you know that I've received your message regarding <strong>"${subject}"</strong>.</p>
                    <p>I usually respond within 24-48 hours. Looking forward to chatting!</p>
                    <br />
                    <p>Best regards,</p>
                    <p><strong>Aryan Arora</strong></p>
                </div>
            `,
              };

              try {
                     const userInfo = await transporter.sendMail(userMailOptions);
                     console.log('User confirmation sent:', userInfo.messageId);
              } catch (userErr) {
                     console.warn('User confirmation failed (Non-blocking):', userErr);
              }

              return NextResponse.json({ success: true, messageId: adminInfo.messageId });
       } catch (error) {
              console.error('SMTP API Route Error:', error);
              return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
       }
}
