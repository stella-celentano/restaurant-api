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
    city: {
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
        required: false,
        trim: true
    },
    imagem: {
        type: String,
        trim: true
    },
    chef: [{
        type: Schema.Types.ObjectId,
        ref: 'chefschema'
    }]
},
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = model('restaurantschema', RestaurantSchema)