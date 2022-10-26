import React from 'react';


function ServiceAppointmentsList(props) {
    console.log(props);
    return (
        <>
            <div>
                <h2>Scheduled Appointments</h2>
                <table className="table table-striped table-hover">
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
                            if (appointment.is_done === false) {
                                return (
                                    <tr key={appointment.href}>
                                        <td>{appointment.vin}</td>
                                        <td>{appointment.owner}</td>
                                        <td>{appointment.date} </td>
                                        <td>{appointment.time} </td>
                                        <td>{appointment.technician.name} </td>
                                        <td>{appointment.reason} </td>
                                        <td><button type="button" className="btn btn-danger" onClick={() => deleteItem(`${appointment.href}`)}>Cancel</button></td>
                                        <td><button type="button" className="btn btn-success" onClick={() => finishItem(`${appointment.href}`)}>Finished</button></td>
                                    </tr>

                                )
                            }
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <h4>Completed Service Appointments</h4>
                <table className="table table-striped table-dark">
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
                            if (appointment.is_done === true) {
                                return (
                                    <tr key={appointment.href}>
                                        <td>{appointment.vin}</td>
                                        <td>{appointment.owner}</td>
                                        <td>{appointment.date} </td>
                                        <td>{appointment.time} </td>
                                        <td>{appointment.technician.name} </td>
                                        <td>{appointment.reason} </td>
                                    </tr>

                                )
                            }
                        })}

                    </tbody>
                </table>
            </div>
        </>
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

async function finishItem(appointmentid) {
    const appointmentUrl = `http://localhost:8080${appointmentid}`;
    const fetchOptions = {
        method: "put",
        headers: {
            'Content-Type': 'application/json',
        },
    };

    await fetch(appointmentUrl, fetchOptions);
    window.location.reload(true);

}
