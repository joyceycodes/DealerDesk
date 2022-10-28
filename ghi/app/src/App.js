import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
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

import VehicleModelsList from './inventory/VehicleModelsList';

function App(props) {

  const [ automobiles, setAutomobiles ] = useState([]);
  const [ appointments, setAppointments ] = useState([]);
  const [ automobileVOs, setAutomobileVOs ] = useState([]);
  const [ vehicleModels, setVehicleModels ] = useState([]);


async function getAppointments() {
  const appointmentResponse = await fetch('http://localhost:8080/api/serviceappointments/');
  if (appointmentResponse.ok) {
    const { service_appointments } = await appointmentResponse.json()
    setAppointments(service_appointments)
  }
}

  async function getAutomobiles() {
    const automobilesResponse = await fetch("http://localhost:8100/api/automobiles/");
    if (automobilesResponse.ok) {
      const { autos } = await automobilesResponse.json()
      setAutomobiles(autos)
  }}


async function getAutomobileVOs () {
  const automobileVOsResponse = await fetch ('http://localhost:8080/api/automobileVOs/');
  if (automobileVOsResponse.ok) {
    const { automobileVOs } = await automobileVOsResponse.json()
    setAutomobileVOs(automobileVOs)
  }
}

async function getVehicleModels() {
  const vehicleModelsResponse = await fetch ('http://localhost:8100/api/models/');
  if (vehicleModelsResponse.ok) {
    const { models } = await vehicleModelsResponse.json()
    setVehicleModels(models)
  }
}

  useEffect(() => {
    getAutomobiles();
    getAppointments();
    getAutomobileVOs();
    getVehicleModels();
  }, [])


  if (props.salesRecords === undefined ||
      props.salesPersons === undefined||
      props.salesAutomobileVO === undefined ||
      props.manufacturers === undefined) {

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
              <Route path="" element={<ServiceAppointmentsList appointments={appointments} automobileVOs = {automobileVOs} />}/>
              <Route path="schedule" element={<ServiceAppointmentForm getAppointments={getAppointments}/>}/>
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
            <Route path="" element={<VehicleModelsList vehicleModels = {vehicleModels}/>} />
            <Route path="new" element={<VehicleModelForm getVehicleModels={getVehicleModels}/>}/>
          </Route>
          <Route path="automobiles/">
            <Route path="" element={<AutomobilesList automobiles={automobiles}/>} />
            <Route path="new" element={<AutomobileForm getAutomobiles={getAutomobiles}/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
