import { useSuspenseQuery } from "@tanstack/react-query";

import { fetchSimilarProducts } from "./request";

export const useSimilarProducts = (productId: number) => {
  const { data } = useSuspenseQuery({
    queryKey: ["similarProducts", productId],
    queryFn: fetchSimilarProducts,
  });

  return data;
};
