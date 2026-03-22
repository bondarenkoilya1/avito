import type { CSSProperties, JSX, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  style?: CSSProperties;
}

export const Container = ({ children, style }: ContainerProps): JSX.Element => {
  return (
    <div style={{ width: "100%", maxWidth: 1280, margin: "0 auto", ...style }}>{children}</div>
  );
};
