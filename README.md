# CarCar

Team:

* Lindsey - Service
* Joyce - Sales

## Set up
Getting started:
1. In your terminal, git clone this repository to your local computer using this link (https://gitlab.com/joyceyu96/project-beta.git)
2. Run [docker volume create beta-data] in your terminal. This will create your database.
3. Run [docker compose up --build] to build the docker image and docker containers.

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

Explain your models and integration with the inventory
microservice, here.
