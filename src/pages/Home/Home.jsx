import React from "react";
import Carousel from "../../common/CarouselHome/CarouselHome";
import { CustomContentBlock } from "../../common/CustomContentBlock/CustomContentBlock";

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
    </>
  );
};
