import { type JSX } from "react";
import { Outlet } from "react-router-dom";

export const App = (): JSX.Element => {
  return <Outlet />;
};
