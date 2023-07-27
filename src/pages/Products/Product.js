import React, { useEffect, useState, useRef } from "react";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import { ColorRing } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Img from "../../components/LazyLoading/Img";
import { fetchDetailsfromApi } from "../../Api/Api";
import { AiFillStar } from "react-icons/ai";
import { BsCurrencyRupee } from "react-icons/bs";
import "./Product.scss";

function Product() {
  const { products } = useSelector((state) => state.AllProducts);

  const navigate = useNavigate();

  const [filtredproduct, setFilteredProduct] = useState([]);

  const [loading, setloading] = useState(false);

  // Api calling
  const fetchData = () => {
    setloading(true);
    fetchDetailsfromApi("/products").then((res) => {
      setFilteredProduct(res);
      setloading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [productPerPage] = useState(10);

  const [currentPage, setCurrrentPage] = useState(1);

  const numOfTotalPages = Math.ceil(filtredproduct?.length / productPerPage);

  const pages = [...Array(numOfTotalPages + 1)?.keys()]?.slice(1);

  const indexOfLastProductDisplayonPage = currentPage * productPerPage;
  const indexOfFirstProductDisplayonPage =
    indexOfLastProductDisplayonPage - productPerPage;

  const visibleProduct = filtredproduct?.slice(
    indexOfFirstProductDisplayonPage,
    indexOfLastProductDisplayonPage
  );

  const prevpageHandler = () => {
    if (currentPage !== 1) {
      setCurrrentPage(currentPage - 1);
    } else {
      setCurrrentPage(currentPage);
    }
  };
  const nextPageHandler = () => {
    if (currentPage !== pages.length) {
      setCurrrentPage(currentPage + 1);
    } else {
      setCurrrentPage(currentPage);
    }
  };

  const currentsortedelm = useRef();

  const sortByValues = () => {
    const e = currentsortedelm.current.value;
    if (e === "ratingAcc") {
      const productCopy = [...filtredproduct];
      productCopy.sort((a, b) => (a.rating > b.rating ? 1 : -1));
      setFilteredProduct(productCopy);
    } else if (e === "ratingDec") {
      const productCopy = [...filtredproduct];
      productCopy.sort((a, b) => (a.rating < b.rating ? 1 : -1));
      setFilteredProduct(productCopy);
    } else if (e === "priceAcc") {
      const productCopy = [...filtredproduct];
      productCopy.sort((a, b) => (a.price > b.price ? 1 : -1));
      setFilteredProduct(productCopy);
    } else if (e === "priceDec") {
      const productCopy = [...filtredproduct];
      productCopy.sort((a, b) => (a.price < b.price ? 1 : -1));
      setFilteredProduct(productCopy);
    } else if (e === "discountAcc") {
      const productCopy = [...filtredproduct];
      productCopy.sort((a, b) =>
        a.discountPercentage > b.discountPercentage ? 1 : -1
      );
      setFilteredProduct(productCopy);
    } else if (e === "discountDcc") {
      const productCopy = [...filtredproduct];
      productCopy.sort((a, b) =>
        a.discountPercentage < b.discountPercentage ? 1 : -1
      );
      setFilteredProduct(productCopy);
    } else {
      setFilteredProduct(filtredproduct);
    }
  };

  const currentCategory = useRef();

  const CategoryFilter = () => {
    const e = currentCategory.current.value;
    if (e) {
      const matchedProduct = products.filter((item) => item.category === e);
      setFilteredProduct(matchedProduct);
    }
    if (e === "#") {
      setFilteredProduct(products);
    }
  };

  const DetailPage = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="productPage">
      <ContentWrapper>
        <div className="Mainproduct">
          <div className="productHeader">
            <p>Products</p>
            <div className="selectors">
              <select
                className="select"
                id="sortBy"
                name="sortBy"
                ref={currentsortedelm}
                onClick={sortByValues}
              >
                <option value="#">sortBy</option>
                <option value="ratingAcc">Rating Accending Order</option>
                <option value="ratingDec">Rating Decending Order</option>
                <option value="priceAcc"> Price Accending order </option>
                <option value="priceDec"> Price decending Order </option>
                <option value="discountAcc"> Discount Accending order </option>
                <option value="discountDcc"> Discount Decending order </option>
              </select>

              <select
                className="select"
                id="category"
                name="category"
                ref={currentCategory}
                onClick={CategoryFilter}
              >
                <option value="#"> Category</option>
                <option value="smartphones">Smart Phone</option>
                <option value="laptops">Laptop</option>
                <option value="fragrances"> fragrances</option>
                <option value="skincare">Skincare</option>
                <option value="groceries">Groceries</option>
                <option value="home-decoration">Home-Decroration</option>
                <option value="mens-watches">Mens-Watches</option>
                <option value="mens-shoes">Mens-shoes</option>
                <option value="mens-shirts">Mens-shirts</option>
                <option value="furniture">Furniture</option>
                <option value="womens-dresses">Womens-dresses</option>
                <option value="womens-bags">Womens-Bags</option>
                <option value="womens-jewellery">Womens-Jewellery</option>
                <option value="womens-watches">Womens-watches</option>
                <option value="automotive">Automotive</option>
                <option value="lighting">Lighting</option>
                <option value="sunglasses">Sunglasses</option>
                <option value="tops">Tops</option>
                <option value="motorcycle">Motercycle</option>
              </select>
            </div>
          </div>
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
          <div className="Products">
            {visibleProduct?.map((elm) => (
              <div
                key={elm.id}
                onClick={() => DetailPage(elm.id)}
                className="Product"
              >
                <div className="ImageContainer">
                  <Img src={elm.thumbnail} className="ThumbnailImg" />
                </div>
                <div className="details">
                  <p className="title">{elm.title}</p>
                  <div className="ratting">
                    {elm.rating} <AiFillStar />{" "}
                  </div>
                  <p className="price">
                    {" "}
                    <BsCurrencyRupee /> {elm.price}{" "}
                  </p>
                  <p className="discount"> upto {elm.discountPercentage} off</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <p className="btn" onClick={prevpageHandler}>
              prev
            </p>
            <p>
              {" "}
              {pages.map((page) => (
                <span
                  key={page}
                  onClick={() => setCurrrentPage(page)}
                  className={`${currentPage === page ? "active" : "normal"} `}
                >{`${page} | `}</span>
              ))}{" "}
            </p>
            <p className="btn" onClick={nextPageHandler}>
              next
            </p>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default Product;
