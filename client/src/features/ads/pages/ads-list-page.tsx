import { type JSX, useCallback, useMemo, useState } from "react";
import { Flex, Space, Typography } from "antd";

import { AdCard, Filter, PaginationComponent } from "@/features/ads/components";
import { MOCK_ADS } from "@/features/ads/components/ad-card/ad-card.constans";
import { type FilterCategory } from "@/features/ads/components/filter/filter.constants";
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

const ADS_PAGE_SIZE = 10;

export const AdsListPage = (): JSX.Element => {
  const [sortValue, setSortValue] = useState<AdsSortValue>(DEFAULT_ADS_SORT);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<FilterCategory[]>([]);
  const [needsRevisionOnly, setNeedsRevisionOnly] = useState(false);

  const filteredAds = useMemo(() => {
    return MOCK_ADS.filter((ad) => {
      const categoryMatched =
        selectedCategories.length === 0 || selectedCategories.includes(ad.category);
      const needsRevisionMatched = !needsRevisionOnly || Boolean(ad.needsRevision);

      return categoryMatched && needsRevisionMatched;
    });
  }, [selectedCategories, needsRevisionOnly]);

  const totalAds = filteredAds.length;

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
          <Typography.Title level={3} style={{ marginBottom: 0 }}>
            Мои объявления
          </Typography.Title>
          <Typography.Text>{formatAdsNumber(ADS_PLURAL_VARIANTS, totalAds)}</Typography.Text>
        </Space>

        <Flex align="stretch" gap={48} style={{ flex: 1, minHeight: 0 }}>
          <aside style={{ flex: "0 0 256px" }}>
            <Filter
              selectedCategories={selectedCategories}
              needsRevisionOnly={needsRevisionOnly}
              onSelectedCategoriesChange={handleSelectedCategoriesChange}
              onNeedsRevisionOnlyChange={handleNeedsRevisionOnlyChange}
              onReset={handleResetFilters}
            />
          </aside>

          <Flex vertical gap={16} style={{ flex: 1, minWidth: 0, minHeight: 0 }}>
            <Toolbar sortValue={sortValue} onSortChange={handleSortChange} />

            <div
              style={{
                display: "grid",
                gap: 16,
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))"
              }}>
              {paginatedAds.map((card) => (
                <AdCard
                  key={card.id}
                  title={card.title}
                  price={card.price}
                  category={card.category}
                  needsRevision={card.needsRevision}
                />
              ))}
            </div>

            <div style={{ marginTop: "auto" }}>
              <PaginationComponent
                current={currentPage}
                pageSize={ADS_PAGE_SIZE}
                total={totalAds}
                onChange={handlePageChange}
              />
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};
