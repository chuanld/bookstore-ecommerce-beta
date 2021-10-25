import React, { useState, useContext, useRef } from "react";
import { GlobalState } from "../../../../GlobalState";
import axios from "axios";
import "./categorieslist.css";

export default function CategoriesList() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [categories] = state.categoriesApi.categories;
  const [callback, setCallback] = state.categoriesApi.callback;
  const [category, setCategory] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");
  const focusInput = useRef(null);

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const result = await axios.put(
          `/api/category/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        alert(result.data.msg);
      } else {
        const result = await axios.post(
          "/api/category",
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        alert(result.data.msg);
      }
      setOnEdit(false);
      setCategory("");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  const editCategory = async (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
    focusInput.current.focus();
    console.log(focusInput);
  };

  const deleteCategory = async (id, name) => {
    try {
      if (
        window.confirm(`Are you sure about action delete category: ${name}`)
      ) {
        const result = await axios.delete(`/api/category/${id}`, {
          headers: { Authorization: token },
        });
        alert(result.data.msg);
        setOnEdit(false);
        setCategory("");
        setCallback(!callback);
      }
      setOnEdit(false);
      setCategory("");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="categories">
      <div className="categories-create">
        <form onSubmit={createCategory}>
          <label htmlFor="category">Category Management</label>
          <input
            type="text"
            name="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
            ref={focusInput}
          />

          <button type="submit">{onEdit ? "Update" : "Save"}</button>
        </form>
      </div>

      <div className="categories-info">
        <div className="col">
          {categories.map((category) => (
            <div className="row" key={category._id}>
              <p>{category.name}</p>
              <div>
                <button
                  onClick={() => editCategory(category._id, category.name)}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCategory(category._id, category.name)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
