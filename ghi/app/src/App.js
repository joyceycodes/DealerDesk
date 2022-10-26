import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './service/TechnicianForm';
import ServiceAppointmentForm from './service/ServiceAppointmentForm';
import ServiceAppointmentsList from './service/ServiceAppointmentList';

function App(props) {

  if (props.appointments === undefined) {
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
              <Route path="" element={<ServiceAppointmentsList appointments={props.appointments} />}/>
              <Route path="new" element={<ServiceAppointmentForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
