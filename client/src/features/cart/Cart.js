import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import ListCart from "./listcart/ListCart";
import Bill from "./bill/Bill";
import Footers from "../../components/footers/Footers";
import Shipping from "../../components/shipping/Shipping";
function Cart() {
  const state = useContext(GlobalState);
  const [cart] = state.userApi.cart;

  if (cart.length === 0)
    return (
      <div className="cart_empty">
        <h2>
          You don't have any books in your shopping cart yet. Try back select
          it.
        </h2>
      </div>
    );

  return (
    <div className="cart-shopping">
      <h3 className="title-cart">You have {cart.length} products shopping</h3>
      <div className="cart_container">
        <ListCart />
        <div className="bill_container">
          <Bill />
        </div>
      </div>
      <Shipping />
      <Footers />
    </div>
  );
}

export default Cart;
