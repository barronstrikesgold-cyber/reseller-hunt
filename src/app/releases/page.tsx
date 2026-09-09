"use client";

import { HuntGroup } from "@/components/hunt-card";
import { Group, IosScreen } from "@/components/ios";
import { RELEASES, itemById } from "@/data/hunt";

export default function ReleasesPage() {
  return (
    <IosScreen title="Drops" subtitle="Pokémon 30th and later waves. Printed prices only — no guessed sold.">
      {RELEASES.map((drop) => {
        const products = drop.products
          .map((id) => itemById(id))
          .filter((item): item is NonNullable<typeof item> => Boolean(item));
        return (
          <div key={drop.id}>
            <Group header={drop.dateLabel} footer={`${drop.blurb} ${drop.where}`}>
              <div className="px-4 py-3">
                <p className="text-[17px] text-black">{drop.title}</p>
              </div>
            </Group>
            {products.length ? <HuntGroup title="On this drop" items={products} /> : null}
          </div>
        );
      })}
    </IosScreen>
  );
}
