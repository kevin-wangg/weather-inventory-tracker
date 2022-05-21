const getWeather = require('../helpers/weather')

const resolvers = {
    Query: {
        healthcheck: () => 'hola',
        getAllItems: (_, __, { dataSources }) => {
            allItemsPromise = dataSources.items.getAllItems().then(allItems => {
                const weatherPromises = allItems.map(item => {
                    return getWeather(item['city'])
                })
                return Promise.all(weatherPromises).then(weather => {
                    newItems = allItems.map((item, index) => {
                        return {
                            data: item,
                            weather: weather[index]
                        }
                    })
                    return newItems
                })
            })
            return allItemsPromise
        },
        getItem: (_, { _id }, { dataSources }) => {
            item = dataSources.items.getItem(_id)
            return item
        }
    },
    Mutation: {
        addItem: (_, { name, price, city }, { dataSources }) => {
            return dataSources.items.addItem(name, price, city)
                .then(() => {
                    return {
                        'success': true,
                        'message': 'Item successfully added'
                    }
                })
        },
        updateItem: (_, { _id, name, price, city }, { dataSources }) => {
            return dataSources.items.updateItem(_id, name, price, city)
                .then(() => {
                    return {
                        'success': true,
                        'message': 'Item successfully updated'
                    }
                })
        },
        deleteItem: (_, { _id, message }, { dataSources }) => {
            console.log(`Delete item: ${_id} with message ${message}`)
            return dataSources.items.deleteItem(_id, message)
                .then(() => {
                    return {
                        'success': true,
                        'message': 'Item successfully deleted'
                    }
                })
        },
        undeleteItem: (_, { _id }, { dataSources }) => {
            return dataSources.items.undeleteItem(_id)
                .then(() => {
                    return {
                        'success': true,
                        'message': 'Item Successfully undeleted'
                    }
                })
        }
    }
}

module.exports = resolvers