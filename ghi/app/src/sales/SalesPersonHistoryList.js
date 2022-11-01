import React, { useState } from "react";
import { NumericFormat } from 'react-number-format';

function SalesPersonHistoryList(props) {
    const [selectSalesPerson, setSelectSalesPerson] = useState("");
        
    return (
        <div>
            <div className="row mt-3">
                <div className="col-12">
                    <div>
                        <h1>Individual sales history</h1>
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
                </div>
            </div>
            <div></div>
            <table className="table table-striped mt-3">
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
                .filter(salesPerson => salesPerson.sales_person.employee_number == selectSalesPerson || selectSalesPerson === "")
                .map(saleRecord => {
                return (
                    <tr key={saleRecord.automobile.vin}>
                        <td>{saleRecord.sales_person.name}</td>
                        <td>{saleRecord.customer.name}</td>
                        <td>{saleRecord.automobile.vin}</td>
                        <td><NumericFormat value={saleRecord.sales_price} displayType={'text'} thousandSeparator={true} prefix={'$'}/></td>
                    </tr>
                ) 
            })}
            </tbody>
            </table>
        </div>
    )
}
export default SalesPersonHistoryList;