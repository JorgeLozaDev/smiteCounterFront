import { useSelector } from "react-redux";
import { setEditedListId, userDetails } from "../userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { usersDetails } from "../../services/apiCalls";
import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import Input from "../../common/CustomInput/CustomInput";
import { ToastContainer, Toasty } from "../../common/CustomToasty/CustomToasty";

const UserEditAdmin = () => {
  const details = useSelector(userDetails);
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (details.credentials === "") {
      navigate("/");
    }
    const decode = jwtDecode(details.credentials);
    if (decode.role != "admin") {
      navigate("/");
    }

    usersDetails("user/userDetails/", details.editedListId.editUserId, details)
      .then((data) => {
        setUser(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // return () => {
    //   dispatch(setEditedListId(null));
    // };
  }, []);

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
  const handleChange = (value, name) => {
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <ToastContainer />
      <Form onSubmit={handlerSubmit} method="post">
        <Input
          placeholder={"Email"}
          type={"email"}
          name={"email"}
          value={user.email}
          handler={handleChange}
          disabled={true}
        />

        <Input
          placeholder={"Nombre de usuario"}
          type={"text"}
          name={"username"}
          value={user.username}
          handler={handleChange}
        />
        <Input
          placeholder={"Fecha naciemiento"}
          type={"date"}
          name={"birthday"}
          value={user.birthday}
          handler={handleChange}
        />
        <p className="text-center">
          <Button type="submit" variant="secondary">
            Enviar
          </Button>
        </p>
      </Form>
    </>
  );
};

export default UserEditAdmin;
