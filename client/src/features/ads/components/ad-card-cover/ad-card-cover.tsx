import { Flex, Tag } from "antd";
import type { JSX } from "react";

import type { AdCategory } from "@/features/ads/components/ad-card/ad-card.types";
import { getCategoryLabel } from "@/features/ads/components/ad-card/ad-card.utils";

import css from "./ad-card-cover.module.css";

import { PictureOutlined } from "@ant-design/icons";
type AdCardCoverProps = {
  category: AdCategory;
};

export const AdCardCover = ({ category }: AdCardCoverProps): JSX.Element => {
  return (
    <div className={css.wrapper}>
      <Flex align="center" justify="center" className={css.pictureWrapper}>
        <PictureOutlined className={css.picture} />
      </Flex>
      <Tag className={css.tag}>{getCategoryLabel(category)}</Tag>
    </div>
  );
};
