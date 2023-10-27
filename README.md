# Installing & Running The Project

1. Open your terminal and then paste [`https://github.com/Antoneee/Senior-Design-Project.git`](https://github.com/Antoneee/Senior-Design-Project.git). This clones the repo
2. cd into the new folder.

## Database

1. Go to [https://www.enterprisedb.com/downloads/postgres-postgresql-downloads](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
2. Download the installer for the latest version of PostgreSQL supported by your OS
3. Open the installer and download PostgreSQL with the default options. Make sure to remember your database superuser password!
4. Create a database called `se4485_test_db` (can be whatever your want)
5. Create a schema within the database called `uARexpert_test_schema_001` (can be whatever your want)
6. Run the SQL script provided in the [git repository](https://github.com/Antoneee/Senior-Design-Project).

## Frontend

1. cd into the `/frontend` folder.
2. Type `npm install`.
3. Run the React application with `npm start`

## Backend

1. cd into the `/backend` folder.
2. Delete the `package.json` and `package-lock.json` files
    1. `rm package.json`
    2. `rm package-lock.json`
3. Delete the `node_modules` folder with `rm -rf node_modules`
4. Run `npm i -g nodemon`
5. Run `npm i bcrypt cors dotenv express jsonwebtoken pg`
6. Create a file called `.env` and add the following lines (NOTE: you must run the SQL script provided in the [git repository](https://github.com/Antoneee/Senior-Design-Project) first)
    
    ```jsx
    API_SECRET=[*Add your API secret here]
    DATABASE=[*Add your DB name here]
    PASSWORD=[*Add your DB password here]
    SCHEMA="uARexpert_test_schema_001"
    ```
    
7. Run the Express server with `nodemon app.js`
8. You should see
    
    ```jsx
    [nodemon] 3.0.1
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching path(s): *.*
    [nodemon] watching extensions: js,mjs,cjs,json
    [nodemon] starting `node app.js`
    Server is live on port 5000
    ```