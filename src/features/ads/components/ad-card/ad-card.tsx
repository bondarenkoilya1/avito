import { Card, Flex, Typography } from "antd";
import type { JSX } from "react";

import type { AdCardProps } from "@/features/ads/components/ad-card/ad-card.types";
import { formatPrice } from "@/features/ads/components/ad-card/ad-card.utils";
import { AdCardCover } from "@/features/ads/components/ad-card-cover";
import { AdCardRevisionTag } from "@/features/ads/components/ad-card-revision-tag";

export const AdCard = ({ title, price, category, needsRevision }: AdCardProps): JSX.Element => {
  return (
    <Card
      hoverable
      styles={{ body: { padding: 12 } }}
      style={{ width: "100%", borderRadius: 12 }}
      cover={<AdCardCover category={category} />}>
      <Flex vertical gap={4} style={{ paddingTop: 8 }}>
        <Typography.Text strong>{title}</Typography.Text>
        <Typography.Text strong>{formatPrice(price)}</Typography.Text>
        {needsRevision && <AdCardRevisionTag />}
      </Flex>
    </Card>
  );
};
