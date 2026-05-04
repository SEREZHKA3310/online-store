import httpClient from "./httpClient";

type Prices = Array<{
  size: string,
  price: number,
  stock: number
}>

const fetchPrice = async (clothId: number): Promise<Prices> => {
  const { data } = await httpClient.get<Prices>(`/by_product/${clothId}/`);

  return data;
  
};

export default fetchPrice