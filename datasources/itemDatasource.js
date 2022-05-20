const ItemModel = require('../models/item.model')

class ItemDatasource {

    async getAllItems() {
        console.log('getting all items')
        const promise = ItemModel.find().exec()
        return promise
    }

    async getItem(_id) {
        const promise = ItemModel.findById(_id).exec()
        return promise
    }

    async addItem(name, price, city) {
        const newItem = new ItemModel({name, price, city})
        const promise = await newItem.save()
        return promise
    }

    async deleteItem(_id) {
        const promise = await ItemModel.deleteOne({_id: _id})
        return promise
    }

    async updateItem(_id, name, price, city) {
        const promise = await ItemModel.updateOne({_id: _id}, {name, price, city})
        return promise
    }
}

module.exports = ItemDatasource