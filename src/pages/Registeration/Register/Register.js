import React, { useState, useEffect } from "react";
import "../Registeration.scss";
import { SignupLogin } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
  const initialData = {
    name: "",
    email: "",
    password: "",
    role: "0",
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);
  const [formError, setError] = useState(initialData);
  const [isSubmit, setSubmit] = useState(false);
  const [commingError, setCommingError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(validate({ ...formData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      SignupLogin("/Auth/signup", formData)
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            navigate("/login");
          }else{
            setCommingError("signup fail")
          }
        })
        .catch((error) => {
          console.log(error);
          setCommingError(error.response.data); // Assuming the server returns an error message in 'message' field.
        })
        .finally(() => {
          setSubmit(false); // Reset isSubmit after form submission.
        });
    }
  }, [formError, formData, navigate, SignupLogin, isSubmit]);

  function validate(value) {
    const error = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegex = /^(?=.*[a-zA-Z]).{8,}$/;

    const alphabet = /^[A-Za-z]+$/;
    if (!value.name) {
      error.name = "name is required";
    } else if (value.name.length > 20) {
      error.name = "name always less than 20";
    } else if (!alphabet.test(value.name)) {
      error.name = "only alphabet are allowed";
    } else if (!value.email) {
      error.email = "email.required";
    } else if (!regex.test(value.email)) {
      error.email = "this is not a valid format";
    } else if (!value.password) {
      error.password = "password.required";
    } else if (!passwordRegex.test(value.password)) {
      error.password =
        "minimum length of 8 char and must include at least one alphabet";
    }
    return error;
  }

  return (
    <div className="registeration">
      <div className="formPage">
        <div className="formcontainer">
          <p className="title">Register</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="userName"
              onChange={handleChange}
              name="name"
              value={formData.name}
            />
            <p className="error">{formError.name}</p>
            <input
              type="email"
              placeholder="email"
              onChange={handleChange}
              name="email"
              value={formData.email}
            />
            <p className="error">{formError.email}</p>
            <input
              type="password"
              placeholder="password"
              onChange={handleChange}
              name="password"
              value={formData.password}
            />
            <p className="error">{formError.password}</p>
            <p>
              have a account{" "}
              <span onClick={() => navigate("/login")}>login</span>
            </p>
            <p className="error">{commingError}</p>
            <button className="submit"> Register </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
