import { Add, DeleteOutline, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { deleteProduct, updateProduct } from "../redux/cartRedux";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
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

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  border-radius: 15px;
  width: 150px;
  ${mobile({
    width: "75px",
  })}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({
    padding: "0 15px",
    fontSize: "15px",
  })}
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  margin-bottom: 20px;
`;

const Summary = styled.div`
  flex: 1;
  height: fit-content;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token, []);
  };

  const handleQuantity = (product, type) => {
    type === "dec"
      ? product.quantity > 1 &&
        dispatch(
          updateProduct({
            id: product._id,
            quantity: product.quantity - 1,
            total: cart.total - product.price,
          })
        )
      : dispatch(
          updateProduct({
            id: product._id,
            quantity: product.quantity + 1,
            total: cart.total + product.price,
          })
        );
  };

  const handleDelete = (product) => {
    dispatch(
      deleteProduct({
        id: product._id,
        total: product.price * product.quantity,
      })
    );
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });

        navigate("/success", {
          state: {
            stripeData: res.data,
            products: cart,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && cart.total >= 1 && makeRequest();
  }, [stripeToken, cart, navigate]);

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>Dein Warenkorb</Title>
        <Top>
          <Link to="/">
            <TopButton>Weitershoppen</TopButton>
          </Link>
          <StripeCheckout
            name="Freeshop"
            image="https://avatars.githubusercontent.com/u/1486366?v=4"
            billingAddress
            shippingAddress
            description={`Your total is $${cart.total}`}
            amount={cart.total * 100}
            token={onToken}
            stripeKey={KEY}
          >
            <TopButton type="filled">BEZAHLEN</TopButton>
          </StripeCheckout>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product, index) => (
              <Product key={index}>
                <ProductDetail>
                  <Link to={`/product/${product._id}`}>
                    <Image src={product.img} />
                  </Link>
                  <Details>
                    <ProductName>
                      <b>Produkt:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b>{" "}
                      <Link to={`/product/${product._id}`}>{product._id}</Link>
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Grösse:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Remove onClick={() => handleQuantity(product, "dec")} />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Add onClick={() => handleQuantity(product, "inc")} />
                  </ProductAmountContainer>
                  <ProductPrice>
                    CHF {product.price * product.quantity}
                  </ProductPrice>
                  <DeleteOutline
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDelete(product)}
                  />
                </PriceDetail>
              </Product>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>Bestellübersicht</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>CHF {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Lieferung</SummaryItemText>
              <SummaryItemPrice>CHF 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Lieferrabatt</SummaryItemText>
              <SummaryItemPrice>CHF -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>CHF {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Freeshop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
