import { Badge } from "@material-ui/core";
import {
  AccountCircle,
  Search,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userRedux";
import { emptyCart } from "../redux/cartRedux";

const NavLink = styled(Link)`
  text-decoration: none;
`;

const Container = styled.div`
  height: fit-content;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({
    flexDirection: "column-reverse",
    justifyContent: "center",
    margin: "10px 0",
    padding: "10px 0",
  })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({
    display: "none",
  })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  border-radius: 25px;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding-left: 5px;
  ${mobile({
    width: "250px",
  })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  color: black;
  ${mobile({
    margin: "7px 0",
    fontSize: "35px",
  })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({
    flex: 3,
    justifyContent: "center",
  })}
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  color: black;
  font-size: 15px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({
    fontSize: "12px",
    marginLeft: "10px",
  })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(emptyCart());
    navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>CH</Language>
          <SearchContainer>
            <Input placeholder="Suchen" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <NavLink to="/">
            <Logo>iChaufe</Logo>
          </NavLink>
        </Center>
        <Right>
          {!user ? (
            <>
              <NavLink to="/register">
                <MenuItem>Registrieren</MenuItem>
              </NavLink>
              <NavLink to="/login">
                <MenuItem>Einloggen</MenuItem>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/orders">
                <MenuItem>
                  <AccountCircle
                    style={{
                      color: "teal",
                      marginRight: "5px",
                    }}
                  />
                  {user.username}
                </MenuItem>
              </NavLink>
              <MenuItem onClick={handleLogout}>Ausloggen</MenuItem>
            </>
          )}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
