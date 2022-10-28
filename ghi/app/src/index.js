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
  const automobileVOResponse = await fetch ('http://localhost:8080/api/automobileVOs/');
  if (appointmentResponse.ok && automobileVOResponse.ok){
    const appointmentData = await appointmentResponse.json();
    const automobileVOData = await automobileVOResponse.json();
    
    root.render (
      <React.StrictMode>
        <App 
          appointments={appointmentData.service_appointments} 
          automobileVOs = {automobileVOData.automobileVOs} 
        />
      </React.StrictMode>
    );
    } else {
      console.error("this is an error:", appointmentResponse);
      console.error("this is an automobileVO error:", automobileVOResponse);
    }
}

loadData();
