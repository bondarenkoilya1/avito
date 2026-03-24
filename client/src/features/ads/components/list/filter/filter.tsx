import { type JSX } from "react";
import { Button, Collapse, Space } from "antd";

import { FilterItems } from "@/features/ads/components";
import type { AdCategory } from "@/features/ads/types";

import css from "./filter.module.css";

type FilterProps = {
  selectedCategories: AdCategory[];
  needsRevision: boolean;
  onCategoriesChange: (categories: AdCategory[]) => void;
  onNeedsRevisionChange: () => void;
  onReset: () => void;
};

export const Filter = ({
  selectedCategories,
  needsRevision,
  onCategoriesChange,
  onNeedsRevisionChange,
  onReset
}: FilterProps): JSX.Element => {
  const hasActiveFilters = selectedCategories.length > 0 || needsRevision;

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
              <FilterItems
                selectedCategories={selectedCategories}
                needsRevision={needsRevision}
                onCategoriesChange={onCategoriesChange}
                onNeedsRevisionChange={onNeedsRevisionChange}
              />
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
