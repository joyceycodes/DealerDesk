import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


async function loadData() {
  const appointmentResponse = await fetch('http://localhost:8080/api/serviceappointments/');
  const salesRecordResponse = await fetch('http://localhost:8090/api/salesrecords/');
  const salesPersonsResponse = await fetch('http://localhost:8090/api/salespersons');
  const salesAutomobileVOResponse = await fetch('http://localhost:8090/api/automobileVOs/');
  const automobileVOResponse = await fetch ('http://localhost:8080/api/automobileVOs/');
  const manufacturersResponse = await fetch('http://localhost:8100/api/manufacturers/');
  const vehicleModelsResponse = await fetch('http://localhost:8100/api/models/');
  const automobilesResponse = await fetch("http://localhost:8100/api/automobiles/");

  if (appointmentResponse.ok &&
      salesRecordResponse.ok &&
      salesPersonsResponse &&
      salesAutomobileVOResponse &&
      automobileVOResponse.ok &&
      manufacturersResponse.ok &&
      vehicleModelsResponse.ok &&
      automobilesResponse.ok) {

    const appointmentData = await appointmentResponse.json();
    const salesRecordData = await salesRecordResponse.json();
    const automobileVOData = await automobileVOResponse.json();
    const salesPersonsData = await salesPersonsResponse.json();
    const salesAutomobileVOData = await salesAutomobileVOResponse.json();
    const manufacturersData = await manufacturersResponse.json();
    const vehicleModelsData = await vehicleModelsResponse.json();
    const automobilesData = await automobilesResponse.json();

    root.render (
      <React.StrictMode>
        <App
          appointments={appointmentData.service_appointments}
          salesRecords={salesRecordData.sales_records}
          automobileVOs = {automobileVOData.automobileVOs}
          salesPersons={salesPersonsData.sales_persons}
          salesAutomobileVO={salesAutomobileVOData.autos}
          manufacturers={manufacturersData.manufacturers}
          vehicleModels={vehicleModelsData.models}
          automobiles={automobilesData.autos}
        />
      </React.StrictMode>
    );
    } else {
      console.error("this is an error:", appointmentResponse);
      console.error("sales record error:", salesRecordResponse);
      console.error("this is an automobileVO error:", automobileVOResponse);
      console.error("sales persons error:", salesPersonsResponse);
      console.error("sales automobilesVOs error:", salesAutomobileVOResponse);
      console.error("manufacturers error:", manufacturersResponse);
      console.error("vehicle model error:", vehicleModelsResponse);
      console.error("automobiles error:", automobilesResponse);
    }
}

loadData();
