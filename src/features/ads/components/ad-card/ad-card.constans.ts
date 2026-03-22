import type { AdCardProps } from "@/features/ads/components/ad-card/ad-card.types";

export type MockAd = AdCardProps & { id: number };

export const MOCK_ADS: MockAd[] = [
  { id: 1, title: "Наушники Sony WH-1000XM5", price: 24990, category: "electronics" },
  {
    id: 2,
    title: "iPhone 14 Pro 256GB",
    price: 89990,
    category: "electronics",
    needsRevision: true
  },
  {
    id: 3,
    title: "Volkswagen Polo 2019",
    price: 1100000,
    category: "auto",
    needsRevision: true
  },
  { id: 4, title: "MacBook Pro M2", price: 149990, category: "electronics" },
  { id: 5, title: "Toyota Camry 2021", price: 2400000, category: "auto" },
  { id: 6, title: "Квартира 2к Ленина 15", price: 4500000, category: "real_estate" },
  {
    id: 7,
    title: "Samsung Galaxy S23",
    price: 59990,
    category: "electronics",
    needsRevision: true
  },
  { id: 8, title: "Комната в центре", price: 1200000, category: "real_estate" },
  {
    id: 9,
    title: "BMW 3 Series 2020",
    price: 3100000,
    category: "auto",
    needsRevision: true
  },
  { id: 10, title: "iPad Air 5", price: 54990, category: "electronics" },
  {
    id: 11,
    title: "Студия на Пушкина",
    price: 2800000,
    category: "real_estate",
    needsRevision: true
  },
  { id: 12, title: "Audi A4 2018", price: 1850000, category: "auto" },
  { id: 13, title: "Дом 120м² с участком", price: 6200000, category: "real_estate" },
  {
    id: 14,
    title: "PlayStation 5",
    price: 44990,
    category: "electronics",
    needsRevision: true
  },
  { id: 15, title: "Kia Rio 2022", price: 1350000, category: "auto" }
];
