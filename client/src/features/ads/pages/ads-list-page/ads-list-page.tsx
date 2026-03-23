import { type JSX, useCallback, useMemo, useState } from "react";
import { Flex, Space, Typography } from "antd";

import {
  type AdsSortValue,
  DEFAULT_ADS_SORT,
  Filter,
  PaginationComponent,
  Toolbar
} from "@/features/ads/components";
import { AdCardList } from "@/features/ads/components/ad-card-list";
import { type FilterCategory } from "@/features/ads/components/filter/filter.constants";
import { ADS_PLURAL_VARIANTS } from "@/features/ads/constants";
import { useGetAds } from "@/features/ads/hooks";
import { formatAdsCount } from "@/features/ads/utils";

import { Container } from "@/shared/ui";

import css from "./ads-list-page.module.css";

const ADS_PAGE_SIZE = 10;

export const AdsListPage = (): JSX.Element => {
  const [sortValue, setSortValue] = useState<AdsSortValue>(DEFAULT_ADS_SORT);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<FilterCategory[]>([]);
  const [needsRevisionOnly, setNeedsRevisionOnly] = useState(false);
  const { items, total } = useGetAds();

  // todo: refactor pagination system, now return only 10 elements
  const filteredAds = useMemo(() => {
    return items.filter((ad) => {
      const categoryMatched =
        selectedCategories.length === 0 || selectedCategories.includes(ad.category);
      const needsRevisionMatched = !needsRevisionOnly || Boolean(ad.needsRevision);

      return categoryMatched && needsRevisionMatched;
    });
  }, [items, selectedCategories, needsRevisionOnly]);

  const paginatedAds = useMemo(() => {
    const start = (currentPage - 1) * ADS_PAGE_SIZE;

    return filteredAds.slice(start, start + ADS_PAGE_SIZE);
  }, [currentPage, filteredAds]);

  const handleSortChange = useCallback((value: AdsSortValue): void => {
    setSortValue(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number): void => {
    setCurrentPage(page);
  }, []);

  const handleSelectedCategoriesChange = useCallback((categories: FilterCategory[]): void => {
    setSelectedCategories(categories);
    setCurrentPage(1);
  }, []);

  const handleNeedsRevisionOnlyChange = useCallback((value: boolean): void => {
    setNeedsRevisionOnly(value);
    setCurrentPage(1);
  }, []);

  const handleResetFilters = useCallback((): void => {
    setSelectedCategories([]);
    setNeedsRevisionOnly(false);
    setCurrentPage(1);
  }, []);

  return (
    <Container>
      <Flex vertical gap={16}>
        <Space orientation="vertical" size={4}>
          <Typography.Title level={3} className={css.title}>
            Мои объявления
          </Typography.Title>
          <Typography.Text>{formatAdsCount(ADS_PLURAL_VARIANTS, total)}</Typography.Text>
        </Space>

        <Flex align="stretch" gap={48} className={css.contentWrapper}>
          <aside className={css.filterWrapper}>
            <Filter
              selectedCategories={selectedCategories}
              needsRevisionOnly={needsRevisionOnly}
              onSelectedCategoriesChange={handleSelectedCategoriesChange}
              onNeedsRevisionOnlyChange={handleNeedsRevisionOnlyChange}
              onReset={handleResetFilters}
            />
          </aside>

          <Flex vertical gap={16} className={css.sectionWrapper}>
            <Toolbar sortValue={sortValue} onSortChange={handleSortChange} />

            <AdCardList ads={paginatedAds} />

            <div className={css.pagination}>
              <PaginationComponent
                current={currentPage}
                pageSize={ADS_PAGE_SIZE}
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
