
function SalesRecordList(props) {

    function handleSalesTotal () {
        
        return Object.values(props.salesRecords.reduce((acc, record) => {
            if (acc[record.sales_person.employee_number]) {
                acc[record.sales_person.employee_number].count += 1;
                acc[record.sales_person.employee_number].total += record.sales_price;
            } else {
                acc[record.sales_person.employee_number] = record.sales_person;
                acc[record.sales_person.employee_number].count = 1;
                acc[record.sales_person.employee_number].total = record.sales_price;

            }
            return acc;
        }, {})).sort((a,b)=> b.count-a.count); 
    }

    console.log(handleSalesTotal())
    return (
        <div>
            <h1 className="mt-3">Sales Leaderboard</h1>
            <table className="table table-striped">
            <thead>
                <tr>
                    <th>Sales Person</th>
                    <th>Employee Number</th>
                    <th>Total Sales</th>
                    <th>Cars Sold</th>
                </tr>
            </thead>
            <tbody>
                {handleSalesTotal().map(salesPerson => {
                return (
                    <tr key={salesPerson.employee_number}>
                        <td>{salesPerson.name}</td>
                        <td>{salesPerson.employee_number}</td>
                        <td>{salesPerson.total}</td>
                        <td>{salesPerson.count}</td>                        
                    </tr>
                ) } )
            }
                
            </tbody>
            </table>
        </div>
    )

}
export default SalesRecordList;