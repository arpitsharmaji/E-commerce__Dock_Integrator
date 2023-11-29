import React from "react";
import "./Home.scss";
import HomeBanner from "./HomeBanner/HomeBanner"
import Topdiscount from "./topdiscount/TopDiscount";

function Home() {
  return (
    <section className="HomePage">
      <HomeBanner />
      <Topdiscount/>
    </section>
  );
}

export default Home;
