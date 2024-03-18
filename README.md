# Node.js Login App

## Description
This project is a full-stack web application built with Node.js, Express, PostgreSQL, and React.

## Installation
### Server (Node.js & Express)
1. Navigate to the `./server` directory.

```
cd server
```

2. Install dependencies.

```
npm install
```  

3. Initialize the PostgreSQL database. Ensure the PostgreSQL server is running, and then create the required table defined in `./server/db/schema.sql`.

4. Create a `.env` file in the `./server` directory and configure the environment variables for the database and JWT secret key consisting of a random string as shown in an example below.

```
JWT_SECRET_KEY=""
DB_USER=""
DB_HOST=""
DB=""
DB_PASSWORD=""
DB_PORT=""
```

5. Start the Node.js server

```
npm run start
```

  

### Client (React)
1. Navigate to the `./client` directory.

```
cd client
```

2. Install dependencies.

```
npm install
```

3. Create a `.env` file in the `client` directory and configure the environment variables. The `.env` file file one environment variable that is used to link the Node.js application for consuming the endpoints.

```
REACT_APP_API_URL=
```

4. Start the frontend development server.  

```
npm start
```