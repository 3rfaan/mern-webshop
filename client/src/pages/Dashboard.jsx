import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { update } from "../redux/apiCalls";
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

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  ${mobile({
    flexDirection: "column",
  })}
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  &:disabled {
    background-color: #349c9c;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
  margin: 5px;
  font-size: 14px;
  display: block;
`;

const Dashboard = () => {
  const { error, isFetching, currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState(currentUser);
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    update(dispatch, currentUser._id, currentUser.accessToken, user);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>Nutzerinfos aktualisieren</Title>
        <Top>
          <Link to="/">
            <TopButton>Weitershoppen</TopButton>
          </Link>
          <Link to="/orders">
            <TopButton type="filled">Zurück zu den Bestellungen</TopButton>
          </Link>
        </Top>
        <Info>
          <InfoBox>
            <Form>
              <Input
                name="firstname"
                placeholder="Vorname"
                type="text"
                value={user.firstname}
                onChange={handleInput}
              />
              <Input
                name="lastname"
                placeholder="Nachname"
                type="text"
                value={user.lastname}
                onChange={handleInput}
              />
              <Input
                name="username"
                placeholder="Benutzername"
                type="text"
                value={user.username}
                onChange={handleInput}
              />
              <Input
                name="email"
                placeholder="E-Mail"
                type="email"
                value={user.email}
                onChange={handleInput}
              />
              <Input
                name="password"
                placeholder="Neues Passwort"
                type="password"
                onChange={handleInput}
              />
              <Input
                name="confirmPassword"
                placeholder="Passwort bestätigen"
                type="password"
                onChange={handleInput}
              />
              {user.password !== user.confirmPassword && (
                <Error>Passwörter stimmen nicht überein</Error>
              )}
            </Form>
            <Button
              onClick={handleRegister}
              disabled={isFetching || user.password !== user.confirmPassword}
            >
              INFOS AKTUALISIEREN
            </Button>
            {error && <Error>Etwas ist schief gelaufen...</Error>}
          </InfoBox>
        </Info>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Dashboard;
