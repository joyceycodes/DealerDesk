# CarCar

Team:

* Lindsey - Service
* Joyce - Sales

## Set up

### Getting started:
1. In your terminal, git clone this repository to your local computer using this link (https://gitlab.com/joyceyu96/project-beta.git)
2. Run [code .] to start the project in VS Code.
3. Run [docker volume create beta-data] in your terminal. This will create your database.
4. Run [docker compose up --build] to build the docker image and run the docker containers.

### Creating a superuser:
To create a superuser and log into the Admin application for any of the microservices:
1. In Docker, navigate to the respective docker container, and click the three dots to show container actions.
2. Select 'Open in terminal'
3. Run `python manage.py createsuperuser' in the container terminal.
4. Complete the form to set username and password for the superuser. 
5. Navigate to the corresponding URL for the microservice that you just created a superuser for to log in sign in:
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
| List vehicle models | GET | (http://localhost:8100/api/models/)
| Create a vehicle model | POST | (http://localhost:8100/api/models/)
| Get a specific vehicle model  | GET | (http://localhost:8100/api/models/:id/)
| Update a specific vehicle model | PUT | (http://localhost:8100/api/models/:id/)
| Delete a specific vehicle model  | DELETE | (http://localhost:8100/api/models/:id/)

Automobiles:

| Action | Method | URL |
|--------|--------| -----|
| List automobiles | GET | (http://localhost:8100/api/automobiles/)
| Create an automobile | POST | (http://localhost:8100/api/automobiles/)
| Get a specific automobile | GET | (http://localhost:8100/api/automobiles/:vin/)
| Update a specific automobile | PUT | (http://localhost:8100/api/automobiles/:vin/)
| Delete a specific automobile | DELETE | (http://localhost:8100/api/automobiles/:vin/)


### React components

All accessible from the Navigation bar located at the top of the window, under the "Inventory" dropdown

- "View Manufacturers" - shows a list of all Manufacturers by name
- "Add a Manufacturer" - displays a form that allows you to add a manufacturer to the system by name
- "View Vehicle Models" - displays a list of all vehicle models in the system, including their name, manufacturer, and a photo
- "Add a Vehicle Model" - displays a form that allows the user to create a new vehicle model by entering the model name, a picture URL, and the corresponding manufacturer (which is selected from a drop down)
- "Show All Automobiles in Inventory" - display a list of all automobiles in the database, including the year, make, model, color, picture, and VIN
- "Add an Automobile to Inventory" - displays a form that allows the user to add an automobile to the database by entering the color, year (restricted to 4 digits), VIN (restricted to 17 characters, which will auto populate in all uppercase), and the model (which is selected from a dropdown)


### Sample Insomnia JSON requests for populating the database

Create a Manufacturer:

```json
{
  "name": "Chrysler"
}
```


Create a Vehicle Model:

```json
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}

