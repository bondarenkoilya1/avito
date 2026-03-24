import { Checkbox, Divider, Space, Switch, Typography } from "antd";
import type { JSX } from "react";

import { FILTER_CATEGORIES } from "@/features/ads/components/list/filter/filter.constants";
import type { AdCategory } from "@/features/ads/types";

import css from "./filter-items.module.css";

type FilterItemsProps = {
  selectedCategories: AdCategory[];
  needsRevision: boolean;
  onCategoriesChange: (categories: AdCategory[]) => void;
  onNeedsRevisionChange: () => void;
};

export const FilterItems = ({
  selectedCategories,
  needsRevision,
  onCategoriesChange,
  onNeedsRevisionChange
}: FilterItemsProps): JSX.Element => {
  return (
    <Space orientation="vertical" size="small">
      <Checkbox.Group<AdCategory>
        options={FILTER_CATEGORIES}
        value={selectedCategories}
        onChange={onCategoriesChange}
        className={css.options}
      />
      <Divider className={css.divider} />
      <label className={css.label}>
        <Typography.Text>Только требующие доработок</Typography.Text>
        <Switch checked={needsRevision} onChange={onNeedsRevisionChange} />
      </label>
    </Space>
  );
};
