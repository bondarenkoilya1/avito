import { getModels } from "@/features/ai/api";
import type { SimplifiedModelsType, SimplifiedModelType } from "@/features/ai/types";

import { useQuery } from "@tanstack/react-query";

type UseGetModelsReturnType = SimplifiedModelsType & {
  weakestModel?: SimplifiedModelType;
  middleModel?: SimplifiedModelType;
  strongestModel?: SimplifiedModelType;
};

export const useGetModels = (): UseGetModelsReturnType => {
  const { data } = useQuery({
    queryKey: ["models"],
    queryFn: getModels,
    initialData: []
  });

  const models = data;
  const count = models.length;

  const weakestModel = models[0];
  const middleModel = models[Math.floor(count / 2)];
  const strongestModel = count > 0 ? models[count - 1] : undefined;

  return {
    models,
    weakestModel,
    middleModel,
    strongestModel
  };
};
