import type { JSX } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { App } from "@/app/app";
import { NotFoundPage } from "@/app/pages/not-found-page";

import { AdDetailsPage, AdEditPage, AdsListPage } from "@/ads/ui";

export const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/ads" replace />} />
          <Route path="ads" element={<AdsListPage />} />
          <Route path="ads/:id" element={<AdDetailsPage />} />
          <Route path="ads/:id/edit" element={<AdEditPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
