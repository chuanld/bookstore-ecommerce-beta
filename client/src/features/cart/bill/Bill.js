import React, { useContext, useState, useEffect } from "react";
import "./bill.css";
import PaypalExpressBtn from "./PaypalButton";
// import PaypalButtonV2 from "./PaypalButtonV2";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
export default function Bill() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [infor] = state.userApi.infor;
  const [cart, setCart] = state.userApi.cart;
  const [total, setTotal] = useState(0);
  const [callback, setCallback] = state.userApi.callback;

  // const [itemid, setItemId] = useState(0);

  useEffect(() => {
    //total
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(total);
    };
    getTotal();

    //ID item
    // const getItemId = () => {
    //   const itemid = cart.map((item) => {
    //     return item.product_id;
    //   }, 0);
    //   setItemId(itemid);
    // };
    // getItemId();
  }, [cart]);

  const tranSuccess = async (payment) => {
    console.log(payment);
    const option = { type: "Paypal payment", paywith: "default" };

    const { paymentID, address } = payment;
    await axios.post(
      "/api/order",
      { cart, orderID: paymentID, address, option },
      {
        headers: { Authorization: token },
      }
    );
    cart.splice(0, cart.length);
    setCart([...cart]);
    updateCart(cart);
    alert("You have successfully paid. Thanks you for trust us");
    setCallback(!callback);
  };
  // const tranSuccess1 = async (payment) => {
  //   console.log(payment);
  //   const option = { type: "Paypal payment", paywith: "default" };
  //   const { payer_id, address } = payment;
  //   const paymentID = "PAYID-" + payer_id;
  //   console.log(paymentID);
  //   await axios.post(
  //     "/api/order",
  //     { cart, orderID: paymentID, address, option },
  //     {
  //       headers: { Authorization: token },
  //     }
  //   );

  //   cart.splice(0, cart.length);
  //   setCart([...cart]);
  //   updateCart(cart);
  //   alert("You have successfully paid. Thanks you for trust us");
  //   setCallback(!callback);
  // };

  const updateCart = async (cart) => {
    await axios.patch(
      "/user/addtocart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const chkShipCOD = async () => {
    if (!infor.address)
      return alert("Please update infomation address for ShipCOD");
    if (window.confirm(`Hi there. Do you confirm checkout`)) {
      const option = { type: "ShipCOD payment", paywith: "default" };
      var date = new Date();
      var foot =
        date.getDate() +
        "" +
        (date.getMonth() + 1) +
        date.getFullYear() +
        date.getHours() +
        date.getMinutes() +
        date.getMilliseconds();
      const ID = "" + foot;
      const strID = ID.replace(/\s+/g, "");
      const { address } = infor;
      const orderID = `ShipCOD-${strID}`;
      console.log(orderID);
      await axios.post(
        "/api/order",
        { cart, orderID, address, option },
        {
          headers: { Authorization: token },
        }
      );
      cart.splice(0, cart.length);
      setCart([...cart]);
      updateCart(cart);
      alert("You have successfully paid. Thanks you for trust us");
      setCallback(!callback);
    }
  };
  return (
    <div className="total_cart">
      <h3 style={{ textAlign: "center" }}>Your order</h3>
      <div className="row">
        <i>Customer: {infor.name}</i>
        <i>Address: {infor.address}</i>
      </div>

      <div style={{ textAlign: "center" }}>-------------------------------</div>
      {cart.map((bill) => (
        <div className="row" key={bill._id}>
          <h6 className="subtotal">
            Subtotal: ${bill.price} x {bill.quantity}
          </h6>
          <h6>{bill.product_id}</h6>
        </div>
      ))}

      <div style={{ textAlign: "center" }}>
        ---------------------------------
      </div>
      <h6>Voucher: $$ </h6>
      <h3 className="total_bill">Total: ${parseFloat(total).toFixed(2)} </h3>
      <div style={{ textAlign: "center" }}>
        ---------------------------------
      </div>
      <div className="btn_checkout">
        <h6>Phương thức thanh toán</h6>
        <div className="row">
          <div>
            <button className="shipcod" onClick={chkShipCOD}>
              ShipCOD
            </button>
          </div>
          ---⫗---
          <div className="payment">
            <PaypalExpressBtn total={total} tranSuccess={tranSuccess} />
            {/* <PaypalButtonV2
              className="paypal-checkout"
              total={total}
              tranSuccess={tranSuccess1}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
