import React from 'react';



class TechnicianForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      employeeNumber: "",
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    data.employee_number = data.employeeNumber;
    delete data.employeeNumber;
    console.log(data);

    const technicianUrl = "http://localhost:8080/api/technicians/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const response = await fetch(technicianUrl, fetchConfig);
    if (response.ok) {
      const newTechnician = await response.json();
      console.log(newTechnician);

      const cleared = {
        name: "",
        employeeNumber: "",
        isSubmitted: true,
      };
      this.setState(cleared);
    }
  }

  handleNameChange(event) {
    const value = event.target.value;
    this.setState({ name: value })
  }

  handleNumberChange(event) {
    const value = event.target.value;
    this.setState({ employeeNumber: value })
  }


  render() {

    let successMessageClass = "alert alert-success mb-0 d-none";
    if (this.state.isSubmitted) {
      successMessageClass = "alert alert-success mb-0";
    }
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Register a Technician</h1>
            <form onSubmit={this.handleSubmit} id="create-technician-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleNumberChange} value={this.state.employeeNumber} placeholder="Employee Number" required type="number" name="model_name" id="employee_number" className="form-control" />
                <label htmlFor="employee_number">Employee ID Number</label>
              </div>
              <button className="btn btn-primary">Create</button>
              <div>
                <p className={successMessageClass}>This Technician has been registered</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }


}

export default TechnicianForm;
