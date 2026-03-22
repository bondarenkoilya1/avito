import { type JSX, useState } from "react";
import { Button, Checkbox, Collapse, Divider, Space, Switch, Typography } from "antd";

import { FILTER_CATEGORIES } from "@/features/ads/components/filter/filter.constants";

export const Filter = (): JSX.Element => {
  const [needsRevision, setNeedsRevision] = useState(false);

  return (
    <Space orientation="vertical" style={{ width: 256 }}>
      <Collapse
        bordered
        defaultActiveKey={["categories"]}
        expandIconPlacement="end"
        items={[
          {
            key: "categories",
            label: "Категория",
            children: (
              <Space orientation="vertical" size="small">
                {FILTER_CATEGORIES.map((category) => (
                  <Checkbox
                    key={category.value}
                    value={category.value}
                    style={{ userSelect: "none", width: "100%" }}>
                    {category.label}
                  </Checkbox>
                ))}
                <Divider style={{ margin: "8px 0" }} />
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                    userSelect: "none"
                  }}>
                  <Typography.Text>Только требующие доработок</Typography.Text>
                  <Switch checked={needsRevision} onChange={setNeedsRevision} />
                </label>
              </Space>
            )
          }
        ]}
      />
      <Button block>Сбросить фильтры</Button>
    </Space>
  );
};
