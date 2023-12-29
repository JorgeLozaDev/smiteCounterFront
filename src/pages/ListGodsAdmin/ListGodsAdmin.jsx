import { useSelector } from "react-redux";
import { userDetails } from "../userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { DeleteGodLogic, allGods } from "../../services/apiCalls";
import { CheckLg, Pencil, Trash } from "react-bootstrap-icons";
import { ToastContainer, Toasty } from "../../common/CustomToasty/CustomToasty";
import { useDispatch } from "react-redux";
import { godDetails, saveId } from "../godSlice";

const ListGodsAdmin = () => {
  const token = useSelector(userDetails);
  const navigate = useNavigate();
  const [gods, setGods] = useState([]);
  const dispatch = useDispatch(godDetails);

  useEffect(() => {
    if (token.credentials === "") {
      navigate("/");
    }
    const decode = jwtDecode(token.credentials);
    if (decode.role != "admin") {
      navigate("/");
    }

    allGods("gods/allGods", token)
      .then((data) => {
        setGods(data.data.allGods);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAction = (id, isActive) => {
    DeleteGodLogic("gods/updateGodActive/" + id, token, isActive)
      .then((dat) => {
        setGods((prevGods) => {
          return prevGods.map((god) =>
            god._id === id ? { ...god, isActive } : god
          );
        });

        Toasty({
          message: `Se ha actualizado el dios correctamente`,
          type: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (id) => {
    dispatch(saveId({ id: id }));
    navigate("/editGod");
  };

  return (
    <>
      <ToastContainer />
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "20px",
              }}
            >
              <h1>Lista de Dioses</h1>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th style={{ width: "60%" }}>Nombre</th>
                    <th style={{ width: "40%" }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {gods.map((god) => (
                    <tr key={god._id}>
                      <td>{god.name}</td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => handleEdit(god._id)}
                          style={{ margin: "5px" }}
                        >
                          <Pencil /> Editar
                        </Button>

                        {god.isActive ? (
                          <Button
                            variant="danger"
                            onClick={() => handleAction(god._id, false)}
                            style={{ margin: "5px" }}
                          >
                            <Trash /> Eliminar
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            onClick={() => handleAction(god._id, true)}
                          >
                            <CheckLg /> Reactivar
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ListGodsAdmin;
