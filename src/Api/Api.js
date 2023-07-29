import axios from "axios";

base_url = "http://localhost:8080";

export const fetchDetailsfromApi = async (url) => {
  try {
    const { data } = await axios.get(base_url + url);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const token = localStorage.getItem("token");

const headers = {
  Authorization: token,
};

export const getuserdetails = async (url) => {
  try {
    const { data } = await axios.get(base_url + url, {
      headers
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const SignupLogin = async (url, user) => {
  try {
    const res = await axios.post(base_url + url, user);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateUser = async (url, user) => {
  try {
    const res = await axios.patch(base_url + url, user, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const cancelOrders = async (url) => {
  try {
    const res = await axios.delete(base_url + url);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const buyProduct = async (url, data) => {
  try {
    const res = await axios.post(base_url + url, data);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const paymentHandler = async (url, transitiondetail) => {
  console.log(transitiondetail, "details");
  try {
    const {
      data: { orders },
    } = await axios.post(base_url + url, transitiondetail);
    console.log(orders, "ordersF");
    const {
      data: { key },
    } = await axios.get(base_url + "/payment/getkey");
    console.log(key, "key");

    const options = {
      key: key,
      amount: orders.amount,
      currency: orders.currency,
      name: "Puneet",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orders.id,
      handler: function (response) {
        console.log(response, "34");
        axios
          .post(
            base_url +
              `/payment/paymentVerification/${transitiondetail.orderId}`,
            { response }
          )
          .then(({ data }) => {
            console.log(data, "data");
            if (data.payment_status === "successful") {
              alert(`payment sucessfull  Id: ${data.paymentId}`);
            } else {
              alert("payment denied");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      prefill: {
        name: transitiondetail.name,
        email: transitiondetail.email,
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();

    return orders;
  } catch (error) {
    console.log(error);
    return error;
  }
};
