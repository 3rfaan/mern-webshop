import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { emptyCart } from "../redux/cartRedux";
import { userRequest } from "../requestMethods";

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            title: item.title,
            img: item.img,
            price: item.price,
            quantity: item.quantity,
            color: item.color,
            size: item.size,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  const handleClick = () => {
    dispatch(emptyCart());
    navigate("/orders");
  };

  return (
    <div
      style={{
        height: "100vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          padding: "20px",
          border: "0.5px solid lightgray",
          borderRadius: "15px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {orderId
          ? `Deine Bestellung wurde erfolgreich erfasst. Deine Bestellnummer ist: ${orderId}`
          : `Erfolgreich. Deine Bestellung wird vorbereitet.`}
        <button
          onClick={handleClick}
          style={{
            padding: 10,
            marginTop: 20,
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          Gehe zu deinen Bestellungen
        </button>
      </div>
    </div>
  );
};

export default Success;
