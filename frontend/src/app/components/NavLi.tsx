"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLiProps = {
  uri: string;
  text: string;
};

export default function NavLi({ uri, text }: NavLiProps) {
  const pathname = usePathname();
  const isActive = pathname === uri;

  return (
    <li className="h-full flex items-center">
      <Link
        href={uri}
        className={`text-xl font-bold h-full flex items-center justify-center px-4 ${
          isActive ? "text-brand border-b-2 border-brand" : "text-text hover:text-brand"
        }`}
      >
        {text}
      </Link>
    </li>
  );
}
