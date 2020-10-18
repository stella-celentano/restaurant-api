const chefschema = require('./../models/chef.model');
const restaurantschema = require('./../models/restaurant.model');

class Chef {
    getAllChefs(req, res) {
        chefschema.find({})
            .populate('restaurant', { name: 1, imagem: 1 })
            .sort({ name: 1 })
            .exec((err, data) => {
                if (err) {
                    res.status(500).send({ message: 'Error processing your request', error: err })
                } else {
                    if (data.length <= 0) {
                        res.status(200).send({ message: 'There are no chefs registered in the database' })
                    } else {
                        res.status(200).send({ message: 'Chefs successfully recovered', data: data })
                    }
                }
            })
    }

    getChefByName(req, res) {
        const body = req.body
        const { name } = req.params

        if (name == undefined || name == 'null') {
            res.status(400).send({ message: 'The name must be filled' })
        }

        chefschema.findOne({ name })
            .populate('restaurant', { name: 1, imagem: 1 })
            .exec((err, data) => {
                if (err) {
                    res.status(500).send({ message: 'Error processing your request', error: err })
                } else {
                    if (data.length <= 0) {
                        res.status(200).send({ message: `The chef ${name} was not found in the database` })
                    } else {
                        res.status(200).send({ message: `Chef ${name} successfully recovered`, data: data })
                    }
                }
            })
    }

    createChef(req, res) {
        const body = req.body;
        const idRestaurant = body['restaurant']

        chefschema.create(body, (err, chef) => {
            if (err) {
                res.status(500).send({ message: 'Error processing your request', error: err })
            } else {
                restaurantschema.findById(idRestaurant, (err, restaurant) => {
                    if (err) {
                        console.log(idRestaurant)
                        res.status(500).send({ message: 'Error processing your request', error: err })
                    } else {
                        restaurant.chef.push(chef)
                        restaurant.save({}, (err) => {
                            if (err) {
                                res.status(500).send({ message: 'Error processing your request', error: err })
                            } else {
                                res.status(201).send({ message: 'Chef successfully created', data: chef })
                            }
                        })
                    }
                })
            }
        })
    }

    update(req, res) {
        const { chefID } = req.params
        const reqBody = req.body
        const restaurantID = reqBody['restaurant']

        chefschema.updateOne({ _id: chefID }, { $set: reqBody }, (err, chef) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar a sua requisição" })
            } else {
                restaurantschema.findOne({ chef: chefID }, (err, result) => {
                    if (err) {
                        res.status(500).send({ message: "Houve um erro ao processar a sua requisição" })
                    } else {
                        if (result['_id'] == restaurantID) {
                            res.status(200).send({ message: 'O chef foi atualizado com sucesso', data: chef })
                        } else {
                            result.chef.pull(chefID)
                            result.save({}, (err) => {
                                if (err) {
                                    res.status(500).send({ message: "Houve um erro ao processar a sua requisição" })
                                } else {
                                    restaurantschema.findById(restaurantID, (err, restaurant) => {
                                        if (err) {
                                            res.status(500).send({ message: "Houve um erro ao processar a sua requisição" })
                                        } else {
                                            restaurant.chef.push(chefID)
                                            restaurant.save({}, (err) => {
                                                if (err) {
                                                    res.status(500).send({ message: "Houve um erro ao processar a sua requisição" })
                                                } else {
                                                    res.status(200).send({ message: 'O chef foi atualizado com sucesso', data: chef })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            }
        })
    }

    delete(req, res) {
        const { chefID } = req.params

        restaurantschema.findOne({ chef: chefID }, (err, restaurant) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
            } else {
                restaurant.chef.pull(chefID)
                restaurant.save((err) => {
                    if (err) {
                        res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
                    } else {
                        chefschema.deleteOne({ _id: chefID }, (err, result) => {
                            if (err) {
                                res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
                            } else {
                                res.status(200).send({ message: "O chef foi apagado com sucesso", data: result })
                            }
                        })
                    }
                })
            }
        })
    }

    validarNomeChef(req, res) {
        const nome = req.query.nome.replace(/%20/g, " ")

        chefschema.find({ nome: { '$regex': `^${nome}$`, '$options': 'i' } }, (err, result) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar a sua requisição" })
            } else {
                if (result.length > 0) {
                    res.status(200).send({ message: "Já existe um chef cadastrado com esse nome", data: result.length })
                } else {
                    res.status(200).send({ message: "Chef disponível", data: result.length })
                }
            }
        })
    }

}

module.exports = new Chef();