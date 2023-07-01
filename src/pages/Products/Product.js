import React from "react";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";

import { useSelector } from "react-redux";
import "./Product.scss";

function Product() {
  const { products, loading } = useSelector((state) => state.AllProducts);

  return (
    <div className="productPage">
      <ContentWrapper>
        {loading ? (
          <div>loading....</div>
        ) : (
          <div>
            {products?.map((elm) => (
              <div key={elm.id}> {elm.title} </div>
            ))}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
}

export default Product;
