import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { userRequest } from "../requestMethods";
import { mobile } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({
    padding: "10px",
    flexDirection: "column",
  })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Info = styled.div`
  padding: 20px;
`;

const InfoBox = styled.div`
  position: relative;
  width: 100%;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
`;

const Order = styled.div``;

const OrderTitle = styled.h2``;

const OrderDetail = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  ${mobile({
    flexDirection: "column",
    alignItems: "flex-start",
    height: "120px",
  })}
`;

const OrderId = styled.span``;

const OrderDate = styled.span``;

const OrderStatus = styled.span``;

const OrderTotal = styled.span`
  padding: 3px 8px;
  border-radius: 5px;
  color: white;
  background-color: teal;
`;

const Product = styled.div`
  display: flex;
  margin-bottom: 35px;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  border-radius: 10px;
  width: 180px;
  ${mobile({
    width: "75px",
  })}
`;

const Details = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({
    padding: "0 15px",
    fontSize: "15px",
  })}
`;

const ProductName = styled.span``;

const ProductQuantity = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const ProductPrice = styled.div`
  font-size: 22px;
  font-weight: 200;
  ${mobile({
    fontSize: "16px",
  })}
`;

const Button = styled.button`
  width: fit-content;
  margin: 0 auto;
  padding: 12px;
  display: block;
  font-weight: 500;
  font-size: 17px;
  border: none;
  border-radius: 10px;

  cursor: pointer;
  ${mobile({
    width: "100%",
    color: "white",
    backgroundColor: "teal",
  })}
`;

const Orders = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get(`/orders/find/${user._id}`);
        setOrders(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getOrders();
  }, [user]);

  const toggleOpen = (id) => {
    if (open.includes(id)) {
      setOpen(open.filter((orderId) => orderId !== id));
    } else {
      let newOpen = [...open];
      newOpen.push(id);
      setOpen(newOpen);
    }
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>Deine Bestellungen</Title>
        <Top>
          <Link to="/">
            <TopButton>Weitershoppen</TopButton>
          </Link>
          <Link to="/dashboard">
            <TopButton type="filled">Nutzerinfos aktualisieren</TopButton>
          </Link>
        </Top>
        <Info>
          {orders.map((order) => (
            <InfoBox key={order._id}>
              <Order>
                <OrderTitle>
                  Deine Bestellung vom{" "}
                  {new Date(order.createdAt).toLocaleDateString("de-DE", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </OrderTitle>
                <OrderDetail>
                  <OrderId>
                    <b>ID:</b> {order._id}
                  </OrderId>
                  <OrderDate>
                    <b>Datum:</b>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </OrderDate>
                  <OrderStatus>
                    <b>Status:</b> {order.status}...
                  </OrderStatus>
                  <OrderTotal>
                    <b>Total:</b> CHF {order.amount}.00
                  </OrderTotal>
                </OrderDetail>
              </Order>
              {order.products.map((product) =>
                open.includes(order._id) ? (
                  <Product key={product.productId}>
                    <ProductDetail>
                      <Link to={`/product/${product.productId}`}>
                        <Image src={product.img} />
                      </Link>
                      <Details>
                        <ProductName>
                          <b>Produkt:</b> {product.title}
                        </ProductName>
                        <ProductQuantity>
                          <b>Anzahl:</b> {product.quantity} à CHF{" "}
                          {product.price}
                          .00
                        </ProductQuantity>
                        <ProductId>
                          <b>ID:</b>{" "}
                          <Link to={`/product/${product.productId}`}>
                            {product.productId}
                          </Link>
                        </ProductId>
                        <ProductColor color={product.color} />
                        <ProductSize>
                          <b>Grösse:</b> {product.size}
                        </ProductSize>
                        <ProductPrice>
                          CHF {product.quantity * product.price}.00
                        </ProductPrice>
                      </Details>
                    </ProductDetail>
                  </Product>
                ) : null
              )}
              <Button onClick={() => toggleOpen(order._id)}>
                {open.includes(order._id)
                  ? "Details der Bestellung ausblenden"
                  : "Details der Bestellung anzeigen"}
              </Button>
            </InfoBox>
          ))}
        </Info>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Orders;
