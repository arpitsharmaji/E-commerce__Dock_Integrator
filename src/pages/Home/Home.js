import React from "react";
import "./Home.scss";
import HomeBanner from "./HomeBanner/HomeBanner";
import Toprated from "./topRated/Toprated";
import Topdiscount from "./TopDiscount/TopDiscount";

function Home() {
  return (
    <div className="HomePage">
      <HomeBanner />
      <Toprated />
      <Topdiscount/>
    </div>
  );
}

export default Home;
