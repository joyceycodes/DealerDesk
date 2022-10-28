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
  const salesRecordResponse = await fetch('http://localhost:8090/api/salesrecords/');
  const salesPersonsResponse = await fetch('http://localhost:8090/api/salespersons');
  const salesAutomobileVOResponse = await fetch('http://localhost:8090/api/automobileVOs/');
  const manufacturersResponse = await fetch('http://localhost:8100/api/manufacturers/');

  if (
      salesRecordResponse.ok &&
      salesPersonsResponse &&
      salesAutomobileVOResponse &&
      manufacturersResponse.ok ) {

    const salesRecordData = await salesRecordResponse.json();
    const salesPersonsData = await salesPersonsResponse.json();
    const salesAutomobileVOData = await salesAutomobileVOResponse.json();
    const manufacturersData = await manufacturersResponse.json();


    root.render (
      <React.StrictMode>
        <App

          salesRecords={salesRecordData.sales_records}
          salesPersons={salesPersonsData.sales_persons}
          salesAutomobileVOs={salesAutomobileVOData.autos}
          manufacturers={manufacturersData.manufacturers}
        />
      </React.StrictMode>
    );
    } else {

      console.error("sales record error:", salesRecordResponse);
      console.error("sales persons error:", salesPersonsResponse);
      console.error("sales automobilesVOs error:", salesAutomobileVOResponse);
      console.error("manufacturers error:", manufacturersResponse);
    }
}

loadData();
