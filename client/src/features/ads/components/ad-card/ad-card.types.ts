export type AdCategory = "auto" | "real_estate" | "electronics";

export type AdCardProps = {
  title: string;
  price: number;
  category: AdCategory;
  needsRevision: boolean;
};
