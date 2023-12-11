import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Footer.css"

export const Footer = () => {
  return (
    <Container className="footer">
      <Row>
        <Col>
          <p>SMITECOUNTER</p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, quo
            facere? Minima saepe voluptatum porro officia, hic soluta quis atque
            quod architecto laborum est itaque facere magni dicta rem facilis!
          </p>
        </Col>
        <Col>
          <p>Nuestros link</p>
          <ul>
            <li>
              <a> Dioses</a>
            </li>
            <li>
              <a> Counters</a>
            </li>
            <li>
              <a> Contacto</a>
            </li>
          </ul>
        </Col>
        <Col>
          <p>Redes sociales</p>
        </Col>
      </Row>
    </Container>
  );
};
