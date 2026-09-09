"use client";

import { BottomNav } from "@/components/bottom-nav";
import { OfflineBanner } from "@/components/offline-banner";
import { ServiceWorkerRegister } from "@/components/sw-register";
import { ChecksProvider } from "@/lib/checks";
import { LedgerProvider } from "@/lib/ledger";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ChecksProvider>
      <LedgerProvider>
        <ServiceWorkerRegister />
        <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-[#0c0d10] text-zinc-50">
          <OfflineBanner />
          <main className="flex-1 pb-24">{children}</main>
          <BottomNav />
        </div>
      </LedgerProvider>
    </ChecksProvider>
  );
}
