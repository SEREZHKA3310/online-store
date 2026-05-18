import { useMutation } from "@tanstack/react-query";
import httpClient from "../api/httpClient";
import { CartContext } from "../context/CartContext";
import { useContext, useMemo } from "react";

const useHuiks = () => {
  const { cart } = useContext(CartContext);

  const priceResult = useMemo(
    () => cart.reduce((acc, { price, count }) => acc + price * count, 0),
    [cart],
  );

  const { mutateAsync: mutate } = useMutation({
    mutationFn: (pay: "sbp" | "card" | "cash") =>
      httpClient.post("/checkout", {
        body: {
          pay,
          total_price: priceResult,
          input_items: cart.map((el) => {
            return { id: el.id, count: el.count };
          }),
        },
      }),
  });

  return mutate;
};

export default useHuiks;
