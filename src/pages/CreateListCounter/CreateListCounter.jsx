import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../userSlice";
import { useSelector } from "react-redux";
import { allGodsActives, saveListCounters } from "../../services/apiCalls";
import {
  Col,
  Row,
  Container,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import CustomSelect from "../../common/CustomSelect/CustomSelect";
import "./CreateListCounter.css";
import Input from "../../common/CustomInput/CustomInput";
import { Trash3Fill } from "react-bootstrap-icons";
import { Toasty, ToastContainer } from "../../common/CustomToasty/CustomToasty";

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
        { id: `col-2`, size: 7 },
        { id: `col-3`, size: 2 },
      ],
    },
  ]);

  const [nombreLista, setNombreLista] = useState({
    listName: "",
  });
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
    if (
      !rows[rowIndex].selectedGodsList.some(
        (selectedGod) => selectedGod._id === god._id
      )
    ) {
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
              selectedGodsList: row.selectedGodsList.filter(
                (selectedGod) => selectedGod._id !== godId
              ),
            }
          : row
      )
    );
  };

  const handleSave = (row) => {
    // Aquí debes enviar los datos al servidor
    // Puedes usar fetch, axios, o cualquier otra biblioteca para hacer la solicitud HTTP
    if (
      row &&
      row.selectedGod &&
      Array.isArray(row.selectedGodsList) &&
      row.selectedGodsList.length > 0
    ) {
      const data = {
        listName: nombreLista.listName, // Puedes cambiar esto según tus necesidades
        mainGod: row.selectedGod._id,
        counterpicks: row.selectedGodsList.map((selectedGod) => ({
          godId: selectedGod._id,
        })),
      };
      console.log(data);

      saveListCounters("user/saveListCounter", token, data)
        .then((dat) => {
          console.log(dat);
          Toasty({
            message: "Se esta guardando... la lista",
            type: "success",
          });
        })
        .catch((error) => {
          // Manejar el error de Axios
          if (error.response) {
            // El servidor respondió con un código de estado diferente de 2xx
            Toasty({
              message: `Error: ${error.response.status} - ${error.response.data.message}`,
              type: "error",
            });
          } else if (error.request) {
            // La solicitud fue hecha, pero no se recibió una respuesta
            Toasty({
              message: "No se recibió respuesta del servidor",
              type: "error",
            });
          } else {
            // Algo sucedió al configurar la solicitud que desencadenó un error
            Toasty({
              message: "Error al configurar la solicitud",
              type: "error",
            });
          }
        });
    } else {
      let errorMessage = "Error: Los siguientes campos están vacíos:";

      if (!row) {
        errorMessage += " 'no existe esa fila'";
      }

      if (!row.selectedGod) {
        errorMessage += " 'debes selecciona un dios'";
      }

      if (
        !Array.isArray(row.selectedGodsList) ||
        row.selectedGodsList.length === 0
      ) {
        errorMessage +=
          " 'tienes que seleccionar 1 dios como mínimo en la lista de counters'";
      }
      Toasty({
        message: errorMessage,
        type: "error",
      });
    }
  };

  const inputHandlerNombre = (value, name) => {
    setNombreLista((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <ToastContainer />
      <Container className="py-5">
        <Row>
          <Col>
            <Input
              placeholder={"Nombre de la lista"}
              type={"text"}
              name={"listName"}
              handler={inputHandlerNombre}
            />
          </Col>
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
                    <h3>Dios</h3>
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
                      <h3>Counters</h3>
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
                              onClick={() =>
                                handleRemoveGod(selectedGod._id, index)
                              }
                            >
                              <OverlayTrigger
                                key={"bottom"}
                                placement={"bottom"}
                                overlay={
                                  <Tooltip id={`tooltip-${"bottom"}`}>
                                    <strong>Eliminar</strong>
                                  </Tooltip>
                                }
                              >
                                <Trash3Fill></Trash3Fill>
                              </OverlayTrigger>
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
                    <Button onClick={() => handleSave(row)}>Guardar</Button>
                    <Button onClick={() => handleDeleteRow(row.id)}>
                      Eliminar
                    </Button>
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
