function VehicleModelsList(props) {
  
    return (
        <div>
            <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Picture</th>

                </tr>
            </thead>
            <tbody>
                {props.vehicleModels.map(model => {
                return (
                    <tr key={model.href}>
                        <td>{model.name}</td>
                        <td>{model.manufacturer.name}</td>
                        <td><img className="img-fluid" style={{ width: 500 }} alt={`${model.manufacturer.name} ${model.name}`} src={`${model.picture_url}`} /></td>
                    </tr>
                ) 
            })}
            </tbody>
            </table>
        </div>
    )

}
export default VehicleModelsList;