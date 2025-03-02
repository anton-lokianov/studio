"use client";

import React from "react";
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

export const ContactForm = () => {
  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
    },
  });

  const onSubmit = (data: ContactFormSchema) => {
    console.log(data);
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
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative mx-auto grid w-full grid-cols-1 gap-5 rounded-xl border border-gray-800 bg-gradient-to-b from-gray-900/60 via-blue-900/30 to-gray-800/80 p-6 shadow-2xl backdrop-blur-sm md:grid-cols-2"
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        <motion.div className="" variants={itemVariants}>
          <Input placeholder="Name" {...form.register("name")} />
          {form.formState.errors.name && (
            <p className="ml-1 text-sm text-red-500">
              {form.formState.errors.name.message}
            </p>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
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
          <GradientButton disabled={form.formState.isSubmitting} type="submit">
            <span className="relative z-10 flex items-center gap-2">
              <span>Send</span>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </motion.svg>
            </span>
            <BottomGradient />
          </GradientButton>
        </motion.div>
      </motion.form>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
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
