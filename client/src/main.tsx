import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Providers } from "@/app/providers";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element was not found");
}

// todo: temporarily. guess i'll use css modules or smth from antd
document.body.style.backgroundColor = "#F7F5F8";

createRoot(rootElement).render(
  <StrictMode>
    <Providers />
  </StrictMode>
);
