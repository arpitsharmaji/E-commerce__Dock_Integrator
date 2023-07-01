import React, { useState } from "react";
import "./HomeBanner.scss";
import Shopping from "../../../assets/feature.jpg";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import { useNavigate } from "react-router-dom";
function HomeBanner() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <div className="homeBanner">
      <div className="Background-img">
        <img src={Shopping} />
      </div>
      <div className="opacity-layer"> </div>
      <ContentWrapper>
        <div className="homeDetailContainer">
          <span className="title">Welcome</span>
          <p className="subTitle">start your Shopping with us</p>
          <div className="searchInput">
            <input
              type="text"
              placeholder="search your Products..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button>search</button>
          </div>
        </div>
        <div className="homeImageContainer">
          <img className="Homeimage" src={Shopping} />
        </div>
      </ContentWrapper>
    </div>
  );
}

export default HomeBanner;
