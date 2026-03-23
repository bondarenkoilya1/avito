import type { JSX } from "react";

import { AdCard, type AdCardType } from "@/features/ads/components";

import css from "./ad-card-list.module.css";

type AdCardListProps = {
  ads: AdCardType[];
};

export const AdCardList = ({ ads }: AdCardListProps): JSX.Element => {
  return (
    <div className={css.list}>
      {ads.map((ad) => (
        <AdCard
          /* Изначально API не отправлял ID объявления. Я добавил это поле в DTO,
             чтобы устанавливать нормальные ключи при маппинге. Но в целом,
             я считаю хорошим тоном будет обсудить этот вопрос с бэкенд разработчиком */
          key={ad.id}
          ad={ad}
        />
      ))}
    </div>
  );
};
