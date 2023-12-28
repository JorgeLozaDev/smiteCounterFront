import { useSelector } from "react-redux";
import { godDetails } from "../godSlice";
import { useEffect, useState } from "react";
import { godsDetails } from "../../services/apiCalls";
import { Col, Container, Row } from "react-bootstrap";

const GodDetails = () => {
  const idGod = useSelector(godDetails);
  const [god, setGod] = useState();

  useEffect(() => {
    godsDetails("gods/godDetails/", idGod.id)
      .then((data) => {
        setGod(data.data.godDetails);
        console.log(data.data.godDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {god ? (
        <Container>
          <Row>
            <Col>
              <img src={god.images.main} className="img-fluid" />
            </Col>
          </Row>
          <Row className="caja">
            <Col md={6}>
              <img src={god.images.card} />
            </Col>
            <Col md={6}>
              <div>
                <p>{god.name}</p>
              </div>
            </Col>
          </Row>
          <Row className="caja">
            <Col md={6}>
              <div>
                <p>{god.pantheon}</p>
                <p>{god.role}</p>
              </div>
              <p>{god.lore}</p>
            </Col>
            <Col md={6}>
              <img src={god.images.card} />
            </Col>
          </Row>
          <Row className="caja">
            <Col md={6}>
              <img src={god.images.card} />
            </Col>
            <Col md={6}>
              <p>{god.abilities[0].name}</p>
              <p>{god.abilities[0].description}</p>
              {god.abilities[0].details.length > 0 ? <div></div> : <p></p>}
            </Col>
          </Row>
          <Row className="caja">
            <Col md={6}>
              <p>{god.abilities[1].name}</p>
              <p>{god.abilities[1].description}</p>
              {god.abilities[1].details.length > 0 ? (
                <div>
                  {god.abilities[1].details.map((det, indice) => {
                    return (
                      <p key={indice}>
                        {det.label}: {det.value}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <p></p>
              )}
            </Col>
            <Col md={6}>
              <img src={god.images.card} />
            </Col>
          </Row>

          <Row className="caja">
            <Col md={6}>
              <img src={god.images.card} />
            </Col>
            <Col md={6}>
              <p>{god.abilities[2].name}</p>
              <p>{god.abilities[2].description}</p>
              {god.abilities[2].details.length > 0 ? (
                <div>
                  {god.abilities[2].details.map((det, indice) => {
                    return (
                      <p key={indice}>
                        {det.label}: {det.value}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <p></p>
              )}
            </Col>
          </Row>
          <Row className="caja">
            <Col md={6}>
              <p>{god.abilities[3].name}</p>
              <p>{god.abilities[3].description}</p>
              {god.abilities[3].details.length > 0 ? (
                <div>
                  {god.abilities[3].details.map((det, indice) => {
                    return (
                      <p key={indice}>
                        {det.label}: {det.value}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <p></p>
              )}
            </Col>
            <Col md={6}>
              <img src={god.images.card} />
            </Col>
          </Row>
          <Row className="caja">
            <Col md={6}>
              <img src={god.images.card} />
            </Col>
            <Col md={6}>
              <p>{god.abilities[4].name}</p>
              <p>{god.abilities[4].description}</p>
              {god.abilities[4].details.length > 0 ? (
                <div>
                  {god.abilities[4].details.map((det, indice) => {
                    return (
                      <p key={indice}>
                        {det.label}: {det.value}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <p></p>
              )}
            </Col>
          </Row>
        </Container>
      ) : (
        <div>
          <p>Sin datos</p>
        </div>
      )}
    </>
  );
};

export default GodDetails;
