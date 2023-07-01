import React from "react";
import { useSelector } from "react-redux";
import Carousel from "./Carousel";

function Toprated() {
  const { products, loading } = useSelector((state) => state.AllProducts);

  console.log(products);

  return (
    <div>
      Toprated
      <Carousel Data={products} loading={loading} title="rating" />
    </div>
  );
}

export default Toprated;
