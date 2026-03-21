import type { JSX } from "react";

import { Filter } from "@/features/ads/components";

export const AdsListPage = (): JSX.Element => {
  return (
    <>
      <h1>Ads list</h1>
      <Filter />
    </>
  );
};
