import { type JSX } from "react";
import { Button, Card, Flex, Input, Select, Space } from "antd";

import type { AdsSortValue } from "@/features/ads/types";

import { ADS_SORT_OPTIONS, DEFAULT_ADS_SORT } from "./toolbar.constants";

import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";

type ToolbarProps = {
  defaultSearchValue: string;
  sortValue: AdsSortValue;
  onSearch: (value: string) => void;
  onSortChange: (value: AdsSortValue) => void;
};
export const Toolbar = ({
  defaultSearchValue,
  onSearch,
  sortValue,
  onSortChange
}: ToolbarProps): JSX.Element => {
  return (
    <Card styles={{ body: { padding: "12px 16px" } }}>
      <Flex gap={24} align="center">
        <Input.Search
          defaultValue={defaultSearchValue}
          onSearch={onSearch}
          allowClear
          placeholder="Найти объявление..."
          style={{ flex: 1 }}
        />

        <Space>
          <Button type="primary" icon={<AppstoreOutlined />} />
          <Button type="default" icon={<UnorderedListOutlined />} />
        </Space>
        <Select
          options={ADS_SORT_OPTIONS}
          value={sortValue}
          defaultValue={DEFAULT_ADS_SORT}
          onChange={onSortChange}
          style={{ width: 240 }}
        />
      </Flex>
    </Card>
  );
};
