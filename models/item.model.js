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
    },
    deleted: {
        type: Boolean, required: true, default: false
    },
    message: {
        type: String, default: ''
    }
}, {
    timestamps: true
})

const Item = model('Item', ItemSchema)
module.exports = Item