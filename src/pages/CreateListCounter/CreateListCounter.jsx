import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../userSlice";
import { useSelector } from "react-redux";
import { allGodsActives } from "../../services/apiCalls";
import { Col, Row, Container, Button } from "react-bootstrap";
import CustomSelect from "../../common/CustomSelect/CustomSelect";
import "./CreateListCounter.css";
import Input from "../../common/CustomInput/CustomInput";

const CreateListCounter = () => {
  const [rows, setRows] = useState([
    {
      id: `row-${Date.now()}`,
      selectedGod: null,
      filter: {
        godName: "",
      },
      selectedGodsList: [],
      cols: [
        { id: `col-1`, size: 3 },
        { id: `col-2`, size: 6 },
        { id: `col-3`, size: 3 },
      ],
    },
  ]);

  const [gods1, setGods1] = useState([]);
  const [gods2, setGods2] = useState([]);
  const navigate = useNavigate();
  const token = useSelector(userDetails);

  useEffect(() => {
    if (token.credentials === "") {
      navigate("/");
    }

    allGodsActives("gods/allGodsActive")
      .then((data) => {
        setGods1(data.data.allGodsActive);
        setGods2(data.data.allGodsActive);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token.credentials, navigate]);

  const handleButtonClick = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        id: `row-${Date.now()}`,
        selectedGod: null,
        filter: {
          godName: "",
        },
        selectedGodsList: [],
        cols: [
          { id: `col-1`, size: 3 },
          { id: `col-2`, size: 6 },
          { id: `col-3`, size: 3 },
        ],
      },
    ]);
  };

  const handleDeleteRow = (rowId) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
  };

  const handleGodSelect = (selectedOption, rowIndex) => {
    const selectedGodDetails = gods1.find((god) => god._id === selectedOption);

    setRows((prevRows) =>
      prevRows.map((row, index) =>
        index === rowIndex
          ? {
              ...row,
              selectedGod: selectedGodDetails,
            }
          : row
      )
    );
  };

  const filterGods = (gods, term) => {
    return gods.filter((god) =>
      god.name.toLowerCase().includes(term.toLowerCase())
    );
  };

  const inputHandler = (value, name, rowIndex) => {
    setRows((prevRows) =>
      prevRows.map((row, index) =>
        index === rowIndex
          ? {
              ...row,
              filter: {
                ...row.filter,
                [name]: value,
              },
            }
          : row
      )
    );
  };

  const handleGodClick = (god, rowIndex) => {
    // Verifica si el dios ya está en la lista antes de agregarlo
    if (!rows[rowIndex].selectedGodsList.some((selectedGod) => selectedGod._id === god._id)) {
      setRows((prevRows) =>
        prevRows.map((row, index) =>
          index === rowIndex
            ? {
                ...row,
                selectedGodsList: [...row.selectedGodsList, god],
              }
            : row
        )
      );
    }
  };

  const handleRemoveGod = (godId, rowIndex) => {
    setRows((prevRows) =>
      prevRows.map((row, index) =>
        index === rowIndex
          ? {
              ...row,
              selectedGodsList: row.selectedGodsList.filter((selectedGod) => selectedGod._id !== godId),
            }
          : row
      )
    );
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Button onClick={handleButtonClick}>Agregar Fila</Button>
          </Col>
        </Row>

        {rows.map((row, index) => (
          <div className="row cajaCounters" key={row.id}>
            {row.cols.map((col, colIndex) => (
              <div
                key={`${col.id}-${colIndex}`}
                className={`col-md-${col.size}`}
              >
                {/* Content for each column */}
                {colIndex === 0 && (
                  <div key={`selected-god-${row.id}`} className="text-center">
                    {row.selectedGod && (
                      <img
                        src={row.selectedGod.images.card}
                        alt="Dios Seleccionado"
                        className="img-principal-counter "
                      />
                    )}
                    <CustomSelect
                      options={gods1.map((god) => ({
                        value: god._id,
                        label: god.name,
                      }))}
                      placeholder="Seleccione un dios"
                      name="god"
                      handler={(selectedOption) =>
                        handleGodSelect(selectedOption, index)
                      }
                      className=""
                    />
                  </div>
                )}
                {colIndex === 1 && (
                  <div key={`search-${row.id}`}>
                    <div className="selected-gods-list">
                      <h3>Dioses Seleccionados</h3>
                      <div className="selected-gods-container">
                        {row.selectedGodsList.map((selectedGod) => (
                          <div
                            className="selected-god-image"
                            key={selectedGod._id}
                          >
                            <img
                              src={selectedGod.images.card}
                              alt={selectedGod.name}
                            />

                            {/* Icono "x" para quitar el dios seleccionado */}
                            <div
                              className="remove-god-icon"
                              onClick={() => handleRemoveGod(selectedGod._id, index)}
                            >
                              &#10006;
                            </div>

                            {/* Overlay con el nombre del dios */}
                            <div className="selected-god-name">
                              {selectedGod.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Input
                      placeholder={"Nombre del dios"}
                      type={"text"}
                      name={"godName"}
                      value={row.filter.godName}
                      handler={(value) => inputHandler(value, "godName", index)}
                      debounce={true}
                    />
                    <div className="filtered-gods-container">
                      {filterGods(gods2, row.filter.godName).map((god) => (
                        <div key={god._id} className="filtered-god-item">
                          <img
                            src={god.images.card}
                            alt={god.name}
                            className="filtered-god-image"
                            onClick={() => handleGodClick(god, index)}
                          />
                          {/* <span className="filtered-god-name">{god.name}</span> */}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {colIndex === row.cols.length - 1 && (
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
