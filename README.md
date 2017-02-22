[![Build Status](https://travis-ci.org/andela-msosan/document-management.svg?branch=develop)](https://travis-ci.org/andela-msosan/document-management)
[![Coverage Status](https://coveralls.io/repos/github/andela-msosan/document-management/badge.svg?branch=develop)](https://coveralls.io/github/andela-msosan/document-management?branch=develop)
# Document Management System

The system manages documents, users and user roles. Each document defines access rights; the document defines which roles can access it. Also, each document specifies the date it was published.

Users are categorized by roles. Each user must have a role defined for them.

## Installation

* Ensure that you have NodeJs and Postgres installed on your machine
* Clone the repository `git clone https://github.com/andela-msosan/document-management.git`
* Change into the directory and run `npm install` to install all dependencies
* Create a `.env` file in your root directory as described in `.env.sample` file
* Create a `data.json` file in your root directory as described in `data-sample.json` if you will like to seed data into your database after migration

## Testing

* To test, run `npm test`
* To generate coverage after test, run `npm run cover`

## Usage

* Run database migration with `npm run db:migrate`
* Run `npm run db:seed` to seed data into your database
* Start the app with `npm start`. By default, it runs locally on port 5000
* Use [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) or any API testing tool to access the endpoints

## API endpoints

**Roles**

Roles are created to ensure that each user has a role defined, at minimum, admin and regular role should exist.

Request type | Endpoint | Action
----------- | ---------- | --------
POST | /api/role | Create a new role
GET	| /api/role |	Get all created roles
GET	| /api/role/:id	| Get a specific role
PUT	| /api/role/:id	| Edit a specific role
DELETE | /api/role/:id | Delete a specific role


**Users**

To **create** a user, send in data with valid `username, lastname, firstname, email, password, RoleId`. Each user should have a role defined. On user creation, a token is generated. Set the token in the authorization header:
`'x-access-token': <token>'` or `authorization: <token>`

To `login` a user, send request with valid `username` and `password`, set the generated token in the authorization header as well.

Request type | Endpoint |	Action
--------- | --------- | --------
POST | /api/users |	Create a new user
GET	| /api/users |	Get all users
GET |	/api/users/:id | Get details of a specific user
GET	| /api/users/:id/document |	Retrieve all documents belonging to a user
PUT	| /api/users/:id | Edit user details
DELETE | /api/users/:id	| Delete a user
POST	| /api/users/login | To log a user in
POST	| /api/users/logout |	To log a user out


**Documents**

To **create** a document, send in data with valid `title, content, RoleId` and optionally the `UserId` which is generated by default from the access token of the logged in user.
* `UserId` - the id of the document owner
* `RoleId` - the role that can access the document

Request type | Endpoint | Action
------------ | --------- | ---------
POST	| /documents	| Create a new document
GET	| /documents |	Retrieve all documents
GET	| /documents/:id | Retrieve a specific document
GET | /documents/role?RoleId=:id | Get documents that can be accessed by a particular role
GET | /documents/user?UserId=:id | Get documents belonging to a user
PUT	| /documents/:id	| Update a specific document
DELETE	| /documents/:id |	Remove a specific document from storage

## Contributions

* Clone the repository.
* Create a new branch for included feature(s).
* Raise a pull request.

This application was developed using NodeJs with express for routing. Postgres was used for persisting data with Sequelize as ORM.

_Source code employs ES6 syntax traspiled down to ES5 using Babel._