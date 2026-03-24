import { type JSX } from "react";
import { Flex, Space, Typography } from "antd";

import { Filter, PaginationComponent, Toolbar } from "@/features/ads/components";
import { AdCardList } from "@/features/ads/components/list/ad-card-list";
import { ADS_PLURAL_VARIANTS } from "@/features/ads/constants";
import { useAdsFilters } from "@/features/ads/hooks";
import { formatAdsCount } from "@/features/ads/utils";

import { Container } from "@/shared/ui";

import css from "./ads-list-page.module.css";

const pageSize = 10;

export const AdsListPage = (): JSX.Element => {
  const {
    items,
    total,
    isLoading,
    page,
    searchValue,
    categories,
    needsRevision,
    sortValue,
    setPage,
    search,
    changeCategories,
    changeNeedsRevision,
    resetSearch,
    sort
  } = useAdsFilters(pageSize);

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
            <Filter
              selectedCategories={categories}
              needsRevision={needsRevision}
              onCategoriesChange={changeCategories}
              onNeedsRevisionChange={changeNeedsRevision}
              onReset={resetSearch}
            />
          </aside>

          <Flex vertical gap={16} className={css.sectionWrapper}>
            <Toolbar
              defaultSearchValue={searchValue}
              onSearch={search}
              sortValue={sortValue}
              onSortChange={sort}
            />

            <AdCardList ads={items} isLoading={isLoading} />

            <div className={css.pagination}>
              <PaginationComponent
                current={page}
                pageSize={pageSize}
                total={total}
                onChange={setPage}
              />
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};
