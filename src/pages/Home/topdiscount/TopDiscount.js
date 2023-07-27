import React from "react";
import { useSelector } from "react-redux";
import Carousel from "../../../components/Carousel/Carousel";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

function topdiscount() {
  const { products, loading } = useSelector((state) => state.AllProducts);

  const Topdiscount = products
    .filter((item) => item.discountPercentage >= 16)
    .sort((a, b) => (a.discountPercentage < b.discountPercentage ? 1 : -1))
    .slice(0, 19);

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <div className="carouselTitle">Top Discount</div>
      </ContentWrapper>
      <Carousel Data={Topdiscount} loading={loading} />
    </div>
  );
}

export default topdiscount;
