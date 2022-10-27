import React from 'react';

class VehicleModelForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            pictureUrl: '',
            manufacturers: [],
        };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePicturlUrlChange = this.handlePicturlUrlChange.bind(this);
    this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value})
    }

    handlePicturlUrlChange(event) {
        const value = event.target.value;
        this.setState({pictureUrl: value})
    }

    handleManufacturerChange(event) {
        const value = event.target.value;
        this.setState({manufacturer: value})
    }


    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.manufacturer_id = data.manufacturer;
        data.picture_url = data.pictureUrl;
        delete data.pictureUrl;
        delete data.manufacturer;
        delete data.manufacturers;
        console.log(data)

        const vehicleModelUrl = "http://localhost:8100/api/models/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json',
            }
        };

        const response = await fetch(vehicleModelUrl, fetchConfig)
        if (response.ok) {
            const newVehicleModel = await response.json();
            console.log(newVehicleModel)

            const cleared = {
                name: "",
                pictureUrl: "",
                manufacturer: "",
                isSubmitted: true,
            };

            this.setState(cleared);
        }

    }

    async componentDidMount () {
        const manufacturerURL = "http://localhost:8100/api/manufacturers/"

        const response = await fetch(manufacturerURL);

        if (response.ok) {
            const data = await response.json();
            this.setState({manufacturers: data.manufacturers});
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
                <h1>Add a Vehicle Model</h1>
                <form onSubmit={this.handleSubmit} id="create-appointment-form">
                    <div className="form-floating mb-3">
                        <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                        <label htmlFor="name">Model Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handlePicturlUrlChange} value={this.state.pictureUrl} placeholder="picture url" required type="text" name="picture_url" id="picturel_url" className="form-control" />
                        <label htmlFor="picturl_url">Picture URL</label>
                    </div>
                    <div className="mb-3">
                        <select onChange={this.handleManufacturerChange} value={this.state.manufacturer} required name="manufacturer" id="manufacturer" className="form-select">
                            <option value="">Select Manufacturer</option>
                            {this.state.manufacturers.map(manufacturer => {
                                return (
                                    <option key={manufacturer.id} value={manufacturer.id}>
                                        {manufacturer.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <button className="btn btn-primary mb-3">Create</button>
                    <div>
                        <p className={successMessageClass}>This Vehicle Model has been registered</p>
                    </div>
                </form>
            </div>
        </div>
    </div>)
    }
}

export default VehicleModelForm;
