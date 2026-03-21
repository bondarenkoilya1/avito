import type { JSX } from "react";
import { useParams } from "react-router-dom";

export const AdEditPage = (): JSX.Element => {
  const { id } = useParams();

  return <h1>Edit ad: {id}</h1>;
};
