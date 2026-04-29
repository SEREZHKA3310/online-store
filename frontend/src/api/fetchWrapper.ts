import type { QueryFunction, QueryKey } from "@tanstack/react-query";
import type { ProductInfo } from "./fetchProduct";
import httpClient from "./httpClient";

interface PaginatedResponce<T> {
  count: number;
  previous: string | null;
  next: null;
  results: T[];
}

export const fetchProducts: QueryFunction<
  PaginatedResponce<ProductInfo>,
  QueryKey,
  number
> = async ({ pageParam }) => {
  const { data } = await httpClient.get<PaginatedResponce<ProductInfo>>("/products/", {
    params: {
      page: pageParam,
    },
  });

  return data;
};
