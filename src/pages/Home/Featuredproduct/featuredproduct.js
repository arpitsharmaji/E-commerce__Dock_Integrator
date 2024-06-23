import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Carousel from "../../../components/Carousel/Carousel";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

function Featuredproduct() {
  const { products, loading } = useSelector((state) => state.AllProducts);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      // Shuffle the array of products
      const shuffledProducts = shuffle([...products]); // Create a copy of the products array
      // Get the first 20 products from the shuffled array
      const randomProducts = shuffledProducts.slice(0, 20);
      setRandomProducts(randomProducts);
    }
  }, [products]);

  // Function to shuffle the array
  const shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  return (
    <section className="carouselSection" aria-label="Top Discount Carousel Section">
      <ContentWrapper>
        <h2 className="carouselTitle">Best Deals</h2>
      </ContentWrapper>
      <Carousel Data={randomProducts} loading={loading} aria-label="Top Discount Carousel" />
    </section>
  );
}

export default Featuredproduct;
