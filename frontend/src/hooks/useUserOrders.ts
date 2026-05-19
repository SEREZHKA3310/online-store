import { useQuery, type QueryFunction } from "@tanstack/react-query";

import httpClient from "../api/httpClient";
import type { Order } from "./useOrderStatus";

const fetchUserOrders: QueryFunction<Order[]> = async () => {
  const response = await httpClient.get<Order[]>("/orders/");

  if (response.status >= 400) {
    throw new Error("Failed to fetch user orders");
  }

  return response.data;
};

const useUserOrders = () => {
  const { data } = useQuery({
    queryKey: ["user-orders"],
    queryFn: fetchUserOrders,
  });

  return data;
};

export default useUserOrders;