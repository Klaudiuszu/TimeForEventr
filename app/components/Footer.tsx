"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

interface FooterProps {
  messages: Record<string, string>;
  locale: string;
}

export default function Footer({ messages, locale }: FooterProps) {
  return (
    <footer className="w-full bg-dj-light text-dj-dark py-12">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative h-24 w-48 mb-4"> {/* Added fixed dimensions */}
              <Image
                src="/logo.png"
                alt="DJ Logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <p className="text-center md:text-left text-dj-dark/80">
              {messages.footer_description}
            </p>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold text-dj-gold mb-4">
              {messages.footer_contact_header}
            </h3>
            <a 
              href={`tel:${messages.footer_phone.replace(/\D/g, '')}`}
              className="text-dj-dark/90 hover:text-dj-purple transition-colors"
            >
              {messages.footer_phone}
            </a>
            <a
              href={`mailto:${messages.footer_email}`}
              className="text-dj-dark/90 hover:text-dj-purple transition-colors mt-2"
            >
              {messages.footer_email}
            </a>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold text-dj-gold mb-4">
              {messages.footer_social_header}
            </h3>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/timeforevent.pl?igsh=MTRvZHF3NDN1aTNjOQ%3D%3D&utm_source=qr" 
                aria-label="Instagram"
                className="text-dj-dark hover:text-dj-purple transition-colors"
              >
                <FaInstagram size={28} />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61576003234913&mibextid=wwXIfr&rdid=duGGzaWvxwgha15w&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AVTfFmjdV%2F%3Fmibextid%3DwwXIfr" 
                aria-label="Facebook"
                className="text-dj-dark hover:text-dj-purple transition-colors"
              >
                <FaFacebook size={28} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright and Legal Links */}
        <div className="border-t border-dj-dark/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-dj-dark/70 text-sm">
              © {new Date().getFullYear()} {messages.footer_copyright}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
              {[
                { key: "privacyPolicy", text: messages.footer_legal_privacy },
                { key: "cookies", text: messages.footer_legal_cookies },
              ].map((item) => (
                <Link 
                  key={item.key}
                  href={`/${locale}/${item.key}`}
                  className="text-dj-dark/80 hover:text-dj-gold text-sm transition-colors"
                  aria-label={item.text}
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
}