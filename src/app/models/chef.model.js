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
    }
},
{
    timestamps: true,
    versionKey: false
})

module.exports = model('chefschema', ChefSchema)