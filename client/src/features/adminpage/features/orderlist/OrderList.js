import React, { useContext } from "react";
import { GlobalState } from "../../../../GlobalState";
import "./orderlist.css";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
export default function OrderList() {
  const state = useContext(GlobalState);
  const [orderList] = state.userApi.orderList;

  return (
    <div className="orderlist">
      <div className="orderListTitle">
        <h4>System have {orderList.length} ordered</h4>
      </div>
      <div className="ordersList">
        <table className="orderListOrder">
          <thead>
            <tr>
              <th>OrderID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Product</th>
              <th>Address</th>
              <th>Option</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order._id}>
                <td>{order.orderID}</td>
                <td>{order.email}</td>
                <td>{order.name}</td>
                <td>
                  {/* <Link to="#!" onClick={() => showMoreOrder(order._id)}>
                    Show more
                  </Link> */}
                  <Link to={`/orderlistdetail/${order._id}`}>Show more</Link>
                </td>
                <td>{Object.values(order.address)}</td>
                <td>{order.option.type}</td>
                <td>{dateFormat(order.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
