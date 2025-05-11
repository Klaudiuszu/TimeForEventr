"use client";

import React, { memo } from "react"; // Added React import
import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { LinkItem, NavLinksProps } from "./types";

const NavLinks = memo(({
  messages,
  locale,
  nextLocale,
  fullPath,
  langLabel,
  onLinkClick,
  isBlogPage,
  // setIsBlogLoading
}: NavLinksProps) => {
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

  const handleBlogClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    // setIsBlogLoading(true);
    try {
      await router.push(`/${locale}/blog`);
    } finally {
      // setIsBlogLoading(false);
    }
  };

  const links: LinkItem[] = [
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
            onClick={link.href.includes('/blog') ? handleBlogClick : onLinkClick}
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

export default NavLinks;