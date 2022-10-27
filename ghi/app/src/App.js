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
import ManufacturersList from './inventory/ManufacturersList';
import ManufacturerForm from './inventory/ManufacturerForm';
import VehicleModelForm from './inventory/VehicleModelForm';
import AutomobilesList from './inventory/AutomobilesList';
import AutomobileForm from './inventory/AutomobileForm';


function App(props) {

  if (props.appointments === undefined ||
      props.salesRecords === undefined ||
      props.automobileVOs === undefined ||
      props.salesPersons === undefined||
      props.salesAutomobileVO === undefined ||
      props.manufacturers === undefined ||
      props.vehicleModels === undefined ||
      props.automobiles === undefined ) {

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
            <Route path="" element={<SalesPersonHistoryList salesRecords={props.salesRecords} salesPersons={props.salesPersons}/>}  />
            <Route path="new" element={<SalesPersonForm/>}  />
          </Route>
          <Route path="customers">
            <Route path="" />
            <Route path="new" element={<CustomerForm/>}  />
          </Route>
          <Route path="salesrecords">
            <Route path="" element={<SalesRecordList salesRecords={props.salesRecords}/>} />
            <Route path="new" element={<SaleRecordForm/>}  />
          </Route>
          <Route path="manufacturers">
            <Route path="" element={<ManufacturersList manufacturers={props.manufacturers}/>} />
            <Route path="new" element={<ManufacturerForm/>}  />
          </Route>
          <Route path="vehiclemodels/">
            {/* <Route path="" element={<VehicleModelsList vehicleModels = {props.vehicleModels}/>} /> */}
            <Route path="new" element={<VehicleModelForm/>}/>
          </Route>
          <Route path="automobiles/">
            <Route path="" element={<AutomobilesList automobiles = {props.automobiles}/>} />
            <Route path="new" element={<AutomobileForm/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
