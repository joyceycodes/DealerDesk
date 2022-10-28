# CarCar

Team:

* Lindsey - Service
* Joyce - Sales

## Set up

### Getting started:
1. In your terminal, git clone this repository to your local computer using this link (https://gitlab.com/joyceyu96/project-beta.git)
2. Run [docker volume create beta-data] in your terminal. This will create your database.
3. Run [docker compose up --build] to build the docker image and run the docker containers.

### Creating a superuser:
To create a superuser and log into the Admin application for any of the microservices:
1. In Docker, navigate to the respective docker container, and click the three dots to show container actions.
2. Select 'Open in terminal'
3. Run `python manage.py createsuperuser' in the container terminal.
4. Complete the form to set username and password for the superuser. 
5. Navigate to the corresponding URL for the microservice that you just created a superuser for:
    - Inventory: http://localhost:8100/admin/
    - Service: http://localhost:8080/admin/
    - Sales: http://localhost:8090/admin/

### Deleting your database:
In the instance that you want to redo your database, **stop all containers** and run the following commands in your terminal:
```
docker container prune -f
docker volume rm beta-data
docker volume create beta-data
docker-compose up
```


## Design

CarCar is an application designed for the Automotive Dealership Domain,
specially as it relates to mananging it's inventory, service center and sales department.

CarCar is composed of three microservices, one for each of the categories listed above.

<img src='images/Project Beta Overview.png' alt='diagram of Inventory, Sales, and Service microservices'>


## Inventory Microservice

The Inventory microservice keeps track of Manufacturer, Vehicle Models and Autombiles. It has three corresponding models, each detailed below:

### Models

1. Manufacturer:
    - properties are:
        - name

2. VehicleModel:
    - properties are:
        - name
        - picture_url
        - manufacturer (a ForeignKey to the Manufacturer model)

3. Automobile:
    - properties are:
        - color
        - year
        - vin (17 character max length, must be unique)
        - model (ForeignKey to Vehicle Model)

### Views

This microservice includes RESTful APIs for all three models, which can be accessed from Insomnia, or your browser:

Manufacturer:

| Action | Method | URL |
|--------|--------| -----|
| List manufacturers | GET | (http://localhost:8100/api/manufacturers/)
| Create a manufacturer | POST | (http://localhost:8100/api/manufacturers/)
| Get a specific manufacturer | GET | (http://localhost:8100/api/manufacturers/:id/)
| Update a specific manufacturer | PUT | (http://localhost:8100/api/manufacturers/:id/)
| Delete a specific manufacturer | DELETE | (http://localhost:8100/api/manufacturers/:id/)


Vehicle Model:

| Action | Method | URL |
|--------|--------| -----|
| List automobiles | GET | (http://localhost:8100/api/models/)
| Create an automobile | POST | (http://localhost:8100/api/models/)
| Get a specific automobile | GET | (http://localhost:8100/api/models/:id/)
| Update a specific automobile | PUT | (http://localhost:8100/api/models/:id/)
| Delete a specific automobile | DELETE | (http://localhost:8100/api/models/:id/)

Automobiles:

| Action | Method | URL |
|--------|--------| -----|
| List vehicle models | GET | (http://localhost:8100/api/automobiles/)
| Create a vehicle model | POST | (http://localhost:8100/api/automobiles/)
| Get a specific vehicle model | GET | (http://localhost:8100/api/automobiles/:vin/)
| Update a specific vehicle model | PUT | (http://localhost:8100/api/automobiles/:vin/)
| Delete a specific vehicle model | DELETE | (http://localhost:8100/api/automobiles/:vin/)


### React components

All accessible from the Navigation bar located at the top of the window, under the "Inventory" dropdown

- "View Manufacturers" - shows a list of all Manufacturers by name
- "Add a Manufacturer" - displays a form that allows you to add a manufacturer to the system by name
- "View Vehicle Models" - displays a list of all vehicle models in the system, including their name, manufacturer, and a photo
- "Add a Vehicle Model" - displays a form that allows the user to create a new vehicle model by entering the model name, a picture URL, and the corresponding manufacturer (which is selected from a drop down)
- "Show All Automobiles in Inventory" - display a list of all automobiles in the database, including the year, make, model, color, picture, and VIN
- "Add an Automobile to Inventory" - displays a form that allows the user to add an automobile to the database by entering the color, year (restricted to 4 digits), VIN (restricted to 17 characters, which will auto populate in all uppercase), and the model (which is selected from a dropdown)



## Service microservice

The Service microservice manages Services Appointments, and Technicians. It also connects with the Inventory microservice through a poller to

## Sales microservice
The Sales microservices are used to handle sales information, including sales persons, customers, sales records and automobiles that are within our inventory. 
We can split the sales microservices into two separate applications - sales API and sales poller. 

Sales API is Django application that houses our models, URLs, and views. It can be accessed on Insomnia on port 8090.

Sales poller is a polling application used to send periodic requests to Inventory API for automobile data. A new automobileVO instance wIt is set to poll every 10 seconds but the time interval may be adjusted in the poll() function in poller.py. 
### Backend
#### Models
Sales API is a RESTful API with the following models and attributes:
- SalesPerson 
    - name
    - employee_number(unique value)
- Customer 
    - name
    - address
    - phone_number
- SaleRecord
    - automobile (OneToOne relationship to AutomobileVO model)
    - sales_person(ForeignKey to SalesPerson model)
    - customer(ForeignKey to Customer model)
    - sales_price
- AutomobileVO 
    - vin(unique value)
    - import_href(unique value)
    - is_sold(boolean, default=False)

#### Views and URLs

Sales API includes the following RESTful APIs:

Sales Person:

| Action | Method | URL |
|--------|--------| -----|
| List sales persons | GET | (http://localhost:8090/api/salespersons/)
| Create a sales person | POST | (http://localhost:8090/api/salespersons/)

Example JSON body to create a new sale record:
```json
    {
    "name": "Salesy McSalesman",
    "employee_number": 1908
    }
```

Customer:

| Action | Method | URL |
|--------|--------| -----|
| List customers | GET | (http://localhost:8090/api/customers/)
| Create a customer | POST | (http://localhost:8090/api/customers/)

Example JSON body to create a new customer:
```json
    {
	"name": "Custom Customer",
	"address": "123 Main St",
	"phone_number": "000-111-2222"
    }
```

Sales Record:

| Action | Method | URL |
|--------|--------| -----|
| List sales records | GET | (http://localhost:8090/api/salesrecords/)
| Create a sales record | POST | (http://localhost:8090/api/salesrecords/)

Example JSON body to create a new sale record:
```json
    {
    "automobile":"1C3CC5FB2AN110016",
    "customer": 1,
    "sales_person": "Salesy McSalesman",
    "sales_price": 70000
    }
```


### Frontend
#### React
