import React from "react";
import pic1 from "./images/product_01.jpg";
import pic2 from "./images/product_02.jpg";
import { Link } from "react-router-dom";

function Intro() {
  return (
    <div className="latest-products">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <h2>Latest Products</h2>
              <a href="products.html">
                view all products <i className="fa fa-angle-right"></i>
              </a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="product-item">
              <Link to="#">
                <img src={pic1} alt="" />
              </Link>
              <div className="down-content">
                <Link to="#">
                  <h4>Nhật kí màu trời</h4>
                </Link>
                <h6>$25.75</h6>
                <p>Tác phẩm của Luu Dinh Chuan</p>
                <ul className="stars">
                  <li>
                    <i className="fa fa-star"></i>
                  </li>
                  <li>
                    <i className="fa fa-star"></i>
                  </li>
                  <li>
                    <i className="fa fa-star"></i>
                  </li>
                  <li>
                    <i className="fa fa-star"></i>
                  </li>
                  <li>
                    <i className="fa fa-star-half"></i>
                  </li>
                </ul>
                <span>Reviews (24)</span>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="product-item">
              <Link to="#">
                <img src={pic2} alt="" />
              </Link>
              <div className="down-content">
                <Link to="#">
                  <h4>Tittle goes here</h4>
                </Link>
                <h6>$30.25</h6>
                <p>
                  Lorem ipsume dolor sit amet, adipisicing elite. Itaque,
                  corporis nulla aspernatur.
                </p>
                <ul className="stars">
                  <li>
                    <i className="fa fa-star"></i>
                  </li>
                  <li>
                    <i className="fa fa-star"></i>
                  </li>
                  <li>
                    <i className="fa fa-star"></i>
                  </li>
                  <li>
                    <i className="fa fa-star"></i>
                  </li>
                  <li>
                    <i className="fa fa-star"></i>
                  </li>
                </ul>
                <span>Reviews (21)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
