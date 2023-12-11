import React, { useId } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./CustomCTA.css"

export const CustomCTA = ({ data }) => {
  const id = useId();
  return (
    <Container>
      {data.map((item) => (
        <Row key={id} className="align-items-center">
          <Col>
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
