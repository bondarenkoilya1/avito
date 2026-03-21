import type { JSX } from "react";
import { useParams } from "react-router-dom";

export const AdDetailsPage = (): JSX.Element => {
  const { id } = useParams();

  return <h1>Ad details: {id}</h1>;
};
