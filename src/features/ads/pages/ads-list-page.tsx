import { Typography } from "antd";
import type { JSX } from "react";

import { Filter, PaginationComponent } from "@/features/ads/components";

import { pluralize, type PluralizeVariants } from "@/shared/lib";

const ADS_PLURAL_VARIANTS: PluralizeVariants = {
  one: "объявление",
  few: "объявления",
  many: "объявлений",
  other: "объявления"
};

const formatAdsNumber = (variants: PluralizeVariants, number: number): string =>
  number ? `${number} ${pluralize(variants, number)}` : "Объявлений не найдено";

export const AdsListPage = (): JSX.Element => {
  return (
    <>
      <Typography.Title level={3}>Мои объявления</Typography.Title>
      <Typography.Text>{formatAdsNumber(ADS_PLURAL_VARIANTS, 42)}</Typography.Text>
      <aside>
        <Filter />
      </aside>
      <div style={{ position: "absolute", bottom: "10%" }}>
        <PaginationComponent />
      </div>
    </>
  );
};
