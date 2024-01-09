import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { CheckLg, Pencil, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { setEditUserId, userDetails } from "../userSlice";
import { useSelector } from "react-redux";
import { ToastContainer, Toasty } from "../../common/CustomToasty/CustomToasty";
import { DeleteUserLogic, getAllUsers } from "../../services/apiCalls";
import { useDispatch } from "react-redux";

const ListUsersAdmin = () => {
  const navigate = useNavigate();
  const token = useSelector(userDetails);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch(userDetails);

  useEffect(() => {
    if (token.credentials === "") {
      navigate("/");
    }
    const decode = jwtDecode(token.credentials);
    if (decode.role != "admin") {
      navigate("/");
    }

    getAllUsers("user/getUsers", token.credentials)
      .then((data) => {
        setUsers(data.data);
        // console.log(data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAction = (id, isActive) => {
    DeleteUserLogic("user/updateUserActive/" + id, token, isActive)
      .then((dat) => {
        setUsers((prevGods) => {
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
    dispatch(setEditUserId({ editUserId: id }));
    
    navigate("/editUser");
  };
  return (
    <>
      <ToastContainer />
      <Container className="py-5">
        <Row>
          <Col>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th style={{ width: "60%" }}>Nombre</th>
                  <th style={{ width: "40%" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.email}</td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => handleEdit(user._id)}
                        style={{ margin: "5px" }}
                      >
                        <Pencil /> Editar
                      </Button>

                      {user.isActive ? (
                        <Button
                          variant="danger"
                          onClick={() => handleAction(user._id, false)}
                          style={{ margin: "5px" }}
                        >
                          <Trash /> Desactivar
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={() => handleAction(user._id, true)}
                        >
                          <CheckLg /> Reactivar
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ListUsersAdmin;
