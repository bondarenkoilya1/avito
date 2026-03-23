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
          /* Здесь API не отправляет ID объявления и я предпочел точечно использовать .title для ключа.
             (Что вообще не является адекватной практикой)
             Я считаю хорошим тоном будет обсудить этот вопрос с бэкенд разработчиком для получения ID с сервера */
          key={ad.title}
          ad={ad}
        />
      ))}
    </div>
  );
};
