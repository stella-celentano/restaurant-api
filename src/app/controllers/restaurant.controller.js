const restaurantschema = require('./../models/restaurant.model');
const { request } = require('express');

class Restaurant {
    getAllRestaurants(req, res) {
        restaurantschema.find({}, (err, data) => {
            if (err) {
                res.status(500).send({ message: 'Error processing your request', error: err })
            } else {
                res.status(200).send({ message: 'Restaurants successfully recovered', restaurant: data })
            }
        })
    }

    getRestaurantByName(req, res) {
        const { name } = req.params

        restaurantschema.findOne({ name }, (err, data) => {
            if (err) {
                res.status(500).send({ message: 'Error processing your request', error: err })
            } else {
                res.status(200).send({ message: `Restaurant ${name} successfully recovered`, restaurant: data })
            }
        })
    }

    createRestaurant(req, res) {
        const body = req.body;

        restaurantschema.create(body, (err, data) => {
            if (err) {
                res.status(500).send({ message: 'Error processing your request', error: err })
            } else {
                res.status(201).send({ message: 'Restaurant successfully created', restaurant: data })
            }
        })
    }

    updateRestaurant(req, res) {
        restaurantschema.updateOne({ name: req.params.name }, { $set: req.body }, (err) => {
            if (err) {
                res.status(500).send({ message: 'Error processing your request', error: err })
            } else {
                res.status(200).send({ message: 'Restaurant successfully updated' })
            }
        })
    }

}

module.exports = new Restaurant()