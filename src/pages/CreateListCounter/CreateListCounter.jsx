import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userDetails } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { allGodsActives } from "../../services/apiCalls";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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

    if (sourceList === destinationList) {
      // Si el elemento se movió dentro de la misma lista
      const reorderedList = Array.from(sourceList === "gods1" ? gods1 : gods2);
      const [movedGod] = reorderedList.splice(result.source.index, 1);
      reorderedList.splice(result.destination.index, 0, movedGod);

      if (sourceList === "gods1") {
        setGods1(reorderedList);
      } else {
        setGods2(reorderedList);
      }
    } else {
      // Si el elemento se movió entre listas
      const sourceListItems = Array.from(sourceList === "gods1" ? gods1 : gods2);
      const destinationListItems = Array.from(destinationList === "gods1" ? gods1 : gods2);
      const [movedGod] = sourceListItems.splice(result.source.index, 1);
      destinationListItems.splice(result.destination.index, 0, movedGod);

      setGods1(sourceList === "gods1" ? sourceListItems : destinationListItems);
      setGods2(destinationList === "gods1" ? sourceListItems : destinationListItems);
    }
  };

  const grid = 10;

  const getItemStyle = (isDragging, draggableStyle, fondo) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 ${grid}px 0 0`,
    backgroundImage: isDragging ? fondo : "grey",
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    display: "flex",
    padding: grid,
    overflow: "auto",
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex" }}>
        {/* Lista 1 */}
        <Droppable droppableId="gods1" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {gods1.map((element, index) => (
                <Draggable key={element._id} draggableId={element._id} index={index}>
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

        {/* Lista 2 */}
        <Droppable droppableId="gods2" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {gods2.map((element, index) => (
                <Draggable key={element._id} draggableId={element._id} index={index}>
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
      </div>
    </DragDropContext>
  );
};

export default CreateListCounter;
