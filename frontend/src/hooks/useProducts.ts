import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
// import useDataPage from "./useDataPage";
import { fetchProducts } from "../api/fetchWrapper";

const useProducts = () => {
  // const { page, setPage } = useDataPage();

  const { data } = useSuspenseInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,

    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => lastPage.next && lastPageParam + 1,

    // select: (data) => ({ ...data, pages: data.pages.map((page) => page.results) }),
  });

  return data;
};

export default useProducts;
