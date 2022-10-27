function ModelsList(props) {
    return (
        <div>
            <table className="table table-striped">
            <thead>
                <tr>
                    <th>Manufacturers</th>

                </tr>
            </thead>
            <tbody>
                {props.manufacturers.map(manufacturer => {
                return (
                    <tr key={manufacturer.name}>
                        <td>{manufacturer.name}</td>
                    </tr>
                ) 
            })}
            </tbody>
            </table>
        </div>
    )

}
export default ModelsList;