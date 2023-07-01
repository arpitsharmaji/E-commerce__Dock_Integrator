import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import "../Carousel.scss"

function Carousel({ Data, loading }) {
  const CarouselContainer = useRef();
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = CarouselContainer.current;
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems">
             {Data?.filter((product) => product.rating > 4)
        .sort((a, b) => (a.rating < b.rating ? 1 : -1))
        .slice(0, 19)
        .map((item) => (
            <div key={item.id} className="carouselItem">
            <img src={item.thumbnail} className="thumbnailImg" />
            <div className="title">{item.title}</div>
            <div className="discount">{item.rating} %</div>
            <div className="price">{item.price}</div>
          </div>
        ))}
          </div>
        ): (
          <span> loading.... </span>
        )}
      </ContentWrapper>
    </div>
  );
}

export default Carousel;