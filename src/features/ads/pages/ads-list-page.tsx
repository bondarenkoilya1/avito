import { type JSX, useState } from "react";
import { Flex, Space, Typography } from "antd";

import { Filter, PaginationComponent } from "@/features/ads/components";
import { type AdsSortValue, DEFAULT_ADS_SORT, Toolbar } from "@/features/ads/components/toolbar";

import { pluralize, type PluralizeVariants } from "@/shared/lib";
import { Container } from "@/shared/ui";

const ADS_PLURAL_VARIANTS: PluralizeVariants = {
  one: "объявление",
  few: "объявления",
  many: "объявлений",
  other: "объявления"
};

const formatAdsNumber = (variants: PluralizeVariants, number: number): string =>
  number ? `${number} ${pluralize(variants, number)}` : "Объявлений не найдено";

export const AdsListPage = (): JSX.Element => {
  const [sortValue, setSortValue] = useState<AdsSortValue>(DEFAULT_ADS_SORT);

  return (
    <Container>
      <Flex vertical gap={16}>
        <Space orientation="vertical" size={4}>
          <Typography.Title level={3} style={{ marginBottom: 0 }}>
            Мои объявления
          </Typography.Title>
          <Typography.Text>{formatAdsNumber(ADS_PLURAL_VARIANTS, 42)}</Typography.Text>
        </Space>

        <Toolbar sortValue={sortValue} onSortChange={setSortValue} />

        <aside>
          <Filter />
        </aside>

        <div>
          <PaginationComponent />
        </div>
      </Flex>
    </Container>
  );
};
