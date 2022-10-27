import React, { useState } from 'react';

function AutomobilesList(props) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {props.automobiles.map(automobile => {
                    return (
                        <tr key={automobile.href}>
                            <td>{automobile.year}</td>
                            <td>{automobile.model.manufacturer.name} </td>
                            <td>{automobile.model.name}</td>
                            <td><img style={{ width: 500 }} src={automobile.model.picture_url} alt="" /></td>
                        </tr>
                    )
                })}

            </tbody>
        </table>
    );
}

export default AutomobilesList;
