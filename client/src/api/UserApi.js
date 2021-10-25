import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserApi(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [infor, setInfor] = useState([]);
  const [inforAll, setInforAll] = useState([]);
  const [givenName, setGivenName] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderInfo, setOrderInfo] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [callback, setCallback] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/infor", {
            headers: { Authorization: token },
          });
          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          setInfor(res.data);
          setGivenName(res.data.name.split(" ").pop());
          setCart(res.data.cart);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      if (isAdmin) {
        const getAllUsers = async () => {
          try {
            const res = await axios.get("/user/all_infor", {
              headers: { Authorization: token },
            });
            setInforAll(res.data);
          } catch (err) {
            toast.error(err.response.data.msg);
          }
        };
        getAllUsers();
      }
    }
  }, [token, isAdmin, callback]);

  const addCart = async (product) => {
    if (!isLogged) return toast.warn("Login join with us and shopping");

    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
      const result = await axios.patch(
        "/user/addtocart",
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
      toast.success(result.data.msg);
    } else {
      toast.warn("This product has beed added to cart");
    }
  };

  useEffect(() => {
    if (token) {
      const getOrderInfo = async () => {
        const result = await axios.get("/user/order_infor", {
          headers: { Authorization: token },
        });
        setOrderInfo(result.data);
      };
      getOrderInfo();
    }
  }, [token, callback]);

  useEffect(() => {
    if (token) {
      if (isAdmin) {
        const getOrderList = async () => {
          const result = await axios.get("/api/order", {
            headers: { Authorization: token },
          });
          setOrderList(result.data);
        };
        getOrderList();
      }
    }
  }, [token, callback, isAdmin]);
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    infor: [infor, setInfor],
    inforAll: [inforAll, setInforAll],
    givenName: [givenName, setGivenName],
    cart: [cart, setCart],
    addCart: addCart,
    orderInfo: [orderInfo, setOrderInfo],
    orderList: [orderList, setOrderList],
    callback: [callback, setCallback],
  };
}

export default UserApi;
