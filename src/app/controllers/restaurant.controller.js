const restaurantschema = require('./../models/restaurant.model');
const chefschema = require('./../models/chef.model');

class Restaurant {
    getAllRestaurants(req, res) {
        restaurantschema.find({})
            .populate('chefs', { name: 1, imagem: 1 })
            .sort({ name: 1 })
            .exec((err, data) => {
                if (err) {
                    res.status(500).send({ message: 'Error processing your request', error: err })
                } else {
                    if (data.length <= 0) {
                        res.status(200).send({ message: 'There are no restaurants registered in the database' })
                    } else {
                        res.status(200).send({ message: 'Restaurants successfully recovered', data: data })
                    }
                }
            })
    }

    getRestaurantByName(req, res) {
        const { name } = req.params

        if (name == undefined || name == 'null') {
            res.status(400).send({ message: 'The name must be filled' })
        }

        restaurantschema.findOne({ name })
            .populate('chefs', { name: 1, imagem: 1 })
            .exec((err, data) => {
                if (err) {
                    res.status(500).send({ message: 'Error processing your request', error: err })
                } else {
                    if (data == null) {
                        res.status(200).send({ message: `The restaurant ${name} was not found in the database` })
                    } else {
                        res.status(200).send({ message: `Restaurant ${name} successfully recovered`, restaurant: data })
                    }
                }
            })
    }

    createRestaurant(req, res) {
        const body = req.body;
        const idChef = body['chefs']

        restaurantschema.create(body, (err, restaurant) => {
            if (err) {
                res.status(500).send({ message: 'Error processing your request', error: err })
            } else {
                chefschema.findById(idChef, (err, chef) => {
                    if (err) {
                        res.status(500).send({ message: 'Error processing your request', error: err })
                    } else {
                        chef.restaurant = restaurant
                        chef.save({}, (err) => {
                            if (err) {
                                res.status(500).send({ message: 'Error processing your request', error: err })
                            } else {
                                res.status(201).send({ message: 'Restaurant successfully created', data: restaurant })
                            }
                        })
                    }
                })
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