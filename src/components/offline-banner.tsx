"use client";

import { useOffline } from "next/offline";

export function OfflineBanner() {
  const isOffline = useOffline();
  if (!isOffline) return null;

  return (
    <div
      role="status"
      className="bg-amber-400 px-3 py-2 text-center text-[13px] font-semibold text-black"
    >
      Offline. Hunt list and checks still work on this phone.
    </div>
  );
}
