import React from 'react';


function ServiceAppointmentsList(props) {
    //console.log(props.appointments)
    let automobileVOList = [];
    for (let auto of props.automobileVOs){
        automobileVOList.push(auto["vin"])
    }
    console.log (automobileVOList)
    return (
        <>
            <div>
                <h2>Scheduled Appointments</h2>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>VIP</th>
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
                                        <td> { automobileVOList.includes(appointment.vin) &&

                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gold" className="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>}</td>
                                        <td>{appointment.vin} </td>
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

  async function finishItem(appointmentid){
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
