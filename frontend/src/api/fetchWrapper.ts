import type { ProductInfo } from "./fetchProduct";
import httpClient from "./httpClient";

export const fetchProducts = async (currentPage: number, pageSize: number) => {
  const { data } = await httpClient.get<{ totalPages: number; products: ProductInfo[] }>("/products/", {
    params: {
      currentPage,
      pageSize,
    },
  });

  return data;
};