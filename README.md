## Attendify Backend for both Mobile and Web

Developers: Ishan and Powall

## To run the backend server

* Step 1:
  Download the code in this branch and unzip the file

* Step 2:
  After unzipping, run npm install to install the node modules from the package manager npm

* Step 3:
  Since bcrypt our library for handling encryption and hashing is not cross platform, downloading the node modules may not work at first. Any errors with bcrpyt can be resolved with the following commands:
  ```
  npm uninstall bcrypt
  npm install bcrypt
  ```
* Step 4:
  From terminal, run the following commands:
  ```
  cd /*LOCAL PATH TO ATTENDIFY FOLDER*/Attendify/Backend
  node server.js
  ```
  The server will now be running on localhost:3000 and you should recieve the message in output: "Successfully connected to MongoDB Atlas!"

## Routes
The following routes have been created by the backend in order to provide Attendify's functionality
In order to test, an application such as Postman can be utilized to test their functionality

<b>/login</b>

POST - authenticates login and provides JWT session token <br>
*send request body as JSON like the following example - on Postman, the option raw and JSON should be selected
```
{
    "email": "test@test.com",
    "password": "password"
}
```

<b>/register</b>

POST - creates new user in database <br>
*send request body as JSON like the following example - on Postman, the option raw and JSON should be selected
```
{
    "email": "test@test.com",
    "password": "password",
    "role": "student",
    "first_name":"first_name",
    "last_name":"last_name",
    "spire_id":0123456789
}
```

<b>/login/free-endpoint</b>

GET - authentication testing endpoint

<b>/login/auth-endpoint</b>

GET - authentication testing endpoint

<b>/courseRegistration/:course_id</b>

GET - class registration given course id

<b>/courseRegistration/delete</b>

POST - delete class given course id
*send request body as JSON like the following example - on Postman, the option raw and JSON should be selected
```
{
    "course_id": 1
}
```

<b>/courseRegistration/edit</b>

POST - edit class given course id<br>
*send request body as JSON like the following example - on Postman, the option raw and JSON should be selected
```
{
    "course_id": 1,
    "students": ["1", "2", "3"]
}
```
<b>/courseRegistration</b> <br>
POST - create class given course id
*send request body as JSON like the following example - on Postman, the option raw and JSON should be selected
```
{
    "course_id": 7,
    "students": []
}
```
