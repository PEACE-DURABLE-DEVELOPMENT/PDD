import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "peaceanddurablepdd@gmail.com";
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_PASS;

    // Check configuration
    if (!gmailUser || !gmailPass) {
      console.error("Gmail SMTP configuration missing: GMAIL_USER and GMAIL_PASS must be defined in environment variables.");
      return NextResponse.json(
        { error: "Email service configuration is missing on the server. Please configure GMAIL_USER and GMAIL_PASS." },
        { status: 500 }
      );
    }

    // 1. Initialize Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    // 2. Setup email options
    const mailOptions = {
      from: `"${name}" <${gmailUser}>`, // Gmail SMTP overrides the 'from' address to gmailUser, so we set friendly name
      replyTo: email, // Allows direct replies to the sender's email
      to: receiverEmail,
      cc: "peace.durable.development@gmail.com, info@pddrwanda.org",
      subject: `PDD Rwanda Website Contact: ${subject || "No Subject"}`,
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nSubject: ${subject || "No Subject"}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <div style="text-align: center; margin-bottom: 24px;">
            <h2 style="color: #16a34a; font-size: 24px; font-weight: 700; margin: 0; padding-bottom: 12px; border-bottom: 2px solid #f3f4f6;">PDD Rwanda</h2>
            <p style="font-size: 14px; color: #6b7280; margin: 8px 0 0 0;">New Contact Form Submission</p>
          </div>
          
          <div style="margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #4b5563; width: 100px; border-bottom: 1px solid #f3f4f6;">Name</td>
                <td style="padding: 10px 0; color: #1f2937; border-bottom: 1px solid #f3f4f6;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #4b5563; border-bottom: 1px solid #f3f4f6;">Email</td>
                <td style="padding: 10px 0; color: #1f2937; border-bottom: 1px solid #f3f4f6;"><a href="mailto:${email}" style="color: #16a34a; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #4b5563; border-bottom: 1px solid #f3f4f6;">Phone</td>
                <td style="padding: 10px 0; color: #1f2937; border-bottom: 1px solid #f3f4f6;">${phone || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #4b5563; border-bottom: 1px solid #f3f4f6;">Subject</td>
                <td style="padding: 10px 0; color: #1f2937; border-bottom: 1px solid #f3f4f6;">${subject || "No Subject"}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 12px; border-left: 4px solid #16a34a; margin-bottom: 24px;">
            <h4 style="margin: 0 0 8px 0; color: #374151; font-weight: 600; font-size: 14px;">Message Content:</h4>
            <p style="margin: 0; color: #4b5563; font-size: 15px; white-space: pre-wrap; line-height: 1.5;">${message}</p>
          </div>
          
          <div style="border-top: 1px solid #f3f4f6; padding-top: 16px; text-align: center;">
            <p style="font-size: 12px; color: #9ca3af; margin: 0;">This email was sent securely from the contact form on the PDD Rwanda website.</p>
            <p style="font-size: 11px; color: #d1d5db; margin: 4px 0 0 0;">Recipient: ${receiverEmail}</p>
          </div>
        </div>
      `,
    };

    // 3. Send Email
    await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent to ${receiverEmail} via Gmail.`);

    // 4. Backup: Submit to Airtable if configured
    if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
      try {
        const AIRTABLE_API_URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/ContactSubmissions`;
        const response = await fetch(AIRTABLE_API_URL, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.AIRTABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            records: [
              {
                fields: {
                  Name: name,
                  Email: email,
                  Subject: subject || "",
                  Message: message,
                  SubmittedAt: new Date().toISOString(),
                },
              },
            ],
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Airtable submission warning (email succeeded):", errorData);
        } else {
          console.log("Backup Airtable submission succeeded.");
        }
      } catch (airtableErr) {
        console.error("Airtable backup failed (email succeeded):", airtableErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Contact form sending error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to send message. Please check server configuration.";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

