import { ContactFormSchema } from "@/lib/types/form-schema";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: ContactFormSchema) {
  const { name, email, subject, message } = formData;

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "antonlokianov@gmail.com",
    subject,
    html: ``,
  });
}
