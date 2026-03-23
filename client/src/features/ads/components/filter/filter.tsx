import { type JSX } from "react";
import { Button, Collapse, Space } from "antd";

import { useFilterActions, useOnlyNeedsRevisionStatus, useSelectedCategories } from "@/app/store";

import { FilterItems } from "@/features/ads/components";

import css from "./filter.module.css";

export const Filter = (): JSX.Element => {
  const selectedCategories = useSelectedCategories();
  const showOnlyNeedsRevision = useOnlyNeedsRevisionStatus();
  const { resetCategories } = useFilterActions();

  const hasActiveFilters = selectedCategories.length > 0 || showOnlyNeedsRevision;

  return (
    <Space orientation="vertical" className={css.wrapper}>
      <Collapse
        bordered
        defaultActiveKey={["categories"]}
        expandIconPlacement="end"
        items={[{ key: "categories", label: "Категория", children: <FilterItems /> }]}
      />
      <Button block onClick={resetCategories} disabled={!hasActiveFilters}>
        Сбросить фильтры
      </Button>
    </Space>
  );
};
