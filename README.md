# Time Management System

## Introduction
**Note: This project is currently under active development and is not yet complete. Features and functionality may change, and some aspects of the application may not be fully implemented.**

This Time Management System is designed to help users effectively plan and manage their daily goals, weekly schedules, and events. Developed with a Java Spring Boot backend and a ReactJS frontend, this application allows for user profile management and real-time scheduling functionalities.

## Technology Stack
- **Backend:** Java Spring Boot, Maven
- **Frontend:** ReactJS
- **Database:** PostgreSQL, managed within a Docker container
- **Other Technologies:**
  - React Big Calendar for calendar functionalities
  - TailwindCSS for styling
  - React Icons for enhanced UI elements
  - Axios for HTTP requests

## Features
- User profile creation and management
- Daily goal setting
- Weekly schedule organization
- Event management
- Dynamic user interface with responsive calendar views

## Getting Started

### Prerequisites
- Java 11+
- Maven
- Node.js and npm
- Docker
- Visual Studio Code (VS Code)

### Setting Up the Project
1. **Clone the repository:**
   Clone the project to your local machine using the following command:
   ```cmd
   git clone https://github.com/your-github-username/time-management.git
   cd time-management

2. **Backend Setup:**
-  Setup the environment variables in steps 3 and 4 to make sure the backend service can run properly.

3. **Docker Environtment Variable:**
   The PostgreSQL container is configured using env variable in a .env file. located in the root of the project
   Make sure you make a .env file containing the following variable:
-  POSTGRES_DB=your_db_name
-  POSTGRES_USER=your_username
-  POSTGRES_PASSWORD=your_password

4. **Spring Boot Environment Variable**
   These should match your Docker files username and password.
-  set DB_USERNAME_TM=your_username
-  set DB_PASSWORD_TM=your_password

4. **Database Setup:**
-  Make sure Docker is installed and running.
-  Set up the PostgreSQL database using Docker:
   ```cmd
   docker-compose up -d
   ```

5. **Startup the Backend**
    ```cmd
    mvnw spring-boot:run
    ```

6. **Frontend Setup:**
- Navigate to the frontend directory:
  ```cmd
  cd frontend
  ```
- Install dependencies:
  ```cmd
  npm install
  ```cmd
- Start the development server:
  ```cmd
  npm start
  ```

### Running the Application

1. **Start the Backend:**
   - From the root directory, start the backend server using Maven:
     ```cmd
     \time-management>mvnw spring-boot:run
     ```

2. **Start the Frontend:**
   - From the frontend directory, start the frontend development server:
     ```cmd
     \time-management\frontend>npm start
     ```