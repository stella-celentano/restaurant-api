const restaurantschema = require('./../models/restaurant.model');
const chefschema = require('./../models/chef.model');

class Restaurant {
    getAllRestaurants(req, res) {
        restaurantschema.find({})
            .populate('chef', { name: 1, imagem: 1 })
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
            .populate('chef', { name: 1, imagem: 1 })
            .exec((err, data) => {
                if (err) {
                    res.status(500).send({ message: 'Error processing your request', error: err })
                } else {
                    if (data == null) {
                        res.status(200).send({ message: `The restaurant ${name} was not found in the database` })
                    } else {
                        res.status(200).send({ message: `Restaurant ${name} successfully recovered`, data: data })
                    }
                }
            })
    }

    createRestaurant(req, res) {
        const body = req.body;

        restaurantschema.create(body, (err, restaurant) => {
            if (err) {
                res.status(500).send({ message: 'Error processing your request', error: err })
            } else {
                res.status(201).send({ message: 'Restaurant successfully created', data: restaurant })
            }
        })
    }

    updateRestaurant(req, res) {
        const { restaurantID } = req.params;
        const reqBody = req.body

        restaurantschema.updateOne({ _id: restaurantID }, { $set: reqBody }, (err, restaurant) => {
            if (err) {
                res.status(500).send({ message: 'Error processing your request', error: err })
            } else {
                res.status(200).send({ message: 'Restaurant successfully updated', data: restaurant })
            }
        })
    }

    deleteRestaurant(req, res) {
        const { restaurantID } = req.params;

        restaurantschema.findOne({ _id: restaurantID }, (err) => {
            if (err) {
                res.status(500).send({ message: 'Error processing your request', error: err })
            } else {
                chefschema.deleteMany({ restaurant: restaurantID }, (err) => {
                    if (err) {
                        res.status(500).send({ message: 'Error processing your request', error: err })
                    } else {
                        restaurantschema.deleteOne({ _id: restaurantID }, (err, restaurant) => {
                            if (err) {
                                res.status(500).send({ message: 'Error processing your request', error: err })
                            } else {
                                res.status(200).send({ message: `Restaurant successfully deleted`, data: restaurant})
                            }
                        })
                    }
                })
            }
        })
    }

    validarNomeRestaurant(req, res) {
        const nome = req.query.nome.replace(/%20/g, " ")

        restaurantschema.find({ nome: { '$regex': `^${nome}$`, '$options': 'i' } }, (err, result) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar a sua requisição" })
            } else {
                if (result.length > 0) {
                    res.status(200).send({ message: "Já existe um restaurante cadastrado com esse nome", data: result.length })
                } else {
                    res.status(200).send({ message: "Restaurante disponível", data: result.length })
                }
            }
        })
    }
}

module.exports = new Restaurant()