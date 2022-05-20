const { model, Schema } = require('mongoose')

const ItemSchema = new Schema({
    name: {
        type: String, required: true
    },
    price: {
        type: Number, required: true
    },
    city: {
        type: String, required: true
    }
}, {
    timestamps: true
})

const Item = model('Item', ItemSchema)
module.exports = Item