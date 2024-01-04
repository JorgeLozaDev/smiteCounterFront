import { useSelector } from "react-redux";
import { userDetails } from "../userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toasty, ToastContainer } from "../../common/CustomToasty/CustomToasty";
import { getAllListCounters } from "../../services/apiCalls";
import { Button, Table } from "react-bootstrap";
import {  Pencil, Trash } from "react-bootstrap-icons";
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
        // console.log(result.data);
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
    // DeleteGodLogic("gods/updateGodActive/" + id, token, isActive)
    //   .then((dat) => {
    //     setGods((prevGods) => {
    //       return prevGods.map((god) =>
    //         god._id === id ? { ...god, isActive } : god
    //       );
    //     });
    //     Toasty({
    //       message: `Se ha actualizado el dios correctamente`,
    //       type: "success",
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    console.log(id);
  };

  const handleEdit = (id) => {
    console.log(id);
    // dispatch(saveId({ id: id }));
    // navigate("/editGod");
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
              <tr key={lista._id}>
                <td>{lista.listName}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleEdit(lista._id)}
                    style={{ margin: "5px" }}
                  >
                    <Pencil /> Editar
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => handleAction(lista._id)}
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
