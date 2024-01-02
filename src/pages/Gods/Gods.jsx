import { useEffect, useState } from "react";
import { allGodsActives, filterGodsActives } from "../../services/apiCalls";
import { Col, Container, Row } from "react-bootstrap";
import Input from "../../common/CustomInput/CustomInput";
import CustomSelect from "../../common/CustomSelect/CustomSelect";
import "./Gods.css";
import { useDispatch } from "react-redux";
import { godDetails, saveId } from "../godSlice";
import { useNavigate } from "react-router-dom";

const Gods = () => {
  const [gods, setGods] = useState([]);
  const dispatch = useDispatch(godDetails);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const navigate = useNavigate();
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
  }, [filter]);

  const inputHandler = (value, name) => {
    setFilter((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDetailGod = (godId) => {
    dispatch(saveId({ id: godId }));
    navigate("/god/details");
  };

  return (
    <>
      <Container fluid className="banner bannerGods"></Container>

      <Container className="py-5">
        <Row className="cajaBuscador">
          <Col>
            <Row className="align-items-center justify-content-center">
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
                  className="selectGods"
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
                  className="selectGods"
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
            <div className="gridGods">
              {gods.map((god) => (
                <a key={god._id} onClick={() => handleDetailGod(god._id)}>
                  <div>
                    <img src={god.images.card} />
                    <p>{god.name}</p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div>
              <p>Sin datos</p>
            </div>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Gods;
