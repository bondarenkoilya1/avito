export const extractPrice = (value: string): string | null => {
  const cleaned = value.replace(/\s/g, "");
  const match = cleaned.match(/\d+([.,]\d+)?/);
  return match ? match[0].replace(",", ".") : null;
};
