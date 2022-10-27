import React from 'react';

class SaleRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            automobiles: [], 
            salesPersons: [],
            customers: [],
            salesPrice:'',
        };
        this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleSalesPriceChange = this.handleSalesPriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    async componentDidMount() {
        const autoUrl = "http://localhost:8090/api/automobileVOs/";
        const autoResponse = await fetch(autoUrl);
        if(autoResponse.ok) {
            const data = await autoResponse.json();
            this.setState({automobiles: data.autos});
        }
        
        const salesPersonUrl = "http://localhost:8090/api/salespersons";
        const salesPersonResponse = await fetch(salesPersonUrl)
        if(salesPersonResponse.ok) {
                const data = await salesPersonResponse.json();
                this.setState({salesPersons: data.sales_persons});
            }

        const customerUrl = "http://localhost:8090/api/customers";
        const customerResponse = await fetch(customerUrl)
        if(customerResponse.ok) {
                const data = await customerResponse.json();
                this.setState({customers: data.customers});
            }
            
        }

    
    handleAutomobileChange(event) {
        const value = event.target.value;
        this.setState({automobile: value})
    }

    handleSalesPersonChange(event) {
        const value = event.target.value;
        this.setState({salesPerson: value})
    }

    handleCustomerChange(event){
        const value = event.target.value;
        this.setState({customer: value})
    }

    handleSalesPriceChange(event){
        const value = event.target.value;
        this.setState({salesPrice: value})
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.sales_person = data.salesPerson;
        data.sales_price = data.salesPrice;
        delete data.salesPerson;
        delete data.salesPersons;
        delete data.salesPrice;
        delete data.automobiles;
        delete data.customers;
        
        const isSoldUrl = `http://localhost:8090/api/automobileVOs/${data.automobile}/`;
        const fetchOptions = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const isSoldResponse = await fetch(isSoldUrl, fetchOptions);
        
        const url = 'http://localhost:8090/api/salesrecords/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const salesRecordResponse = await fetch(url, fetchConfig);
        

        if (salesRecordResponse.ok && isSoldResponse.ok) {

            console.log("car sold!!!", salesRecordResponse)

            const cleared = {
                automobile: '',
                customer: '',
                salesPerson: '',
                salesPrice: '',
            };

            
            this.setState(cleared);
            window.location.reload(true);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Record a new sale</h1>
                        <form onSubmit={this.handleSubmit} id="create-location-form">

                        <div className="mb-3">
                            <select onChange={this.handleAutomobileChange} required id="automobile" name="automobile" className="form-select">
                                <option value="">Choose a automobile</option>
                                {this.state.automobiles
                                .filter(automobile => automobile.is_sold===false)
                                .map(automobile=> {
                                    return (
                                        <option value={automobile.vin} key={automobile.vin}>
                                            {automobile.vin}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className="mb-3">
                            <select onChange={this.handleSalesPersonChange} required id="salesPerson" name="salesPerson" className="form-select">
                                <option value="">Choose a sales person</option>
                                {this.state.salesPersons.map(salesPerson=> {
                                    return (
                                        <option value={salesPerson.employee_number} key={salesPerson.employee_number}>
                                            {salesPerson.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select onChange={this.handleCustomerChange} required id="customer" name="customer" className="form-select">
                                <option value="">Choose a customer</option>
                                {this.state.customers.map(customer => {
                                    return (
                                        <option value={customer.id} key={customer.id}>
                                            {customer.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        
                        <div className="form-floating mb-3">
                            <input onChange={this.handleSalesPriceChange} placeholder="Sales Price" required type="number" min="1" name="salesPrice" id="salesPrice" className="form-control"/>
                            <label htmlFor="salesPrice">Sales Price</label>
                        </div>


                        <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
          </div>
        );
    }
}

export default SaleRecordForm;