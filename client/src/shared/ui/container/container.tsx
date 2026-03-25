import type { JSX, ReactNode } from "react";

import css from "./container.module.css";

type ContainerProps = {
  children: ReactNode;
  maxWidth?: number | string;
};

export const Container = ({ children, maxWidth }: ContainerProps): JSX.Element => {
  return (
    <div className={css.container} style={maxWidth ? { maxWidth: maxWidth } : undefined}>
      {children}
    </div>
  );
};
