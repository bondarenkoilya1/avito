export type PluralizeVariants = Partial<Record<Intl.LDMLPluralRule, string>>;

export const pluralize = (
  variants: PluralizeVariants,
  number: number,
  locale: Intl.LocalesArgument = "ru"
): string => {
  const rules = new Intl.PluralRules(locale);

  return variants[rules.select(number)];
};
