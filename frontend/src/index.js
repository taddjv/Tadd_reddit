import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import UserPopProvider from "./context/UserPopcontext";
import EditProvider from "./context/EditContext";
import CommentProvider from "./context/CommentContext";
import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";

import * as usersActions from "./store/users";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.usersActions = usersActions;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserPopProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserPopProvider>
    </Provider>
  </React.StrictMode>
);
