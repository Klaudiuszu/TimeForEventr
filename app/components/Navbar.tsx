"use client";

import { useState, useCallback, memo } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

interface NavbarProps {
  messages: Record<string, string>;
  locale: string;
}

const NavLinks = memo(({
  messages,
  locale,
  nextLocale,
  fullPath,
  langLabel,
  onLinkClick
}: {
  messages: Record<string, string>;
  locale: string;
  nextLocale: string;
  fullPath: string;
  langLabel: string;
  onLinkClick: () => void;
}) => {
  const links = [
    { href: `/${locale}#about`, label: messages.about, prefetch: false },
    { href: `/${locale}#offer`, label: messages.offer, prefetch: false },
    { href: `/${locale}/blog`, label: messages.blog, prefetch: true },
    { href: `/${locale}#contact`, label: messages.contact, prefetch: false },
    { href: `/${nextLocale}${fullPath}`, label: langLabel, prefetch: false },
  ];

  return (
    <div className="w-full h-full grid grid-rows-5">
      {links.map(({ href, label, prefetch }) => (
        <Link
          key={href}
          href={href}
          prefetch={prefetch}
          onClick={onLinkClick}
          scroll={false}
          className={clsx(
            "flex text-white text-2xl font-bold",
            "justify-center items-center",
            "relative overflow-hidden",
            "hover:bg-white hover:text-black"
          )}
        >
          <span className="relative z-10 px-4 py-6 text-center">{label}</span>
        </Link>
      ))}
    </div>
  );
});

NavLinks.displayName = "NavLinks";

export default function Navbar({ messages, locale }: NavbarProps) {

  const nextLocale = locale === "pl" ? "en" : "pl";
  const langLabel = locale === "pl" ? "EN" : "PL";

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hash = searchParams.get("hash") || "";
  const pathnameWithoutLocale = pathname.startsWith(`/${locale}`)
    ? pathname.replace(`/${locale}`, "")
    : pathname;
  const fullPath = `${pathnameWithoutLocale}${hash ? `#${hash}` : ""}`;

  const toggleMenu = useCallback((open: boolean) => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, []);

  return (
    <>
      <nav className={clsx(
        "fixed top-0 left-0 w-screen max-w-full flex items-center justify-center px-4 py-5",
        "backdrop-blur-lg bg-white/20 border-b border-white/20",
        "z-50 transition-colors duration-300"
      )}>
        <div className="w-full max-w-screen-xl flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="font-bold text-3xl text-white transition-colors"
            prefetch
            scroll={false}
          >
            Time For<span> Event</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {[
              { href: `/${locale}#about`, label: messages.about, prefetch: false },
              { href: `/${locale}#offer`, label: messages.offer, prefetch: false },
              { href: `/${locale}/blog`, label: messages.blog, prefetch: true },
              { href: `/${locale}#contact`, label: messages.contact, prefetch: false },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={item.prefetch}
                scroll={false}
                className="font-medium text-white/90 hover:text-white transition-transform duration-100 hover:scale-105"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`/${nextLocale}${fullPath}`}
              className="font-bold px-4 py-2 rounded-lg bg-white/30 text-white border border-white/40 hover:bg-white/40 transition-all duration-100 hover:scale-105"
              scroll={false}
              prefetch={false}
            >
              {langLabel}
            </Link>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => toggleMenu(true)}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

    </>
  );
}