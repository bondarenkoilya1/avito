import { Card, Flex, Typography } from "antd";
import type { JSX } from "react";

import type { AdCardType } from "@/features/ads/components";
import { formatPrice } from "@/features/ads/components/ad-card/ad-card.utils";
import { AdCardCover } from "@/features/ads/components/ad-card-cover";
import { AdCardRevisionTag } from "@/features/ads/components/ad-card-revision-tag";

import css from "./ad-card.module.css";

type AdCardProps = { ad: AdCardType };

export const AdCard = ({ ad }: AdCardProps): JSX.Element => {
  const { title, price, category, needsRevision } = ad;

  return (
    <Card hoverable className={css.card} cover={<AdCardCover category={category} />}>
      <Flex vertical gap={4} className={css.flexWrapper}>
        <Typography.Text strong>{title}</Typography.Text>
        <Typography.Text strong>{formatPrice(price)}</Typography.Text>
        {needsRevision && <AdCardRevisionTag />}
      </Flex>
    </Card>
  );
};
