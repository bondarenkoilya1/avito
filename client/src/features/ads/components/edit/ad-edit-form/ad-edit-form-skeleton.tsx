import { Divider, Flex, Skeleton, Space } from "antd";
import type { JSX } from "react";

import css from "./ad-edit-form.module.css";

export const AdEditFormSkeleton = (): JSX.Element => {
  return (
    <div className={css.form}>
      <Space orientation="vertical" size={4} className={css.fieldFixedWidth}>
        <Skeleton.Button active size="small" style={{ width: 80 }} />
        <Skeleton.Input active block size="large" />
      </Space>

      <Divider className={css.divider} />

      <Space orientation="vertical" size={4} className={css.fieldFixedWidth}>
        <Skeleton.Button active size="small" style={{ width: 100 }} />
        <Skeleton.Input active block size="large" />
      </Space>

      <Divider className={css.divider} />

      <div className={css.fieldFixedWidth}>
        <Skeleton.Button active size="small" style={{ width: 60, marginBottom: 8 }} />
        <Flex gap={8}>
          <Skeleton.Input active style={{ flex: 1 }} size="large" />
          <Skeleton.Button active size="large" style={{ width: 160 }} />
        </Flex>
      </div>

      <Divider className={css.divider} />

      <div className={css.section}>
        <Skeleton.Button active size="small" style={{ width: 140, marginBottom: 16 }} />
        <Flex vertical gap={24}>
          <Flex gap={16}>
            <Skeleton.Input active style={{ flex: 1 }} />
            <Skeleton.Input active style={{ flex: 1 }} />
          </Flex>
          <Flex gap={16}>
            <Skeleton.Input active style={{ flex: 1 }} />
            <Skeleton.Input active style={{ flex: 1 }} />
          </Flex>
        </Flex>
      </div>

      <Divider className={css.divider} />

      <Space orientation="vertical" size={8} style={{ width: "100%" }}>
        <Flex justify="space-between" align="center">
          <Skeleton.Button active size="small" style={{ width: 120 }} />
          <Skeleton.Button active size="small" style={{ width: 150 }} />
        </Flex>
        <Skeleton.Input active block style={{ height: 150 }} />
        <Skeleton.Button active size="small" style={{ width: 60, alignSelf: "flex-end" }} />
      </Space>

      <Divider className={css.divider} />

      <Flex gap={8}>
        <Skeleton.Button active size="large" style={{ width: 120 }} />
        <Skeleton.Button active size="large" style={{ width: 100 }} />
      </Flex>
    </div>
  );
};
