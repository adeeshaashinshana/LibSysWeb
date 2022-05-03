import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const Header = () => {
  const today = new Date().toISOString();

  return (
    <Navbar bg="dark" sticky="top">
      <Container>
        <Navbar.Brand className="text-light">LibSys</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="text-light">
            {today.split("T")[0]}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
