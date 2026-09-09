"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function IosScreen({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setCollapsed(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-52px 0px 0px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div>
      <div
        className={cn("sticky top-0 z-30", collapsed ? "bg-[#F2F2F7]/80 backdrop-blur-xl" : "bg-[#F2F2F7]")}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div
          className={cn(
            "relative flex h-11 items-center justify-center",
            collapsed && "shadow-[inset_0_-0.33px_0_rgba(60,60,67,0.29)]"
          )}
        >
          <p
            className={cn(
              "text-[17px] font-semibold text-black transition-opacity duration-150",
              collapsed ? "opacity-100" : "opacity-0"
            )}
          >
            {title}
          </p>
        </div>
      </div>
      <div className="px-4 pb-2">
        <h1
          ref={titleRef}
          className="text-[34px] leading-[1.1] font-bold text-black"
          style={{ letterSpacing: "-0.6px" }}
        >
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-1 text-[15px] leading-snug text-[#8E8E93]">{subtitle}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export function Group({
  header,
  footer,
  children,
}: {
  header?: string;
  footer?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="px-4 py-2.5">
      {header ? (
        <h2 className="px-4 pb-1.5 text-[13px] text-[#6D6D72] uppercase">{header}</h2>
      ) : null}
      <div className="overflow-hidden rounded-[10px] bg-white">{children}</div>
      {footer ? (
        <div className="px-4 pt-2 text-[13px] leading-snug text-[#6D6D72]">{footer}</div>
      ) : null}
    </section>
  );
}

export function Hairline({ inset = 16 }: { inset?: number }) {
  return <div className="h-px bg-[rgba(60,60,67,0.12)]" style={{ marginLeft: inset }} />;
}

export function Chevron() {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" aria-hidden className="shrink-0 text-[#C7C7CC]">
      <path
        d="M1 1.5 5.5 6 1 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckCircle({
  checked,
  label,
  onClick,
}: {
  checked: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onClick}
      className="flex size-11 shrink-0 items-center justify-center"
    >
      <span
        className={cn(
          "flex size-[22px] items-center justify-center rounded-full border-[1.6px]",
          checked ? "border-[#007AFF] bg-[#007AFF]" : "border-[#C7C7CC] bg-white"
        )}
      >
        {checked ? (
          <svg width="12" height="10" viewBox="0 0 12 10" aria-hidden>
            <path
              d="M1.5 5.2 4.4 8.1 10.5 1.5"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
    </button>
  );
}

export function Row({
  label,
  children,
  onClick,
  chevron,
  minHeight = 44,
}: {
  label: string;
  children?: ReactNode;
  onClick?: () => void;
  chevron?: boolean;
  minHeight?: number;
}) {
  const inner = (
    <>
      <span className="shrink-0 text-[17px] text-black">{label}</span>
      <div className="flex min-w-0 flex-1 items-center justify-end gap-2 text-right">
        {children}
        {chevron ? <Chevron /> : null}
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center gap-3 px-4 text-left"
        style={{ minHeight }}
      >
        {inner}
      </button>
    );
  }

  return (
    <div className="flex w-full items-center gap-3 px-4" style={{ minHeight }}>
      {inner}
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="flex min-h-11 items-center gap-3 px-4">
      <span className="shrink-0 text-[17px] text-black">{label}</span>
      <div className="min-w-0 flex-1">{children}</div>
    </label>
  );
}

export const fieldControl =
  "w-full bg-transparent text-right text-[17px] text-black outline-none appearance-none";

export function PrimaryButton({
  children,
  disabled,
  type = "button",
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="flex min-h-12 w-full items-center justify-center rounded-[14px] bg-[#007AFF] text-[17px] font-semibold text-white disabled:bg-[#E5E5EA] disabled:text-[#8E8E93]"
    >
      {children}
    </button>
  );
}
