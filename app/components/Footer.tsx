"use client";
import React from "react";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

interface FooterProps {
    messages: Record<string, string>;
}

export default function Footer({ messages }: FooterProps) {
  return (
    <footer className="w-full bg-dj-light text-dj-dark py-12">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4">
              <img 
                src="/logo.png" 
                alt="DJ Logo" 
                className="h-24 object-contain" 
              />
            </div>
            <p className="text-center md:text-left text-dj-dark/80">
              {messages.footer_description}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold text-dj-gold mb-4">
              {messages.footer_contact_header}
            </h3>
            <p className="text-dj-dark/90">{messages.footer_phone}</p>
            <p className="text-dj-dark/90 mt-2">{messages.footer_email}</p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold text-dj-gold mb-4">
              {messages.footer_social_header}
            </h3>
            <div className="flex gap-4">
              <a href="#" className="text-dj-dark hover:text-dj-purple transition-colors">
                <FaInstagram size={28} />
              </a>
              <a href="#" className="text-dj-dark hover:text-dj-purple transition-colors">
                <FaFacebook size={28} />
              </a>
              <a href="#" className="text-dj-dark hover:text-dj-purple transition-colors">
                <FaYoutube size={28} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-dj-dark/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-dj-dark/70 text-sm">
              © {new Date().getFullYear()} {messages.footer_copyright}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
              {[
                { key: "privacy", text: messages.footer_legal_privacy },
                { key: "terms", text: messages.footer_legal_terms },
                { key: "cookies", text: messages.footer_legal_cookies }
              ].map((item) => (
                <Link 
                  key={item.key}
                  href={`/${item.key}`}
                  className="text-dj-dark/80 hover:text-dj-gold text-sm transition-colors"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};