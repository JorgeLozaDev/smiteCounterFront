import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Toasty, ToastContainer } from "../../common/CustomToasty/CustomToasty";
import Input from "../../common/CustomInput/CustomInput";
import { loginUser } from "../../services/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../userSlice";

export const Login = () => {
  const [logindata, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector();

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

    loginUser("user/login", logindata)
      .then((data) => {
        Toasty({
          message: `Datos correctos ...logueando`,
          type: "success",
        });

        dispatch(login({ credentials: data.data.token }));

        setTimeout(() => {
          navigate("/");
        }, 2500);
      })
      .catch((error) => {
        // Manejar el error de Axios
        if (error.response) {
          // El servidor respondió con un código de estado diferente de 2xx
          Toasty({
            message: `Error: ${error.response.status} - ${error.response.data.message}`,
            type: "error",
          });
        } else if (error.request) {
          // La solicitud fue hecha, pero no se recibió una respuesta
          Toasty({
            message: "No se recibió respuesta del servidor",
            type: "error",
          });
        } else {
          // Algo sucedió al configurar la solicitud que desencadenó un error
          Toasty({
            message: "Error al configurar la solicitud",
            type: "error",
          });
        }
      });
  };

  useEffect(() => {
    if (token.credentials != "") {
      navigate("/profile");
    }
  }, []);

  const inputHandler = (value, name) => {
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const redirectSingIn = () => {
    navigate("/singin");
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
            <p>
              No tienes cuenta <a onClick={redirectSingIn}>create una!</a>{" "}
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};
