export type AdCategory = "auto" | "real_estate" | "electronics";

export type AdCardType = {
  id: number;
  title: string;
  price: number;
  category: AdCategory;
  needsRevision: boolean;
};

export type AdType = {
  id: number;
  title: string;
  description?: string;
  price: number | null;
  createdAt: string;
  updatedAt: string;
} & (
  | {
      category: "auto";
      params: AutoItemParams;
    }
  | {
      category: "real_estate";
      params: RealEstateItemParams;
    }
  | {
      category: "electronics";
      params: ElectronicsItemParams;
    }
);

type AutoItemParams = {
  brand?: string;
  model?: string;
  yearOfManufacture?: number;
  transmission?: "automatic" | "manual";
  mileage?: number;
  enginePower?: number;
};

type RealEstateItemParams = {
  type?: "flat" | "house" | "room";
  address?: string;
  area?: number;
  floor?: number;
};

type ElectronicsItemParams = {
  type?: "phone" | "laptop" | "misc";
  brand?: string;
  model?: string;
  condition?: "new" | "used";
  color?: string;
};

export type AdUpdateType = {
  category: AdCategory;
  title: string;
  description?: string;
  price: number;
  params: AutoItemParams | RealEstateItemParams | ElectronicsItemParams;
};
