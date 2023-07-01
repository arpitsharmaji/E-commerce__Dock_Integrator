import React from "react";
import HomeBanner from "./HomeBanner/HomeBanner";
import Toprated from "./topRated/Toprated";
import TopDiscount from "./topdiscount/TopDiscount";

function Home() {
  return (
    <div className="HomePage">
      <HomeBanner />
      <Toprated />
      <TopDiscount />
    </div>
  );
}

export default Home;
