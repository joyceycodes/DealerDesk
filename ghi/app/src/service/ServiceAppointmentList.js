import React from 'react';


function ServiceAppointmentsList(props) {
    console.log(props);
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Customer name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                </tr>
            </thead>
            <tbody>
                {props.appointments.map(appointment => {
                    return (
                        <tr key={appointment.href}>
                            <td>{appointment.vin}</td>
                            <td>{appointment.owner}</td>
                            <td>{appointment.date} </td>
                            <td>{appointment.time} </td>
                            <td>{appointment.technician.name} </td>
                            <td>{appointment.reason} </td>
                            <td><button type="button" className="btn btn-danger" onClick={() => deleteItem(`${appointment.id}`)}>Cancel</button></td>
                        </tr>

                    )
                })}
            </tbody>
        </table>
    );
}

export default ServiceAppointmentsList;

async function deleteItem(appointmentid) {
    const appointmentUrl = `http://localhost:8080${appointmentid}`;
    const fetchOptions = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    await fetch(appointmentUrl, fetchOptions);
    window.location.reload(true);
  }
