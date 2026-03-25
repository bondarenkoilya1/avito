import { Descriptions, Typography } from "antd";
import type { JSX, ReactNode } from "react";

import type { AdType } from "@/features/ads/types/ad.types";

import css from "./ad-specifications.module.css";

type AdSpecificationsProps = {
  params: AdType["params"];
};

type SpecEntry = { label: string; value: ReactNode };

const ELECTRONICS_TYPE: Record<string, string> = {
  phone: "Телефон",
  laptop: "Ноутбук",
  misc: "Другое"
};

const REAL_ESTATE_TYPE: Record<string, string> = {
  flat: "Квартира",
  house: "Дом",
  room: "Комната"
};

const TRANSMISSION: Record<string, string> = {
  automatic: "Автомат",
  manual: "Механика"
};

const CONDITION: Record<string, string> = {
  new: "Новое",
  used: "Б/у"
};

const getSpecEntries = (params: AdType["params"]): SpecEntry[] => {
  const entries: SpecEntry[] = [];

  if ("type" in params && params.type) {
    const label = ELECTRONICS_TYPE[params.type] ?? REAL_ESTATE_TYPE[params.type] ?? params.type;
    entries.push({ label: "Тип", value: label });
  }
  if ("brand" in params && params.brand) {
    entries.push({ label: "Бренд", value: params.brand });
  }
  if ("model" in params && params.model) {
    entries.push({ label: "Модель", value: params.model });
  }
  if ("color" in params && params.color) {
    entries.push({ label: "Цвет", value: params.color });
  }
  if ("condition" in params && params.condition) {
    entries.push({ label: "Состояние", value: CONDITION[params.condition] ?? params.condition });
  }
  if ("address" in params && params.address) {
    entries.push({ label: "Адрес", value: params.address });
  }
  if ("area" in params && params.area) {
    entries.push({ label: "Площадь", value: `${params.area} м²` });
  }
  if ("floor" in params && params.floor) {
    entries.push({ label: "Этаж", value: params.floor });
  }
  if ("transmission" in params && params.transmission) {
    entries.push({
      label: "Коробка",
      value: TRANSMISSION[params.transmission] ?? params.transmission
    });
  }
  if ("mileage" in params && params.mileage) {
    entries.push({ label: "Пробег", value: `${params.mileage} км` });
  }
  if ("enginePower" in params && params.enginePower) {
    entries.push({ label: "Мощность", value: `${params.enginePower} л.с.` });
  }
  if ("yearOfManufacture" in params && params.yearOfManufacture) {
    entries.push({ label: "Год выпуска", value: params.yearOfManufacture });
  }

  return entries;
};

export const AdSpecifications = ({ params }: AdSpecificationsProps): JSX.Element => {
  const entries = getSpecEntries(params);

  return (
    <div>
      <Typography.Title level={5} className={css.sectionTitle}>
        Характеристики
      </Typography.Title>
      <Descriptions column={1} size="small" className={css.descriptions}>
        {entries.map((entry) => (
          <Descriptions.Item key={entry.label} label={entry.label}>
            {entry.value}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </div>
  );
};
