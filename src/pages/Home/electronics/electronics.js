import React from "react";
import { useSelector } from "react-redux";
import Categories from "../../../components/Categories/categories";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

function Electronics() {
  const { products, loading } = useSelector((state) => state.AllProducts);

  const TopDevices = Array.isArray(products)
  ? products.filter((item) => 
        item.category === "fragrances" ||
        item.category === "skincare"  
      )
    : [];

 
    

  return (
    <section className="carouselSection" aria-label="Top Devices Carousel Section">
      <ContentWrapper>
        <h2 className="carouselTitle">Elevate Your Senses, Nourish Your Skin.</h2>
      </ContentWrapper>
      <Categories Data={TopDevices} loading={loading} aria-label="Top Devices Carousel" />
    </section>
  );
}

export default Electronics;


