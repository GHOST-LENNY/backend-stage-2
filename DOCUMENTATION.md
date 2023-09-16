# A RESTful CRUD API built with Node, MongoDB Atlas and Express.

## ❯ Getting Started

### Step 1: Set up your Development Environment

Install Node.js in your computer.


### Step 2: Create your new Project

Clone or download this project into your own project 



Then setup your application environment.


### Install

- Install all dependencies with `npm install` command


## ❯ Postman
You can use Postman for testing the API. 
Create a request to http://localhost:7777/. 
You can also use your hosting site url.

## POST /api

{
"name": "Satoru Gojo"
}

- POST Request Response
{
"Person": {
"_id": "**",
"name": "Satoru Goju",
"__v": 0
}
}

## GET request
GET /api/:user_id
in this example user_id = 6505214dc9cece34a2d64608
- GET Request Response
{
"person": {
"_id": "6505214dc9cece34a2d64608",
"name": "Chinwe",
"track": "Frontend"
"__v": 0
}
}

## PUT request
PUT /api/:user_id

- PUT Request Response
{
"updatedPerson": {
"_id": "64ff1ea91539022f0c4d1d98",
"name": "Satoru Goj",
track: "Backend"
"__v": 0
}
}

## DELETE request
Select DELETE on PostMan
DELETE /api/:user_id

- DELETE Request Response
{
"message": "Person deleted successfully"
}
