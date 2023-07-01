import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddForm.scss";

const AddproductForm = () => {
  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorMessage, setErrormessage] = useState("");
  const navigate = useNavigate();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    setError(validate(input));
  };

  const validate = (value) => {
    const error = {};
    if (!value.title) {
      error.title = "title is requred";
    } else if (!value.price) {
      error.price = "price is required";
    } else if (value.price <= 0) {
      error.price = "price not less then 0";
    } else if (value.price >= 10000) {
      error.price = "price not more than ten thousand";
    } else if (value.discountPercentage <= 0) {
      error.discountPercentage = "discountPercentage not less then 0";
    } else if (value.discountPercentage >= 50) {
      error.discountPercentage = "discount not more than equal to  50%";
    } else if (value.rating <= 0) {
      error.rating = "rating not less then 0";
    } else if (value.rating >= 5) {
      error.rating = "rating less than or equal to  5";
    } else if (!value.brand) {
      error.brand = "brand is required";
    } else if (!value.category) {
      error.category = "category is required";
    } else if (!value.discription) {
      error.discription = "discription is required";
    }
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(error).length === 0) {
      setIsSubmit(true);
    }
  };
  const PostProducts = async (input) => {
    const res = await axios.post("http://localhost:8080/products", input);
    console.log(res);
  };

  useEffect(() => {
    if (isSubmit) {
      console.log(input);
      PostProducts(input);
    }
  }, [isSubmit, input]);

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} className="ProductForm">
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={input.title}
          className="inputField"
          onChange={handleInput}
        />
        <p className="errorMessage">{error.title}</p>
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={input.price}
          className="inputField"
          onChange={handleInput}
        />
        <p className="errorMessage">{error.price}</p>
        <input
          name="discountPercentage"
          placeholder="Discount"
          type="number"
          value={input.discountPercentage}
          className="inputField"
          onChange={handleInput}
        />
        <p className="errorMessage">{error.discountPercentage}</p>
        <input
          name="rating"
          type="number"
          placeholder="Rating"
          value={input.rating}
          className="inputField"
          onChange={handleInput}
        />
        <p className="errorMessage">{error.rating}</p>
        <input
          name="stock"
          type="number"
          placeholder="stock"
          value={input.stock}
          className="inputField"
          onChange={handleInput}
        />
        <p className="errorMessage">{error.stock}</p>
        <input
          name="brand"
          type="text"
          placeholder="brand"
          value={input.brand}
          className="inputField"
          onChange={handleInput}
        />
        <p className="errorMessage">{error.brand}</p>
        <input
          name="category"
          type="text"
          placeholder="caregory"
          value={input.category}
          className="inputField"
          onChange={handleInput}
        />
        <p className="errorMessage">{error.category}</p>
        <textarea
          name="discription"
          placeholder="discription"
          value={input.discription}
          onChange={handleInput}
        />
        <p className="errorMessage">{error.discription}</p>
        <p className="errorMessage">{errorMessage}</p>
        <button>submit</button>
      </form>
    </div>
  );
};

export default AddproductForm;
