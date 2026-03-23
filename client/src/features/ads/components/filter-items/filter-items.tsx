import { Checkbox, Divider, Space, Switch, Typography } from "antd";
import type { JSX } from "react";

import {
  useFilterActions,
  useOnlyNeedsRevisionStatus,
  usePaginationActions,
  useSelectedCategories
} from "@/app/store";

import { FILTER_CATEGORIES } from "@/features/ads/components/filter/filter.constants";
import type { AdCategory } from "@/features/ads/types";

import css from "./filter-items.module.css";

export const FilterItems = (): JSX.Element => {
  const selectedCategories = useSelectedCategories();
  const showOnlyNeedsRevision = useOnlyNeedsRevisionStatus();
  const { setCategories, toggleOnlyNeedsRevision } = useFilterActions();
  const { resetPage } = usePaginationActions();

  const handleSetCategories = (categories: AdCategory[]): void => {
    setCategories(categories);
    resetPage();
  };

  const handleToggleOnlyNeedsRevision = (): void => {
    toggleOnlyNeedsRevision();
    resetPage();
  };

  return (
    <Space orientation="vertical" size="small">
      <Checkbox.Group<AdCategory>
        options={FILTER_CATEGORIES}
        value={selectedCategories}
        onChange={handleSetCategories}
        className={css.options}
      />
      <Divider className={css.divider} />
      <label className={css.label}>
        <Typography.Text>Только требующие доработок</Typography.Text>
        <Switch checked={showOnlyNeedsRevision} onChange={handleToggleOnlyNeedsRevision} />
      </label>
    </Space>
  );
};
