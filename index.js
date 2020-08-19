const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const database = require('./src/config/database')

const RestaurantsRoutes = require('./src/app/routes/restaurant.routes');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/json' }))

app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow_Header', 'Origin, X_requested-With, Content-Type, Accept')
    next() 
})

app.get('/', (req, res) => res.send({ message: `API listening in port ${PORT}` }) )

app.use('/restaurant', RestaurantsRoutes);

app.use('*', (req, res) => res.send({ message: 'API not found' }))

app.listen(PORT, () => {
    console.log(`API listening in port ${PORT}`)
})