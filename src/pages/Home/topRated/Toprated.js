import React from "react";
import { useSelector } from "react-redux";
import Carousel from "../../../components/Carousel/Carousel";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

function Toprated() {
  const { products, loading } = useSelector((state) => state.AllProducts);

  const TopRattedProduct = products
  .filter((item) => item.ratting === products.ratting)
  .sort((a, b) => (a.ratting > b.ratting ? 1 : -1))
  .slice(0, 19);

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <div className="carouselTitle">Top Rating</div>
      </ContentWrapper>
      <Carousel Data={TopRattedProduct} loading={loading} />
    </div>
  );
}

export default Toprated;
