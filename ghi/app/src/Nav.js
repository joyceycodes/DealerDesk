import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <Navbar className="navbar navbar-expand-lg navbar-dark bg-success">
      <Container>
        <Navbar.Brand as={NavLink} to="/">CarCar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Sales" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="salesrecords/">Sales Leaderboard</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="salespersons/">Individual Sales History</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="salesrecords/new/">Log a Sale</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="salespersons/new/">Register a Sales Person</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="customers/new/">Add a Customer</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Service" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="serviceappointments/">View Service Appointments</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="serviceappointments/schedule/">Schedule a Service Appointment</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="technicians/new/">Register a Technician</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Inventory" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="manufacturers/">View Manufacturers</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="manufacturers/new/">Add a Manufacturer</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="vehiclemodels/">View Vehicle Models</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="vehiclemodels/new/">Add Vehicle Model</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="automobiles/">Show All Automobiles in Inventory</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="automobiles/new/">Add an Automobile to Inventory</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
