# Advanced Web Development - Study Application

This project was developed for my CS3821 - Final Year Project module, spanning the entirety of my third and final year of my degree. For this project, I was tasked with developing a web application used to provide a particular service online. 

I had chosen to develop a Study Application, based on my prior experience in the education industry, as well as the fact that it is not a common topic for these particular projects.

Grade: 89%

---

## Setting up Frontend
The frontend will require [Node.js](https://nodejs.org/en) to be installed.

Ensure that the terminal is pointing to the `/frontend` directory. 

Run `npm install` to install all required dependencies for Next.js to function. Run `npm audit fix` if required.

Rename `.env.example` to `.env` - Ensure the link within points to the url for the backend API, e.g. `http://localhost:8080`

Run `npm run dev` to start the application. 

You can then access the student page at `http://localhost:3000/login`, or the admin page at `http://localhost:3000/admin/login`

## Setting up Backend
The Backend requires [PostgreSQL](https://www.postgresql.org/download/) and [Java 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) to be installed

Create a dedicated schema for the project in the PostgreSQL database.

Ensure that the terminal is pointing to the `/backend` directory.

Use the following bash commands to generate a public/private key pair - used to sign the tokens
```bash
cd src/main/resources/jwt
openssl genpkey -algorithm RSA -out app.key -outform PEM
openssl rsa -pubout -in app.key -out app.pub
```
Rename `src/main/resources/application.properties.examples` to `src/main/resources/application.properties`, and enter the correct details for the Postgres database. These include the `Schema Name`, `Username`, `Password`

Ensure that you have permissions to execute the `./gradlew` file

Run `./gradlew bootRun` to start the Spring Boot application.

You can now log into the Admin dashboard using the following login details, make sure to change the admin password via the users dashboard:
```
Username: admin
Password: password
```
