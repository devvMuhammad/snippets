"use client";

import * as React from "react";
import Link from "next/link";
import { DashboardNavMainItem } from "@/types";

export default function MainNav({
  items,
}: {
  items: DashboardNavMainItem[];
  children?: React.ReactNode;
}) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <span className="hidden font-bold sm:inline-block">
          {"<Snippets />"}
        </span>
      </Link>

      <nav className="hidden gap-6 md:flex">
        {items?.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60"
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
