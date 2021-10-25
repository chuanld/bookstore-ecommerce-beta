import React from "react";
import Shipping from "../../components/shipping/Shipping";
import Footers from "../../components/footers/Footers";

import BannerProduct from "./bannerProduct/BannerProduct";
import Filters from "./filters/Filters";
import ProductList from "./ProductList/ProductList";

function Products() {
  return (
    <div>
      <BannerProduct />
      <Filters />
      <ProductList />
      <Shipping />
      <Footers />
    </div>
  );
}

export default Products;
