import type { JSX } from "react";

import { Filter, PaginationComponent } from "@/features/ads/components";

export const AdsListPage = (): JSX.Element => {
  return (
    <>
      <h1>Ads list</h1>
      <Filter />
      <div style={{ position: "absolute", bottom: "10%" }}>
        <PaginationComponent />
      </div>
    </>
  );
};
