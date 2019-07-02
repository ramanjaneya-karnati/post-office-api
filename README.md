 ## Post Office REST API
This Project consists of following api's:

 **PostOfficeAPI:** This api will return the data related to the management of Post Office
 
  **ShipmentsAPI:** This api will return the data related to the tracking of shipments and management related to CRUD operations

 ## Motivation
 The motivation behind this project to provide the software for newly constructed post offices in berlin due to its rapid growth .
 
 ## Architectural decisions
  - Separation of layers for testability
    1. Routes
    2. Controllers
    3. Models
    4. Server startup
  - Followed the routes abstraction
  - Reusable CRUD controllers for the resource components
  - Followed the HTTP Verbs
  - Implemented the unit testing and proper error handling
  - Followed the standard logging structure and added log file for archives
   
 ## Tech/framework used
 Ex. -
 
 <b>Built with</b>
 - Node JS
 - Express
 - Mongoose
 - Mongo DB
 - Jest
 
 ## Resource components
Major resource components supported by the PostOffice API are:

- postoffice
- shipments

These can be used alone like this

| resource      | method                            | description |
|:--------------|:----------------------------------|:------------|
| `/api/postoffice`      |                      GET | returns the list of all post office listed in the berlin
| `/api/postoffice`      |                      POST| will create the new post office
| `/api/postoffice/{id}` |                      GET | returns specific post office information associated with the specified `id`
 | `/api/postoffice/{id}`|                      PUT | returns the updated post office information associated with the specific `id`
 | `/api/postoffice/{id}`|                   DELETE | returns the deleted post office information associated with the specified `id`                  | 
 | `/api/shipments`      |                      GET | returns the list of all shipments
 | `/api/shipments`      |                      POST| will create the new shipment information
 | `/api/shipments/{id}` |                      GET | returns specific shipment information associated with the specified `id`
 | `/api/shipments/{id}` |                      PUT | returns the updated shipment information associated with the specific `id`
 | `/api/postoffice/{id}`|                   DELETE | returns the deleted shipment information associated with the specified `id`
 ## Installation
 - Clone the https://github.com/ramanjaneya-karnati/post-office-api.git
 - Change to the project directory and make a "**npm install**"

## login to mlab.com and create the following databases
 
 - postoffice_test (to run the tests with out failing) 
 - postoffice (application database)
 - Before starting the application. The following files must be updated with the with the **<db_username>**, **<db_password>** and **<db_name>**
 - File names:
   1. test-db-setup.js
   2. src/config/dev.js && testing.js
   
 - All set to start the application
 
 ## Run the app in dev mode
    npm run dev
 
 
 ## Run the tests
    npm run test
    
 ## To run only routes
    npm run test-routes
    
 ## To run only models
    npm run test-models
    
 ## To run only controllers
    npm run test-controllers
    
 ## License
 
 MIT © [Ramanjaneya]()
