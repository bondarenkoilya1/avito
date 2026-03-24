import { Card, Flex, Typography } from "antd";
import type { JSX } from "react";
import { Link } from "react-router-dom";

import { AdCardCover, AdCardRevisionTag } from "@/features/ads/components";
import { formatPrice } from "@/features/ads/components/list/ad-card/ad-card.utils";
import type { AdCardType } from "@/features/ads/types";

import css from "./ad-card.module.css";

type AdCardProps = { ad: AdCardType };

export const AdCard = ({ ad }: AdCardProps): JSX.Element => {
  const { id, title, price, category, needsRevision } = ad;

  return (
    <Link to={`/ads/${id}`}>
      <Card hoverable className={css.card} cover={<AdCardCover category={category} />}>
        <Flex vertical gap={4} className={css.flexWrapper}>
          <Typography.Text strong>{title}</Typography.Text>
          <Typography.Text strong>{formatPrice(price)}</Typography.Text>
          {needsRevision && <AdCardRevisionTag />}
        </Flex>
      </Card>
    </Link>
  );
};
