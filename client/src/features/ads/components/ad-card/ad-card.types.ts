export type AdCategory = "auto" | "real_estate" | "electronics";

export type AdCardType = {
  title: string;
  price: number;
  category: AdCategory;
  needsRevision: boolean;
};
