
function AutomobilesList(props) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Color</th>
                    <th>Picture</th>
                    <th>VIN</th>
                </tr>
            </thead>
            <tbody>
                {props.automobiles.map(automobile => {
                    return (
                        <tr key={automobile.href}>
                            <td>{automobile.year}</td>
                            <td>{automobile.model.manufacturer.name} </td>
                            <td>{automobile.model.name}</td>
                            <td>{automobile.color}</td>
                            <td><img style={{ width: 500 }} src={automobile.model.picture_url} alt="" /></td>
                            <td>{automobile.vin}</td>
                        </tr>
                    )
                })}

            </tbody>
        </table>
    );
}

export default AutomobilesList;
