import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <Navbar className="navbar navbar-expand-lg navbar-dark bg-success">
      <Container>
        <Navbar.Brand as={NavLink} to="#home">CarCar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <NavDropdown title="Sales" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="salespersons/">View Sales History</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="salesrecords/new">Log a Sale</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="salespersons/new/">Register a Sales Person</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="customers/new/">Add a Customer</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Service" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="serviceappointments/">View Service Appointments</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="serviceappointments/schedule/">Schedule a Service Appointment</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="technicians/new/">Register a Technician</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Inventory" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="manufacturers/">View Manufacturers</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="manufacturers/new/">Add a Manufacturer</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="vehicleModels/">View Vehicle Models</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
// import { NavLink } from 'react-router-dom';

// function Nav() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-success">
//       <div className="container-fluid">
//         <NavLink className="navbar-brand" to="/">CarCar</NavLink>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//           <li className="nav-item">
//               {/* list all sales page */}
//               <NavLink className="nav-link active" aria-current="page" to="/salesperson">Sales Person</NavLink>
//             </li>
//           <li className="nav-item">
//               <NavLink className="nav-link active" aria-current="page" to="/technicians/new">Register a Technician</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link active" aria-current="page" to="/serviceappointments/new">Schedule a Service Appointment</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link active" aria-current="page" to="/serviceappointments">Scheduled Service Appointments</NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Nav;
