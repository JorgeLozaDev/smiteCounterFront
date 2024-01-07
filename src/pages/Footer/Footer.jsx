import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Footer.css";

export const Footer = () => {
  return (
    <Container className="footer py-5">
      <Row>
        <Col>
          <p>
            <img
              src="home/smite-logo.png"
              className="img-fluid logoFooter"
            ></img>
          </p>
          <p>
            En esta web encontraras toda la informacion que necesitas de todos
            los dioses y todos los posibles counters de estos para que puedas
            crear tu estrategia correctamente.
          </p>
        </Col>
        <Col>
          <p>Nuestros link</p>
          <ul>
            <li>
              <a href="/gods"> Dioses</a>
            </li>
            <li>
              <a href="/counters"> Counters</a>
            </li>
            <li>
              <a href="/login"> Login</a>
            </li>
          </ul>
        </Col>
        {/* <Col>
          <p>Redes sociales</p>
        </Col> */}
      </Row>
    </Container>
  );
};
