"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GradientButton } from "../ui/gradient-button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  type ContactFormSchema,
} from "@/lib/types/form-schema";
import { sendEmail } from "@/actions/mail";
import { useAnimate } from "motion/react";
import { Loader } from "../ui/loader";
import { useRouter } from "next/navigation";

export const ContactForm = () => {
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
    },
  });

  const router = useRouter();

  const [scope, animate] = useAnimate();

  const onSubmit = async (data: ContactFormSchema) => {
    await animate([
      [
        "#name, #email, #subject, #message, #submit",
        { opacity: 0.7, scale: 0.99 },
        { duration: 0.8 },
      ],
    ]);
    try {
      await sendEmail(data);
      setStatus("success");
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl py-2">
      <motion.div
        className="mb-8 flex flex-col items-center justify-center text-center"
        initial="hidden"
        animate="visible"
        variants={itemVariants}
      >
        <h2 className="w-fit bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          Contact Us
        </h2>
        <div className="mb-4 mt-2 flex items-center justify-center">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          <span className="mx-2 text-sm text-gray-400">Let&apos;s Talk</span>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>
        <p className="mx-auto max-w-lg text-gray-400">
          We&apos;d love to hear from you. Fill out the form below and
          we&apos;ll get back to you as soon as possible.
        </p>
      </motion.div>

      <motion.form
        ref={scope}
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative mx-auto grid min-h-[26rem] w-full grid-cols-1 gap-5 rounded-xl border border-gray-800 bg-gradient-to-b from-gray-900/60 via-blue-900/30 to-gray-800/80 p-6 shadow-2xl backdrop-blur-sm md:grid-cols-2"
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        {!status && (
          <>
            <motion.div id="name" className="" variants={itemVariants}>
              <Input placeholder="Name" {...form.register("name")} />
              {form.formState.errors.name && (
                <p className="ml-1 text-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </motion.div>

            <motion.div id="email" variants={itemVariants}>
              <Input placeholder="Email" {...form.register("email")} />
              {form.formState.errors.email && (
                <p className="ml-1 text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="col-span-1 md:col-span-2"
              id="subject"
            >
              <Input
                placeholder="Subject"
                containerClassName="col-span-1 md:col-span-2"
                {...form.register("subject")}
              />
              {form.formState.errors.subject && (
                <p className="ml-1 text-sm text-red-500">
                  {form.formState.errors.subject.message}
                </p>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="col-span-1 md:col-span-2"
              id="message"
            >
              <Textarea
                {...form.register("message")}
                placeholder="Message"
                className="resize-none"
                containerClassName="col-span-1 md:col-span-2"
                rows={6}
              />
              {form.formState.errors.message && (
                <p className="ml-1 text-sm text-red-500">
                  {form.formState.errors.message.message}
                </p>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="col-span-1 flex justify-end md:col-span-2"
            >
              <GradientButton
                className="flex w-28 items-center justify-center p-px"
                disabled={form.formState.isSubmitting}
                type="submit"
                id="submit"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {form.formState.isSubmitting ? (
                    <Loader />
                  ) : (
                    <>
                      <span>Send</span>
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </motion.svg>
                    </>
                  )}
                </span>
              </GradientButton>
            </motion.div>
          </>
        )}
        {status === "success" && (
          <div className="col-span-2 flex flex-col items-center justify-center">
            <CheckIcon />
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-bold"
            >
              Thank you for your message!
            </motion.h2>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.4, duration: 0.3 },
              }}
              className="text-md mt-4 rounded-lg border border-gray-700 bg-background px-4 py-2 text-white transition-all duration-200 hover:scale-105"
              onClick={() => router.push("/")}
              type="button"
            >
              <span>homepage</span>
            </motion.button>
          </div>
        )}
        {status === "error" && (
          <div className="col-span-2 flex flex-col items-center justify-center">
            <XIcon />
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-bold"
            >
              Something went wrong. Please try again.
            </motion.h2>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.4, duration: 0.3 },
              }}
              className="text-md mt-4 rounded-lg border border-gray-700 bg-background px-4 py-2 text-white transition-all duration-200 hover:scale-105"
              onClick={() => setStatus(null)}
              type="button"
            >
              <span>try again</span>
            </motion.button>
          </div>
        )}
      </motion.form>
    </div>
  );
};

const XIcon = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        rotate: [0, -10, 10, -10, 10, 0],
      }}
      transition={{
        duration: 0.5,
        rotate: {
          duration: 0.5,
          ease: "easeInOut",
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        },
      }}
    >
      <defs>
        <linearGradient id="xGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" /> {/* red-500 */}
          <stop offset="100%" stopColor="#EC4899" /> {/* pink-500 */}
        </linearGradient>
      </defs>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18 6 6 18"
        stroke="url(#xGradient)"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 6l12 12"
        stroke="url(#xGradient)"
      />
    </motion.svg>
  );
};

const CheckIcon = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-check"
      initial={{ scale: 0.9, opacity: 0.8 }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.7,
      }}
    >
      <defs>
        <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" /> {/* blue-500 */}
          <stop offset="100%" stopColor="#EC4899" /> {/* pink-500 */}
        </linearGradient>
      </defs>
      <motion.path
        d="M20 6 9 17l-5-5"
        stroke="url(#checkGradient)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
    </motion.svg>
  );
};

const formVariants = {
  hidden: { opacity: 0.3 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};
