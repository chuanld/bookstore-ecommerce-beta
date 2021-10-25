import React, { useContext } from "react";
import "./adminpage.css";
import SideBar from "./sidebar/SideBar";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import { GlobalState } from "../../GlobalState";
import UserList from "./features/userlist/UserList";
import ProductListAdmin from "./features/productlist/ProductListAdmin";
import UserDetail from "./features/userdetail/UserDetail";
import CreateUser from "./features/createUser/CreateUser";
import OrderList from "./features/orderlist/OrderList";
import OrderDetailAdmin from "./features/orderdetail/OrderDetailAdmin";
import CategoriesList from "./features/categorylist/CategoriesList";
//import ProductDetail from "./features/productdetail/ProductDetail";
//import CreateProduct from "./features/createproduct/CreateProduct";
import Product from "../Products/Products";
function AdminPage() {
  const state = useContext(GlobalState);
  //const [isLogged, setIsLogged] = state.userApi.isLogged;
  const [isAdmin] = state.userApi.isAdmin;

  return (
    <div className="admin-page">
      {isAdmin ? (
        <Router>
          <div className="container-ad">
            <SideBar />
            <div className="others">
              <Switch>
                <Route path="/userlist" exact component={UserList} />
                <Route path="/userdetail/:id" exact component={UserDetail} />
                <Route path="/createUser" exact component={CreateUser} />
                {/* <Route path="/createproduct" exact component={CreateProduct} /> */}
                <Route path="/productlist" exact component={ProductListAdmin} />
                {/* <Route
                  path="/productdetail/:id"
                  exact
                  component={ProductDetail}
                /> */}
                <Route path="/orderlist" exact component={OrderList} />
                <Route
                  path="/orderlistdetail/:id"
                  exact
                  component={OrderDetailAdmin}
                />
                <Route
                  path="/categorieslist"
                  exact
                  component={CategoriesList}
                />
                <Route path="/products" exact component={Product} />
              </Switch>
            </div>
          </div>
        </Router>
      ) : (
        <div className="container-ad">
          <h1>This is Admin system. Please go back, thanks you!</h1>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
