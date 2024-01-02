import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Input from "../../common/CustomInput/CustomInput";
import { loginUser, singInUser } from "../../services/apiCalls";
import { Toasty, ToastContainer } from "../../common/CustomToasty/CustomToasty";
import { useNavigate } from "react-router-dom";
import { login, userDetails } from "../userSlice";
import { useDispatch, useSelector } from "react-redux";
import "./SingIn.css"

export const SingIn = () => {
  const [signindata, setSinginData] = useState({
    email: "",
    password: "",
    username: "",
    birthday: "",
  });
  const navigate = useNavigate();
  const token = useSelector(userDetails);
  const dispatch = useDispatch();

  const inputHandler = (value, name) => {
    setSinginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlerSend = (event) => {
    event.preventDefault();

    const requiredFields = ["email", "password", "username", "birthday"];
    const emptyField = requiredFields.find((field) => !signindata[field]);

    if (emptyField) {
      Toasty({
        message: `Por favor, completa el campo ${emptyField}`,
        type: "error",
      });
      return;
    }

    singInUser("user/addUser", signindata)
      .then((data) => {
        loginUser("user/login", signindata)
          .then((dat) => {
            Toasty({
              message: `${data.data.message} ...logueando`,
              type: "success",
            });

            dispatch(login({ credentials: dat.data.token }));
            setTimeout(() => {
              navigate("/profile");
            }, 3500);
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

  return (
    <>
      <ToastContainer />
      <Container className="py-5">
        <Row>
          <Col>
            <h2 className="text-center titleLogin">Crea tú cuenta</h2>
          </Col>
        </Row>
        <Row>
          <Col>
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
              <Input
                placeholder={"Nombre de usuario"}
                type={"text"}
                name={"username"}
                handler={inputHandler}
              />
              <Input
                placeholder={"Fecha naciemiento"}
                type={"date"}
                name={"birthday"}
                handler={inputHandler}
              />

              <p className="text-center">
                <Button type="submit" variant="secondary">
                  Enviar
                </Button>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
