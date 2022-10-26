

function SalesRecordList(props) {
    return (
        <div>
            <table className="table table-striped">
            <thead>
                <tr>
                    <th>Sales Person</th>
                    <th>Employee Number</th>
                    <th>Customer</th>
                    <th>VIN</th>
                    <th>Sales Price</th>
                </tr>
            </thead>
            <tbody>
                {props.salesRecords.map(saleRecord => {
                return (
                    <tr key={saleRecord.automobile.vin}>
                        <td>{saleRecord.sales_person.name}</td>
                        <td>{saleRecord.sales_person.employee_number}</td>
                        <td>{saleRecord.customer.name}</td>
                        <td>{saleRecord.automobile.vin}</td>
                        <td>{saleRecord.sales_price}</td>

                    </tr>
                ) 
            })}
            </tbody>
            </table>
        </div>
    )

}
export default SalesRecordList;