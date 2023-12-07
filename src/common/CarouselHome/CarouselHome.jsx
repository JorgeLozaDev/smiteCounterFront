import React from "react";
import {
  Carousel as BootstrapCarousel,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import "./CarouselHome.css";

const Carousel = ({ items, commonBackground }) => {
  const carouselStyle = {
    background: `${commonBackground} center no-repeat`,
    backgroundSize: "cover",
  };
  return (
    <div style={carouselStyle}>
      <BootstrapCarousel className="customCarousel">
        {items.map((item, index) => (
          <BootstrapCarousel.Item key={index}>
            {/* Verificar si se proporciona una imagen específica para el slide */}
            {item.image && (
              <img
                className="d-block w-100"
                src={item.image}
                alt={`Slide ${index + 1}`}
              />
            )}
             <Container>
              <Row className="align-items-center customHeightItem">
                <Col className="d-flex justify-content-center">
                  {item.imagenContent != "" ? (
                    <img
                      className="d-block  customImgCarousel"
                      src={item.imagenContent}
                      alt={`Slide ${index + 1}`}
                    />
                  ) : (
                    <img
                      className="d-block customImgCarousel"
                      src="home/bg-carousel.png"
                      alt={`Slide ${index + 1}`}
                    />
                  )}
                </Col>
                <Col>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  {item.button && (
                    <a href={item.button.link} className="btn gradient">
                      {item.button.text}
                    </a>
                  )}
                </Col>
              </Row>
            </Container>
          </BootstrapCarousel.Item>
        ))}
      </BootstrapCarousel>
    </div>
  );
};

export default Carousel;
