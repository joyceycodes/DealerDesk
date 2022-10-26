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

  if (appointmentResponse.ok && salesRecordResponse.ok && salesPersonsResponse) {
    const appointmentData = await appointmentResponse.json();
    const salesRecordData = await salesRecordResponse.json();
    const salesPersonsData = await salesPersonsResponse.json();
    
    // console.log("This is the data variable:", appointmentData);
    // console.log("The appointmentData.service_appointments:", appointmentData.service_appointments)
    root.render (
      <React.StrictMode>
        <App 
          appointments={appointmentData.service_appointments} 
          salesRecords={salesRecordData.sales_records} 
          salesPersons={salesPersonsData.sales_persons}
     
        />
      </React.StrictMode>
    );
    } else {
      console.error("this is an error:", appointmentResponse);
      console.error("sales record error:", salesRecordResponse);
      console.error("sales persons error:", salesPersonsResponse);
    }
}

loadData();
