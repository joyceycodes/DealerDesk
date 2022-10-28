import React from 'react';

class AutomobileForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: "",
            year: "",
            vin: "",
            models: [],
        };

        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleColorChange(event) {
        const value = event.target.value;
        this.setState({ color: value })
    }

    handleYearChange(event) {
        const value = event.target.value;
        this.setState({ year: value })
    }

    handleVinChange(event) {
        const value = event.target.value;
        this.setState({ vin: value })
    }

    handleModelChange(event) {
        const value = event.target.value;
        this.setState({ model: value })
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        data.model_id = data.model;
        delete data.model;
        delete data.models;

        const automobileURL = "http://localhost:8100/api/automobiles/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(automobileURL, fetchConfig);
        if (response.ok) {

            const cleared = {
                color: "",
                year: "",
                vin: "",
                model: "",
                isSubmitted: true,
            };

            this.setState(cleared);

            this.props.getAutomobiles();
        }

    }

    async componentDidMount() {
        const modelURL = "http://localhost:8100/api/models/";

        const response = await fetch(modelURL);

        if (response.ok) {
            const data = await response.json();
            this.setState({ models: data.models })
        }
    }


    render() {

        let successMessageClass = "alert alert-success mb-0 d-none";
        if (this.state.isSubmitted) {
            successMessageClass = "alert alert-success mb-0";
        }
        return (<div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add an Automobile</h1>
                    <form onSubmit={this.handleSubmit} id="create-appointment-form">
                        <div className="form-floating mb-3">
                            <input onChange={this.handleColorChange} value={this.state.color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleYearChange} value={this.state.year} placeholder="year" required type="number" maxLength={4} name="year" id="year" className="form-control" />
                            <label htmlFor="year">Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleVinChange} value={this.state.vin} placeholder="VIN" required type="text" maxLength={17} name="vin" id="vin" className="form-control" />
                            <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={this.handleModelChange} value={this.state.model} required name="model" id="model" className="form-select">
                                <option value="">Select a Model </option>
                                {this.state.models.map(model => {
                                    return (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary mb-3">Create</button>
                        <div>
                            <p className={successMessageClass}>This Automobile has been registered</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>)
    }
}

export default AutomobileForm;
