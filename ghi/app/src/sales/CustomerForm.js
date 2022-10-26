import React from "react";

class CustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            name:"",
            address:"",
            phoneNumber:"",
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event){
        const value = event.target.value;
        this.setState({name: value});
    }

    handleAddressChange(event){
        const value = event.target.value;
        this.setState({address: value});
    }

    handlePhoneNumberChange(event){
        const value = event.target.value;
        this.setState({phoneNumber: value});
    }

    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state};
        console.log(data);
        data.phone_number = data.phoneNumber;
        delete data.phoneNumber;

        const url = "http://localhost:8090/api/customers/";

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
              },
        };

        const response = await fetch(url, fetchConfig);

        if (response.ok) {
            await response.json();

            const cleared = {
                name:"",
                address:"",
                phoneNumber:""
            }

            this.setState(cleared);
            
        }
    }

    render () {
        return(
            <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a new customer</h1>
                    <form onSubmit={this.handleSubmit} id="create-conference-form">
                    <div className="form-floating mb-3">
                        <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleAddressChange} value={this.state.address} placeholder="Address" required type="text" name="address" id="address" className="form-control"/>
                        <label htmlFor="name">Address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handlePhoneNumberChange} value={this.state.phoneNumber} placeholder="Phone Number" required type="text" name="phoneNumber" id="phoneNumber" className="form-control"/>
                        <label htmlFor="name">Phone Number</label>
                    </div>
                    <button className="btn btn-outline-dark">Create</button>
                    </form>
                </div>
                </div>
            </div>
        )
    }
}
export default CustomerForm;