import { Routes, Route } from 'react-router-dom';
import Layout from "./components/layouts/Layout";
import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog/Catalog";
import ProductPage from './pages/Product/ProductPage';
import Cart from './pages/Cart/Cart';
import { Suspense } from 'react';
import SkeletonProductCard from './ui/SkeletonProductCard/SkeletonProductCard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path='cart' element={<Suspense fallback={<SkeletonProductCard />}><Cart /></Suspense>} />
      </Route>
    </Routes>
  );
}

export default App;