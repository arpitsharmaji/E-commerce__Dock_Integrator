import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";
import { store } from "./src/Store/Store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
