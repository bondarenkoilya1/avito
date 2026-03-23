import { type JSX } from "react";
import { Button, Card, Flex, Input, Select, Space } from "antd";

import { ADS_SORT_OPTIONS } from "./toolbar.constants";

import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";

type ToolbarProps = {
  defaultSearchValue: string;
  onSearch: (value: string) => void;
};

export const Toolbar = ({ defaultSearchValue, onSearch }: ToolbarProps): JSX.Element => {
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
        <Select options={ADS_SORT_OPTIONS} style={{ width: 240 }} />
      </Flex>
    </Card>
  );
};
