import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import CategoriesApi from "./api/CategoriesApi";
import ProductsApi from "./api/ProductsApi";
import UserApi from "./api/UserApi";
//import AllUsersApi from "./api/AllUsersApi";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    // const firstLogin = localStorage.getItem("firstLogin");
    // if (firstLogin) refreshToken();
    //Authenticate
    const refreshToken = async () => {
      const firstLogin = localStorage.getItem("firstLogin");
      if (firstLogin) {
        const res = await axios.get("/user/refresh_token");
        setToken(res.data.accesstoken);
        console.log(res.data.accesstoken);

        setTimeout(() => {
          refreshToken();
        }, 28 * 60 * 1000);
      }
    };
    setTimeout(() => {
      refreshToken();
    }, 28 * 60 * 1000);
  }, [callback]);

  //API
  const state = {
    token: [token, setToken],
    callback: [callback, setCallback],
    productsApi: ProductsApi(),
    categoriesApi: CategoriesApi(),
    userApi: UserApi(token),
    //allUsersApi: AllUsersApi(token),
  };
  ProductsApi();
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
