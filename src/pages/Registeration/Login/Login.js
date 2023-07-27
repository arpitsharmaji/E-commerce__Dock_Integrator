import React, { useState } from "react";
import "../Registeration.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { UserFun } from "../../../Store/UserAuth";
import { useDispatch } from "react-redux";
import axios from "axios";

function Login() {
  const initialData = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);
  const [error, seterror] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/Auth/login", formData)
      .then((res) => {
        const { token, user } = res.data;
        console.log(token, user);
        localStorage.setItem("token", token);
        dispatch(UserFun(user));
        toast.success("login Sucessfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(`${error.response.data}`);
        seterror(error.response.data);
        return error;
      });
  };

  return (
    <div className="registeration">
      <div className="formPage">
        <div className="formcontainer">
          <p className="title">Login</p>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="email"
              type="email"
              onChange={handleChange}
              name="email"
              value={formData.email}
              required
            />
            <input
              required
              type="password"
              placeholder="password"
              onChange={handleChange}
              name="password"
              value={formData.password}
            />
            <p>
              {" "}
              Don't have an account{" "}
              <span onClick={() => navigate("/register")}>register</span>{" "}
            </p>
            <p className="error"  >{error}</p>
            <button className="submit"> Login </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
