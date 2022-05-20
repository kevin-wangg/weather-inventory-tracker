# Shopify Technical Challenge

This is my submissions for the Shopify Backend Developer Challenge.

# Description

This is an inventory tracking web application. The backend was built with Node.js and GraphQL, using MongoDB as the database. A simple frontend interface for the application was built with React. Basic CRUD functionality is supported allowing you to
- Create inventory items
- Edit items
- Update items
- View the items as a list

Additionally, you are able to export the inventory items into CSV format and download it.

# How to run

A live version of this web application can be found at https://shopify-inventory-tracker.herokuapp.com/

To run this locally, first clone the repository with 

```git clone https://github.com/kevin-wangg/inventory_tracker.git```

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