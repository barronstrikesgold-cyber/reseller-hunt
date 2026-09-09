"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Calculator, Crosshair, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Tonight", icon: Crosshair },
  { href: "/cash", label: "Cash", icon: Calculator },
  { href: "/books", label: "Books", icon: BookOpen },
  { href: "/lists", label: "Lists", icon: ListChecks },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#101218]/95 backdrop-blur-md"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <ul className="mx-auto grid max-w-lg grid-cols-4">
        {tabs.map((tab) => {
          const active =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);
          const Icon = tab.icon;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-0.5 text-[12px] font-semibold",
                  active ? "text-amber-300" : "text-zinc-400"
                )}
              >
                <Icon className="size-5" />
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
