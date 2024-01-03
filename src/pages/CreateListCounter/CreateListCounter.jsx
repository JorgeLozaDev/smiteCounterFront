import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../userSlice";
import { useSelector } from "react-redux";
import { allGodsActives } from "../../services/apiCalls";
import { Col, Row, Container, Button } from "react-bootstrap";
import CustomSelect from "../../common/CustomSelect/CustomSelect";
import "./CreateListCounter.css";
import Input from "../../common/CustomInput/CustomInput";

const CreateListCounter = () => {
  const [rows, setRows] = useState([]);
  const [gods1, setGods1] = useState([]);
  const [gods2, setGods2] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [filteredGods, setFilteredGods] = useState([]);
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
    const newRow = {
      id: `row-${rowCount + 1}`,
      selectedGod: null,
      filter: {
        godName: "",
      },
      // filteredGods: filterGods(gods1, ""),
      selectedGodId: null, // Este es el valor seleccionado del Select
      filteredGods: [],
      cols: [
        { id: `col-1`, size: 3 },
        { id: `col-2`, size: 6 },
        { id: `col-3`, size: 3 },
      ],
    };

    setRowCount((prevCount) => prevCount + 1);
    setRows((prevRows) => [...prevRows, newRow]);
  };

  const handleDeleteRow = (rowId, rowIndex) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
    setFilteredGods((prevFilteredGods) =>
      prevFilteredGods.filter((_, index) => index !== rowIndex)
    );
    handleGodSelect(null, rowIndex);
  };

  const handleGodSelect = (selectedOption, rowIndex) => {
    const selectedGodDetails = gods1.find((god) => god._id === selectedOption);

    setRows((prevRows) =>
      prevRows.map((row, index) =>
        index === rowIndex
          ? {
            
              ...row,
              selectedGod: selectedGodDetails,
              selectedGodId: selectedOption,
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
              filteredGods: filterGods(gods2, value),
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
                        className="img-principal-counter"
                      />
                    )}
                    <CustomSelect
                      options={gods1.map(
                        (god) => ({
                          value: god._id,
                          label: god.name,
                        })
                      )}
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
                    <Input
                      placeholder={"Nombre del dios"}
                      type={"text"}
                      name={"godName"}
                      value={row.filter.godName}
                      handler={(value) => inputHandler(value, "godName", index)}
                      debounce={true}
                    />
                    <ul>
                      {filterGods(gods2, row.filter.godName).map((god) => (
                        <li key={god._id}>{god.name}</li>
                      ))}
                    </ul>
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
