import React, { useState } from 'react';



function ServiceAppointmentsList(props) {

    let automobileVOList = [];
    for (let auto of props.automobileVOs) {
        automobileVOList.push(auto["vin"])
    }

    const [searchVIN, setsearchVIN] = useState("");

    const upperCaseChange = event => {
        setsearchVIN(event.target.value.toUpperCase());
    };


    return (
        <>
            <form>
                <div className="input-group mb-3 mt-4">

                    <input type="text" className="form-control" placeholder="Search by VIN (17 characters)" maxLength={17} aria-describedby="basic-addon2"
                        value={searchVIN} onChange={upperCaseChange} id="vin" name="vin" />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button">Search <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg></button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-4">Scheduled Appointments</h2>
                <table className="table table-striped table-hover mt-4 mb-5">
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
                        {props.appointments.filter(car => car.vin.includes(searchVIN) || searchVIN === "").map(appointment => {
                            if (appointment.is_done === false) {
                                return (
                                    <tr key={appointment.href}>
                                        <td> {automobileVOList.includes(appointment.vin) &&

                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gold" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
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
                    <tbody>
                        {props.appointments.filter(car => car.vin.includes(searchVIN) || searchVIN === "").map(appointment => {
                            if (appointment.is_done === true) {
                                return (
                                    <tr key={appointment.href}>
                                        <td> {automobileVOList.includes(appointment.vin) &&

                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gold" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                            </svg>}</td>
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
