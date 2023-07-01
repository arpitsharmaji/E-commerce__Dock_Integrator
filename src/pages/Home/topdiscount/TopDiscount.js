import React from "react";
import Carousel from "./Carousel";
import { useSelector } from "react-redux";

function TopDiscount() {
  const { products, loading } = useSelector((state) => state.AllProducts);

  return (
    <div>
      TopDiscount
      <Carousel Data={products} loading={loading} title="discountPrecentage" />
    </div>
  );
}

export default TopDiscount;
