import "./createuser.css";
import React, { useState, useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../../../GlobalState";
import { AddCircle } from "@material-ui/icons";
export default function CreateUser() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [user, setUser] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    password: "",
    role: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const createSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "/user/create_infor",
        { ...user },
        { headers: { Authorization: token } }
      );

      //localStorage.setItem("firstLogin", true);

      // window.location.href = "/";
      alert(result.data.msg);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="createUser">
      <h1 className="createUserTitle">
        <AddCircle className="createUserIcon" />
        Create User
      </h1>
      <form className="createUserForm" onSubmit={createSubmit}>
        <div className="createUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={onChangeInput}
            required
          />
        </div>
        <div className="createUserItem">
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={onChangeInput}
            required
          />
        </div>
        <div className="createUserItem">
          <label>Phone</label>
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={user.phone}
            onChange={onChangeInput}
          />
        </div>
        <div className="createUserItem">
          <label>Address</label>
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={user.address}
            onChange={onChangeInput}
          />
        </div>
        <div className="createUserItem">
          <label>Role</label>
          <input
            type="text"
            placeholder="Role"
            name="role"
            value={user.role}
            onChange={onChangeInput}
            required
          />
        </div>
        <div className="createUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={onChangeInput}
            required
          />
        </div>
        <button className="createUserButton" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
