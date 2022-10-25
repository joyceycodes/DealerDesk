import { NavLink, Outlet } from "react-router-dom";

function SalesList(props) {
    return (
        <div>
            <h1>List of all sales </h1>
            <button type="button" className="btn btn-light">
                <NavLink className="nav-link" to="/salesperson/new">New Sales Person</NavLink>
            </button>
            <Outlet/>
        </div>
    )
}
export default SalesList;