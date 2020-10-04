const { Schema, model } = require('mongoose')

const ChefSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    education: {
        type: String,
        required: false,
        trim: true
    },
    imagem: {
        type: String,
        trim: true
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'restaurantschema',
        required: true
    }
},
{
    timestamps: true,
    versionKey: false
})

module.exports = model('chefschema', ChefSchema)