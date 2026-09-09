"use client";

import { useOffline } from "next/offline";

export function OfflineBanner() {
  const isOffline = useOffline();
  if (!isOffline) return null;

  return (
    <div
      role="status"
      className="bg-white px-3 py-2 text-center text-[13px] text-[#8E8E93] shadow-[inset_0_-0.33px_0_rgba(60,60,67,0.29)]"
      style={{ paddingTop: "calc(8px + env(safe-area-inset-top))" }}
    >
      Offline. Finds and checks still work on this phone.
    </div>
  );
}
