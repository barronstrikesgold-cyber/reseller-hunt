"use client";

import Link from "next/link";
import { HuntGroup } from "@/components/hunt-card";
import { IosScreen } from "@/components/ios";
import { tonightItems } from "@/data/hunt";
import { useChecks } from "@/lib/checks";

export default function FindsPage() {
  const items = tonightItems();
  const { countFor } = useChecks();
  const { done, total } = countFor(items.map((item) => item.id));
  const remaining = total - done;

  return (
    <IosScreen title="Finds" subtitle={`${remaining} open · ${done} checked`}>
      <div className="px-4 pb-1">
        <Link
          href="/scan"
          className="flex min-h-12 w-full items-center justify-center rounded-[14px] bg-[#007AFF] text-[17px] font-semibold text-white"
        >
          Scan
        </Link>
      </div>
      <HuntGroup items={items} />
    </IosScreen>
  );
}
