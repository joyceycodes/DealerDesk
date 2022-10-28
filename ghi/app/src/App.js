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
import VehicleModelsList from './inventory/VehicleModelsList';
import { useState, useEffect } from 'react';

function App(props) {

  const [ salesRecords, setSalesRecords ] = useState([]);
  const [ salesPersons, setSalesPersons ] = useState([]);
  const [ vehicleModels, setVehicleModels ] = useState([]);
  const [ manufacturers, setManufacturers ] = useState([]);

  async function getSalesRecords(){
    const salesRecordsResponse = await fetch('http://localhost:8090/api/salesrecords/');
    if(salesRecordsResponse.ok){
      const { sales_records } = await salesRecordsResponse.json();
      setSalesRecords(sales_records);
    }
  }
  async function getSalesPersons(){
    const salesPersonsResponse = await fetch('http://localhost:8090/api/salespersons/');
    if(salesPersonsResponse.ok){
      const { sales_persons } = await salesPersonsResponse.json();
      setSalesPersons(sales_persons);
    }
  }

  async function getVehicleModels() {
    const vehicleModelsResponse = await fetch ('http://localhost:8100/api/models/');
    if (vehicleModelsResponse.ok) {
      const { models } = await vehicleModelsResponse.json()
      setVehicleModels(models)
    }
  }
  async function getManufacturers() {
    const manufacturersResponse = await fetch ('http://localhost:8100/api/manufacturers/');
    if (manufacturersResponse.ok) {
      const { manufacturers } = await manufacturersResponse.json()
      setManufacturers(manufacturers)
    }
  }

  useEffect(() => {
    getSalesRecords();
    getSalesPersons();
    getVehicleModels();
    getManufacturers();
  }, []);


  if (props.appointments === undefined) {
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
            <Route path="" element={<SalesPersonHistoryList salesRecords={salesRecords} salesPersons={salesPersons}/>}  />
            <Route path="new" element={<SalesPersonForm getSalesPersons={getSalesPersons}/>}  />
          </Route>
          <Route path="customers">
            <Route path="" />
            <Route path="new" element={<CustomerForm/>}  />
          </Route>
          <Route path="salesrecords">
            <Route path="" element={<SalesRecordList salesRecords={salesRecords}/>} />
            <Route path="new" element={<SaleRecordForm getSalesRecords={getSalesRecords}/>}  />
          </Route>
          <Route path="manufacturers">
            <Route path="" element={<ManufacturersList manufacturers={manufacturers}/>} />
            <Route path="new" element={<ManufacturerForm getManufacturers={getManufacturers}/>}  />
          </Route>
          <Route path="vehiclemodels">
            <Route path="" element={<VehicleModelsList vehicleModels={vehicleModels}/>} />
            <Route path="new" />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
