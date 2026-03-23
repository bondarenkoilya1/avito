import { Flex, Tag } from "antd";
import type { JSX } from "react";

import css from "./ad-card-revision-tag.module.css";

export const AdCardRevisionTag = (): JSX.Element => {
  return (
    <Tag className={css.tag}>
      <Flex align="center" gap={6}>
        <span aria-hidden className={css.dot} />
        Требует доработок
      </Flex>
    </Tag>
  );
};
