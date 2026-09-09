"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function FindsIcon({ active }: { active: boolean }) {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" aria-hidden>
      <path
        d="M5 7.5h15M5 12.5h15M5 17.5h10"
        fill="none"
        stroke={active ? "#007AFF" : "#8E8E93"}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CashIcon({ active }: { active: boolean }) {
  const c = active ? "#007AFF" : "#8E8E93";
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" aria-hidden>
      <circle cx="12.5" cy="12.5" r="8.25" fill="none" stroke={c} strokeWidth="1.7" />
      <path
        d="M12.5 8.2v8.6M10.2 10.1c.5-.7 1.3-1.1 2.3-1.1 1.4 0 2.3.7 2.3 1.8 0 2.4-4.6 1.3-4.6 3.4 0 1 .9 1.8 2.4 1.8 1.1 0 1.9-.4 2.4-1.1"
        fill="none"
        stroke={c}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BooksIcon({ active }: { active: boolean }) {
  const c = active ? "#007AFF" : "#8E8E93";
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" aria-hidden>
      <path
        d="M7 6.2h8.2c1.4 0 2.3.8 2.3 2.1v10.2c0-.9-.8-1.5-2-1.5H7.4C6.3 17 5.5 16.4 5.5 15.3V8.2C5.5 7 6.3 6.2 7.4 6.2Z"
        fill="none"
        stroke={c}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M7.6 17.8h8.4" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

const tabs = [
  { href: "/", label: "Finds", Icon: FindsIcon },
  { href: "/cash", label: "Cash", Icon: CashIcon },
  { href: "/books", label: "Books", Icon: BooksIcon },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 bg-[#F9F9F9]/92 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="h-px bg-[rgba(60,60,67,0.29)]" />
      <ul className="mx-auto grid h-[49px] max-w-lg grid-cols-3">
        {tabs.map((tab) => {
          const active =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          const Icon = tab.Icon;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className="flex h-full flex-col items-center justify-center gap-0.5"
              >
                <Icon active={active} />
                <span
                  className={cn(
                    "text-[10px] leading-none",
                    active ? "font-medium text-[#007AFF]" : "text-[#8E8E93]"
                  )}
                >
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
