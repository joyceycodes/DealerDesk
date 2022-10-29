import React from "react";

class ManufacturerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            name:"",
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event){
        const value = event.target.value;
        this.setState({name: value});
    }

   
    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state};

        const url = "http://localhost:8100/api/manufacturers/";

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
                submitted: true
            }
            this.setState(cleared);

            this.props.getManufacturers();
        }
    }

    render () {
        return(
            <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a manufacturer</h1>
                    <form onSubmit={this.handleSubmit} id="create-conference-form">
                    <div className="form-floating mb-3">
                        <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                        <label htmlFor="name">Name</label>
                    </div>
                    <button className="btn btn-outline-dark">Create</button>
                    </form>
                    <div className={ this.state.submitted ? "alert alert-success mb-0 mt-3" :"alert alert-success d-none mb-0"} id="success-message">
                            This manufacturer has been registered.
                    </div>
                </div>
                </div> 
            </div>
        )
    }
}
export default ManufacturerForm;