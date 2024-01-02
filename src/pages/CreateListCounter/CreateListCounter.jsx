import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../userSlice";
import { useSelector } from "react-redux";
import { allGodsActives } from "../../services/apiCalls";
import { Col, Row, Container, Button } from "react-bootstrap";
import CustomSelect from "../../common/CustomSelect/CustomSelect";
import "./CreateListCounter.css";

const CreateListCounter = () => {
  const [rows, setRows] = useState([]);
  const [gods1, setGods1] = useState([]);
  const [selectedGod, setSelectedGod] = useState(null);
  const [rowCount, setRowCount] = useState(0); // Nuevo estado para contar las filas
  const navigate = useNavigate();
  const token = useSelector(userDetails);

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
  }, []);

  const handleButtonClick = () => {
    const newRow = {
      id: `row-${rowCount + 1}`, // Utilizando rowCount como identificador único
      cols: [
        { id: `col-1`, size: 3 },
        { id: `col-2`, size: 6 },
        { id: `col-3`, size: 3 },
      ],
    };

    setRowCount((prevCount) => prevCount + 1); // Incrementando el contador
    setRows((prevRows) => [...prevRows, newRow]);
  };

  const handleDeleteRow = (rowId) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
  };

  const inputHandler = () => {};

  const handleGodSelect = (selectedOption) => {

    const selectedGodDetails = gods1.find(
      (god) => god._id === selectedOption
    );
    setSelectedGod(selectedGodDetails);
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Button onClick={handleButtonClick}>Agregar Fila</Button>
          </Col>
        </Row>

        {rows.map((row) => (
          <div className="row cajaCounters" key={row.id}>
            {row.cols.map((col, index) => (
              <div key={`${col.id}-${index}`} className={`col-md-${col.size}`}>
                {/* Content for each column */}
                {index === 0 && (
                  <div key={`selected-god-${row.id}`} className="text-center">
                    {selectedGod && (
                      <img
                        src={selectedGod.images.card}
                        alt="Dios Seleccionado"
                        className="img-principal-counter"
                      />
                    )}
                    <CustomSelect
                      options={gods1.map((god) => ({
                        value: god._id,
                        label: god.name,
                      }))}
                      placeholder="Seleccione un dios"
                      name="god"
                      handler={handleGodSelect}
                      className=""
                    />
                  </div>
                )}
                {index === row.cols.length - 1 && (
                  <div key={`buttons-${row.id}`}>
                    <Button onClick={() => handleDeleteRow(row.id)}>
                      Eliminar
                    </Button>
                    <Button>Guardar</Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </Container>
    </>
  );
};

export default CreateListCounter;
