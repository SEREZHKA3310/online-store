import { useQuery, type QueryFunction } from "@tanstack/react-query";

import httpClient from "../api/httpClient";

export type OrderProduct = {
  id: number;
  name: string;
  main_image: string | null;
  images: string[];
  description: string[];
  count: number;
  size: string;
  price: number;
};

export type Order = {
  id: number;
  payment: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  items: OrderProduct[];
  total_price: number;
};

const fetchOrderStatus = (orderId: number): QueryFunction<Order> => {
  return async () => {
    const response = await httpClient.get<Order>(`/orders/${orderId}/`);

    if (response.status >= 400) {
      throw new Error("Failed to fetch order status");
    }

    return response.data;
  };
};

const useOrderStatus = (orderId: number) => {
  const { data } = useQuery({
    queryKey: ["order-status", orderId],
    queryFn: fetchOrderStatus(orderId),
    enabled: Boolean(orderId),
  });

  return data;
};

export default useOrderStatus;