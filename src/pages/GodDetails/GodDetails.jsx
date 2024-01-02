import { useSelector } from "react-redux";
import { godDetails } from "../godSlice";
import { useEffect, useState } from "react";
import { godsDetails } from "../../services/apiCalls";
import { Col, Container, Row } from "react-bootstrap";
import "./GodDetails.css";

const GodDetails = () => {
  const idGod = useSelector(godDetails);
  const [god, setGod] = useState();

  useEffect(() => {
    godsDetails("gods/godDetails/", idGod.id)
      .then((data) => {
        setGod(data.data.godDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Función para obtener la ruta de la imagen de la habilidad
  const getAbilityImagePath = (abilityIndex, imageIndex) => {
    const godName = god.name.toLowerCase().replace(/\s/g, "");
    return `/gods/${godName}/${godName}${abilityIndex + 1}_${
      imageIndex + 1
    }.png`;
  };

  return (
    <>
      {god ? (
        <>
          <Container
            fluid
            className="banner bannerGod"
            style={{ backgroundImage: `url(${god.images.main})` }}
          ></Container>
          <Container className="py-5">
            <Row className="caja">
              <Col md={6}>
                <div>
                  <p>{god.pantheon}</p>
                  <p>{god.role}</p>
                </div>
                <p>{god.lore}</p>
              </Col>
              <Col md={6}>
                {/* Mostrar la imagen principal */}
                {god.images.card && (
                  <img src={god.images.card} alt={`God ${god.name} card`} />
                )}
              </Col>
            </Row>

            {god.abilities.map((ability, abilityIndex) => (
              <Row className="caja" key={abilityIndex}>
                <Col
                  md={6}
                  className={`d-flex align-items-center justify-content-center ${abilityIndex % 2 === 0 ? "order-md-last" : ""}`}
                >
                  {/* Mostrar la imagen de la habilidad */}
                  <img
                    src={`/gods/${god.name}/${god.name}${
                      abilityIndex + 1
                    }.png`.replace(/ /g, "_")}
                    alt={`God ${god.name} ability ${abilityIndex + 1} image 1`}
                    className="img-fluid "
                  />
                </Col>
                <Col
                  md={6}
                  className={abilityIndex % 2 === 0 ? "" : "order-md-last"}
                >
                  <p>{ability.name}</p>
                  <p>{ability.description}</p>
                  {ability.details.length > 0 ? (
                    <div>
                      {ability.details.map((det, indice) => (
                        <p key={indice}>
                          {det.label}: {det.value}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p></p>
                  )}
                </Col>
              </Row>
            ))}
          </Container>
        </>
      ) : (
        <div>
          <p>Sin datos</p>
        </div>
      )}
    </>
  );
};

export default GodDetails;
