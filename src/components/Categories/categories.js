import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import "./style.scss";
import { AiFillStar } from "react-icons/ai";
import Img from "../LazyLoading/Img";
import { BsCurrencyRupee } from "react-icons/bs";

function Categories({ Data, loading }) {
  const CarouselContainer = useRef();
  const navigate = useNavigate();

  const skItem = () => {
    return (
      <div className="card skeleton">
        <div className="thumbnailImg skeleton"></div>
        <div className="title skeleton"></div>
        <div className="ratting discount skeleton"></div>
        <div className="discount skeleton"></div>
      </div>
    );
  };

  return (
    <section className="carousel" role="region" aria-label="Product Carousel">
      <ContentWrapper>
        {!loading ? (
          <div className="card-container" ref={CarouselContainer}>
            {Data?.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/details/${item.id}`)}
                className="card"
                role="button"
                tabIndex="0"
                aria-label={`View details of ${item.title}`}
              >
                <Img
                  src={item.thumbnail}
                  className="thumbnailImg"
                  alt="Product Image"
                />
                <div className="card-body">
                  <div className="title">{item.title.slice(0, 20)}</div>
                  <div className="rating" aria-label={`Rating: ${item.rating}`}>
                    {item.rating} <AiFillStar />
                  </div>
                  <div className="discount">
                    Discount: {item.discountPercentage} %
                  </div>
                  <div className="price">
                    Price: <BsCurrencyRupee /> {item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </section>
  );
}

export default Categories;