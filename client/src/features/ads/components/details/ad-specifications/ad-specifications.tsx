import { Descriptions, Typography } from "antd";
import type { JSX } from "react";

import type { AdType } from "@/features/ads/types/ad.types";

import css from "./ad-specifications.module.css";

type AdSpecificationsProps = {
  params: AdType["params"];
};

type SpecificationFieldConfig = {
  key: string;
  label: string;
  format?: (value: unknown) => string;
};

const SPECIFICATION_FIELDS: SpecificationFieldConfig[] = [
  { key: "type", label: "Тип" },
  { key: "brand", label: "Бренд" },
  { key: "model", label: "Модель" },
  { key: "color", label: "Цвет" },
  { key: "condition", label: "Состояние" },
  { key: "address", label: "Адрес" },
  { key: "area", label: "Площадь", format: (value) => `${value} м²` },
  { key: "floor", label: "Этаж" },
  { key: "transmission", label: "Коробка" },
  { key: "mileage", label: "Пробег", format: (value) => `${value} км` },
  { key: "enginePower", label: "Мощность", format: (value) => `${value} л.с.` },
  { key: "yearOfManufacture", label: "Год выпуска" }
];

export const AdSpecifications = ({ params }: AdSpecificationsProps): JSX.Element => {
  const paramsRecord = params as Record<string, unknown>;

  return (
    <div>
      <Typography.Title level={5} className={css.sectionTitle}>
        Характеристики
      </Typography.Title>
      <Descriptions column={1} size="small" className={css.descriptions}>
        {SPECIFICATION_FIELDS.map((field) => {
          if (!(field.key in paramsRecord)) {
            return null;
          }

          const value = paramsRecord[field.key];
          if (!value) {
            return null;
          }

          return (
            <Descriptions.Item key={field.key} label={field.label}>
              {field.format ? field.format(value) : String(value)}
            </Descriptions.Item>
          );
        })}
      </Descriptions>
    </div>
  );
};
