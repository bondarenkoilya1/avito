import type { JSX, ReactNode } from "react";

import css from "./container.module.css";

type ContainerProps = {
  children: ReactNode;
};

export const Container = ({ children }: ContainerProps): JSX.Element => {
  return <div className={css.container}>{children}</div>;
};
