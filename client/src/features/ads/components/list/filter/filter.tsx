import { type JSX } from "react";
import { Button, Collapse, Typography } from "antd";

import { FilterItems } from "@/features/ads/components";
import { useFilterContext } from "@/features/ads/contexts";

import css from "./filter.module.css";

export const Filter = (): JSX.Element => {
  const { categories, needsRevision, changeCategories, changeNeedsRevision, resetSearch } =
    useFilterContext();

  const hasActiveFilters = categories.length > 0 || needsRevision;

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
                  selectedCategories={categories}
                  needsRevision={needsRevision}
                  onCategoriesChange={changeCategories}
                  onNeedsRevisionChange={changeNeedsRevision}
                />
              )
            }
          ]}
        />
      </div>

      <Button onClick={resetSearch} disabled={!hasActiveFilters} className={css.resetButton}>
        Сбросить фильтры
      </Button>
    </div>
  );
};
