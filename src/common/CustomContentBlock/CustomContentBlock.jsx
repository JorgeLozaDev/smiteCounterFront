import React, { useId } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./CustomContentBlock.css";

export const CustomContentBlock = ({ data }) => {
  const id = useId();
  return (
    <Container className="caja">
      {data.map((item) => (
        <Row key={id} className="align-items-center">
          <Col md={8}>
            <img src={item.commonImage1} alt="" className="img-fluid" />
            <img src={item.commonImage2} alt="" className="img-fluid" />
          </Col>
          <Col md={4} className="cajaTxtContentBlock">
            <h2>{item.title}</h2>
            <p>{item.text}</p>
            <a href={item.button.link} className="btn gradient">
              {item.button.text}
            </a>
          </Col>
        </Row>
      ))}
    </Container>
  );
};
