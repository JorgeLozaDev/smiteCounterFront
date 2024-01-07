import React, { useEffect, useState } from "react";
import Carousel from "../../common/CarouselHome/CarouselHome";
import { CustomContentBlock } from "../../common/CustomContentBlock/CustomContentBlock";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CustomCTA } from "../../common/CustomtCTA/CustomCTA";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [dataSubcribeEmail, setDataSubcribeEmail] = useState({
    emailSub: "",
  });
  const navigate = useNavigate();
  const commonBackground = "url('home/bg-carousel.png')";
  const dataCommonBlock = [
    {
      title: "Bienvenido",
      text: "En nuestra web encontraras toda la información que necesitas de SMITEGAME",
      commonImage1: "gods/Amaterasu/Amaterasu5.png",
      commonImage2: "gods/Ah_Puch/Ah_Puch3.png",
    },
  ];
  const carouselItems = [
    {
      image: "",
      imagenContent: "gods/Ah_Muzen_Cab/Ah_Muzen_Cab1.png",
      title: "SMITE COUNTER",
      description: "Te ayudaremos a conquistar el olimpo",
    },
    // ,
    // {
    //   image: "",
    //   imagenContent: "gods/Aquiles/Aquiles1.png",
    //   title: "Consulta toda la información de los dioses ",
    //   description:
    //     "Descubre al detalle todas las habilidades y datos",
    //   button: {
    //     text: "Ver más",
    //     link: "/gods",
    //   },
    // },
    // {
    //   image: "",
    //   imagenContent: "gods/Agni/Agni1.png",
    //   title: "Descubre nuestra lista de counters",
    //   description:
    //     "Con esta lista podras afrontar cualquier partida",
    //   button: {
    //     text: "Ver más",
    //     link: "/counters",
    //   },
    // },
  ];

  const inputHandler = (value, name) => {
    setDataSubcribeEmail((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const customCTA = [
    {
      title: "Bienvenido",
      text: "En nuestra web encontraras toda la información que necesitas de SMITEGAME",
      bgImage: "gods/Amaterasu/Amaterasu5.png",
      button: {
        text: "Ver más",
        link: "/slide1",
        type: "",
      },
      // input: {
      //   placeholder: "Introduce tu email",
      //   type: "email",
      //   name: "emailSub",
      //   handler: inputHandler,
      // },
    },
  ];

  useEffect(() => {
    console.log(dataSubcribeEmail);
  }, [dataSubcribeEmail]);

  return (
    <>
      <Carousel items={carouselItems} commonBackground={commonBackground} />
      <CustomContentBlock data={dataCommonBlock} />

      <Container className="caja">
        <Row className="align-items-center">
          <Col md={6}>
            <h2>Consulta toda la información de los dioses</h2>
            <p>Descubre al detalle todas las habilidades y datos</p>
            <Button onClick={() => (navigate("/gods"))}>Descubrir</Button>
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
            <h2>Si necesitas ayuda o soporte tecnico</h2>
            <p>No dudes en ponerte en contacto con nosotros</p>
            <Button>¡Escribenos!</Button>
          </Col>
        </Row>
      </Container>

      {/* <CustomCTA data={customCTA} /> */}
    </>
  );
};
