const express = require('express');

const route = express.Router();

const RestaurantController = require('./../controllers/restaurant.controller');

route.get('/getAllRestaurants', RestaurantController.getAllRestaurants);
route.get('/getOne/:name', RestaurantController.getRestaurantByName);
route.post('/createRestaurant', RestaurantController.createRestaurant);
route.get('/validarNomeRestaurant', RestaurantController.validarNomeRestaurant);
route.put('/updateRestaurant/:name', RestaurantController.updateRestaurant);
route.delete('/deleteRestaurant/:name', RestaurantController.deleteRestaurant);

module.exports = route;