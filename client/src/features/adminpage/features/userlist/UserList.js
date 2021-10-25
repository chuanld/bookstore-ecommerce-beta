import React, { useContext } from "react";
import "./userlist.css";
import { GlobalState } from "../../../../GlobalState";

import Loading from "../../../../utils/loading/Loading";
import { DeleteForever, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function UserList() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [inforAll] = state.userApi.inforAll;
  const [callback, setCallback] = state.userApi.callback;

  const deleteSubmit = async (id, email) => {
    // e.preventDefault();

    try {
      console.log(id, email);
      if (window.confirm(`Are you sure delete user ${email}?`)) {
        const result = await axios.delete(`/user/delete/${id}`, {
          headers: { Authorization: token },
        });
        setCallback(!callback);
        toast.success(result.data.msg);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  return (
    <>
      <div className="userlist">
        {inforAll.length === 0 && <Loading />}
        <div className="userListTitle">
          <h4>List user in Database</h4>
          <Link to="/createUser">
            <button className="userAddButton">Create User</button>
          </Link>
        </div>
        <div className="usersList">
          <table className="userListUser">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {inforAll.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link to={`/userdetail/${user._id}`}>
                      <Edit className="userListEdit" />
                    </Link>

                    <DeleteForever
                      className="userListDelete"
                      onClick={() => deleteSubmit(user._id, user.email)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
        />
      </div> */}
      </div>
    </>
  );
}
