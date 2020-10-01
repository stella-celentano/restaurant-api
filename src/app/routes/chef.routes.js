const express = require('express');

const route = express.Router();

const ChefController = require('./../controllers/chef.controller');

route.get('/getAllChefs', ChefController.getAllChefs);
route.get('/getOne/:name', ChefController.getChefByName);
route.post('/createChef', ChefController.createChef);
route.get('/validarNomeChef', ChefController.validarNomeChef);
route.put('/updateChef/:name', ChefController.updateChef);
route.delete('/deleteChef/:name', ChefController.deleteChef);

module.exports = route;