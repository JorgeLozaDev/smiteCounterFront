import { Col, Container, Row } from "react-bootstrap";
import { Toasty, ToastContainer } from "../../common/CustomToasty/CustomToasty";
import { useEffect, useState } from "react";
import { allPrincipalListCounters } from "../../services/apiCalls";
import "./ListCountersWeb.css";

const ListCountersWeb = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    allPrincipalListCounters("user/counters")
      .then((result) => {
        console.log(result.data);
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
  }, []);

  return (
    <>
      <ToastContainer />
      <Container
        fluid
        className="banner bannerGod"
        style={{ backgroundImage: `url(general/bannerVs.png)` }}
      ></Container>
      <Container className="cajaCounters">
        {list.map((item) => (
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
            <Col md={2} className="text-center align-items-center">
              <img src="home/logo-white1.png" className="imgVS"></img>
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
        ))}
      </Container>
    </>
  );
};

export default ListCountersWeb;
