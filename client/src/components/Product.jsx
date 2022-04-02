import { Link } from "react-router-dom";
import styled from "styled-components";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  margin: 5px;
  padding: 15px;
  flex: 1;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 15px;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Image = styled.img`
  height: 65%;
  z-index: 2;
`;

const InfoBox = styled.div`
  height: 25%;
  padding: 15px;
  color: white;
  background-color: black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const ItemTitle = styled.p`
  font-size: 17px;
  font-weight: bold;
`;

const ItemPrice = styled.p`
  font-weight: 200;
`;

const Product = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Link to={`/product/${item._id}`}>
        <Info>
          <InfoBox>
            <ItemTitle>{item.title}</ItemTitle>
            <ItemPrice>CHF {item.price}.00</ItemPrice>
          </InfoBox>
        </Info>
      </Link>
    </Container>
  );
};

export default Product;
