export type AdCategory = "auto" | "real_estate" | "electronics";

export type AdCardType = {
  id: number;
  title: string;
  price: number;
  category: AdCategory;
  needsRevision: boolean;
};
