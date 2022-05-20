const { ApolloServer, gql } = require('apollo-server-express')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const path = require('path')
const resolvers = require('./graphql/resolvers')
const ItemDatasource = require('./datasources/itemDatasource')

require('dotenv').config()

const PORT = process.env.PORT || 4000

const typeDefs = gql`
    type Query {
        healthcheck: String
        getAllItems: [Item]
        getItem(_id: ID): Item
    },
    type Mutation {
        addItem(name: String, price: Float, city: String): ServerResponse
        updateItem(_id: ID, name: String, price: Float, city: String): ServerResponse
        deleteItem(_id: ID): ServerResponse
    }
    type Item {
        data: Data
        weather: String!
    }
    type Data {
        _id: ID!
        name: String!
        price: Float!
        city: String!
    }
    type ServerResponse {
        success: Boolean
        message: String
    }
`

async function startApolloServer(typeDefs, resolvers, ItemDatasource) {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources: () => ({
            items: new ItemDatasource()
        })
    })
    await server.start()

    const app = express()
    server.applyMiddleware({
        app
    })

    app.use(cors())
    app.use(express.static(path.resolve(__dirname, './client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
    })

    const uri = process.env.ATLAS_URI
    mongoose.connect(uri, { useUnifiedTopology: true})
    const connection = mongoose.connection
    connection.once('open', () => {
        console.log('Mongo connection successful!')
    })

    app.listen({ port: PORT}, () => {
        console.log(`Server ready at port ${PORT}`)
    })
}

startApolloServer(typeDefs, resolvers, ItemDatasource)
