import { useEffect } from "react";
import "./App.scss";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import Profile from "./pages/Profile/Profile";
import SearchResult from "./pages/SearchResult/SearchResult.js";
import Products from "./pages/Products/Product";
import Header from "./components/Header/Header";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";
import AddproductForm from "./pages/Products/AddForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import { getAllProducts, loadingState } from "../src/Store/ProductSlice";
import { useDispatch } from "react-redux";
import "./App.scss";

axios.defaults.baseURL = "http://localhost:8080";
const App = () => {
  const dispatch = useDispatch();

  async function getProduct() {
    dispatch(loadingState(true));
    const response = await axios.get("/products");
    try {
      const result = response;
      dispatch(loadingState(false));
      dispatch(getAllProducts(result?.data));
      return result;
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/:id" element={<Details />} />
        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/addproductForm" element={<AddproductForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default App;
