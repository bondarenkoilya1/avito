import { Checkbox, Divider, Switch, Typography } from "antd";
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
    <div className={css.optionsWrapper}>
      <Checkbox.Group
        options={FILTER_CATEGORIES}
        value={selectedCategories}
        onChange={onCategoriesChange}
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      />

      <Divider style={{ margin: "12px 0" }} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "4px"
        }}>
        <Typography.Text>Только требующие доработок</Typography.Text>
        <Switch size="medium" checked={needsRevision} onChange={onNeedsRevisionChange} />
      </div>
    </div>
  );
};
