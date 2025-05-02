"use client";

import { useState, useCallback, memo, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  onLinkClick,
  isBlogPage
}: {
  messages: Record<string, string>;
  locale: string;
  nextLocale: string;
  fullPath: string;
  langLabel: string;
  onLinkClick: () => void;
  isBlogPage: boolean;
}) => {
  const router = useRouter();

  const handleNavigation = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    
    if (isBlogPage) {
      router.push(`/${locale}#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState({}, '', `/${locale}#${id}`);
      }
    }
    
    onLinkClick();
  };

  const links = [
    { id: 'about', label: messages.about },
    { id: 'offer', label: messages.offer },
    { href: `/${locale}/blog`, label: messages.blog, prefetch: true },
    { id: 'contact', label: messages.contact },
    { href: `/${nextLocale}${fullPath}`, label: langLabel },
  ];

  return (
    <div className="w-full h-full grid grid-rows-5">
      {links.map((link) => (
        link.href ? (
          <Link
            key={link.href}
            href={link.href}
            prefetch={link.prefetch}
            onClick={onLinkClick}
            scroll={false}
            className={clsx(
              "flex text-white text-2xl font-bold",
              "justify-center items-center",
              "relative overflow-hidden",
              "hover:bg-white hover:text-black transition-colors duration-200"
            )}
          >
            <span className="relative z-10 px-4 py-6 text-center">{link.label}</span>
          </Link>
        ) : (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => handleNavigation(e, link.id!)}
            className={clsx(
              "flex text-white text-2xl font-bold",
              "justify-center items-center",
              "relative overflow-hidden",
              "hover:bg-white hover:text-black transition-colors duration-200"
            )}
          >
            <span className="relative z-10 px-4 py-6 text-center">{link.label}</span>
          </a>
        )
      ))}
    </div>
  );
});

NavLinks.displayName = "NavLinks";

export default function Navbar({ messages, locale }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const nextLocale = locale === "pl" ? "en" : "pl";
  const langLabel = locale === "pl" ? "EN" : "PL";
  const pathnameWithoutLocale = pathname.startsWith(`/${locale}`)
    ? pathname.replace(`/${locale}`, "")
    : pathname;
  const fullPath = `${pathnameWithoutLocale}`;
  const isBlogPage = pathname.includes('/blog');

  const toggleMenu = useCallback((open: boolean) => {
    setIsMenuOpen(open);
    document.body.style.overflow = open ? 'hidden' : '';
  }, []);

  const handleMainNavigation = useCallback((id: string) => {
    if (isBlogPage) {
      router.push(`/${locale}#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState({}, '', `/${locale}#${id}`);
      }
    }
  }, [isBlogPage, locale, router]);

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
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    if (!isBlogPage) {
      handleHashChange();
      window.addEventListener('hashchange', handleHashChange);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isBlogPage]);

  return (
    <>
      <nav className={clsx(
        "fixed top-0 left-0 w-screen max-w-full flex items-center justify-center px-4 py-5",
        "backdrop-blur-lg border-b transition-all duration-300",
        "z-50",
        isScrolled 
          ? "bg-white/90 border-gray-200 shadow-md text-gray-900"
          : "bg-white/20 border-white/20 text-white"
      )}>
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
            Time For<span> Event</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {['about', 'offer', 'contact'].map((id) => (
              <a
                key={id}
                href={`/${locale}#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleMainNavigation(id);
                }}
                className={clsx(
                  "font-medium transition-all duration-100 hover:scale-105",
                  isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"
                )}
              >
                {messages[id]}
              </a>
            ))}
            <Link
              href={`/${locale}/blog`}
              className={clsx(
                "font-medium transition-all duration-100 hover:scale-105",
                isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"
              )}
              prefetch
            >
              {messages.blog}
            </Link>
            <Link
              href={`/${nextLocale}${fullPath}`}
              className={clsx(
                "font-bold px-4 py-2 rounded-lg border transition-all duration-100 hover:scale-105",
                isScrolled 
                  ? "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                  : "bg-white/30 text-white border-white/40 hover:bg-white/40"
              )}
              scroll={false}
              prefetch={false}
            >
              {langLabel}
            </Link>
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
      <div className={clsx(
        "fixed inset-0 bg-black/90 backdrop-blur-lg z-40 transition-all duration-300",
        "flex items-center justify-center",
        isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      )}>
        {isMenuOpen && (
          <NavLinks
            messages={messages}
            locale={locale}
            nextLocale={nextLocale}
            fullPath={fullPath}
            langLabel={langLabel}
            onLinkClick={() => toggleMenu(false)}
            isBlogPage={isBlogPage}
          />
        )}
      </div>
    </>
  );
}