import type { QueryFunction } from "@tanstack/react-query";
import type { ProductInfo } from "./fetchProduct";
import type { SimilarProductsKey } from "./types";
import httpClient from "./httpClient";

export const fetchSimilarProducts: QueryFunction<
  ProductInfo[],
  SimilarProductsKey
> = async ({ queryKey }) => {
  const [, id] = queryKey;

  const { data } = await httpClient.get<ProductInfo[]>(
    `/products/${id}/similar/`,
  );

  return data;
};
