import { type JSX } from "react";
import { Button, Card, Flex, Input, Select, Space } from "antd";

import type { AdsSortValue } from "@/features/ads/types";

import { ADS_SORT_OPTIONS, DEFAULT_ADS_SORT } from "./toolbar.constants";

import css from "./toolbar.module.css";

import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";

export type ViewMode = "grid" | "list";

type ToolbarProps = {
  defaultSearchValue: string;
  sortValue: AdsSortValue;
  viewMode: ViewMode;
  onSearch: (value: string) => void;
  onSortChange: (value: AdsSortValue) => void;
  onViewModeChange: (mode: ViewMode) => void;
};
export const Toolbar = ({
  defaultSearchValue,
  onSearch,
  sortValue,
  onSortChange,
  viewMode,
  onViewModeChange
}: ToolbarProps): JSX.Element => {
  return (
    <Card styles={{ body: { padding: "12px 16px" } }} className={css.toolbar}>
      <Flex gap={12} align="center" wrap="wrap">
        <Input.Search
          defaultValue={defaultSearchValue}
          onSearch={onSearch}
          allowClear
          placeholder="Найти объявление..."
          style={{ flex: 1, minWidth: 160 }}
        />

        <Flex gap={8} align="center" flex="none" className={css.controlsRow}>
          <Space>
            <Button
              type={viewMode === "grid" ? "primary" : "default"}
              icon={<AppstoreOutlined />}
              onClick={() => onViewModeChange("grid")}
            />
            <Button
              type={viewMode === "list" ? "primary" : "default"}
              icon={<UnorderedListOutlined />}
              onClick={() => onViewModeChange("list")}
            />
          </Space>
          <Select
            options={ADS_SORT_OPTIONS}
            value={sortValue}
            defaultValue={DEFAULT_ADS_SORT}
            onChange={onSortChange}
            className={css.sortSelect}
          />
        </Flex>
      </Flex>
    </Card>
  );
};
