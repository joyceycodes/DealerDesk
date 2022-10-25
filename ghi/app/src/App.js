import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './service/TechnicianForm';
import ServiceAppointmentForm from './service/ServiceAppointmentForm';
import SalesPersonForm from './sales/SalesPersonForm';
import CustomerForm from './sales/CustomerForm';
import SalesPersonHistoryList from './sales/SalesPersonHistoryList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians" >
              <Route path="" />
              <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="serviceappointments">
              <Route path="" />
              <Route path="schedule" element={<ServiceAppointmentForm />} />
          </Route>
          <Route path="salesperson">
            <Route path="" element={<SalesPersonHistoryList/>}  />
            <Route path="new" element={<SalesPersonForm/>}  />
          </Route>
          <Route path="customer">
            <Route path="" />
            <Route path="new" element={<CustomerForm/>}  />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
