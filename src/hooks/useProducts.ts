import { useSuspenseQuery } from "@tanstack/react-query";
import useDataPage from "./useDataPage"
import { fetchProducts } from "../api/fetchWrapper";

const useProducts = (pageSize: number = 6, isCatalog: boolean = false) => {
  const {page, setPage} = useDataPage()

  const { data } = useSuspenseQuery({
    queryKey: ['products', page, isCatalog],
    queryFn: () => fetchProducts(page, pageSize)
  });

  return {
    products: data.products,
    totalPages: data.totalPages,
    page,
    setPage
  }
}

export default useProducts