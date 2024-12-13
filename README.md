# Advanced Web Development - Study Application

## Setting up Frontend
The frontend will require [Node.js](https://nodejs.org/en) to be installed.

Ensure that the terminal is pointing to the `/frontend` directory. 

Run `npm install` to install all required dependencies for Next.js to function.

Run `npm run dev` to start the application. The application can then be found at `localhost:8080`

## Setting up Backend
The Backend requires [PostgreSQL](https://www.postgresql.org/download/) and [Java 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) to be installed

Create a database schema named `fypdb` in the PostgreSQL database.

Ensure that the terminal is pointing to the `/backend` directory.

Ensure that the username and password in `backend/src/main/resources/application.properties` is correct for the Postgres database.
The default is: 

    username = `postgres` 
    password = `postgres`

Ensure that you have permissions to execute the `./gradlew` file

Run `./gradlew bootRun` to start the Spring Boot application.
