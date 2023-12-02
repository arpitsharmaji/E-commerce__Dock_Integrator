import React from "react";
import "./Home.scss";
import HomeBanner from "./HomeBanner/HomeBanner"
import Topdiscount from "./topdiscount/TopDiscount";
import Toprated from "./topRated/Toprated";

function Home() {
  return (
    <section className="HomePage">
      <HomeBanner />
      <Topdiscount/>
      <Toprated/>
    </section>
  );
}

export default Home;
