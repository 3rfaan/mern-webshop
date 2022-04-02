import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 45vh;
  margin: 35px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  ${mobile({
    fontSize: "50px",
  })}
`;

const Desc = styled.div`
  font-size: 17px;
  font-weight: 300;
  margin-bottom: 20px;
  padding: 0 10px;
  ${mobile({
    fontSize: "15px",
    textAlign: "center",
  })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({
    width: "80%",
  })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>
        Trage unten deine Mail ein, um Benachrichtigungen über unsere neusten
        Produkte und Aktionen zu erhalten
      </Desc>
      <InputContainer>
        <Input placeholder="Deine E-Mail Adresse" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
