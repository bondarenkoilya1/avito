import { Flex, Tag } from "antd";
import type { JSX } from "react";

import { getCategoryLabel } from "@/features/ads/constants";
import type { AdCategory } from "@/features/ads/types";

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
