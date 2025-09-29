import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap"; // corrected import

function StudentMenu() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Student Portal</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/StudentMenu">Home</Nav.Link>
          <Nav.Link as={Link} to="/lost-item">Lost Item</Nav.Link>
          <Nav.Link as={Link} to="/found-item">Found Item</Nav.Link>
          <NavDropdown title="Reports" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/lost-item-report">Lost Item Report</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/found-item-report">Found Item Report</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default StudentMenu;
