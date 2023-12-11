import React, { useId } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./CustomCTA.css";
import CustomInput from "../CustomInput/CustomInput";

export const CustomCTA = ({ data }) => {
  const id = useId();
  return (
    <Container className="ctaDesign">
      {data.map((item) => (
        <Row key={id} className="align-items-center">
          <Col>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
            {item.input ? (
              <>
                <CustomInput
                  placeholder={item.input.placeholder}
                  type={item.input.type}
                  name={item.input.name}
                  handler={item.input.handler}
                />
              </>
            ) : (
              <></>
            )}
            <Button
              href={item.button.link}
              type={item.button.type}
              className="btn gradient"
            >
              {item.button.text}
            </Button>
          </Col>
        </Row>
      ))}
    </Container>
  );
};
