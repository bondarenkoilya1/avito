import { type JSX } from "react";
import { Button, Collapse, Typography } from "antd";

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
    <div className={css.container}>
      <div className={css.card}>
        <Typography.Text strong style={{ display: "block", fontSize: "20px", marginBottom: 16 }}>
          Фильтры
        </Typography.Text>

        <Collapse
          ghost
          defaultActiveKey={["categories"]}
          expandIconPlacement="end"
          items={[
            {
              key: "categories",
              label: <span style={{ fontSize: "16px" }}>Категория</span>,
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
      </div>

      <Button onClick={onReset} disabled={!hasActiveFilters} className={css.resetButton}>
        Сбросить фильтры
      </Button>
    </div>
  );
};
