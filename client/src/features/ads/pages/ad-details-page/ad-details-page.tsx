import { type JSX } from "react";
import { Alert, Flex } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import {
  AdDescription,
  AdDetailsGallery,
  AdDetailsHeader,
  AdRevisionAlert,
  AdSpecifications
} from "@/features/ads/components";
import { useGetAd } from "@/features/ads/hooks";
import { formatDate, formatPrice, getMissingFields } from "@/features/ads/lib";
import { AdDetailsSkeleton } from "@/features/ads/pages/ad-details-page/ad-details-skeleton";

import css from "./ad-details-page.module.css";

export const AdDetailsPage = (): JSX.Element | null => {
  const { id } = useParams();
  const navigate = useNavigate();
  const adId = Number(id);
  const { ad, isLoading, isError, errorMessage } = useGetAd(adId);

  if (!Number.isFinite(adId)) {
    return (
      <div className={css.page}>
        <div className={css.container}>
          <Alert
            type="error"
            title="Некорректный идентификатор объявления"
            description="Проверьте ссылку или вернитесь к списку объявлений."
            showIcon
          />
        </div>
      </div>
    );
  }

  if (isLoading) return <AdDetailsSkeleton />;
  if (isError) {
    return (
      <div className={css.page}>
        <div className={css.container}>
          <Alert
            type="error"
            title="Не удалось загрузить объявление"
            description={errorMessage ?? "Попробуйте обновить страницу позже."}
            showIcon
          />
        </div>
      </div>
    );
  }

  if (!ad) {
    return (
      <div className={css.page}>
        <div className={css.container}>
          <Alert
            type="warning"
            title="Объявление не найдено"
            description="Возможно, оно было удалено или ссылка устарела."
            showIcon
          />
        </div>
      </div>
    );
  }

  const missingFields = getMissingFields(ad);

  return (
    <div className={css.page}>
      <div className={css.container}>
        <AdDetailsHeader
          adId={ad.id}
          title={ad.title}
          priceLabel={ad.price === null ? null : formatPrice(ad.price)}
          createdAtLabel={formatDate(ad.createdAt)}
          updatedAtLabel={formatDate(ad.updatedAt)}
          onEdit={(id) => navigate(`/ads/${id}/edit`)}
        />

        <Flex gap={32} className={css.content}>
          <AdDetailsGallery />

          <Flex vertical gap={16} className={css.info}>
            <AdRevisionAlert isVisible={ad.needsRevision} missingFields={missingFields} />
            <AdSpecifications params={ad.params} />
          </Flex>
        </Flex>

        <AdDescription description={ad.description} />
      </div>
    </div>
  );
};
