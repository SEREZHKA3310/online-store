import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../api/httpClient";
import type { Order } from "./useOrderStatus";

const cancelOrder = async (orderId: number) => {
  const response = await httpClient.patch<Order>("/orders/cancel/", {
    body: {
      id: orderId,
    },
  });

  if (response.status >= 400) {
    throw new Error("Failed to cancel order");
  }

  return response.data;
};

const useCancelOrder = (orderId: number) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => cancelOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["order-status", orderId],
      });
    },
  });

  return {
    cancelOrder: mutate,
    isCancelPending: isPending,
  };
};

export default useCancelOrder;