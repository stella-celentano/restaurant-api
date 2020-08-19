const { Schema, model } = require('mongoose');

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    typeFood: {
        type: String,
        required: true,
        trim: true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = model('restaurantschema', RestaurantSchema)