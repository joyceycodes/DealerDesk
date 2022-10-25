
import { NavLink, Outlet } from "react-router-dom";

function SalesPersonHistoryList(props) {
    return (
        <div>
            <h1>List of Sales Person Sales Histroy</h1>
            <button type="button" class="btn btn-light">
                <NavLink className="nav-link" to="/salesperson/new">New Sales Person</NavLink>
            </button>
            <Outlet/>
        </div>
    )
}
export default SalesPersonHistoryList;