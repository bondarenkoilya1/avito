import type { JSX } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { App } from "@/app/app";

import { AdDetailsPage, AdEditPage, AdsListPage } from "@/features/ads/pages";

import { NotFoundPage } from "@/shared/pages/not-found-page/not-found-page";

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
