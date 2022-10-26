import React, { useState } from "react";

function SalesPersonHistoryList(props) {
    const [selectSalesPerson, setSelectSalesPerson] = useState("");

    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div>
                        <h1>Sales person history</h1>
                        <form id="create-location-form">
                        <div className="mb-3">
                            <select value={selectSalesPerson} onChange={(event) => setSelectSalesPerson(event.target.value)} required id="salesPerson" name="salesPerson" className="form-select">
                                <option value="">Choose a sales person</option>
                                {props.salesPersons.map(salePerson => {
                                    return ( 
                                        <option value={salePerson.employee_number} key={salePerson.employee_number}>
                                    {salePerson.name}
                                </option>
                            )
                        })}
                            </select>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            <table className="table table-striped">
            <thead>
                <tr>
                    <th>Sales Person</th>
                    <th>Customer</th>
                    <th>VIN</th>
                    <th>Sales Price</th>
                </tr>
            </thead>
            <tbody>
                {props.salesRecords
                .filter(salesPerson => salesPerson.sales_person.employee_number === selectSalesPerson)
                .map(saleRecord => {
                return (
                    <tr key={saleRecord.automobile.vin}>
                        <td>{saleRecord.sales_person.name}</td>
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
export default SalesPersonHistoryList;