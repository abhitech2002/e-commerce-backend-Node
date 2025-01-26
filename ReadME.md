# E-Commerce Backend

## Overview

This project is an e-commerce backend built using Node.js. It provides a robust API for managing products, orders, users, and more.

## Key Components

1. **Controllers**: Handle incoming requests and delegate to appropriate services.

2. **Models**: Define the structure of our database entities using Mongoose schemas.

3. **Routes**: Map HTTP endpoints to controller methods.

4. **Services**: Implement business logic for each domain (products, orders, users).

5. **Database**: Utilize MongoDB through Mongoose ORM.

6. **Environment Configuration**: Manage API keys and other sensitive information.

7. **Main Application File**: Entry point for the Express server.

8. **Package.json**: Defines project dependencies and scripts.

## Dependencies

- express: Web application framework
- mongoose: MongoDB object modeling tool
- dotenv: Loads environment variables from .env file
- bcrypt: Hashing library for password storage
- jsonwebtoken: Library for generating JSON Web Tokens