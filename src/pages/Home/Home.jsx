import React from "react";
import Carousel from "../../common/CarouselHome/CarouselHome";
import { CustomContentBlock } from "../../common/CustomContentBlock/CustomContentBlock";
import { Button, Col, Container, Row } from "react-bootstrap";

export const Home = () => {
  const commonBackground = "url('home/bg-carousel.png')";
  const dataCommonBlock = [
    {
      title: "asdsad",
      text: "lorem kafkjaf kla faskfjhaskf aksdfh aklsfjhsakf asdfasf halsk jfsak fkahsdfkjahs fklhasdkfhasldfs da djfk asdkf",
      commonImage1: "gods/Amaterasu/Amaterasu5.png",
      commonImage2: "gods/Ah_Puch/Ah_Puch3.png",
      button: {
        text: "Ver más",
        link: "/slide1",
      },
    },
  ];
  const carouselItems = [
    {
      image: "",
      imagenContent: "gods/Rama/Rama.png",
      title: "Bienvenido a nuestra web",
      description:
        "Espermos que te podamos ayudar en tu busqueda de información",
      button: {
        text: "Ver más",
        link: "/slide1",
      },
    },
    {
      image: "",
      imagenContent: "gods/Achilles/Achilles1.png",
      title: "Slide 2",
      description: "Descripción del Slide 1",
      button: {
        text: "Ver más",
        link: "/slide1",
      },
    },
    {
      image: "",
      imagenContent: "gods/Agni/Agni1.png",
      title: "Slide 3",
      description: "Descripción del Slide 1",
      button: {
        text: "Ver más",
        link: "/slide1",
      },
    },
  ];
  return (
    <>
      <Carousel items={carouselItems} commonBackground={commonBackground} />
      <CustomContentBlock data={dataCommonBlock} />

      <Container className="caja">
        <Row className="align-items-center">
          <Col md={6}>
            <h2>24/7 access to full service customer support</h2>
            <p>
              We invest more resources than any other platform in making sure
              great support from real people is a click away, whenever you need
              it.
            </p>
            <Button>Start</Button>
          </Col>
          <Col md={6}>
            <p className="text-center">
              <img src="gods/Agni/Agni5.png" className="img-fluid" />
            </p>
          </Col>
        </Row>
      </Container>

      <Container className="caja">
        <Row className="align-items-center">
          <Col md={6}>
            <p className="text-center">
              <img src="home/KeyArt_1.png" className="img-fluid" />
            </p>
          </Col>
          <Col md={6}>
            <h2>24/7 access to full service customer support</h2>
            <p>
              We invest more resources than any other platform in making sure
              great support from real people is a click away, whenever you need
              it.
            </p>
            <Button>Start</Button>
          </Col>
        </Row>
      </Container>

    </>
  );
};
