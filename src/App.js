import { useEffect } from "react";
import "./App.scss";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import Profile from "./pages/Profile/Profile";
import SearchResult from "./pages/SearchResult/SearchResult.js";
import Products from "./pages/Products/Product";
import Header from "./components/Header/Header";
import CartPage from "./pages/CartPage/Cart";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDetailsfromApi, getuserdetails } from "./Api/Api";
import { getAllProducts, loadingState } from "../src/Store/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Registeration/Login/Login";
import Register from "./pages/Registeration/Register/Register";
import ScrollToTop from "./components/ScrollToTop";
import { UserFun } from "./Store/UserAuth";

import "./App.scss";

const App = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  console.log(user);

  useEffect(() => {
    getuserdetails("/Auth/profile")
      .then((res) => {
        dispatch(UserFun(res));
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }, []);

  const fetchData = () => {
    dispatch(loadingState(true));
    fetchDetailsfromApi("/products").then((res) => {
      dispatch(loadingState(false));
      dispatch(getAllProducts(res));
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const { Cart } = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(Cart)); // create
  }, [Cart]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/details" element={<Details />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default App;
