import { Card, Skeleton } from "antd";
import type { JSX } from "react";

import { AdCard } from "@/features/ads/components";
import type { AdCardType } from "@/features/ads/types";

import css from "./ad-card-list.module.css";

type AdCardListProps = {
  ads: AdCardType[];
  isLoading: boolean;
};

export const AdCardList = ({ ads, isLoading }: AdCardListProps): JSX.Element => {
  if (isLoading) {
    return (
      <ul className={css.list}>
        {Array.from({ length: 10 }).map((_, index) => (
          <Card key={index} className={css.card}>
            <Skeleton active />
          </Card>
        ))}
      </ul>
    );
  }

  return (
    <ul className={css.list}>
      {ads.map((ad) => (
        <AdCard key={ad.id} ad={ad} />
      ))}
    </ul>
  );
};
