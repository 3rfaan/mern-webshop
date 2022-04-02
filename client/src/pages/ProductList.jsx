import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 35px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 10px 35px;
  padding: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  ${mobile({
    width: "0 20px",
    display: "flex",
    flexDirection: "column",
  })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({
    marginRight: 0,
  })}
`;

const Select = styled.select`
  -webkit-appearance: none;
  border: none;
  background-color: lightgray;
  outline: none;
  padding: 10px;
  margin-right: 20px;
  ${mobile({
    margin: "10px 0",
  })}
`;

const Option = styled.option`
  -webkit-appearance: none;
`;

const ProductList = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{category}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Produkte filtern:</FilterText>
          <Select name="color" defaultValue="default" onChange={handleFilters}>
            <Option value="default" disabled>
              Farbe
            </Option>
            <Option value="white">white</Option>
            <Option value="black">black</Option>
            <Option value="red">red</Option>
            <Option value="blue">blue</Option>
            <Option value="yellow">yellow</Option>
            <Option value="green">green</Option>
          </Select>
          <Select name="size" defaultValue="default" onChange={handleFilters}>
            <Option value="default" disabled>
              Grösse
            </Option>
            <Option value="xs">XS</Option>
            <Option value="s">S</Option>
            <Option value="m">M</Option>
            <Option value="l">L</Option>
            <Option value="xl">XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Produkte sortieren:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Neuste</Option>
            <Option value="asc">Preis aufsteigend</Option>
            <Option value="desc">Preis absteigend</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={category} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
