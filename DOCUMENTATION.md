# A RESTful CRUD API built with Node, MongoDB Atlas and Express.

## ❯ Getting Started

### 1: Set up your Development Environment

Install Node.js in your computer if you dont have it installed.


### 2: Create your new Project

Fork or download this project.

### Install

- Install all dependencies with `npm install` command


# ❯ TESTING THE API

First run `node index.js` in the terminal to initialize your project if you're using localhost.
##  Postman
You can use Postman for testing the API.

Create a request to http://localhost:7777/api. 
You can also use your hosting site url.

`yourdomainname/api` .  *yourdomainname* being your host url.

## POST
Make a POST request to `yourdomainname/api`
Then you can use a JSON body by selecting raw and JSON option in Postman.
Only name is required. Thus creates a new person.

`{
"name": "Satoru Gojo"
}
`
- POST Request Response

`{
"newPerson": {
"_id": "**", //generated id
"name": "Satoru Gojo",
"__v": 0
}}
`
- on error
`{"error":"name string parameter required"}`

## GET request
GET /api/:user_id
in this example we'll use user_id = 6505214dc9cece34a2d64608. 
This replaces the :user_id

- GET Request Response

`{
"_id": "6505214dc9cece34a2d64608",
"name": "Chinwe",
"track": "Frontend"
"__v": 0
}`

## PUT request
PUT /api/:user_id 
Provide the new details to be updated as a JSON in the body.

`{"name" : "Satoru Gooi" }`

- PUT sample Request Response

`{
"_id": "64ff1ea91539022f0c4d1d98",
"name": "Satoru Gooi",
"__v": 0
}`

## DELETE request
Select DELETE on PostMan
DELETE <yourdomainname>/api/:user_id
the id replaces :user_id

- DELETE Request Response
`{
"message": "Person deleted successfully"
}`
