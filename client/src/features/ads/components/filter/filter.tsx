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
import css from "./filter.module.css";

export const Filter = ({
  selectedCategories,
  needsRevisionOnly,
  onSelectedCategoriesChange,
  onNeedsRevisionOnlyChange,
  onReset
}: FilterProps): JSX.Element => {
  const hasActiveFilters = selectedCategories.length > 0 || needsRevisionOnly;

  return (
    <Space orientation="vertical" className={css.wrapper}>
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
                  className={css.options}
                />
                <Divider className={css.divider} />
                <label className={css.label}>
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
