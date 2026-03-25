import { getModels } from "@/features/ai/api";
import type { SimplifiedModelsType } from "@/features/ai/types";

import { useQuery } from "@tanstack/react-query";

type UseGetModelsReturnType = SimplifiedModelsType & {
  isLoading: boolean;
  weakestModel?: string;
  middleModel?: string;
  strongestModel?: string;
};

export const useGetModels = (): UseGetModelsReturnType => {
  const { data, isLoading } = useQuery({
    queryKey: ["models"],
    queryFn: ({ signal }) => getModels(signal)
  });

  const models = data ?? [];
  const count = models.length;

  const weakestModel = models[0]?.name;
  const middleModel = models[Math.floor(count / 2)]?.name;
  const strongestModel = count > 0 ? models[count - 1].name : undefined;

  return {
    models,
    isLoading,
    weakestModel,
    middleModel,
    strongestModel
  };
};
