import { type ComponentType, type JSX } from "react";

import {
  AutoFields,
  ElectronicsFields,
  RealEstateFields
} from "@/features/ads/components/edit/ad-edit-params-fields/fields";
import { type AdCategory } from "@/features/ads/types";

type AdEditParamsFieldsProps = {
  category: AdCategory;
};

const PARAMS_FIELDS_MAP: Record<AdCategory, ComponentType> = {
  electronics: ElectronicsFields,
  auto: AutoFields,
  real_estate: RealEstateFields
};

export const AdEditParamsFields = ({ category }: AdEditParamsFieldsProps): JSX.Element | null => {
  const Fields = PARAMS_FIELDS_MAP[category];
  return Fields ? <Fields /> : null;
};
