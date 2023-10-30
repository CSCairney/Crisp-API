# Crisp API - RESTful API for Crisp Weather App

Welcome to the Crisp API documentation! This RESTful API is built with Node.js, Express, Sequelize (as the ORM for PostgreSQL), and utilizes JWT for authentication. It serves as the backend for the Crisp weather app, allowing users to register, log in, manage blogs, retrieve user information, and handle map layers for the React Leaflet map.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Download and install Node.js from [nodejs.org](https://nodejs.org/).
- **PostgreSQL**: Set up a PostgreSQL database, you can use ElephantSQL for hosting your database.
- **Git**: Install Git from [git-scm.com](https://git-scm.com/).

## Installation

To get started, clone the Crisp API repository using the following command:

```bash
git clone git@github.com:CSCairney/Crisp-API.git
```

Then, navigate to the project directory:

```bash
cd Crisp-API
```

Install the dependencies using npm:

```bash
npm install
```

## Database Configuration
Configure PostgreSQL: Create a PostgreSQL database on ElephantSQL and update the database configurations in config/config.json.

Run Migrations: Run the Sequelize migrations to set up the database schema.

```bash
npx sequelize-cli db:migrate
```

Seed the Database (Optional): If there are seed files available, you can run the following command to populate the database with sample data.

```bash
npx sequelize-cli db:seed:all
```

## Usage
Start the server using the following command:

```bash
npm start
```

The API will be available at http://localhost:3000.

## API Routes
### Authentication and User Management
"/"
POST /register: Register a new user.
POST /login: Authenticate and generate JWT token.

### Blog Management
"/blog/*"
GET /blog/:id: Retrieve information about a specific blog.
PUT /blog/:id: Update a user's blog.

### User Management
"/user/*"
GET /user/:id: Retrieve user information.
PUT /user/:id: Update user details for the dashboard.

### Map Layers Management
"/layers/*"
GET /layers/:id: Retrieve marker, polygon, and line details for the React Leaflet map.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## Issues
If you encounter any issues or have questions, please create an issue on the main Crisp repository.

Happy coding! 🚀
