import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
// import useDataPage from "./useDataPage";
import { fetchProducts } from "../api/fetchWrapper";

const useProducts = () => {
  // const { page, setPage } = useDataPage();

  const { data, fetchNextPage } = useSuspenseInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,

    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => lastPage.next && lastPageParam + 1,

    // select: (data) => ({ ...data, pages: data.pages.map((page) => page.results) }),
  });

  return { products: data, fetchNextPage };
};

export default useProducts;
