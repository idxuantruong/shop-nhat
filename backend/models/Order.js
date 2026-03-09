const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    items: [
        {
            productId: String,
            name: String,
            price: Number,
            quantity: Number
        }
    ],

    total: Number,

    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Order", OrderSchema)