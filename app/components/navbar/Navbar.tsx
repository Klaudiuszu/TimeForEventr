"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import NavLinks from "./NavLinks";
import { NavbarProps } from "./types";
import Image from 'next/image';

export default function Navbar({ messages, locale }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLinkLoading, setIsLinkLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const nextLocale = locale === "pl" ? "en" : "pl";
  const langLabel = locale === "pl" ? "EN" : "PL";
  const pathnameWithoutLocale = pathname.startsWith(`/${locale}`)
    ? pathname.replace(`/${locale}`, "")
    : pathname;
  const fullPath = `${pathnameWithoutLocale}`;
  const isBlogPage = pathname.includes("/blog");

  const toggleMenu = useCallback((open: boolean) => {
    setIsMenuOpen(open);
    document.body.style.overflow = open ? "hidden" : "";
  }, []);

  const handleMainNavigation = useCallback(
    async (id: string) => {
      setIsLinkLoading(true);
      if (id === "blog") {
        await router.push(`/${locale}/blog`);
      } else if (isBlogPage) {
        await router.push(`/${locale}#${id}`);
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState({}, "", `/${locale}#${id}`);
        }
        setIsLinkLoading(false);
      }
    },
    [isBlogPage, locale, router]
  );

  const handleLocaleSwitch = async () => {
    setIsLinkLoading(true);
    await router.push(`/${nextLocale}${fullPath}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleHashChange = () => {
      if (!isBlogPage) {
        const hash = window.location.hash.substring(1);
        if (hash) {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    if (!isBlogPage) {
      handleHashChange();
      window.addEventListener("hashchange", handleHashChange);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [isBlogPage]);

  useEffect(() => {
    setIsLinkLoading(false);
  }, [pathname]);

  return (
    <>
      {isLinkLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-md transition-opacity duration-300">
          <div className="w-10 h-10 border-4 border-gray-800 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <nav
        className={clsx(
          "fixed top-0 left-0 w-screen max-w-full flex items-center justify-center px-4 py-5",
          "backdrop-blur-lg border-b transition-all duration-300",
          "z-50",
          isScrolled
            ? "bg-white/90 border-gray-200 shadow-md text-gray-900"
            : "bg-white/20 border-white/20 text-white"
        )}
      >
        <div className="w-full max-w-screen-xl flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className={clsx(
              "font-bold text-3xl transition-colors",
              isScrolled ? "text-gray-900" : "text-white"
            )}
            prefetch
            scroll={false}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={40}
              className={clsx(
                "transition-opacity hover:opacity-80",
                isScrolled ? "opacity-100" : "opacity-90"
              )}
            />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {["about", "offer", "contact"].map((id) => (
              <a
                key={id}
                href={`/${locale}#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleMainNavigation(id);
                }}
                className={clsx(
                  "font-medium transition-all duration-100 hover:scale-105",
                  isScrolled
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-white/90 hover:text-white"
                )}
              >
                {messages[id]}
              </a>
            ))}

            <button
              onClick={() => handleMainNavigation("blog")}
              className={clsx(
                "font-medium transition-all duration-100 hover:scale-105 flex items-center gap-2",
                isScrolled
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white/90 hover:text-white"
              )}
              disabled={isLinkLoading}
            >
              {messages.blog}
            </button>

            <button
              onClick={handleLocaleSwitch}
              className={clsx(
                "font-bold px-4 py-2 rounded-lg border transition-all duration-100 hover:scale-105 flex items-center gap-2",
                isScrolled
                  ? "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                  : "bg-white/30 text-white border-white/40 hover:bg-white/40"
              )}
              disabled={isLinkLoading}
            >
              {langLabel}
            </button>
          </div>

          <button
            className={clsx(
              "md:hidden transition-colors",
              isScrolled ? "text-gray-900" : "text-white"
            )}
            onClick={() => toggleMenu(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <div
        className={clsx(
          "fixed inset-0 bg-black/90 backdrop-blur-lg z-40 transition-all duration-300",
          "flex items-center justify-center",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        {isMenuOpen && (
          <NavLinks
            messages={messages}
            locale={locale}
            nextLocale={nextLocale}
            fullPath={fullPath}
            langLabel={langLabel}
            onLinkClick={() => toggleMenu(false)}
            isBlogPage={isBlogPage}
            // setIsBlogLoading={(isLoading) => setIsLinkLoading(!!isLoading)}
          />
        )}
      </div>
    </>
  );
}
