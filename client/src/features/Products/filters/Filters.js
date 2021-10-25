import React from "react";

function Filters() {
  return (
    <div className="filters">
      <ul>
        <li className="active" data-filter="*">
          All Products
        </li>
        <li data-filter=".des">Featured</li>
        <li data-filter=".dev">Flash Deals</li>
        <li data-filter=".gra">Last Minute</li>
      </ul>
    </div>
  );
}

export default Filters;
