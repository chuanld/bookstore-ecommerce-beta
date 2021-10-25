import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { GlobalState } from "../../../GlobalState";

export default function OrderDetail() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [orderInfo] = state.userApi.orderInfo;
  const [orderInfoDetail, setOrderInfoDetail] = useState([]);

  useEffect(() => {
    if (params.id) {
      orderInfo.forEach((item) => {
        if (item._id === params.id) setOrderInfoDetail(item);
      });
    }
  }, [params.id, orderInfo]);
  console.log(orderInfoDetail);

  if (orderInfoDetail.length === 0) return null;
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
              <th>ProductID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Kim Đồng</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {orderInfoDetail.cart.map((item) => (
              <tr key={item._id}>
                <td>{item.product_id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.publisher}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <img src={item.images.url} alt="" height="140px" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
