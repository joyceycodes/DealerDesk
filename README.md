# CarCar

Team:

* Lindsey - Service
* Joyce - Sales

## Set up

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

Explain your models and integration with the inventory
microservice, here.
