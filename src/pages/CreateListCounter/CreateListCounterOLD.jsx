import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userDetails } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { allGodsActives } from "../../services/apiCalls";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Col, Container, Row } from "react-bootstrap";
import "./CreateListCounter.css";

const CreateListCounter = () => {
  const [gods1, setGods1] = useState([]);
  const [gods2, setGods2] = useState([]);
  const token = useSelector(userDetails);
  const navigate = useNavigate();

  useEffect(() => {
    if (token.credentials === "") {
      navigate("/");
    }

    allGodsActives("gods/allGodsActive")
      .then((data) => {
        setGods1(data.data.allGodsActive);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token.credentials, navigate]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceList = result.source.droppableId;
    const destinationList = result.destination.droppableId;
    const movedGod = gods1[result.source.index];

    if (sourceList === destinationList) {
      // Mover dentro de la misma lista
      const reorderedList = Array.from(gods1);
      reorderedList.splice(result.source.index, 1);
      reorderedList.splice(result.destination.index, 0, movedGod);
      setGods1(reorderedList);
    } else {
      // Mover entre listas
      if (destinationList === "gods2" && gods2.length > 0) {
        // Lista 2 solo puede tener un elemento
        if (!gods1.includes(movedGod)) {
          setGods1((prevGods1) => [...prevGods1, movedGod]);
        }
      } else if (destinationList === "gods1" && gods1.length > 1) {
        // Lista 1 puede tener más de un elemento
        setGods2((prevGods2) => prevGods2.filter((god) => god !== movedGod));
        setGods1((prevGods1) => {
          const indexToInsert = Math.min(
            result.destination.index,
            prevGods1.length - 1
          );
          return [
            ...prevGods1.slice(0, indexToInsert),
            movedGod,
            ...prevGods1.slice(indexToInsert),
          ];
        });
      } else {
        // Eliminar de la Lista 1 y agregar a la Lista 2
        setGods1((prevGods1) =>
          prevGods1.filter((_, index) => index !== result.source.index)
        );

        // Verificar si ya está en la Lista 2 antes de agregar
        if (!gods2.includes(movedGod)) {
          setGods2((prevGods2) => [movedGod, ...prevGods2]);
        }
      }
    }
  };

  const grid = 5;

  const getItemStyle = (isDragging, draggableStyle, fondo) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 ${grid}px 0 0`,
    backgroundImage: isDragging ? fondo : "grey",
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 9em)",
    padding: grid,
    overflow: "auto",
    width: "100%",
    gap: "1em",
  });

  return (
    <>
      <Container
        fluid
        className="banner bannerGod"
        style={{ backgroundImage: `url(general/bannerVs.png)` }}
      ></Container>

      <Container className="py-5">
        <DragDropContext onDragEnd={onDragEnd}>
          {/* Lista 1 */}
          <Row>
            <Col md={12}>
              <Droppable droppableId="gods1" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {gods1.map((element, index) => (
                      <Draggable
                        key={element._id}
                        draggableId={element._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="dragGods"
                            style={{
                              ...getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                                `url(${element.images.card})`
                              ),
                              backgroundImage: `url(${element.images.card})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center top",
                              backgroundRepeat: "no-repeat",
                            }}
                          >
                            <p>{element.name}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
          </Row>

          {/* Lista 2 y Lista 3 en la misma Row */}
          <Row className="test">
            {/* Lista 2 */}
            <Col md={3}>
              <Droppable droppableId="gods2" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {gods2.map((element, index) => (
                      <Draggable
                        key={element._id}
                        draggableId={element._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="dragGods"
                            style={{
                              ...getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                                `url(${element.images.card})`
                              ),
                              backgroundImage: `url(${element.images.card})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center top",
                              backgroundRepeat: "no-repeat",
                            }}
                          >
                            <p>{element.name}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>

            {/* Lista 3 */}
            <Col md={9}>
              {/* Aquí puedes implementar la Lista 3 según tus necesidades */}
              {/* Actualmente no tiene restricciones de cantidad de elementos */}
            </Col>
          </Row>
        </DragDropContext>
      </Container>
    </>
  );
};

export default CreateListCounter;
