# TubeKids REST API

This REST API was developed to manage users, restricted users, and videos. It utilizes JWT for authentication and was built using Express with Node.js.

## Installation

Install Tubekids_Backend with npm:

```bash
  run "npm install" to install dependencies
```

## Run

Install Tubekids_Backend with npm:

```bash
  To execute the service run "npm start"
  To execute the service on developer mode run "npm run dev"
```

## API Reference and Testing

For comprehensive documentation and testing of all API endpoints, please refer to the [Postman collection file](TubeKids.postman_collection.json) provided. This file contains detailed descriptions and examples for each endpoint, facilitating easy exploration and testing of the API functionalities.

For testing videos, accessing restricted user endpoints, and retrieving user information, you need to send a JWT token. This token is generated using the session endpoint.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- `DB_CONNECTION_STRING`: The connection string for the MongoDB database.

- `PORT`: The port on which the server will listen for incoming requests.

- `JWT_SECRET_KEY`: The secret key used for JWT token generation and validation.

## Author
[@CrisAlvarado1](https://github.com/CrisAlvarado1)

`Cristopher Armando Alvarado Carmona`