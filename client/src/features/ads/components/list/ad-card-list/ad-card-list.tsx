import { Card, Skeleton } from "antd";
import type { JSX } from "react";

import { AdCard } from "@/features/ads/components";
import type { ViewMode } from "@/features/ads/components/list/toolbar/toolbar";
import { SKELETON_COUNT } from "@/features/ads/constants";
import type { AdCardType } from "@/features/ads/types";

import css from "./ad-card-list.module.css";

type AdCardListProps = {
  ads: AdCardType[];
  isLoading: boolean;
  viewMode: ViewMode;
};

export const AdCardList = ({ ads, isLoading, viewMode }: AdCardListProps): JSX.Element => {
  const listClass = viewMode === "list" ? css.listView : css.list;

  if (isLoading) {
    return (
      <ul className={listClass}>
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <Card key={index} className={css.card}>
            <Skeleton active />
          </Card>
        ))}
      </ul>
    );
  }

  return (
    <ul className={listClass}>
      {ads.map((ad) => (
        <AdCard key={ad.id} ad={ad} />
      ))}
    </ul>
  );
};
