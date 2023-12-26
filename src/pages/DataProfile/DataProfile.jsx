import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../userSlice";
import { profileUser, updateProfile } from "../../services/apiCalls";
import { Button, Container, Form } from "react-bootstrap";
import Input from "../../common/CustomInput/CustomInput";
import { Toasty } from "../../common/CustomToasty/CustomToasty";

const DataProfile = () => {
  const [userData, setUserData] = useState({});
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const token = useSelector(userDetails);

  useEffect(() => {
    if (token.credentials == "") {
      navigate("/");
    }

    profileUser("user/profile", token.credentials)
      .then((e) => {
        setUserData(e.data);
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

  const handleEditar = (e) => {
    setEdit(!edit);

    e.target.innerHTML = edit ? "editar" : "cancelar";
  };

  const formattedDate = userData.birthday
    ? new Date(userData.birthday).toISOString().split("T")[0]
    : "";

  const handleChange = (value, name) => {
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlerSubmit = (event) => {
    updateProfile("user/updateProfile", token, userData)
      .then((dat) => {
          Toasty({
            message: dat.data.message,
            type: "success",
          });
          
        setEdit(false);
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
    event.preventDefault();
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString("es-ES", options);
  };

  return (
    <>
      
      <Container fluid className="contenido dataProfile">
        {edit ? (
          <Form onSubmit={handlerSubmit} method="post">
            <Input
              placeholder={"Email"}
              type={"email"}
              name={"email"}
              value={userData.email}
              handler={handleChange}
              disabled={true}
            />

            <Input
              placeholder={"Nombre de usuario"}
              type={"text"}
              name={"username"}
              value={userData.username}
              handler={handleChange}
            />
            <Input
              placeholder={"Fecha naciemiento"}
              type={"date"}
              name={"birthday"}
              value={formattedDate}
              handler={handleChange}
            />
            <p className="text-center">
              <Button type="submit" variant="secondary">
                Enviar
              </Button>
            </p>
          </Form>
        ) : userData.email ? (
          <div className="box">
            <p>Email: {userData.email}</p>
            <p>Nombre de usuario: {userData.username}</p>
            <p>Fecha de cumpleaños: {formatDateTime(userData.birthday)}</p>
            <p className="text-center">
              <Button variant="secondary" onClick={handleEditar}>
                Editar
              </Button>
            </p>
          </div>
        ) : (
          <div>
            <p>Sin datos</p>
          </div>
        )}
      </Container>
    </>
  );
};

export default DataProfile;
