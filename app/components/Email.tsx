"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

interface EmailSectionProps {
  messages: Record<string, string>;
}

const EmailSection: React.FC<EmailSectionProps> = ({ messages }) => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!form.current) return;

    const timeInput = form.current.elements.namedItem('time') as HTMLInputElement;
    if (timeInput) {
      timeInput.value = new Date().toLocaleString();
    }

    emailjs
      .sendForm(
        "service_v2vbjqn", 
        "template_ccmmqjk", 
        form.current, 
        "CwTZeByQS1wDk8zlk"
      )
      .then(() => {
        setEmailSubmitted(true);
        form.current?.reset();
      })
      .catch((error) => {
        console.error("Błąd wysyłania:", error);
        alert(messages.emailError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="w-full bg-dj-darkAccent pb-12 pt-24" id="contact">
      <div className="max-w-screen-2xl mx-auto px-4">
        <motion.div whileInView={{ opacity: [0, 1] }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-12 flex flex-col gap-12 justify-center items-center">
            <h2 className="text-3xl font-bold text-dj-gold">{messages.emailHeader}</h2>
            <p className="text-body text-dj-lightAccent max-w-[900px] text-center">
              {messages.emailInfo}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            <div className="flex-1 flex flex-col">
              <h3 className="text-xl font-semibold text-dj-light">{messages.emailStep0}</h3>
              <ul className="mt-4 space-y-3 text-dj-lightAccent text-body">
                <li className="flex items-center gap-2">
                  <span className="text-dj-gold">✓</span> {messages.emailStep1}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-dj-gold">✓</span> {messages.emailStep2}
                </li>
              </ul>
            </div>
            <div className="flex-1 p-0 rounded-lg flex flex-col">
              {emailSubmitted ? (
                <h3 className="text-subheading text-dj-gold font-semibold text-center flex-1 flex items-center justify-center">
                  {messages.emailSentMail}
                </h3>
              ) : (
                <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4 flex-1">
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder={messages.emailName}
                    className="p-3 bg-dj-darkAccent text-dj-light rounded-md border border-dj-purple focus:outline-none focus:ring-2 focus:ring-dj-gold placeholder-dj-lightAccent"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={messages.emailEmail}
                    className="p-3 bg-dj-darkAccent text-dj-light rounded-md border border-dj-purple focus:outline-none focus:ring-2 focus:ring-dj-gold placeholder-dj-lightAccent"
                  />
                  <textarea
                    name="message"
                    placeholder={messages.emailText}
                    className="p-3 h-28 bg-dj-darkAccent text-dj-light rounded-md border border-dj-purple focus:outline-none focus:ring-2 focus:ring-dj-gold placeholder-dj-lightAccent"
                  />
                  <input
                    type="hidden"
                    name="time"
                    value=""
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 bg-dj-purple text-dj-light font-semibold rounded-md hover:bg-dj-gold transition-colors duration-300 flex items-center justify-center gap-2 ${
                      isLoading ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-dj-light"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {messages.emailSending}
                      </>
                    ) : (
                      <>🚀 {messages.emailSend}</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmailSection;