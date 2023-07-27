import React, { useState } from "react";
import "./Profile.scss";
import { useSelector, useDispatch } from "react-redux";
import Img from "../../components/LazyLoading/Img";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import avtar from "../../assets/avatar.png";
import { AiOutlineEdit } from "react-icons/ai";
import { updateUser } from "../../Api/Api";
import { GiCancel } from "react-icons/gi";
import { getOrders } from "../../Store/Orders";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../Store/UserAuth";
import { BsCurrencyRupee } from "react-icons/bs";
import OrderModel from "../../components/OrderModel/OrderModel";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const Navigate = useNavigate();

  const [openModel, setOpenModel] = useState(false);
  const [orderedItem, setOrderedItem] = useState(null);

  const { orders } = useSelector((state) => state.orders);


  const [editForm, seteditForm] = useState(false);


  const [formdata, setformdata] = useState({});
  const [emptyError, setError] = useState("");

  const handlechange = (e) => {
    const { name, value } = e.target;
    if (name === "profilePic") {
      setformdata({ ...formdata, [name]: e.target.files[0] });
    } else {
      setformdata({ ...formdata, [name]: value });
    }
  };

  

  const LoginFirst = () => {
    Navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formdata, "form");
    if (Object.keys(formdata).length === 0) {
      setError("please inset something ");
    } else {
      updateUser(`/users/${user?._id}`, formdata)
        .then((res) => {
          seteditForm(false);
          setformdata({})
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const toggleedit = () => {
    seteditForm((prev) => !prev);
  };

  const logoutHandler = () => {
    dispatch(Logout());
    Navigate("/");
  };

  const cancelorder = (id, e) => {
    e.stopPropagation();
    axios
      .delete(`http://localhost:8080/purchase/${id}`)
      .then((res) => {
        if (user?._id) {
          axios
            .get(`http://localhost:8080/purchase/${user?._id}`)
            .then((res) => {
              const { data } = res;
              dispatch(getOrders(data));
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="profilePage">
      <ContentWrapper>
        {!user ? (
          <div className="beforeLogin">
            <p>
              To access the profile creation feature, kindly log in or sign in
              first. Thank you for your cooperation.{" "}
            </p>
            <button className="btn" onClick={LoginFirst}>
              Login first
            </button>
          </div>
        ) : (
          <div className="afterLogin">
            <div className="profiledetails">
              <div className="ImageContainer">
                <img
                  className="profilePic"
                  src={
                    user?.profilePic
                      ? `http://localhost:8080/${user?.profilePic}`
                      : avtar
                  }
                />
              </div>
              <div className="basicdetails">
                {!editForm ? (
                  <div className="detais">
                    <p className="name">{user?.name}</p>
                    <p className="email">{user?.email}</p>
                    <p>{user?.addresses}</p>
                    <div className="deleteBtnContainer">
                      {" "}
                      <button onClick={logoutHandler}>Logout</button>
                    </div>
                  </div>
                ) : (
                  <form className="editForm" onSubmit={handleSubmit}>
                    <input
                      placeholder="userName"
                      name="name"
                      type="text"
                      value={formdata.name}
                      onChange={handlechange}
                    />
                    <textarea
                      placeholder="address"
                      name="addresses"
                      type="text"
                      value={formdata.addresses}
                      onChange={handlechange}
                    />
                    <p className="addbgIcon">
                      <label htmlFor="profilePic">
                        {<AiOutlineEdit />} profilePic
                      </label>
                      <input
                        id="profilePic"
                        style={{ display: "none" }}
                        type="file"
                        name="profilePic"
                        onChange={handlechange}
                      />
                    </p>
                    <p>{formdata?.profilePic?.name}</p>
                    <p className="error" >{emptyError}</p>
                    <button>submit</button>
                  </form>
                )}

                <button className="edit_goBack" onClick={toggleedit}>
                  {editForm ? `go Back` : "edit"}
                </button>
              </div>
            </div>
            <hr />
            <div className="orderSection">
              {orders.length == 0 ? (
                <div className="noOrders">
                  {" "}
                  <p className="orderHeading">All Orders</p>
                  <button className="btn" onClick={() => Navigate("/products")}>
                    {" "}
                    start shopping{" "}
                  </button>
                </div>
              ) : (
                <div className="allorders">
                  <p className="orderHeading">Order</p>
                  {orders.map((prod) => (
                    <div
                      className="orderdetails"
                      onClick={() => {
                        setOrderedItem(prod), setOpenModel(true);
                      }}
                      key={prod._id}
                    >
                      <div className="itemDetails">
                        {prod.items.map((item) => (
                          <div key={item.id}>
                            <Img className="image" src={item.thumbnail} />
                            <div>
                              <p className="quantity">
                                {" "}
                                {item.quantity
                                  ? `Quantity : ${item.quantity}`
                                  : "Quantity : 1"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="productdetail">
                        {" "}
                        <p className="amount">
                          {prod.amount} <BsCurrencyRupee />{" "}
                        </p>
                        <p>Payment : {prod.payment_status}</p>{" "}
                      </div>
                      <button className="cancelorder"  onClick={(e) => cancelorder(prod._id , e)} >cancel order</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </ContentWrapper>
      <OrderModel
        openModel={openModel}
        setOpenModel={setOpenModel}
        orderedItem={orderedItem}
        setOrderedItem={setOrderedItem}
      />
    </div>
  );
}

export default Profile;
