import React, { useState } from "react";
import "./HomeBanner.scss";
import Shopping from "../../../assets/feature.jpg";
 
import { useSelector } from "react-redux";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import { useNavigate } from "react-router-dom";
function HomeBanner() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.AllProducts);
  let timer;
  const searchQueryHandler = (event) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (query.length > 0) {
        navigate(`/search/${query}`);
        if (event.key === "Enter") {
          navigate(`/search/${query}`);
        }
      }
    }, 3000);
  };

  

  return (
    <section className="homeBanner" role="banner">
      <div className="Background-img">
        <img src={Shopping} alt="Shopping Banner" />
      </div>
      <div className="opacity-layer" aria-hidden="true"></div>
      <ContentWrapper>
        <div className="homeDetailContainer">
          <h1 className="title">Welcome</h1>
          <p className="subTitle">Shop Smarter, Live Better: Your One-Stop Destination for Quality Finds!</p>
          <div className="searchInput">
            <label htmlFor="searchProducts" className="visually-hidden">
              Search your Products
            </label>
            <input
              type="text"
              id="searchProducts"
              placeholder="Search your Products..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button onClick={searchQueryHandler} type="submit">
              Search
            </button>
          </div>
        </div>
       
      </ContentWrapper>
    </section>
  );
}

export default HomeBanner;
