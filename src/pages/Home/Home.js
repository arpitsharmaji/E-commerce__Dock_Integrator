import React from "react";
import "./Home.scss";
import HomeBanner from "./HomeBanner/HomeBanner"
import Topdiscount from "./topdiscount/TopDiscount";
import Toprated from "./topRated/Toprated";
import Featuredproduct from "./Featuredproduct/Featuredproduct";
import Electronics from "./electronics/electronics";
import Dresses from "./dresses/dresses";

function Home() {
  return (
    <section className="HomePage">
      <HomeBanner />
       <Topdiscount/> 
       <Dresses/> 
      <Toprated/>
      <Electronics/> 
      <Featuredproduct/>
    </section>
  );
}

export default Home;
