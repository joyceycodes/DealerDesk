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
  // console.log(appointmentResponse);

  if (appointmentResponse.ok) {
    const appointmentData = await appointmentResponse.json();
    // console.log("This is the data variable:", appointmentData);
    // console.log("The appointmentData.service_appointments:", appointmentData.service_appointments)

    root.render (
      <React.StrictMode>
        <App appointments={appointmentData.service_appointments} />
      </React.StrictMode>
    );
    } else {
      console.error("this is an error:", appointmentResponse);
    }
}

loadData();
