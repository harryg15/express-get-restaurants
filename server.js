const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");

const port = 3000;

//TODO: Create your GET Request Route Below: 

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})

app.get('/restaurants', async (req, res) => {
    const getRestaurants = await Restaurant.findAll()
    res.json(getRestaurants)
})

app.get('/restaurants/:id', async (req, res) => {
    const getSpecific = await Restaurant.findByPk(req.params.id)
    res.json(getSpecific)
})