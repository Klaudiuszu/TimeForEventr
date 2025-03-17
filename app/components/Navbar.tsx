"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx"; // Dodaj clsx

interface NavbarProps {
  messages: Record<string, string>;
  locale: string;
}

export default function Navbar({ messages, locale }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const nextLocale = locale === "pl" ? "en" : "pl";
  const langLabel = locale === "pl" ? "EN" : "PL";

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hash = searchParams.get("hash") || "";
  const pathnameWithoutLocale = pathname.startsWith(`/${locale}`)
    ? pathname.replace(`/${locale}`, "")
    : pathname;
  const fullPath = `${pathnameWithoutLocale}${hash ? `#${hash}` : ""}`;

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
        <Link href={`/${locale}#about`} className="font-bold transition-transform duration-200 hover:-rotate-3">
          {messages.about}
        </Link>
        <Link href={`/${locale}#offer`} className="font-bold transition-transform duration-200 hover:rotate-2">
          {messages.offer}
        </Link>
        <Link href={`/${locale}/blog`} className="font-bold transition-transform duration-200 hover:-rotate-2">
          {messages.blog}
        </Link>
        <Link href={`/${locale}#contact`} className="font-bold transition-transform duration-200 hover:rotate-3">
          {messages.contact}
        </Link>
        <Link
          href={`/${nextLocale}${fullPath}`}
          className="font-bold px-4 py-2 rounded-lg relative overflow-hidden transition-all duration-300 bg-primary text-white 
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
        className={clsx(
          "fixed inset-0 bg-black z-50 flex flex-col transition-all duration-300 ease-in-out",
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
        )}
      >
        <button
          className="absolute top-6 right-6 text-[#cfcfc4] transition-colors duration-300 z-10 group-hover:text-black"
          onClick={() => setIsOpen(false)}
        >
          <X size={32} className="transition-colors duration-300 " />
        </button>

        <div className="w-full h-full flex flex-col">
          {[
            { href: `/${locale}#about`, label: messages.about, isLink: true },
            { href: `/${locale}#offer`, label: messages.offer, isLink: true },
            { href: `/${locale}/blog`, label: messages.blog, isLink: true },
            { href: `/${locale}#contact`, label: messages.contact, isLink: true },
            { href: `/${nextLocale}${fullPath}`, label: langLabel, isLink: true },
          ].map(({ href, label, isLink }, index) =>
            isLink ? (
              <Link
                key={label}
                href={href}
                onClick={handleLinkClick}
                className={clsx(
                  "flex-1 w-full flex items-center justify-center text-white text-2xl font-bold transition-all duration-300 hover:bg-white hover:text-black",
                  index === 0 && "group"
                )}
              >
                {label}
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                onClick={handleLinkClick}
                className={clsx(
                  "flex-1 w-full flex items-center justify-center text-white text-2xl font-bold transition-all duration-300 hover:bg-white hover:text-black",
                  index === 0 && "group"
                )}
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