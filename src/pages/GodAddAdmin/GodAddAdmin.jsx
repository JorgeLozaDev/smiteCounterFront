import { useSelector } from "react-redux";
import { userDetails } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Input from "../../common/CustomInput/CustomInput";
import CustomSelect from "../../common/CustomSelect/CustomSelect";

const GodAddAdmin = () => {
  const token = useSelector(userDetails);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    pantheon: "",
    role: "",
    lore: "",
    abilities: [
      { name: "", description: "", details: [{ label: "", value: "" }] },
    ],
    images: { main: "", card: "", skins: [{ name: "", image: "" }] },
    isActive: true,
    isNewGod: false,
    isFreeToPlay: false,
  });

  useEffect(() => {
    if (token.credentials === "") {
      navigate("/");
    }
    const decode = jwtDecode(token.credentials);
    if (decode.role != "admin") {
      navigate("/");
    }
  }, []);

  const handlerSend = () => {
    event.preventDefault();
    console.log(formData);
  };

  const inputHandler = (value, name, index, detailIndex, subFieldName) => {
    if (value !== undefined) {
      setFormData((prevData) => {
        if (index !== undefined && detailIndex !== undefined && subFieldName) {
          const updatedAbilities = [...prevData.abilities];
          updatedAbilities[index][name][detailIndex][subFieldName] = value;

          return {
            ...prevData,
            abilities: updatedAbilities,
          };
        } else if (
          index !== undefined &&
          name &&
          !detailIndex &&
          !subFieldName
        ) {
          const updatedAbilities = [...prevData.abilities];
          updatedAbilities[index][name] = value;

          return {
            ...prevData,
            abilities: updatedAbilities,
          };
        } else {
          return {
            ...prevData,
            [name]: value,
          };
        }
      });
    }
  };

  const handleImageUrlChange = (e, imageType) => {
    const imageUrl = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      images: {
        ...prevData.images,
        [imageType]: imageUrl,
      },
    }));
  };

  const handleSkinUrlChange = (e, index) => {
    const imageUrl = e.target.value;

    setFormData((prevData) => {
      const updatedSkins = [...prevData.images.skins];
      updatedSkins[index] = { ...updatedSkins[index], image: imageUrl };

      return {
        ...prevData,
        images: {
          ...prevData.images,
          skins: updatedSkins,
        },
      };
    });
  };

  const addSkinField = () => {
    setFormData((prevData) => ({
      ...prevData,
      images: {
        ...prevData.images,
        skins: [
          ...prevData.images.skins,
          { name: `Skin ${prevData.images.skins.length + 1}`, image: "" },
        ],
      },
    }));
  };

  const removeSkinField = (index) => {
    setFormData((prevData) => {
      const updatedSkins = [...prevData.images.skins];
      updatedSkins.splice(index, 1);

      return {
        ...prevData,
        images: {
          ...prevData.images,
          skins: updatedSkins,
        },
      };
    });
  };

  const handleSkinNameChange = (e, index) => {
    const skinName = e.target.value;

    setFormData((prevData) => {
      const updatedSkins = [...prevData.images.skins];
      updatedSkins[index] = { ...updatedSkins[index], name: skinName };

      return {
        ...prevData,
        images: {
          ...prevData.images,
          skins: updatedSkins,
        },
      };
    });
  };

  const handleAbilityChange = (
    value,
    index,
    field,
    detailIndex,
    subFieldName
  ) => {
    setFormData((prevData) => {
      const updatedAbilities = [...prevData.abilities];
      if (field === "details" && detailIndex !== undefined && subFieldName) {
        updatedAbilities[index][field][detailIndex][subFieldName] = value;
      } else {
        updatedAbilities[index][field] = value;
      }

      return {
        ...prevData,
        abilities: updatedAbilities,
      };
    });
  };

  const addAbilityField = () => {
    setFormData((prevData) => ({
      ...prevData,
      abilities: [
        ...prevData.abilities,
        { name: "", description: "", details: [{ label: "", value: "" }] },
      ],
    }));
  };

  const removeAbilityField = (index) => {
    setFormData((prevData) => {
      const updatedAbilities = [...prevData.abilities];
      updatedAbilities.splice(index, 1);

      return {
        ...prevData,
        abilities: updatedAbilities,
      };
    });
  };

  const addDetailField = (abilityIndex) => {
    setFormData((prevData) => {
      const updatedAbilities = [...prevData.abilities];
      updatedAbilities[abilityIndex].details.push({ label: "", value: "" });

      return {
        ...prevData,
        abilities: updatedAbilities,
      };
    });
  };

  const removeDetailField = (abilityIndex, detailIndex) => {
    setFormData((prevData) => {
      const updatedAbilities = [...prevData.abilities];
      updatedAbilities[abilityIndex].details.splice(detailIndex, 1);

      return {
        ...prevData,
        abilities: updatedAbilities,
      };
    });
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handlerSend} method="post">
              <Input
                placeholder={"Nombre del personaje"}
                type={"text"}
                name={"name"}
                handler={inputHandler}
              />
              <CustomSelect
                options={[
                  "Guardián",
                  "Guerrero",
                  "Cazador",
                  "Mago",
                  "Asesino",
                ].map((role) => ({
                  value: role,
                  label: role,
                }))}
                placeholder="Seleccione un rol"
                name="role"
                handler={inputHandler}
                className="tu-clase-estilo"
              />
              <CustomSelect
                options={[
                  "Arturiano",
                  "Babilónico",
                  "Chino",
                  "Celta",
                  "Egipcio",
                  "Griego",
                  "Grandes Antiguos",
                  "Hindú",
                  "Japonés",
                  "Maya",
                  "Nórdico",
                  "Polinesio",
                  "Romano",
                  "Eslavo",
                  "Vudú",
                  "Yoruba",
                ].map((pantheon) => ({
                  value: pantheon,
                  label: pantheon,
                }))}
                placeholder="Seleccione un panteón"
                name="pantheon"
                handler={inputHandler}
                className="tu-clase-estilo"
              />
              <Form.Control
                as="textarea"
                rows={3}
                name="lore"
                onChange={(e) => inputHandler(e.target.value, "lore")}
              />
              <Form.Check
                type={"checkbox"}
                id={`default1}`}
                label={`activo`}
                checked={formData.isActive}
                onChange={(e) => inputHandler(e.target.checked, "isActive")}
              />
              <Form.Check
                type={"checkbox"}
                id={`default2}`}
                label={`Free to play`}
                checked={formData.isFreeToPlay}
                onChange={(e) => inputHandler(e.target.checked, "isFreeToPlay")}
              />
              <Form.Check
                type={"checkbox"}
                id={`default3}`}
                label={`Nuevo personaje`}
                checked={formData.isNewGod}
                onChange={(e) => inputHandler(e.target.checked, "isNewGod")}
              />
              <Form.Group controlId="mainImage">
                <Form.Label>URL de la imagen principal</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese la URL de la imagen principal"
                  onChange={(e) => handleImageUrlChange(e, "main")}
                />
              </Form.Group>

              <Form.Group controlId="cardImage">
                <Form.Label>URL de la imagen de la tarjeta</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese la URL de la imagen de la tarjeta"
                  onChange={(e) => handleImageUrlChange(e, "card")}
                />
              </Form.Group>

              <Form.Group controlId="skins">
                <Form.Label>Skins</Form.Label>
                {formData.images.skins.map((skin, index) => (
                  <div key={index}>
                    <Form.Control
                      type="text"
                      placeholder={`Nombre de la skin ${index + 1}`}
                      value={skin.name}
                      onChange={(e) => handleSkinNameChange(e, index)}
                    />
                    <Form.Control
                      type="text"
                      placeholder={`URL de la imagen de la skin ${index + 1}`}
                      value={skin.image}
                      onChange={(e) => handleSkinUrlChange(e, index)}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => removeSkinField(index)}
                    >
                      Eliminar Skin
                    </Button>
                  </div>
                ))}
                <Button variant="outline-secondary" onClick={addSkinField}>
                  Agregar Skin
                </Button>
              </Form.Group>

              <Form.Group controlId="abilities">
                <Form.Label>Habilidades</Form.Label>
                {formData.abilities.map((ability, index) => (
                  <div key={index}>
                    <Input
                      type="text"
                      placeholder={`Nombre de la habilidad ${index + 1}`}
                      value={ability.name}
                      handler={(value) => inputHandler(value, "name", index)}
                    />
                    <Form.Control
                      as="textarea"
                      placeholder={`Descripción de la habilidad ${index + 1}`}
                      value={ability.description}
                      onChange={(e) =>
                        inputHandler(e.target.value, "description", index)
                      }
                    />
                    <Form.Label>Detalles</Form.Label>
                    {ability.details.map((detail, detailIndex) => (
                      <div key={detailIndex}>
                        <Input
                          type="text"
                          placeholder={`Etiqueta del detalle ${
                            detailIndex + 1
                          }`}
                          value={detail.label}
                          handler={(value) =>
                            handleAbilityChange(
                              value,
                              index,
                              "details",
                              detailIndex,
                              "label"
                            )
                          }
                        />
                        <Input
                          type="text"
                          placeholder={`Valor del detalle ${detailIndex + 1}`}
                          value={detail.value}
                          handler={(value) =>
                            handleAbilityChange(
                              value,
                              index,
                              "details",
                              detailIndex,
                              "value"
                            )
                          }
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => removeDetailField(index, detailIndex)}
                        >
                          Eliminar Detalle
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline-secondary"
                      onClick={() => addDetailField(index)}
                    >
                      Agregar Detalle
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={() => removeAbilityField(index)}
                    >
                      Eliminar Habilidad
                    </Button>
                  </div>
                ))}
                <Button variant="outline-secondary" onClick={addAbilityField}>
                  Agregar Habilidad
                </Button>
              </Form.Group>

              <Button type="submit" variant="secondary">
                Enviar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GodAddAdmin;
