import { ContactForm } from "@/components/forms/contact-form";
import { Spotlight } from "@/components/ui/spotlight";
import React from "react";

export default function ContactPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-clip p-3">
      <Spotlight />
      <ContactForm />
    </main>
  );
}
