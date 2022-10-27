import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
                {/* list all sales page */}
                <NavLink className="nav-link active dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" to="/salesrecords">Sales</NavLink>
                {/* <div className="dropdown-menu">
                  <NavLink className="dropdown-item" to="/salespersons">Sales Persons</NavLink>
                </div> */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
