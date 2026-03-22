import { type JSX } from "react";
import { Button, Checkbox, Collapse, Divider, Space, Switch, Typography } from "antd";

import {
  FILTER_CATEGORIES,
  type FilterCategory
} from "@/features/ads/components/filter/filter.constants";

type FilterProps = {
  selectedCategories: FilterCategory[];
  needsRevisionOnly: boolean;
  onSelectedCategoriesChange: (categories: FilterCategory[]) => void;
  onNeedsRevisionOnlyChange: (value: boolean) => void;
  onReset: () => void;
};

export const Filter = ({
  selectedCategories,
  needsRevisionOnly,
  onSelectedCategoriesChange,
  onNeedsRevisionOnlyChange,
  onReset
}: FilterProps): JSX.Element => {
  const hasActiveFilters = selectedCategories.length > 0 || needsRevisionOnly;

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
                <Checkbox.Group<FilterCategory>
                  options={FILTER_CATEGORIES}
                  value={selectedCategories}
                  onChange={onSelectedCategoriesChange}
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                />
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
                  <Switch checked={needsRevisionOnly} onChange={onNeedsRevisionOnlyChange} />
                </label>
              </Space>
            )
          }
        ]}
      />
      <Button block onClick={onReset} disabled={!hasActiveFilters}>
        Сбросить фильтры
      </Button>
    </Space>
  );
};
