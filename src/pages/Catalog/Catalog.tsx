import ProductPage from "../../ui/ProductListPage/ProductListPage"

const Catalog = () => {
  return (
    <div className="container">
      <div className='header_text'>
        <q>каталог</q>
      </div>
      <ProductPage pageSize={12} isCatalog={true} />
    </div>
  )
}

export default Catalog