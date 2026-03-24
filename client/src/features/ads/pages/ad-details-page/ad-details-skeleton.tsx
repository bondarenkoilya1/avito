import { Flex, Skeleton } from "antd";
import type { JSX } from "react";

import css from "./ad-details-page.module.css";

export const AdDetailsSkeleton = (): JSX.Element => (
  <div className={css.page}>
    <div className={css.container}>
      <Skeleton.Button active size="small" />

      <Flex justify="space-between" align="flex-start" className={css.header}>
        <Flex vertical gap={8}>
          <Skeleton.Input active size="large" style={{ width: 300 }} />
          <Skeleton.Button active />
        </Flex>
        <Flex vertical align="flex-end" gap={4}>
          <Skeleton.Input active size="large" style={{ width: 120 }} />
          <Skeleton.Input active size="small" style={{ width: 200 }} />
          <Skeleton.Input active size="small" style={{ width: 200 }} />
        </Flex>
      </Flex>

      <Flex gap={32} className={css.content}>
        <Flex vertical gap={12} className={css.gallery}>
          <Skeleton.Image active style={{ width: 340, height: 280 }} />
          <Flex gap={8}>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton.Image key={i} active style={{ width: 72, height: 72 }} />
            ))}
          </Flex>
        </Flex>

        <Flex vertical gap={16} className={css.info}>
          <Skeleton active paragraph={{ rows: 4 }} />
        </Flex>
      </Flex>

      <Skeleton active paragraph={{ rows: 3 }} />
    </div>
  </div>
);
