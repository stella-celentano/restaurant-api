const chefschema = require('./../models/chef.model');

class Chef {
    getAllChefs(req, res) {
        chefschema.find({}, (err, data) => {
            if (err) {
                res.status(500).send({ message: 'Error processing your request', error: err })
            } else {
                res.status(200).send({ message: 'Chefs successfully recovered', chef: data })
            }
        })
    }

    getChefByName(req, res) {
        const { name } = req.params

        chefschema.findOne({ name }, (err, data) => {
            if (err) {
                res.status(500).send({ message: 'Error processing your request', error: err })
            } else {
                res.status(200).send({ message: `Chef ${name} successfully recovered`, chef: data })
            }
        })
    }

    createChef(req, res) {
        const body = req.body;

        chefschema.create(body, (err, data) => {
            if (err) {
                res.status(500).send({ message: 'Error processing your request', error: err })
            } else {
                res.status(201).send({ message: 'Chef successfully created', chef: data })
            }
        })
    }

    updateChef(req, res) {
        chefschema.updateOne({ name: req.params.name }, { $set: req.body }, (err) => {
            if (err) {
                res.status(500).send({ message: 'Error processing your request', error: err })
            } else {
                res.status(200).send({ message: 'Chef successfully updated' })
            }
        })
    }

    deleteChef(req, res) {
        const { name } = req.params

        chefschema.deleteOne({ name }, (err) => {
            if (err) {
                res.status(500).send({ message: 'Error processing your request', error: err })
            } else {
                res.status(200).send({ message: `Chef ${name} successfully deleted` })
            }
        })
    }

}

module.exports = new Chef();