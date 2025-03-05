"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  locale: string;
  messages: Record<string, string>;
}

export default function Navbar({ locale, messages }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const nextLocale = locale === "pl" ? "en" : "pl";
  const langLabel = locale === "pl" ? "EN" : "PL";

  const handleLinkClick = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <nav className="w-full relative flex items-center justify-between max-w-2xl mx-auto px-4 py-5">
      <Link href={`/${locale}`} className="font-bold text-3xl">
        Time For<span className="text-primary"> Event</span>
      </Link>
      <div className="hidden md:flex items-center gap-4">
        <a href="#about" className="font-bold transition-transform duration-200 hover:-rotate-3">
          {messages.about}
        </a>
        <a href="#offer" className="font-bold transition-transform duration-200 hover:rotate-2">
          {messages.offer}
        </a>
        <Link href={`/${locale}/blog`} className="font-bold transition-transform duration-200 hover:-rotate-2">
          {messages.blog}
        </Link>
        <a href="#contact" className="font-bold transition-transform duration-200 hover:rotate-3">
          {messages.contact}
        </a>
        <Link
          href={`/${nextLocale}`}
          className="font-bold px-4 py-2 rounded-lg relative overflow-hidden transition-all duration-300 bg-primary text-black 
            before:absolute before:inset-0 before:bg-white before:opacity-0 before:transition-opacity before:duration-300 
            hover:before:opacity-20 shadow-lg hover:shadow-white/50"
        >
          <span className="relative z-10">{langLabel}</span>
        </Link>
      </div>
      <button className="md:hidden text-primary" onClick={() => setIsOpen(true)}>
        <Menu size={28} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-black z-50 flex flex-col transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
          }`}
      >
        <button
          className="absolute top-6 right-6 text-[#cfcfc4] transition-colors duration-300 z-10 group-hover:text-black"
          onClick={() => setIsOpen(false)}
        >
          <X size={32} className="transition-colors duration-300 " />
        </button>

        <div className="w-full h-full flex flex-col">
          {[
            { href: "#about", label: messages.about },
            { href: "#offer", label: messages.offer },
            { href: `/${locale}/blog`, label: messages.blog, isLink: true },
            { href: "#contact", label: messages.contact },
            { href: `/${nextLocale}`, label: langLabel, isLink: true },
          ].map(({ href, label, isLink }, index) =>
            isLink ? (
              <Link
                key={label}
                href={href}
                onClick={handleLinkClick}
                className={`flex-1 w-full flex items-center justify-center text-white text-2xl font-bold transition-all duration-300 
                  hover:bg-white hover:text-black ${index === 0 ? "group" : ""}`}
              >
                {label}
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                onClick={handleLinkClick}
                className={`flex-1 w-full flex items-center justify-center text-white text-2xl font-bold transition-all duration-300 
                  hover:bg-white hover:text-black ${index === 0 ? "group" : ""}`}
              >
                {label}
              </a>
            )
          )}
        </div>
      </div>
    </nav>
  );
}