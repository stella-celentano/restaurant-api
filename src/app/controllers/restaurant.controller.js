const restaurantschema = require('./../models/restaurant.model');

class Restaurant {
    getAllRestaurants(req, res) {
        restaurantschema.find({})
            .populate('chefs')
            .exec((err, data) => {
                if (err) {
                    res.status(500).send({ message: 'Error processing your request', error: err })
                } else {
                    res.status(200).send({ message: 'Restaurants successfully recovered', restaurant: data })
                }
            })
    }

    getRestaurantByName(req, res) {
        const { name } = req.params

        restaurantschema.findOne({ name })
            .populate('chefs')
            .exec((err, data) => {
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

    deleteRestaurant(req, res) {
        const { name } = req.params

        restaurantschema.deleteOne({ name }, (err) => {
            if (err) {
                res.status(500).send({ message: 'Error processing your request', error: err })
            } else {
                res.status(200).send({ message: `Restaurant ${name} successfully deleted` })
            }
        })
    }
}

module.exports = new Restaurant()