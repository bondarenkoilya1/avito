import { type JSX } from "react";
import { Alert, Flex, Space, Typography } from "antd";

import { Filter, PaginationComponent, Toolbar } from "@/features/ads/components";
import { AdCardList } from "@/features/ads/components/list/ad-card-list";
import { ADS_PLURAL_VARIANTS, PAGE_SIZE } from "@/features/ads/constants";
import { FilterProvider, useFilterContext } from "@/features/ads/contexts";
import { formatAdsCount } from "@/features/ads/utils";

import { Container } from "@/shared/ui";

import css from "./ads-list-page.module.css";

const AdsListContent = (): JSX.Element => {
  const {
    items,
    total,
    isLoading,
    page,
    searchValue,
    sortValue,
    viewMode,
    setPage,
    search,
    sort,
    setViewMode,
    isError,
    errorMessage
  } = useFilterContext();

  return (
    <Container className={css.page}>
      <Flex vertical gap={16}>
        <Space orientation="vertical" size={4} className={css.header}>
          <Typography.Title level={3} className={css.title}>
            Мои объявления
          </Typography.Title>
          {isLoading ? (
            <Typography.Text>Ищем ваши объявления</Typography.Text>
          ) : (
            <Typography.Text>{formatAdsCount(ADS_PLURAL_VARIANTS, total)}</Typography.Text>
          )}
        </Space>

        <Flex align="stretch" gap={32} wrap="wrap" className={css.contentWrapper}>
          <aside className={css.filterWrapper}>
            <Filter />
          </aside>

          <Flex vertical gap={16} className={css.sectionWrapper}>
            <Toolbar
              defaultSearchValue={searchValue}
              onSearch={search}
              sortValue={sortValue}
              onSortChange={sort}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            {isError ? (
              <div className={css.container}>
                <Alert
                  type="error"
                  title="Не удалось загрузить объявления"
                  description={errorMessage ?? "Попробуйте обновить страницу позже."}
                  showIcon
                />
              </div>
            ) : (
              <>
                <AdCardList ads={items} isLoading={isLoading} viewMode={viewMode} />

                <div className={css.pagination}>
                  <PaginationComponent
                    current={page}
                    pageSize={PAGE_SIZE}
                    total={total}
                    onChange={setPage}
                  />
                </div>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export const AdsListPage = (): JSX.Element => (
  <FilterProvider>
    <AdsListContent />
  </FilterProvider>
);
