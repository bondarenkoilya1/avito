import { type JSX } from "react";
import { Button, Card, Flex, Input, Select, Space } from "antd";

import { ADS_SORT_OPTIONS, type AdsSortValue } from "./toolbar.constants";

import { AppstoreOutlined, SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";

type ToolbarProps = {
  sortValue: AdsSortValue;
  onSortChange: (value: AdsSortValue) => void;
};

export const Toolbar = ({ sortValue, onSortChange }: ToolbarProps): JSX.Element => {
  return (
    <Card styles={{ body: { padding: "12px 16px" } }}>
      <Flex gap={24} align="center">
        <Input placeholder="Найти объявление..." suffix={<SearchOutlined />} style={{ flex: 1 }} />
        <Space>
          <Button type="primary" icon={<AppstoreOutlined />} />
          <Button type="default" icon={<UnorderedListOutlined />} />
        </Space>
        <Select
          value={sortValue}
          options={ADS_SORT_OPTIONS}
          onChange={onSortChange}
          style={{ width: 240 }}
        />
      </Flex>
    </Card>
  );
};
