"use client";

import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: ReactNode;
}

export default function Button({
  children,
  href,
  onClick,
  size = "md",
  className = "",
  icon,
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-5 py-3 text-base rounded-xl",
    lg: "px-6 py-4 text-lg rounded-xl",
  };

  const glassClasses = clsx(
    "bg-white/10 backdrop-blur-md",
    "border border-white/30 border-b-white/40 border-r-white/40",
    "shadow-lg shadow-black/20",
    "hover:bg-white/20 hover:shadow-xl hover:shadow-black/30",
    "active:scale-95 active:shadow-md",
    "focus:outline-none focus:ring-2 focus:ring-white/50"
  );

  const classes = clsx(
    baseClasses,
    sizeClasses[size],
    glassClasses,
    className,
    icon && "gap-2"
  );

  const content = (
    <>
      {children}
      {icon}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} scroll={false}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
}