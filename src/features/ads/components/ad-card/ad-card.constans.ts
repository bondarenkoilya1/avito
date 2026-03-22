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
  { id: 3, title: "Volkswagen Polo 2019", price: 1100000, category: "auto", needsRevision: true },
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
  { id: 9, title: "BMW 3 Series 2020", price: 3100000, category: "auto", needsRevision: true },
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
  { id: 14, title: "PlayStation 5", price: 44990, category: "electronics", needsRevision: true },
  { id: 15, title: "Kia Rio 2022", price: 1350000, category: "auto" },
  { id: 16, title: "AirPods Pro 2", price: 19990, category: "electronics" },
  { id: 17, title: "Honda Civic 2020", price: 1650000, category: "auto", needsRevision: true },
  { id: 18, title: "Однушка на Садовой", price: 3200000, category: "real_estate" },
  { id: 19, title: "Xiaomi 13 Pro", price: 49990, category: "electronics", needsRevision: true },
  { id: 20, title: "Mazda CX-5 2021", price: 2750000, category: "auto" },
  { id: 21, title: "Дача 6 соток Подмосковье", price: 1800000, category: "real_estate" },
  { id: 22, title: "Apple Watch Series 9", price: 34990, category: "electronics" },
  { id: 23, title: "Hyundai Tucson 2022", price: 2950000, category: "auto", needsRevision: true },
  { id: 24, title: "3к квартира Невский 44", price: 8900000, category: "real_estate" },
  {
    id: 25,
    title: "Lenovo ThinkPad X1",
    price: 89990,
    category: "electronics",
    needsRevision: true
  },
  { id: 26, title: "Skoda Octavia 2019", price: 1450000, category: "auto" },
  { id: 27, title: "Таунхаус 180м²", price: 9500000, category: "real_estate" },
  { id: 28, title: "Nintendo Switch OLED", price: 29990, category: "electronics" },
  { id: 29, title: "Renault Logan 2018", price: 890000, category: "auto", needsRevision: true },
  { id: 30, title: "Офис 45м² в центре", price: 5200000, category: "real_estate" },
  {
    id: 31,
    title: "Samsung 4K телевизор 55",
    price: 54990,
    category: "electronics",
    needsRevision: true
  },
  { id: 32, title: "Nissan X-Trail 2020", price: 2100000, category: "auto" },
  { id: 33, title: "Гараж на Ленина", price: 450000, category: "real_estate" },
  { id: 34, title: "DJI Mini 3 Pro", price: 64990, category: "electronics" },
  { id: 35, title: "Lada Vesta 2022", price: 980000, category: "auto", needsRevision: true },
  { id: 36, title: "Студия 28м² новостройка", price: 2400000, category: "real_estate" },
  { id: 37, title: "Dyson V15 Detect", price: 49990, category: "electronics" },
  { id: 38, title: "Ford Focus 2017", price: 1050000, category: "auto" },
  {
    id: 39,
    title: "Дом 200м² с баней",
    price: 7800000,
    category: "real_estate",
    needsRevision: true
  },
  { id: 40, title: "GoPro Hero 11", price: 34990, category: "electronics", needsRevision: true },
  { id: 41, title: "Kia Sportage 2023", price: 3200000, category: "auto" },
  { id: 42, title: "Апартаменты у моря", price: 12000000, category: "real_estate" }
];
