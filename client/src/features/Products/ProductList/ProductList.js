import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../productItem/ProductItem";
import Loading from "../../../utils/loading/Loading";

function ProductList() {
  const state = useContext(GlobalState);
  const [products] = state.productsApi.products;

  // const [isAdmin] = state.userApi.isAdmin

  return (
    <>
      {products.length === 0 && <Loading />}
      <div className="products">
        {products.map((product) => {
          return <ProductItem key={product._id} product={product} />;
        })}
      </div>
    </>
  );
}

export default ProductList;
