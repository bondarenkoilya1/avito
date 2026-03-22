import { Flex, Tag } from "antd";
import type { JSX } from "react";

import type { AdCategory } from "@/features/ads/components/ad-card/ad-card.types";
import { getCategoryLabel } from "@/features/ads/components/ad-card/ad-card.utils";

import { PictureOutlined } from "@ant-design/icons";

type AdCardCoverProps = {
  category: AdCategory;
};

export const AdCardCover = ({ category }: AdCardCoverProps): JSX.Element => {
  return (
    <div style={{ position: "relative" }}>
      <Flex
        align="center"
        justify="center"
        style={{ height: 160, background: "#f0f0f0", borderRadius: "12px 12px 0 0" }}>
        <PictureOutlined style={{ fontSize: 40, color: "#bfbfbf" }} />
      </Flex>
      <div style={{ position: "absolute", bottom: -12, left: 12, userSelect: "none" }}>
        <Tag style={{ borderRadius: 6, background: "#fff", border: "1px solid lightgray" }}>
          {getCategoryLabel(category)}
        </Tag>
      </div>
    </div>
  );
};
