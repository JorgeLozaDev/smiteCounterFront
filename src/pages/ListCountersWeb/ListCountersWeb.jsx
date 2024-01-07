import { Col, Container, Row } from "react-bootstrap";
import { Toasty, ToastContainer } from "../../common/CustomToasty/CustomToasty";
import { useEffect, useState } from "react";
import { allPrincipalListCounters } from "../../services/apiCalls";
import "./ListCountersWeb.css";
import Input from "../../common/CustomInput/CustomInput";
import CustomSelect from "../../common/CustomSelect/CustomSelect";

const ListCountersWeb = () => {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({
    listName: "",
    pantheon: "",
    role: "", // Agregamos el filtro por rol
  });

  const [debouncedFilter, setDebouncedFilter] = useState({
    listName: "",
    pantheon: "",
    role: "",
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [filter]);

  useEffect(() => {
    allPrincipalListCounters("user/counters")
      .then((result) => {
        setList(result.data || []); // Manejar si la lista es nula
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
  }, [debouncedFilter]);

  const inputHandler = (value, name) => {
    setFilter((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para realizar el filtrado
  const filterList = (item) => {
    const { listName, pantheon, role } = debouncedFilter;
    return (
      item.godDetails.name.toLowerCase().includes(listName.toLowerCase()) &&
      (pantheon === "" ||
        item.godDetails.pantheon.toLowerCase() === pantheon.toLowerCase()) &&
      (role === "" || item.godDetails.role.toLowerCase() === role.toLowerCase())
    );
  };

  return (
    <>
      <ToastContainer />
      <Container
        fluid
        className="banner bannerGod"
        style={{ backgroundImage: `url(general/bannerVs.png)` }}
      ></Container>

      <Container className="cajaCounters">
        <Row className="cajaFiltros">
          <Col>
            <Input
              placeholder={"Nombre de la lista"}
              type={"text"}
              name={"listName"}
              handler={inputHandler}
              value={filter.listName}
            />
          </Col>
          <Col>
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
              value={filter.role}
            />
          </Col>
          <Col>
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
              value={filter.pantheon}
            />
          </Col>
        </Row>
      </Container>

      <Container className="cajaCounters">
        {list.filter(filterList).length > 0 ? (
          list.filter(filterList).map((item) => (
            <Row key={item._id} className="my-5">
              <Col md={3} className="text-center">
                {item.godDetails && (
                  <img
                    src={item.godDetails.images.card}
                    alt={item.godDetails.name}
                    className="imgPrincipal"
                  />
                )}
              </Col>
              <Col
                md={2}
                className="text-center d-flex align-items-center justify-content-center"
              >
                <img
                  src="home/logo-white1.png"
                  className="imgVS"
                  alt="VS"
                ></img>
              </Col>
              <Col md={7}>
                <div className="gods-container-counters">
                  {item.counterpicks.map((counterpick) => (
                    <div key={counterpick._id}>
                      {counterpick.godDetails && (
                        <img
                          src={counterpick.godDetails.images.card}
                          alt={counterpick.godDetails.name}
                          className="gods-container-counters-image"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          ))
        ) : (
          <p>No hay resultados que coincidan con los filtros seleccionados.</p>
        )}
      </Container>
    </>
  );
};

export default ListCountersWeb;
