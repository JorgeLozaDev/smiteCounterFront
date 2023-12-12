import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Input from "../../common/CustomInput/CustomInput";
import { singInUser } from "../../services/apiCalls";
import { ToastContainer, Toasty } from "../../common/CustomToasty/CustomToasty";

export const SingIn = () => {
  const [signindata, setSinginData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    username: "",
    birthday: "",
  });
  const inputHandler = (value, name) => {
    setSinginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlerSend = (event) => {
    // insertUser("user/singup", logindata)
    //   .then((date) => {
    //     loginUser("user/login", logindata)
    //       .then((dat) => {
    //         dispatch(login({ credentials: dat.data.token }));
    //         navigate("/profile");
    //       })
    //       .catch((e) => {
    //         console.log(e);
    //         handleServerError(e);
    //       });
    //   })
    //   .catch((e) => {
    //     console.log(e.response.data);
    //     handleServerError(e);
    //   });
    singInUser("user/addUser", signindata)
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        Toasty({ message: e, type: "error" });
      });

    event.preventDefault();
  };
  return (
    <>
      <ToastContainer />
      <Container>
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
