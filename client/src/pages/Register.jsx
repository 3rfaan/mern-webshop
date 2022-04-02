import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { register } from "../redux/apiCalls";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({
    width: "75%",
  })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;

const Button = styled.button`
  width: fit-content;
  border: none;
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
`;

const Register = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleRegister = (e) => {
    e.preventDefault();
    register(dispatch, navigate, { user });
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
      <Wrapper>
        <Title>Registriere Dich bei Freeshop!</Title>
        <Form>
          <Input
            name="firstname"
            placeholder="Vorname"
            type="text"
            value={user.firstname}
            onChange={handleInput}
            required
          />
          <Input
            name="lastname"
            placeholder="Nachname"
            type="text"
            value={user.lastname}
            onChange={handleInput}
            required
          />
          <Input
            name="username"
            placeholder="Benutzername"
            type="text"
            value={user.username}
            onChange={handleInput}
            required
          />
          <Input
            name="email"
            placeholder="E-Mail"
            type="email"
            value={user.email}
            onChange={handleInput}
            required
          />
          <Input
            name="password"
            placeholder="Passwort"
            type="password"
            value={user.password}
            onChange={handleInput}
            required
          />
          <Input
            name="confirmPassword"
            placeholder="Passwort bestätigen"
            type="password"
            value={user.confirmPassword}
            onChange={handleInput}
            required
          />
          {user.password !== user.confirmPassword && (
            <Error>Passwörter stimmen nicht überein</Error>
          )}
          <Agreement>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
            veritatis at facilis ex. Dolor tempora perferendis eveniet?
            Aspernatur tempore, architecto libero repellat ullam vel autem.
          </Agreement>
          <Button
            onClick={handleRegister}
            disabled={isFetching || user.password !== user.confirmPassword}
          >
            REGISTRIEREN
          </Button>
          {error && <Error>Etwas ist schief gelaufen...</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
