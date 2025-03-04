"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function Navbar() {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <nav className="w-full relative flex items-center justify-between max-w-2xl mx-auto px-4 py-5">
      <Link href={`/${locale}`} className="font-bold text-3xl">
        Time For<span className="text-primary"> Event</span>
      </Link>
      <div className="flex items-center gap-4">
        <Link href={`/${locale}/blog`} className="hover:text-primary">
          Blog
        </Link>
      </div>
    </nav>
  );
}