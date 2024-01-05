import { useSelector } from "react-redux";
import { setEditedListId, userDetails } from "../userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toasty, ToastContainer } from "../../common/CustomToasty/CustomToasty";
import {
  deleteListCounters,
  getAllListCounters,
} from "../../services/apiCalls";
import { Button, Table } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";

const ListCounters = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(userDetails);
  const token = useSelector(userDetails);
  const [list, setList] = useState();

  useEffect(() => {
    if (token.credentials == "") {
      navigate("/");
    }
    getAllListCounters("user/getListCounter", token)
      .then((result) => {
        setList(result.data);
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
  }, []);

  const handleAction = (id) => {
    deleteListCounters("user/deleteListCounter/" + id, token)
      .then((dat) => {
        // Actualiza la lista después de eliminar
        setList((prevLists) =>
          prevLists.filter((lista) => lista.listId !== id)
        );
        Toasty({
          message: `Se ha actualizado el dios correctamente`,
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
  };

  const handleEdit = (id) => {
    dispatch(setEditedListId({ editedListId: id }));
    navigate("/createList");
  };

  return (
    <>
      <ToastContainer />
      {list ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th style={{ width: "60%" }}>Nombre de la lista</th>
              <th style={{ width: "40%" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {list.map((lista) => (
              <tr key={lista.listId}>
                <td>{lista.listName}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleEdit(lista.listId)}
                    style={{ margin: "5px" }}
                  >
                    <Pencil /> Editar
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => handleAction(lista.listId)}
                    style={{ margin: "5px" }}
                  >
                    <Trash /> Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>
          <p>Aun no tienes listas</p>
        </div>
      )}
    </>
  );
};

export default ListCounters;
