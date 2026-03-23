import { type JSX, useState } from "react";
import { Flex, Space, Typography } from "antd";

import {
  useOnlyNeedsRevisionStatus,
  usePage,
  usePaginationActions,
  useSelectedCategories
} from "@/app/store";

import {
  type AdsSortValue,
  DEFAULT_ADS_SORT,
  Filter,
  PaginationComponent,
  Toolbar
} from "@/features/ads/components";
import { AdCardList } from "@/features/ads/components/ad-card-list";
import { ADS_PLURAL_VARIANTS } from "@/features/ads/constants";
import { useGetAds } from "@/features/ads/hooks";
import { formatAdsCount } from "@/features/ads/utils";

import { Container } from "@/shared/ui";

import css from "./ads-list-page.module.css";

const pageSize = 10;

export const AdsListPage = (): JSX.Element => {
  const selectedCategories = useSelectedCategories();
  const showOnlyNeedsRevision = useOnlyNeedsRevisionStatus();
  const page = usePage();
  const { setPage, resetPage } = usePaginationActions();
  const [sortValue, setSortValue] = useState<AdsSortValue>(DEFAULT_ADS_SORT);
  const { items, total, isLoading } = useGetAds({
    page,
    pageSize,
    categories: selectedCategories,
    needsRevision: showOnlyNeedsRevision
  });

  const handleSortChange = (value: AdsSortValue): void => {
    setSortValue(value);
    resetPage();
  };

  const handlePageChange = (page: number): void => setPage(page);

  return (
    <Container>
      <Flex vertical gap={16}>
        <Space orientation="vertical" size={4}>
          <Typography.Title level={3} className={css.title}>
            Мои объявления
          </Typography.Title>
          {isLoading ? (
            <Typography.Text>Ищем ваши объявления</Typography.Text>
          ) : (
            <Typography.Text>{formatAdsCount(ADS_PLURAL_VARIANTS, total)}</Typography.Text>
          )}
        </Space>

        <Flex align="stretch" gap={48} className={css.contentWrapper}>
          <aside className={css.filterWrapper}>
            <Filter />
          </aside>

          <Flex vertical gap={16} className={css.sectionWrapper}>
            <Toolbar sortValue={sortValue} onSortChange={handleSortChange} />

            <AdCardList ads={items} />

            <div className={css.pagination}>
              <PaginationComponent
                current={page}
                pageSize={pageSize}
                total={total}
                onChange={handlePageChange}
              />
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};
