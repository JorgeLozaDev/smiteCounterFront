import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout, userDetails } from "../../pages/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { PersonCircle, PersonWorkspace } from "react-bootstrap-icons";
import "./Header.css"

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(userDetails);
  const [decode, setDecode] = useState();

  const handlerLogOut = () => {
    dispatch(logout({ credentials: "" }));
    navigate("/");
  };

  useEffect(() => {
    if (token.credentials !== "") {
      setDecode(jwtDecode(token.credentials));
    }
  }, [token.credentials]);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/"><img src="home/smite-logo.png" className=" logo"></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="/gods">Dioses</Nav.Link>
              <Nav.Link href="/counters">Counters</Nav.Link>
              {/* <Nav.Link href="/contact">contacto</Nav.Link> */}
            </Nav>

            <Nav>
              {token.credentials === "" ? (
                <Nav.Link href="/login">
                  <OverlayTrigger
                    key={"bottom"}
                    placement={"bottom"}
                    overlay={<Tooltip id={`tooltip-bottom`}>Login</Tooltip>}
                  >
                    <PersonCircle></PersonCircle>
                  </OverlayTrigger>
                </Nav.Link>
              ) : (
                <>
                  {decode && decode.role === "admin" ? (
                    <NavDropdown title="Menú" id="collasible-nav-dropdown">
                      <NavDropdown.Item href="/addGod">
                        Add god
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/listGods">
                        List gods
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/getUsers">
                        List users
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/profile">
                        <PersonWorkspace /> Perfil
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handlerLogOut}>
                        Log out
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <>
                      <NavDropdown title="Menú" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/profile">
                          <PersonWorkspace /> Perfil
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={handlerLogOut}>
                          Log out
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  )}
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
