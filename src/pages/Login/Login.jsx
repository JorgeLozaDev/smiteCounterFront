import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Toasty, ToastContainer } from "../../common/CustomToasty/CustomToasty";
import Input from "../../common/CustomInput/CustomInput";

export const Login = () => {
  const [logindata, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handlerSend = (event) => {
    event.preventDefault();
    const requiredFields = ["email", "password"];
    const emptyField = requiredFields.find((field) => !logindata[field]);

    if (emptyField) {
      Toasty({
        message: `Por favor, completa el campo ${emptyField}`,
        type: "error",
      });
      return;
    }

    
  };

  const inputHandler = (value, name) => {
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <ToastContainer />
      <Container>
        <Row>
          <Col>
            <h2>Login</h2>
            <Form onSubmit={handlerSend} method="post">
              <Input
                placeholder={"Email"}
                type={"email"}
                name={"email"}
                handler={inputHandler}
              />
              <Input
                placeholder={"password"}
                type={"password"}
                name={"password"}
                handler={inputHandler}
              />
              <Button type="submit" variant="secondary">
                Enviar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
