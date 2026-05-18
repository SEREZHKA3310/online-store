import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import ProductPage from "./pages/Product/ProductPage";
import { Suspense } from "react";
import SkeletonProductCard from "./ui/SkeletonProductCard/SkeletonProductCard";
import useUser from "./hooks/useUser";

import { Catalog, Login, Profile, Cart } from "~routes";

const App = () => {
  const data = useUser();

  return (
    <BrowserRouter>
      <div>
        id: {data?.id}
        name: {data?.username}
      </div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route
            path="cart"
            element={
              <Suspense fallback={<SkeletonProductCard />}>
                <Cart />
              </Suspense>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
