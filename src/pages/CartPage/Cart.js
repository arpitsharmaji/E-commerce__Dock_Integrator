import React, { useEffect } from "react";
import "./cart.scss";
import {
  AddItemToCart,
  removeIemFromCart,
  ClearAll,
  TotalCartPrice,
} from "../../Store/Cart";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShopingImg from "../../assets/download.jpg";
import MissingItem from "../../assets/MissingItem.webp";
import { BsCurrencyRupee } from "react-icons/bs";
import { paymentHandler, buyProduct } from "../../Api/Api";

function Cart() {
  const { Cart } = useSelector((state) => state.cart);

  const { totalamount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(TotalCartPrice());
  }, [Cart]);

  const dispatch = useDispatch();

  const ClearAllItem = () => {
    dispatch(ClearAll());
    localStorage.removeItem("cartData");
  };

  const navigate = useNavigate();

  const buyNowHandler = (data) => {
    buyProduct(`/purchase/placeOrder`, data)
      .then((res) => {
        console.log(res, "buyproduct");
        paymentHandler("/payment/checkout", {
          amount: res.data.amount,
          userId: res.data.user,
          orderId: res.data._id,
          name: user.name,
          email: user.email,
        })
          .then((res) => {
            console.log(res, "response at handle ");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => console.log(error));
  };

  const addtoCart = (prod, e) => {
    e.stopPropagation();
    dispatch(AddItemToCart(prod));
  };

  const removeFromCart = (prod, e) => {
    e.stopPropagation();
    dispatch(removeIemFromCart(prod));
  };

  return (
    <div className="cartPage">
      <ContentWrapper>
        {user ? (
          <div className="AfterLogin">
            {!Cart?.length == 0 ? (
              <div className="cartsection">
                <div>
                  <p className="shopingHeader">Shopping-Cart</p>
                  <p className="cartLength">
                    {" "}
                    you have {Cart.length} item in cartItem{" "}
                  </p>{" "}
                </div>
                <div className="cartItems">
                  {Cart?.map((prod) => (
                    <div
                      className="cartItem"
                      onClick={() => navigate(`/details/${prod.id}`)}
                      key={prod.id}
                    >
                      <div className="imgCont">
                        <img src={prod.thumbnail} />
                        <p>{prod?.title?.slice(0, 15)}</p>
                      </div>
                      <p>
                        {prod.price} <BsCurrencyRupee />{" "}
                      </p>
                      <div className="icons">
                        <span onClick={(e) => addtoCart(prod, e)}>+</span>
                        {prod.quantity}
                        <span onClick={(e) => removeFromCart(prod, e)}>-</span>
                      </div>
                      <p>
                        {prod.price * prod.quantity} <BsCurrencyRupee />
                      </p>
                    </div>
                  ))}
                </div>
                <div className="btnContainer">
                  <button onClick={() => navigate("/products")}>
                    continue Shopping
                  </button>
                  <button onClick={ClearAllItem}>clear All</button>
                </div>
                <div className="amountBox">
                  <p>
                    {" "}
                    Total - {totalamount} <BsCurrencyRupee />{" "}
                  </p>
                  <button
                    onClick={() =>
                      buyNowHandler({
                        amount: totalamount,
                        userId: user?._id,
                        items: [...Cart],
                        addresses: user.addresses,
                      })
                    }
                  >
                    {" "}
                    Buy Now{" "}
                  </button>
                </div>
              </div>
            ) : (
              <div className="additemToCart">
                <img src={ShopingImg} /> <p> No Such Item in cart </p>{" "}
                <button onClick={() => navigate("/products")}>
                  start Shopping
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="LoginFirst">
            <img className="img" src={MissingItem} />
            <p>Login to see the Cart Items</p>{" "}
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
        )}
      </ContentWrapper>
    </div>
  );
}

export default Cart;
