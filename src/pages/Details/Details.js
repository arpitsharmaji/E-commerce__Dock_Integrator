import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import Img from "../../components/LazyLoading/Img";
import { AiFillStar } from "react-icons/ai";
import { BsCurrencyRupee } from "react-icons/bs";
import Carousel from "../../components/Carousel/Carousel";
import { AddItemToCart } from "../../Store/Cart";
import { paymentHandler, buyProduct } from "../../Api/Api";

import "./Details.scss";

function Details() {
  const { products, loading } = useSelector((state) => state.AllProducts);

  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [btnText, setBtntext] = useState("Add to cart");

  const { Cart } = useSelector((state) => state?.cart);

  const { id } = useParams();

  const dispatch = useDispatch();

  const DataToRedux = (item) => {
    if (user) {
      dispatch(AddItemToCart(item));
    } else {
      navigate("/login");
    }
  };

  const buyNowHandler = (data) => {
    if (user) {
      buyProduct(`/purchase/placeOrder`, data)
        .then((res) => {
          console.log(res, "buyproduct");
          paymentHandler("/payment/checkout", {
            amount: res.data.amount,
            userId: res.data.user,
            orderId: res.data._id,
            name: user?.name,
            email: user?.email,
          })
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => console.log(error));
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const cartItem = Cart?.find((item) => item.id === id);
    if (cartItem) {
      setBtntext(`item added ${cartItem.quantity}`);
    } else {
      setBtntext("Add to cart");
    }
  }, [Cart?.length, id]);

  const matchedProduct = products?.find((product) => product.id === id);

  const [detailProduct, setDetails] = useState([matchedProduct]);

  useEffect(() => {
    setDetails([matchedProduct]);
  }, [matchedProduct]);

  const [MainImage, setMainImg] = useState("");

  useEffect(() => {
    setMainImg(detailProduct[0]?.images[0]);
  }, [detailProduct]);

  const showMainImg = (index) => {
    setMainImg(detailProduct[0]?.images[index]);
  };

  return (
    <div className="detailsPage">
      <ContentWrapper>
        {loading && (
          <ColorRing
            visible={true}
            height="100"
            width="100"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["1c4b91", "173d77"]}
          />
        )}

        {detailProduct?.map((item) => (
          <div className="details" key={item?.id}>
            <div className="productDetail">
              <div className="imagecollection">
                {item?.images?.map((img, index) => (
                  <img
                    key={index}
                    onClick={() => showMainImg(index)}
                    src={img}
                    className="image"
                  />
                ))}
              </div>
              <div className="mainImagescreen">
                <Img src={MainImage} />
              </div>
              <div className="details">
                <p className="title">{item?.title}</p>
                <p className="price"><BsCurrencyRupee/>{item?.price} {" "}
                </p>
                <p className="brand">{item?.brand}</p>
                <p className="rating">
                  {item?.rating} <AiFillStar />{" "}
                </p>
                <p className="discount">
                  {" "}
                  upto {Math.round(item?.discountPercentage)}% off{" "}
                </p>
                <p className="description">{item?.description}</p>
              </div>
              
            </div>
            <div className="btn">
                  <button
                    onClick={() =>
                      buyNowHandler({
                        amount: matchedProduct?.price,
                        userId: user?._id,
                        items: matchedProduct,
                        addresses: user?.addresses,
                      })
                    }
                  >
                    {" "}
                    Buy Now{" "}
                  </button>
                  <button onClick={() => DataToRedux(item)}>{btnText}</button>
                </div>
            <p className="disc">{item?.description}</p>

            <div className="SimilarProducts">
              <h1>Similar products</h1>
              <Carousel
                Data={products?.filter(
                  (prod) => prod.category === item?.category
                )}
                loading={loading}
              />
            </div>
          </div>
        ))}
      </ContentWrapper>
    </div>
  );
}

export default Details;
