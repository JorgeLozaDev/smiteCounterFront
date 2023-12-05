import React from "react";
import { Navbar, Container, Nav, NavDropdown, Image } from "react-bootstrap";

export const Header = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/">
            <Image src="../../../public/logo2.png" className="logo" fluid />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>

            <Nav>
              <NavDropdown title="Menú" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/profile">Perfil</NavDropdown.Item>

                <NavDropdown.Item href="/mettings">Citas</NavDropdown.Item>
                <NavDropdown.Divider />

                <NavDropdown.Item href="/admin/listusers">
                  Lista de usuarios
                </NavDropdown.Item>

                <NavDropdown.Item>Log out</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/singup">Singup</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
