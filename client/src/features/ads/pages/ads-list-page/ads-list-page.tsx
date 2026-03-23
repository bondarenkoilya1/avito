import { type JSX, useEffect } from "react";
import { Flex, Space, Typography } from "antd";
import { useSearchParams } from "react-router-dom";

import { Filter, PaginationComponent, Toolbar } from "@/features/ads/components";
import { AdCardList } from "@/features/ads/components/ad-card-list";
import { ADS_PLURAL_VARIANTS } from "@/features/ads/constants";
import { useGetAds } from "@/features/ads/hooks";
import type { AdCategory } from "@/features/ads/types";
import { formatAdsCount } from "@/features/ads/utils";

import { Container } from "@/shared/ui";

import css from "./ads-list-page.module.css";

const pageSize = 10;

export const AdsListPage = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const searchValue = searchParams.get("q") ?? "";
  const categories = (searchParams.get("categories")?.split(",") ?? []) as AdCategory[];
  const needsRevision = searchParams.get("needsRevision") === "true";

  const { items, total, isLoading } = useGetAds({
    q: searchValue,
    page,
    pageSize,
    categories,
    needsRevision
  });

  const setPage = (newPage: number): void =>
    setSearchParams((prev) => {
      prev.set("page", String(newPage));
      return prev;
    });

  const search = (value: string): void => {
    setSearchParams((prev) => {
      prev.set("q", value);
      prev.set("page", "1");
      return prev;
    });
  };

  const changeCategories = (values: AdCategory[]): void =>
    setSearchParams((prev) => {
      if (values.length) {
        prev.set("categories", values.join(","));
      } else {
        prev.delete("categories");
      }
      prev.set("page", "1");
      return prev;
    });

  const handleNeedsRevisionChange = (): void =>
    setSearchParams((prev) => {
      if (needsRevision) {
        prev.delete("needsRevision");
      } else {
        prev.set("needsRevision", "true");
      }
      prev.set("page", "1");
      return prev;
    });

  const handleReset = (): void =>
    setSearchParams((prev) => {
      prev.delete("categories");
      prev.delete("needsRevision");
      prev.set("page", "1");
      return prev;
    });

  useEffect(
    () => {
      if (!isLoading && items.length === 0 && page > 1) {
        setPage(1);
      }
    }, // eslint-disable-next-line
    [isLoading, items.length, page]
  );

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
              onNeedsRevisionChange={handleNeedsRevisionChange}
              onReset={handleReset}
            />
          </aside>

          <Flex vertical gap={16} className={css.sectionWrapper}>
            <Toolbar defaultSearchValue={searchValue} onSearch={search} />

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
