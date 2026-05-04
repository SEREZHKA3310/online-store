import httpClient from "./httpClient";

export type ProductInfo = {
  id: number;
  name: string;
  main_image: string;
  images: Array<string>;
  info: Array<string>;
  description: Array<string>;
}

const fetchProduct = async (clothId: number): Promise<ProductInfo> => {
  const { data } = await httpClient.get<ProductInfo>(`/products/${clothId}/`);

  return data;
}

export default fetchProduct