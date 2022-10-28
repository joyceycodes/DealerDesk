# CarCar

Team:

* Lindsey - Service
* Joyce - Sales

## Set up
Getting started:
1. In your terminal, git clone this repository to your local computer using this link (https://gitlab.com/joyceyu96/project-beta.git)
2. Run [docker volume create beta-data] in your terminal. This will create your database.
3. Run [docker compose up --build] to build the docker image and run the docker containers.

## Design

CarCar is an application designed for the Automotive Dealership Domain,
specially as it relates to mananging it's inventory, service center and sales department.

CarCar is composed of three microservices, one for each of the categories listed above.


## Inventory Microservice

The Inventory microservice keeps track of Manufacturer, Vehicle Models and Autombiles. It has three corresponding models, each detailed below:

Manufacturer:
    properties are:
        -name

VehicleModel:
    properties are:
        -name
        -picture_url
        -manufacturer (a ForeignKey to the Manufacturer model)

Automobile:
    properties are:
        -color
        -year
        -vin (17 character max length, must be unique)
        -model (ForeignKey to Vehicle Model)

This microservice includes RESTful APIs for all three models, which can be accessed from Insomnia, or your browser:







<img src='images/Project Beta Overview.png' alt='diagram of Inventory, Sales, and Service microservices'>

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Sales microservice is used to handle sales information, including sales persons, customers, sales records and automobiles that are within our inventory. 
We can split the sales microservice into two parts - sales API and sales poller. 

Sales API is a RESTful API with the following models and attributes:
-SalesPerson - name, employee_number(unique value)
-Customer - name, address, phone_number
-SaleRecord - automobile (OneToOne relationship to AutomobileVO model), sales_person(ForeignKey to SalesPerson model), customer(ForeignKey to Customer model), sales_price
-AutomobileVO - vin(unique value), import_href(unique value), is_sold(boolean)

Sales poller is a poller used to send periodic requests to Inventory API for automobile data. It is set to poll every 10 seconds but the interval may be adjusted in the poll() function in poller.py.


