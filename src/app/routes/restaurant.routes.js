const express = require('express');

const route = express.Router();

const RestaurantController = require('./../controllers/restaurant.controller');

route.post('/createRestaurant', RestaurantController.createRestaurant);
route.get('/getAllRestaurants', RestaurantController.getAllRestaurants);
route.get('/getOne/:name', RestaurantController.getRestaurantByName);
route.put('/updateRestaurant/:name', RestaurantController.updateRestaurant);

module.exports = route;