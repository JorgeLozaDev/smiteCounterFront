import { useEffect, useState } from "react";
import { allGodsActives, filterGodsActives } from "../../services/apiCalls";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Input from "../../common/CustomInput/CustomInput";
import CustomSelect from "../../common/CustomSelect/CustomSelect";

const Gods = () => {
  const [gods, setGods] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    pantheon: "",
    role: "",
    godName: "",
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    allGodsActives("gods/allGodsActive")
      .then((data) => {
        setGods(data.data.allGodsActive);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    filterGodsActives("gods/filterGodsActive", filter)
      .then((data) => {
        setGods(data.data.allGodsActive);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(filter);
  }, [filter]);

  const inputHandler = (value, name) => {
    setFilter((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Row>
        <Col>
          <Row className="align-items-center">
            <Col xs={12} md={3}>
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
                value={filter.role || ""}
                className="tu-clase-estilo"
              />
            </Col>
            <Col xs={12} md={3}>
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
                value={filter.pantheon || ""}
                className="tu-clase-estilo"
              />
            </Col>
            <Col xs={12} md={3}>
              <Input
                placeholder={"Nombre del dios"}
                type={"text"}
                name={"godName"}
                value={filter.godName}
                handler={inputHandler}
                debounce={true}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        {gods.length > 0 ? (
          <div>
            {gods.map((god) => (
              <div key={god._id}>
                <p>{god.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>Sin datos</p>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Gods;
