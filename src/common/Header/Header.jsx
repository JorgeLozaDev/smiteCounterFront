import { Navbar, Container, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../../pages/userSlice";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerLogOut = () => {
    dispatch(logout({ credentials: "" }));
    navigate("/");
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/">logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>

            <Nav>
              <Nav.Link href="/gods">Dioses</Nav.Link>
              <Nav.Link href="/counter">Counters</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/addGod">Add god</Nav.Link>
              <Nav.Link href="/listGods">list gods</Nav.Link>
              <Nav.Link href="/editGods">list gods</Nav.Link>
              <Nav.Link onClick={handlerLogOut}>Log out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