```


Create an Automobile:

```json
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```




## Service microservice

The Service microservice manages Services Appointments, and Technicians. It also connects with the Inventory microservice through a poller to create AutomobileVOs which represent Automobiles in the Inventory.

### Models

1. Service Appointments:
    - properties are:
        - VIN (max length 17 characters)
        - Owner
        - date (represents date of appointment)
        - time (represents time of appointment -- encoded to HH:MM format)
        - technician (ForeignKey to Technician model)
        - reason (i.e. flat tire, oil change)
        - is_vip (a Boolean value, which defaults to False. If the VIN in this service appointment instance matches with a VIN in AutomobileVOs, then this value is flipped to True. This represents a customer to the Service department whose car was purchased through the dealership, making them VIP status)
        - is_done (a Boolean value, which defaults to False. This is utlized in the service appointment list view. If the "Finsihed" button is pressed, a PUT request is sent, and this value is flipped to True)

2. Technician:
    - properties are:
        - name
        - employee_number (a small positive integer field, which must be unique)

3. AutomobileVO
    - a Value Object
    - instances of this model are created using the poller service
    - properties are:
        - VIN (max length of 17 characters, must be unique)
        - import_href (must also be unique)




### The Views

This microservice includes RESTful APIs for all three models, which can be accessed from Insomnia or the browser.

Service Appointments:

| Action | Method | URL |
|--------|--------| -----|
| List service appointments | GET | (http://localhost:8080/api/serviceappointments/)
| Create a service appointment | POST | (http://localhost:8080/api/serviceappointments/)
| Update a service appointment | PUT | (http://localhost:8080/serviceappointments/:id))
| Delete a specific service appointment | DELETE | (http://localhost:8080/serviceappointments/:id)


Technicians:

| Action | Method | URL |
|--------|--------| -----|
| List technicians | GET | (http://localhost:8080/api/technicians/)
| Create a technician | POST | (http://localhost:8080/api/technicians/)


AutomobileVo:

| Action | Method | URL |
|--------|--------| -----|
| List AutomobileVOs | GET | http://localhost:8080/api/automobileVOs/


### The Poller

Polls the Inventory microservice every 15 seconds for any automobile instances added to the database. If an automobile has been added to the Inventory databse, the poller creates a new AutomobileVO instance in the Service Microservice database, with a matching VIN. This information is used to determine if a customer to the Service Department is a VIP (i.e., the car that they are brining in for service was purchased through the dealership)

### React Components

All accessible from the Navigation bar located at the top of the window, under the "Service" dropdown

- "View Service Appointments": displays a table of all scheduled service appointments, including the VIN of the car, the customer name, the date and time of the appointment, and the Technician assigned to the appointment. A gold star will be displayed in the first column of any row that contains a VIP customer. To the right of each appointment, there is a "cancel" and "finished" button. If the cancel button is pressed, a DELETE request will be sent to the URL for that appointment instance, and the instance will be deleted from the database, and disappear from the page. If the "finished" button is pressed, a PUT request will be sent to the URL for that appointment instance, and the "is_done" boolean property will be updated to "True". This will remove the appointment from the Scheduled Appointments table, into the table below, labeled "Completed Service Appointments". There is also a responsive search bar at the top of the page, which will filter the appointments by VIN number. The search bar automatically converts any input to uppercase, and will only allow 17 characters.

- "Schedule a Service Appointment": displays a form that allows users to create a new appointment instance by entering in the VIN, the owner, selecting the appointment date from a calendar, selecting the appointment time (HH:MM AM/PM) from a pop up, selecting the technician from a dropdown, and entering the reason for the appointment. Once the create button is pressed, the form will clear, and a success message will be displayed. The appointment will now appear on the "View Service Appointments" page.

- "Register a Technician" - displays a form to allow users to register a new technician in the database by entering a name, and an employee ID number.

### Sample Insomnia JSON requests for populating the database

Technicians:

```json
{
	"name": "Ray Rehberg",
	"employee_number": 1
}
```

Service Appointment:
```json
{
	"vin": "1A8HW58268F133559",
	"owner": "Lindsey Carlson",
	"date": "2023-07-15",
	"time": "17:00:00",
	"reason": "Brakes don't work",
	"technician": "Ray Rehberg"
}
```

## Sales microservice

The Sales microservices are used to handle sales information, including sales persons, customers, sales records and automobiles that are within our inventory. 
We can split the sales microservices into two separate applications - sales API and sales poller. 

Sales API is Django application that houses our models, URLs, and views. It can be accessed on Insomnia on port 8090.

Sales poller is a polling application used to send periodic requests to Inventory API for automobile data. A new automobileVO instance is created in the Sales Microservice database for each instance of Automobile in the Inventory database if there is not already a corresponding AutomobileVO object. It is set to poll every 10 seconds but the time interval may be adjusted in the poll() function in poller.py. 
### Backend
#### Models
Sales API is a RESTful API with the following models and attributes:
- SalesPerson 
    - name
    - employee_number(unique integer value)
- Customer 
    - name
    - address
    - phone_number(a PhoneNumber field, added django-phonenumber-field and phonenumbers in the requirements.txt. Only verifies inputs as phone numbers in Admin as of right now.)
- SaleRecord
    - automobile (OneToOne relationship to AutomobileVO model)
    - sales_person(ForeignKey to SalesPerson model)
    - customer(ForeignKey to Customer model)
    - sales_price
- AutomobileVO 
    - vin(unique value)
    - import_href(unique value)
    - is_sold(boolean value that is default=False. This value gets updated to True once a new Sale Record is created with the corresponding vin number.)

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
* Note: an automobile, customer, and sales person must already be in the database in order to successfully create a sale record.

```json
    {
    "automobile":"1C3CC5FB2AN120174",
    "customer": 1,
    "sales_person": 1908,
    "sales_price": 70000
    }
```

AutomobileVO:

| Action | Method | URL |
|--------|--------| -----|
| List automobileVOs | GET | (http://localhost:8090/api/automobileVOs/)



### Frontend React Application
To view the Sales Microservice frontend application, navigate to localhost:3000 in your browser. Within the Sales dropdown in the navigation bar is the following:
- **Sales Leaderboard** - Ranked list of sales people on number of cars sold. Only sales people with at least one sales record will appear.
**Individual sales history** - Shows a list view of all sales records that may be filtered by sales person upon selecting a sales person in the dropdown menu. 
- **Log a sale** - A form to create a new sale record. Only automobiles that have not been sold will be displayed in the dropdown when selecting an automobile. Fill in the form with the automobile, sales person, customer, and sales price. Form clears and success message appears upon successful sale record submission.
- **Register a sales person** - A form to add a new sales person to the team. Takes in name and employee number (must be a unique value) of the new sales person. Form clears and success message appears upon successful creation of a sales person.
- **Add a customer** - A form to add a potential customer. Takes in name, address, and phone number of the new customer. Form clears and success message appears upon successful creation of a sales person.

## Stretch goals for the future
### Sales microservice
- Verify phone number inputs on frontend and backend.
- Add crown next to first place on the sales leaderboard.
- Add date to sale record so we can filter by month.