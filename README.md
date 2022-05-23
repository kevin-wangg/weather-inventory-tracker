# Shopify Technical Challenge

This is my submission for the Shopify Production Engineer Challenge.

# Description

This is an inventory tracking web application. The backend was built with Node.js and GraphQL, using MongoDB as the database. A simple frontend interface for the application was built with React. Basic CRUD functionality is supported allowing you to
- Create inventory items
- Edit items
- Update items
- View the items as a list

Items are associated with a city storage location. The current weather of the city is provided using the OpenWeather API.

It also supports adding comments with deletions and undeleting.

# How to run

To run this locally, first clone the repository with 

```git clone https://github.com/kevin-wangg/weather-inventory_tracker.git```

Then from the root directory run

```bash
$ npm install
$ npm run build
```

This will install the node module dependencies for the application and create a production build of the application in the `client/build` folder. 

The environment variable ATLAS_URI will also need to be set in order to establish a connection with the database.

Finally, start the application by running (still from the root directory)

```bash
$ npm start
```

The application should be running on localhost:4000