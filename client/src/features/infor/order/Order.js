import React, { useContext } from "react";
import dateFormat from "dateformat";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";

export default function Order() {
  const state = useContext(GlobalState);
  const [orderInfo] = state.userApi.orderInfo;

  return (
    <div>
      <div className="userListTitle">
        <h4>You have {orderInfo.length} ordered</h4>
        {/* <Link to="/createUser">
          <button className="userAddButton">Create User</button>
        </Link> */}
      </div>
      <div className="usersList">
        <table className="userListUser">
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
            {orderInfo.map((order) => (
              <tr key={order._id}>
                <td>{order.orderID}</td>
                <td>{order.email}</td>
                <td>{order.name}</td>
                <td>
                  {/* <Link to="#!" onClick={() => showMoreOrder(order._id)}>
                    Show more
                  </Link> */}
                  <Link to={`/order/${order._id}`}>Show more</Link>
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
