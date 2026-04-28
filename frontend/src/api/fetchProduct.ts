import httpClient, { HttpError } from "./httpClient";

export type ProductInfo = {
  id: number;
  name: string;
  price: number;
  main_image: string;
  images: Array<string>;
  info: Array<string>;
  description: Array<string>;
}

const fetchProduct = async (clothId: number): Promise<ProductInfo | string> => {
  try {
    const { data } = await httpClient.get<ProductInfo>(`/products/${clothId}/`);
    console.log(data)
    return data;
  } catch (error) {
    if (error instanceof HttpError && error.status === 404) {
      return "Такого товара нету";
    }
    throw error;
  }
};

export default fetchProduct