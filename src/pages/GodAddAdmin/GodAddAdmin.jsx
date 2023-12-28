import { useSelector } from "react-redux";
import { userDetails } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Col, Container, Form, Row } from "react-bootstrap";
import Input from "../../common/CustomInput/CustomInput";
import CustomSelect from "../../common/CustomSelect/CustomSelect";

const GodAddAdmin = () => {
  const token = useSelector(userDetails);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    pantheon: "",
    role: "",
    lore: "",
    abilities: [
      { name: "", description: "", details: [{ label: "", value: "" }] },
    ],
    images: { main: "", card: "", skins: [{ name: "", image: "" }] },
    isActive: true,
    isNewGod: false,
    isFreeToPlay: false,
  });

  useEffect(() => {
    if (token.credentials === "") {
      navigate("/");
    }
    const decode = jwtDecode(token.credentials);
    if (decode.role != "admin") {
      navigate("/");
    }
  }, []);

  const handlerSend = () => {};

  const inputHandler = (value, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handlerSend} method="post">
              <Input
                placeholder={"Nombre del personaje"}
                type={"text"}
                name={"name"}
                handler={inputHandler}
              />
              <CustomSelect
                options={[
                  "Guardián",
                  "Guerrero",
                  "Cazador",
                  "Mago",
                  "Asesino",
                ].map((role) => ({
                  value: role,
                  label: role,
                }))}
                placeholder="Seleccione un rol"
                name="role"
                handler={inputHandler}
                className="tu-clase-estilo"
              />
              <CustomSelect
                options={[
                  "Arturiano",
                  "Babilónico",
                  "Chino",
                  "Celta",
                  "Egipcio",
                  "Griego",
                  "Grandes Antiguos",
                  "Hindú",
                  "Japonés",
                  "Maya",
                  "Nórdico",
                  "Polinesio",
                  "Romano",
                  "Eslavo",
                  "Vudú",
                  "Yoruba",
                ].map((pantheon) => ({
                  value: pantheon,
                  label: pantheon,
                }))}
                placeholder="Seleccione un panteón"
                name="pantheon"
                handler={inputHandler}
                className="tu-clase-estilo"
              />
              <Form.Control as="textarea" rows={3} />
              <Form.Check 
                type={"checkbox"}
                id={`default1}`}
                label={`activo`}
              />
              <Form.Check 
                type={"checkbox"}
                id={`default2}`}
                label={`Free to play`}
              />
              <Form.Check 
                type={"checkbox"}
                id={`default3}`}
                label={`Nuevo personaje`}
              />
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GodAddAdmin;
