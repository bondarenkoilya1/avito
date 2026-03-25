import type { JSX, ReactNode } from "react";

import css from "./container.module.css";

type ContainerProps = {
  children: ReactNode;
  maxWidth?: number | string;
  className?: string;
};

export const Container = ({ children, maxWidth, className }: ContainerProps): JSX.Element => {
  return (
    <div
      className={[css.container, className].filter(Boolean).join(" ")}
      style={maxWidth ? { maxWidth: maxWidth } : undefined}>
      {children}
    </div>
  );
};
