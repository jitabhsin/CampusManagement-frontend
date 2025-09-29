// C:\Users\ASUS\Documents\Infosysproject2025\campus-frontVite-main\src\Components\LoginComponent\AdminMenu.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const AdminMenu = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
        <Navbar.Brand as={Link} to="/AdminMenu">
          Admin Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="View Reports" id="admin-reports-dropdown">
              <NavDropdown.Item as={Link} to="/lost-item-report">
                Lost Item Report
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/found-item-report">
                Found Item Report
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => navigate("/")}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="container text-center mt-5">
        <h1 className="display-4">Welcome, Admin!</h1>
        <p className="lead">
          Use the navigation bar to view lost and found item reports.
        </p>
      </div>
    </div>
  );
};

export default AdminMenu;