import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './service/TechnicianForm';
import ServiceAppointmentForm from './service/ServiceAppointmentForm';
import SalesPersonForm from './sales/SalesPersonForm';
import CustomerForm from './sales/CustomerForm';
import SalesPersonHistoryList from './sales/SalesPersonHistoryList';
import SalesRecordList from './sales/SalesRecordList';
import SaleRecordForm from './sales/SaleRecordForm';
import ServiceAppointmentsList from './service/ServiceAppointmentList';

function App(props) {

  if (props.appointments === undefined) {
    return null;
  }
  if (props.salesRecords === undefined) {
    return null;
  }

  if (props.automobileVOs === undefined) {
    return null;
  }

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
              <Route path="" element={<ServiceAppointmentsList appointments={props.appointments} automobileVOs = {props.automobileVOs} />}/>
              <Route path="schedule" element={<ServiceAppointmentForm />} />
          </Route>
          <Route path="salespersons">
            <Route path="" element={<SalesPersonHistoryList/>}  />
            <Route path="new" element={<SalesPersonForm/>}  />
          </Route>
          <Route path="customers">
            <Route path="" />
            <Route path="new" element={<CustomerForm/>}  />
          </Route>
          <Route path="salesrecord">
            <Route path="" element={<SalesRecordList salesRecords={props.salesRecords}/>} />
            <Route path="new" element={<SaleRecordForm/>}  />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
