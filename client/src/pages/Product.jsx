import { Add, AddShoppingCart, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({
    padding: "10px",
    flexDirection: "column",
  })}
`;

const ImgContainer = styled.div`
  flex: 1;
  ${mobile({ display: "flex", justifyContent: "center" })}
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  ${mobile({
    width: "65%",
  })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 35vw;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

// const FilterSize = styled.select`
//   margin-left: 10px;
//   padding: 5px;
// `;

// const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 35vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 300;
  font-size: 40px;
`;

const Amount = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`);

        setProduct(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    type === "dec"
      ? quantity > 1 && setQuantity(quantity - 1)
      : setQuantity(quantity + 1);
  };

  const handleClick = () => {
    // Update cart
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>CHF {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            {/* <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize
                defaultValue="default"
                onChange={(e) => setSize(e.target.value)}
              >
                <FilterSizeOption value="default">Grösse</FilterSizeOption>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s} value={s}>
                    {s}
                  </FilterSizeOption>
                ))}
              </FilterSize>
            </Filter> */}
            <Box
              sx={{
                minWidth: "150px",
                fill: "red",
                ".MuiSelect-filled": { label: { color: "red" } },
              }}
            >
              <FormControl size="small" variant="standard" fullWidth>
                <InputLabel id="size">Grösse</InputLabel>
                <Select
                  defaultValue=""
                  labelId="size"
                  id="size"
                  value={size}
                  label="Grösse"
                  onChange={(e) => setSize(e.target.value)}
                  autoWidth
                >
                  <MenuItem defaultValue="" disabled>
                    <em>Grösse</em>
                  </MenuItem>
                  {product.size?.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove fontSize="medium" onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add fontSize="medium" onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            {/* <Button onClick={handleClick}>ADD TO CART</Button> */}
            <Button
              variant="contained"
              style={{ backgroundColor: "teal", color: "white" }}
              startIcon={<AddShoppingCart />}
              onClick={handleClick}
            >
              In den Warenkorb
            </Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
