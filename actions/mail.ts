"use server";

import { ContactFormSchema } from "@/lib/types/form-schema";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function sendEmail(formData: ContactFormSchema) {
  const { name, email, subject, message } = formData;
  // throw new Error("test");
  try {
    const { data } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "antonlokianov@gmail.com",
      subject,
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Subject: ${subject}</p><p>Message: ${message}</p>`,
    });
    if (!data) {
      throw new Error("Failed to send email");
    }
    return data;
  } catch (err) {
    console.error("Email sending error:", err);
    throw err;
  }
}
