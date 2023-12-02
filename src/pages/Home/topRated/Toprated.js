import React from "react";
import { useSelector } from "react-redux";
import Carousel from "../../../components/Carousel/Carousel";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

function Toprated() {
  const { products, loading } = useSelector((state) => state.AllProducts);
 
  if (!products) {
    return null;  
  }

  // Filter and sort top-rated products
  const TopRatedProducts = products
    .filter((item) => item.rating > 4) // Assuming rating greater than 4
    .sort((a, b) => b.rating - a.rating) // Sorting in descending order of rating
    .slice(0, 19);

  return (
    <section className="carouselSection">
      <ContentWrapper>
        <h2 className="carouselTitle" role="heading" aria-level="2">
          Top Rating
        </h2>
      </ContentWrapper>
      <Carousel Data={TopRatedProducts} loading={loading} aria-label="Top Rating Carousel" />
    </section>
  );
}

export default Toprated;
