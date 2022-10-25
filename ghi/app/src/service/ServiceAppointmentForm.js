import React from 'react';

class ServiceAppointmentForm extends React.Component{
    constructor(props) {
        super(props)
        this.state= {
            vin: "",
            owner: "",
            date: "",
            time: "",
            technicians: [],
            reason: "",
        };

        this.handleVINChange = this.handleVINChange.bind(this);
        this.handleOwnerChange = this.handleOwnerChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleTechnicianChange =this.handleTechnicianChange.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.technicians;
        console.log(data);

        const appointmentUrl = 'http://localhost:8080/api/serviceappointments/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json",
            },
        };

        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            const newAppointment = await response.json();
            console.log(newAppointment);

            const cleared = {
                vin: "",
                owner: "",
                date: "",
                time: "",
                technician: "",
                reason: "",
            };
            this.setState(cleared);
        }
    }


    handleVINChange(event){
        const value = event.target.value;
        this.setState({vin: value})
    }

    handleOwnerChange(event){
        const value = event.target.value;
        this.setState({owner: value})
    }

    handleDateChange(event){
        const value = event.target.value;
        this.setState({date: value})
    }

    handleTimeChange(event){
        const value = event.target.value;
        this.setState({time: value})
    }

    handleReasonChange(event){
        const value = event.target.value;
        this.setState({reason: value})
    }

    handleTechnicianChange(event){
        const value = event.target.value;
        this.setState({technician: value})
    }

    async componentDidMount() {
        const url = "http://localhost:8080/api/technicians";

        const reponse = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            this.setState({technicians: data.technicians});
        }
    }

    render () {
        return (
            <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Add a Shoe</h1>
                <form onSubmit={this.handleSubmit} id="create-appointment-form">
                  <div className="form-floating mb-3">
                    <input onChange={this.handleVINChange} value={this.state.vin} placeholder="VIN" required type="text" inputProps={{ maxLength: 17 }} name="vin" id="vin" className="form-control"/>
                    <label htmlFor="vin">VIN</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleOwnerChange} value={this.state.owner} placeholder="Owner Name" required type="text" name="owner" id="owner" className="form-control"/>
                    <label htmlFor="owner">Owner</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleDateChange} value={this.state.date} placeholder="Date" required type="date" name="date" id="date" className="form-control"/>
                    <label htmlFor="date">Date</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleTimeChange} value={this.state.time} placeholder="Time" required type="time" name="time" id="time" className="form-control"/>
                    <label htmlFor="time">Picture Url</label>
                  </div>
                  <div className="mb-3">
                    <select onChange={this.handleBinChange} value={this.state.bin} required name="bin" id="bin" className="form-select">
                      <option value="">Choose a bin</option>
                      {this.state.bins.map(bin => {
                        return (
                            <option key={bin.href} value={bin.href}>
                                {bin.closet_name}
                            </option>
                        );
                      })}
                    </select>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        );
    }





}

export default ServiceAppointmentForm;
